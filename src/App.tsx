/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Dashboard } from './components/Dashboard';
import { TaskModal } from './components/TaskModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Task, ActivityLog, TaskStatus } from './types';
import { INITIAL_TASKS, INITIAL_ACTIVITIES, TEAM_MEMBERS } from './data/initialTasks';
import { ArrowUp, LayoutDashboard } from 'lucide-react';

const TASKS_STORAGE_KEY = 'taskflow_tasks_v1';
const ACTIVITIES_STORAGE_KEY = 'taskflow_activities_v1';

export default function App() {
  const [activeView, setActiveView] = useState<'landing' | 'dashboard'>('landing');

  // Load persisted tasks from LocalStorage or fallback to INITIAL_TASKS
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(TASKS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read tasks from localStorage', e);
    }
    return INITIAL_TASKS;
  });

  // Load persisted activities from LocalStorage or fallback to INITIAL_ACTIVITIES
  const [activities, setActivities] = useState<ActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read activities from localStorage', e);
    }
    return INITIAL_ACTIVITIES;
  });

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Sync to LocalStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
    } catch (e) {
      console.error('Failed to save activities to localStorage', e);
    }
  }, [activities]);

  // Log activity helper
  const addActivity = (
    action: ActivityLog['action'],
    title: string,
    taskId?: string
  ) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      action,
      title,
      taskId,
      timestamp: 'Just now',
    };
    setActivities((prev) => [newLog, ...prev]);
  };

  // Task creation and update handler
  const handleSaveTask = (
    taskData: Omit<Task, 'id' | 'createdAt'> & { id?: string }
  ) => {
    if (taskData.id) {
      // Editing existing task
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskData.id
            ? {
                ...t,
                title: taskData.title,
                description: taskData.description,
                category: taskData.category,
                priority: taskData.priority,
                dueDate: taskData.dueDate,
                status: taskData.status,
                assignee: taskData.assignee,
              }
            : t
        )
      );
      addActivity('updated', `Updated task "${taskData.title}"`, taskData.id);
    } else {
      // Creating new task
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: taskData.title,
        description: taskData.description,
        category: taskData.category,
        priority: taskData.priority,
        dueDate: taskData.dueDate,
        status: taskData.status,
        createdAt: new Date().toISOString(),
        assignee: taskData.assignee || TEAM_MEMBERS[0],
      };
      setTasks((prev) => [newTask, ...prev]);
      addActivity('created', `Created new task "${newTask.title}"`, newTask.id);
    }
  };

  // Status update
  const handleUpdateStatus = (taskId: string, newStatus: TaskStatus) => {
    let taskName = '';
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          taskName = t.title;
          return { ...t, status: newStatus };
        }
        return t;
      })
    );
    addActivity(
      newStatus === 'Completed' ? 'completed' : 'status_changed',
      `Moved "${taskName}" to ${newStatus}`,
      taskId
    );
  };

  // Delete task
  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    const deletedId = taskToDelete.id;
    const deletedTitle = taskToDelete.title;
    setTasks((prev) => prev.filter((t) => t.id !== deletedId));
    addActivity('deleted', `Deleted task "${deletedTitle}"`);
    setTaskToDelete(null);
  };

  // Reset to initial demo state
  const handleResetDemoData = () => {
    setTasks(INITIAL_TASKS);
    setActivities(INITIAL_ACTIVITIES);
    localStorage.removeItem(TASKS_STORAGE_KEY);
    localStorage.removeItem(ACTIVITIES_STORAGE_KEY);
  };

  const handleOpenAddTask = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleOpenDeleteConfirm = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Universal Navigation Bar */}
      <Navbar
        onOpenDashboard={() => {
          setActiveView('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main View Switcher: Landing Page vs Full Workspace Dashboard */}
      {activeView === 'landing' ? (
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onGetStarted={() => {
              setActiveView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreFeatures={() => scrollToSection('features')}
            totalTasksCount={tasks.length}
            completedTasksCount={completedCount}
          />

          {/* Features Section */}
          <Features
            onOpenDashboard={() => {
              setActiveView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* How It Works Section */}
          <HowItWorks
            onGetStarted={() => {
              setActiveView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Embedded Interactive Live Dashboard Preview Section */}
          <section className="py-20 lg:py-28 bg-slate-50/50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mx-auto text-center mb-12">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/70 rounded-full mb-3 shadow-2xs">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Interactive Live Workspace</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
                  Try the working dashboard directly below
                </h2>
                <p className="mt-4 text-base text-slate-600 text-balance">
                  Test task creation, search, real-time filters, status updates, and LocalStorage persistence right now.
                </p>
              </div>

              {/* Embedded Dashboard */}
              <div className="rounded-3xl border border-slate-300 shadow-xl overflow-hidden bg-white ring-1 ring-slate-900/5">
                <Dashboard
                  tasks={tasks}
                  activities={activities}
                  onAddTask={handleOpenAddTask}
                  onEditTask={handleOpenEditTask}
                  onDeleteTask={handleOpenDeleteConfirm}
                  onUpdateStatus={handleUpdateStatus}
                  onResetDemoData={handleResetDemoData}
                  onBackToLanding={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <Pricing
            onOpenDashboard={() => {
              setActiveView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onContactClick={() => scrollToSection('contact')}
          />

          {/* Testimonials Section */}
          <Testimonials />

          {/* Contact Section */}
          <Contact />
        </main>
      ) : (
        /* Dedicated Full-Screen Dashboard View */
        <main className="flex-1">
          <Dashboard
            tasks={tasks}
            activities={activities}
            onAddTask={handleOpenAddTask}
            onEditTask={handleOpenEditTask}
            onDeleteTask={handleOpenDeleteConfirm}
            onUpdateStatus={handleUpdateStatus}
            onResetDemoData={handleResetDemoData}
            onBackToLanding={() => {
              setActiveView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        onScrollTo={(id) => {
          if (activeView === 'dashboard') {
            setActiveView('landing');
            setTimeout(() => scrollToSection(id), 100);
          } else {
            scrollToSection(id);
          }
        }}
        onOpenDashboard={() => {
          setActiveView('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Task Creation & Editing Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setTaskToEdit(null);
        }}
        onSubmit={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        task={taskToDelete}
      />
    </div>
  );
}
