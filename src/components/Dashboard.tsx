import React, { useState } from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Calendar as CalendarIcon,
  BarChart3,
  Settings,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  MoreVertical,
  Edit2,
  Trash2,
  Filter,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Download,
  RotateCcw,
  Check,
  CalendarDays,
  User,
  Activity,
  Layers,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  Task, 
  TaskFilter, 
  DashboardTab, 
  ActivityLog, 
  TaskStatus, 
  TaskPriority, 
  TaskCategory 
} from '../types';
import { TEAM_MEMBERS } from '../data/initialTasks';
import { Logo } from './Logo';

interface DashboardProps {
  tasks: Task[];
  activities: ActivityLog[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
  onResetDemoData: () => void;
  onBackToLanding: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  tasks,
  activities,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onUpdateStatus,
  onResetDemoData,
  onBackToLanding,
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Statistics calculations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;
  const highPriorityTasks = tasks.filter((t) => t.priority === 'High').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter tasks based on search, status filter, and category
  const filteredTasks = tasks.filter((task) => {
    // Search query matching
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Filter by status or priority
    if (activeFilter === 'Pending' && task.status !== 'Pending') return false;
    if (activeFilter === 'In Progress' && task.status !== 'In Progress') return false;
    if (activeFilter === 'Completed' && task.status !== 'Completed') return false;
    if (activeFilter === 'High Priority' && task.priority !== 'High') return false;

    // Filter by category
    if (selectedCategory !== 'All' && task.category !== selectedCategory) return false;

    return true;
  });

  const handleStatusChangeWithConfetti = (taskId: string, newStatus: TaskStatus) => {
    onUpdateStatus(taskId, newStatus);
    if (newStatus === 'Completed') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const exportTasksJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `taskflow-export-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Helper styling badges
  const getPriorityStyle = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'Medium':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Low':
        return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  const getStatusStyle = (status: TaskStatus) => {
    switch (status) {
      case 'Completed':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'In Progress':
        return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      case 'Pending':
        return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  const getCategoryColor = (category: TaskCategory) => {
    switch (category) {
      case 'Engineering':
        return 'text-blue-700 bg-blue-50';
      case 'Design':
        return 'text-purple-700 bg-purple-50';
      case 'Marketing':
        return 'text-pink-700 bg-pink-50';
      case 'Research':
        return 'text-amber-700 bg-amber-50';
      case 'Operations':
        return 'text-emerald-700 bg-emerald-50';
    }
  };

  // Sample Projects
  const projects = [
    {
      id: 'proj-1',
      name: 'TaskFlow 2.0 Web Platform',
      category: 'Engineering',
      completedCount: completedTasks,
      totalCount: totalTasks,
      color: 'from-indigo-600 to-purple-600',
    },
    {
      id: 'proj-2',
      name: 'Product Hunt Launch & Marketing',
      category: 'Marketing',
      completedCount: 3,
      totalCount: 5,
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'proj-3',
      name: 'User Experience & Beta Testing',
      category: 'Research',
      completedCount: 4,
      totalCount: 4,
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 'proj-4',
      name: 'Design System & Token Architecture',
      category: 'Design',
      completedCount: 2,
      totalCount: 3,
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar inside Dashboard */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Breadcrumb & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="group p-1 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg transition-transform hover:scale-105"
              title="Return to Landing Page"
            >
              <Logo size="sm" variant="light" showBadge={true} />
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider capitalize">
              {activeTab.replace('-', ' ')}
            </span>
          </div>

          {/* Quick search & actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors hidden sm:inline-flex items-center gap-1.5"
            >
              <span>Landing Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onAddTask}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>New Task</span>
            </button>

            <div className="flex items-center pl-2 border-l border-slate-200">
              <img
                src={TEAM_MEMBERS[1].avatar}
                alt="Alex Chen Profile"
                className="w-8 h-8 rounded-full border border-slate-200 object-cover shadow-2xs"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-60 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-1">
            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Workspace
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </div>
              <span className="font-mono text-xs text-slate-400 tabular-nums">{totalTasks}</span>
            </button>

            <button
              onClick={() => setActiveTab('my-tasks')}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                activeTab === 'my-tasks'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CheckSquare className="w-4 h-4" />
                <span>My Tasks</span>
              </div>
              <span className="font-mono text-xs text-slate-400 tabular-nums">
                {inProgressTasks + pendingTasks}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderKanban className="w-4 h-4" />
                <span>Projects</span>
              </div>
              <span className="font-mono text-xs text-slate-400 tabular-nums">4</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CalendarIcon className="w-4 h-4" />
                <span>Calendar</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </div>
              <span className="font-mono text-xs text-emerald-600 font-semibold tabular-nums">
                {completionPercentage}%
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </div>
            </button>
          </div>

          {/* Quick Storage Status Card */}
          <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-xs space-y-2">
            <div className="flex items-center justify-between font-semibold text-slate-800">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Data Persisted</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">LocalStorage</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              All task mutations are automatically saved to your browser and survive reloads.
            </p>
            <button
              onClick={onResetDemoData}
              className="w-full text-center text-[11px] font-medium text-indigo-600 hover:text-indigo-700 pt-1 border-t border-slate-100 block transition-colors cursor-pointer"
            >
              Reset to Initial Demo State
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Welcome Banner */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Welcome back!
                </h1>
                <span className="text-lg">👋</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                You have <span className="font-semibold text-indigo-600 font-mono tabular-nums">{inProgressTasks}</span> tasks in progress and <span className="font-semibold text-amber-600 font-mono tabular-nums">{pendingTasks}</span> pending items in this sprint.
              </p>
            </div>
            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              <button
                onClick={onAddTask}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Create Task</span>
              </button>
            </div>
          </div>

          {/* 4 Stat Cards required by 4.E */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Tasks */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Tasks</span>
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {totalTasks}
              </div>
              <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                <span>Active Sprint Workspace</span>
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Completed</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums text-emerald-600">
                {completedTasks}
              </div>
              <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                <span className="font-mono font-medium text-emerald-600">{completionPercentage}%</span>
                <span>completion rate</span>
              </div>
            </div>

            {/* In Progress Tasks */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">In Progress</span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums text-blue-600">
                {inProgressTasks}
              </div>
              <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                <span>Actively being worked on</span>
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Pending</span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums text-amber-600">
                {pendingTasks}
              </div>
              <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                <span>Queued in backlog</span>
              </div>
            </div>
          </div>

          {/* VIEW TAB 1: OVERVIEW & MY-TASKS */}
          {(activeTab === 'overview' || activeTab === 'my-tasks') && (
            <>
              {/* Task Completion Progress Bar Section (required by 4.E) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-bold text-slate-900">Task Completion Progress</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-600 tabular-nums">
                    {completedTasks} of {totalTasks} Tasks Done ({completionPercentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Task Controls: Search, Filters, Category Selector */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Search Input (required by 4.F.5) */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tasks by title, description, or category..."
                      className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-md"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* View layout toggle */}
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-end sm:self-auto">
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                        viewMode === 'cards'
                          ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Cards
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                        viewMode === 'table'
                          ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Table
                    </button>
                  </div>
                </div>

                {/* Filter buttons (required by 4.F.6) */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(['All', 'Pending', 'In Progress', 'Completed', 'High Priority'] as TaskFilter[]).map(
                      (filter) => (
                        <button
                          key={filter}
                          onClick={() => setActiveFilter(filter)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                            activeFilter === filter
                              ? 'bg-indigo-600 text-white shadow-2xs'
                              : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/70'
                          }`}
                        >
                          {filter === 'All' ? 'All Tasks' : filter}
                        </button>
                      )
                    )}
                  </div>

                  {/* Category Dropdown Filter */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>Category:</span>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:border-indigo-500"
                    >
                      <option value="All">All Categories</option>
                      <option value="Design">Design</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Research">Research</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tasks List / Grid Area */}
              {filteredTasks.length === 0 ? (
                /* Empty state */
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                    <CheckSquare className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">No tasks found</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    {searchQuery || activeFilter !== 'All' || selectedCategory !== 'All'
                      ? 'No items match your active filters. Try adjusting your search query or reset filters.'
                      : 'Your task list is empty. Create your first task to start tracking velocity!'}
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    {searchQuery || activeFilter !== 'All' || selectedCategory !== 'All' ? (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setActiveFilter('All');
                          setSelectedCategory('All');
                        }}
                        className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                      >
                        Reset Filters
                      </button>
                    ) : null}
                    <button
                      onClick={onAddTask}
                      className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
                    >
                      + Create First Task
                    </button>
                  </div>
                </div>
              ) : viewMode === 'cards' ? (
                /* Cards View */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Task Top Meta (Clean unboxed metadata) */}
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${getPriorityStyle(task.priority)}`}>
                              {task.priority} Priority
                            </span>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${getCategoryColor(task.category)}`}>
                              {task.category}
                            </span>
                          </div>

                          {/* Action Buttons: Edit, Delete */}
                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => onEditTask(task)}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                              title="Edit task"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteTask(task)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete task"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h4 className={`text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors ${
                          task.status === 'Completed' ? 'line-through text-slate-400' : ''
                        }`}>
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
                            {task.description}
                          </p>
                        )}
                      </div>

                      {/* Bottom row: Assignee, Due Date, and Status Selector */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {task.assignee ? (
                            <img
                              src={task.assignee.avatar}
                              alt={task.assignee.name}
                              className="w-6 h-6 rounded-full object-cover border border-slate-200"
                              title={`Assigned to ${task.assignee.name}`}
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                              <User className="w-3.5 h-3.5" />
                            </div>
                          )}
                          <span className="text-[11px] text-slate-500 font-mono">
                            Due {task.dueDate}
                          </span>
                        </div>

                        {/* Status selector right on the card */}
                        <div className="flex items-center gap-1.5">
                          <select
                            value={task.status}
                            onChange={(e) =>
                              handleStatusChangeWithConfetti(task.id, e.target.value as TaskStatus)
                            }
                            className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors cursor-pointer focus:outline-hidden ${getStatusStyle(
                              task.status
                            )}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Table View */
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3">Task Title</th>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Priority</th>
                          <th className="px-4 py-3">Due Date</th>
                          <th className="px-4 py-3">Assignee</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {filteredTasks.map((task) => (
                          <tr key={task.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="px-4 py-3.5 font-medium text-slate-900 max-w-xs truncate">
                              <div className={task.status === 'Completed' ? 'line-through text-slate-400' : ''}>
                                {task.title}
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${getCategoryColor(task.category)}`}>
                                {task.category}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${getPriorityStyle(task.priority)}`}>
                                {task.priority}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 font-mono text-slate-500">{task.dueDate}</td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-1.5">
                                {task.assignee?.avatar && (
                                  <img
                                    src={task.assignee.avatar}
                                    alt={task.assignee.name}
                                    className="w-5 h-5 rounded-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                )}
                                <span className="text-[11px] text-slate-600">{task.assignee?.name.split(' ')[0]}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <select
                                value={task.status}
                                onChange={(e) =>
                                  handleStatusChangeWithConfetti(task.id, e.target.value as TaskStatus)
                                }
                                className={`px-2 py-1 text-xs font-semibold rounded-lg border cursor-pointer focus:outline-hidden ${getStatusStyle(
                                  task.status
                                )}`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </td>
                            <td className="px-4 py-3.5 text-right space-x-1">
                              <button
                                onClick={() => onEditTask(task)}
                                className="p-1 text-slate-400 hover:text-indigo-600 rounded transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => onDeleteTask(task)}
                                className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Recent Activity Area (required by 4.E) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-sm font-bold text-slate-900">Recent Workspace Activity</h3>
                  </div>
                  <span className="text-xs text-slate-400">Live timeline</span>
                </div>

                <div className="space-y-3">
                  {activities.slice(0, 5).map((act) => (
                    <div key={act.id} className="flex items-start gap-3 text-xs">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-800 font-medium">{act.title}</p>
                        <p className="text-[11px] text-slate-400">{act.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* VIEW TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h3 className="text-lg font-bold text-slate-900">Active Team Projects</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Manage high-level milestones and cross-functional project deliverables.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {projects.map((proj) => {
                    const pct = Math.round((proj.completedCount / proj.totalCount) * 100);
                    return (
                      <div
                        key={proj.id}
                        className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                            <span className="font-semibold text-indigo-600">{proj.category}</span>
                            <span className="font-mono text-slate-400">
                              {proj.completedCount}/{proj.totalCount} Done
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-slate-900">{proj.name}</h4>
                          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                            <div
                              className="bg-indigo-600 h-full rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <div className="flex -space-x-1.5">
                            {TEAM_MEMBERS.map((m, i) => (
                              <img
                                key={i}
                                src={m.avatar}
                                alt={m.name}
                                className="w-6 h-6 rounded-full border border-white object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ))}
                          </div>
                          <span className="font-mono font-bold text-slate-700">{pct}% Complete</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* VIEW TAB 3: CALENDAR */}
          {activeTab === 'calendar' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Task Schedule & Deadlines</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    View upcoming task deadlines across the monthly calendar.
                  </p>
                </div>
                <div className="text-xs font-mono font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200">
                  November 2026 Sprint
                </div>
              </div>

              {/* Simple Clean Monthly Grid representation */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="grid grid-cols-7 bg-slate-50 text-center py-2 text-xs font-semibold text-slate-600 border-b border-slate-200">
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  <div>Sun</div>
                </div>
                <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 text-xs">
                  {Array.from({ length: 30 }).map((_, index) => {
                    const day = index + 1;
                    const dateStr = `2026-11-${day < 10 ? '0' + day : day}`;
                    const dayTasks = tasks.filter((t) => t.dueDate === dateStr);
                    const isSelected = selectedCalendarDate === dateStr;

                    return (
                      <div
                        key={day}
                        onClick={() => setSelectedCalendarDate(dateStr)}
                        className={`min-h-[72px] sm:min-h-[85px] p-1.5 flex flex-col justify-between transition-colors cursor-pointer ${
                          isSelected ? 'bg-indigo-50/50 ring-1 ring-inset ring-indigo-500' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[11px] font-mono font-semibold ${day === 11 ? 'text-indigo-600 font-bold' : 'text-slate-700'}`}>
                            {day}
                          </span>
                          {day === 11 && (
                            <span className="text-[9px] bg-indigo-600 text-white px-1 rounded-sm">Today</span>
                          )}
                        </div>

                        <div className="space-y-1 mt-1">
                          {dayTasks.slice(0, 2).map((t) => (
                            <div
                              key={t.id}
                              className={`truncate px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                t.status === 'Completed'
                                  ? 'bg-emerald-50 text-emerald-700 line-through'
                                  : t.priority === 'High'
                                  ? 'bg-rose-50 text-rose-700 font-semibold'
                                  : 'bg-indigo-50 text-indigo-700'
                              }`}
                              title={t.title}
                            >
                              {t.title}
                            </div>
                          ))}
                          {dayTasks.length > 2 && (
                            <div className="text-[9px] text-slate-400 font-mono">+{dayTasks.length - 2} more</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Day Details */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 mb-2">
                  Tasks Due on {selectedCalendarDate}:
                </h4>
                {tasks.filter((t) => t.dueDate === selectedCalendarDate).length === 0 ? (
                  <p className="text-xs text-slate-500">No scheduled tasks for this date.</p>
                ) : (
                  <div className="space-y-2">
                    {tasks
                      .filter((t) => t.dueDate === selectedCalendarDate)
                      .map((t) => (
                        <div key={t.id} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 text-xs">
                          <div>
                            <span className="font-semibold text-slate-900">{t.title}</span>
                            <span className="text-slate-400 ml-2">({t.priority} Priority · {t.status})</span>
                          </div>
                          <button
                            onClick={() => onEditTask(t)}
                            className="text-indigo-600 hover:text-indigo-700 font-medium text-xs"
                          >
                            Edit
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW TAB 4: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Productivity Analytics & Velocity</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time visualization of task throughput, priority distribution, and domain workload.
                </p>
              </div>

              {/* Analytics Metric Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Completion Efficiency</div>
                  <div className="text-2xl font-bold font-mono text-emerald-600 mt-1 tabular-nums">
                    {completionPercentage}%
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Based on {totalTasks} tracked deliverables</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">High Priority Items</div>
                  <div className="text-2xl font-bold font-mono text-rose-600 mt-1 tabular-nums">
                    {highPriorityTasks}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Require immediate execution</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Average Sprint Velocity</div>
                  <div className="text-2xl font-bold font-mono text-indigo-600 mt-1 tabular-nums">
                    4.2 / day
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">+18% compared to previous cycle</p>
                </div>
              </div>

              {/* Category Breakdown Bar Chart */}
              <div className="p-5 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-900">Task Allocation by Category</h4>
                <div className="space-y-2">
                  {(['Engineering', 'Design', 'Marketing', 'Research', 'Operations'] as TaskCategory[]).map(
                    (cat) => {
                      const count = tasks.filter((t) => t.category === cat).length;
                      const catPct = totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0;
                      return (
                        <div key={cat} className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-slate-600">
                            <span>{cat}</span>
                            <span className="font-mono text-slate-700">
                              {count} tasks ({catPct}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-indigo-600 h-full rounded-full transition-all"
                              style={{ width: `${catPct}%` }}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}

          {/* VIEW TAB 5: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Workspace Settings & Data Storage</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage your browser-side state, exports, and demo configuration.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Export Taskflow JSON</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Download all your tasks and state as an offline JSON backup.
                    </p>
                  </div>
                  <button
                    onClick={exportTasksJSON}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-rose-900">Reset Demo Data</h4>
                    <p className="text-xs text-rose-700 mt-0.5">
                      Restore the original set of realistic sample tasks and activity history.
                    </p>
                  </div>
                  <button
                    onClick={onResetDemoData}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset Data</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
