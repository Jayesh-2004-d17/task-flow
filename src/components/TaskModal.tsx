import React, { useState, useEffect } from 'react';
import { X, Calendar, Flag, Tag, Users, Check, AlertCircle } from 'lucide-react';
import { Task, TaskCategory, TaskPriority, TaskStatus, TeamMember } from '../types';
import { TEAM_MEMBERS } from '../data/initialTasks';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: Omit<Task, 'id' | 'createdAt'> & { id?: string }) => void;
  taskToEdit?: Task | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  taskToEdit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Engineering');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<TaskStatus>('Pending');
  const [assigneeName, setAssigneeName] = useState<string>(TEAM_MEMBERS[0].name);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setCategory(taskToEdit.category);
      setPriority(taskToEdit.priority);
      setDueDate(taskToEdit.dueDate);
      setStatus(taskToEdit.status);
      setAssigneeName(taskToEdit.assignee?.name || TEAM_MEMBERS[0].name);
    } else {
      // Default new task values
      setTitle('');
      setDescription('');
      setCategory('Engineering');
      setPriority('Medium');
      // Default due date to 5 days from today
      const d = new Date();
      d.setDate(d.getDate() + 5);
      setDueDate(d.toISOString().split('T')[0]);
      setStatus('Pending');
      setAssigneeName(TEAM_MEMBERS[0].name);
    }
    setError(null);
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }
    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters long.');
      return;
    }

    const selectedAssignee = TEAM_MEMBERS.find((m) => m.name === assigneeName) || TEAM_MEMBERS[0];

    onSubmit({
      id: taskToEdit ? taskToEdit.id : undefined,
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      status,
      assignee: selectedAssignee,
    });
    onClose();
  };

  const categories: TaskCategory[] = ['Design', 'Engineering', 'Marketing', 'Research', 'Operations'];
  const priorities: TaskPriority[] = ['Low', 'Medium', 'High'];
  const statuses: TaskStatus[] = ['Pending', 'In Progress', 'Completed'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 id="modal-headline" className="text-lg font-bold text-slate-900">
              {taskToEdit ? 'Edit Task Details' : 'Create New Task'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {taskToEdit ? 'Modify task parameters and save changes.' : 'Add an actionable item to your workspace.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Task Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Audit sprint velocity and update roadmaps"
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400"
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description / Deliverable Details
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Provide context, constraints, or links needed to complete this task..."
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Category & Priority Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span>Category</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-slate-400" />
                <span>Priority</span>
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date & Status Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Due Date</span>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-slate-400" />
                <span>Status</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Assignee Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>Assignee</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TEAM_MEMBERS.map((member) => (
                <button
                  type="button"
                  key={member.name}
                  onClick={() => setAssigneeName(member.name)}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-colors cursor-pointer ${
                    assigneeName === member.name
                      ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-6 h-6 rounded-full object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-900 truncate">{member.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-slate-400 truncate">{member.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              {taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
