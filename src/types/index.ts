export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';
export type TaskCategory = 'Design' | 'Engineering' | 'Marketing' | 'Research' | 'Operations';

export interface TeamMember {
  name: string;
  avatar: string;
  role: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string; // YYYY-MM-DD
  status: TaskStatus;
  createdAt: string;
  assignee?: TeamMember;
}

export interface ActivityLog {
  id: string;
  taskId?: string;
  action: 'created' | 'completed' | 'status_changed' | 'updated' | 'deleted';
  title: string;
  timestamp: string;
}

export type TaskFilter = 'All' | 'Pending' | 'In Progress' | 'Completed' | 'High Priority';

export type DashboardTab = 'overview' | 'my-tasks' | 'projects' | 'calendar' | 'analytics' | 'settings';
