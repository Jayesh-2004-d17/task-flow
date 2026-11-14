import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Task } from '../types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  task: Task | null;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  task,
}) => {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        <div className="p-6">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 stroke-[2]" />
          </div>

          <h3 id="delete-dialog-title" className="text-lg font-bold text-slate-900">
            Delete Task Confirmation
          </h3>

          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Are you sure you want to delete <span className="font-semibold text-slate-900">"{task.title}"</span>? This action cannot be undone and will remove the task from your dashboard and local storage.
          </p>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Permanently</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
