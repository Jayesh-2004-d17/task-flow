import React from 'react';
import { 
  CheckSquare, 
  FolderKanban, 
  TrendingUp, 
  CalendarClock, 
  Users, 
  BarChart3,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { TEAM_MEMBERS } from '../data/initialTasks';

interface FeaturesProps {
  onOpenDashboard: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ onOpenDashboard }) => {
  const features = [
    {
      id: 'task-mgmt',
      icon: CheckSquare,
      title: 'Smart Task Management',
      description: 'Create, edit, organize, and delete tasks effortlessly. Keep descriptions, custom categories, and priorities structured.',
      preview: (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium text-slate-700">CRUD Actions</span>
          <span>Fast inline updates</span>
        </div>
      ),
    },
    {
      id: 'project-org',
      icon: FolderKanban,
      title: 'Project Organization',
      description: 'Group tasks by initiatives, sprints, or deliverables. Maintain clean boundaries across development, marketing, and design.',
      preview: (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
          <span className="font-mono text-slate-400">4 Active Projects</span>
          <span aria-hidden="true">·</span>
          <span className="text-indigo-600 font-medium">Sprint V2.4</span>
        </div>
      ),
    },
    {
      id: 'progress-tracking',
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Real-time velocity monitors and instant completion metrics. Track exactly how many items are pending, in-flight, or shipped.',
      preview: (
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Weekly Target</span>
            <span className="font-mono text-slate-700 font-medium">78%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full" style={{ width: '78%' }} />
          </div>
        </div>
      ),
    },
    {
      id: 'deadline-mgmt',
      icon: CalendarClock,
      title: 'Deadline Management',
      description: 'Calendar scheduling and priority tiering ensure that time-critical deliverables never slip through the cracks.',
      preview: (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-rose-600">High Priority</span>
          <span aria-hidden="true">·</span>
          <span>Due in 3 days</span>
        </div>
      ),
    },
    {
      id: 'team-collab',
      icon: Users,
      title: 'Team Collaboration',
      description: 'Assign tasks to cross-functional contributors with clear ownership and accountable timeline tracking.',
      preview: (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex -space-x-2">
            {TEAM_MEMBERS.map((member, idx) => (
              <img
                key={idx}
                src={member.avatar}
                alt={member.name}
                className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-2xs"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
          <span className="text-xs text-slate-500">3 Core Owners</span>
        </div>
      ),
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: 'Productivity Analytics',
      description: 'Visual statistics break down task distribution by priority, categories, and completion velocity over time.',
      preview: (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>+24% vs Last Week</span>
          <span className="text-emerald-600 font-semibold">18 Shipped</span>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/70 rounded-full mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built for Modern Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Everything your team needs to stay in sync
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 text-balance">
            Designed for students, freelancers, startups, and agile teams who want high velocity without cumbersome project bureaucracy.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200 shadow-xs">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                    <span>{feature.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                {feature.preview}
              </div>
            );
          })}
        </div>

        {/* Interactive Banner inside Features */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="text-lg sm:text-xl font-bold">Experience the live workspace</h4>
            <p className="text-sm text-indigo-200 mt-1">
              Add tasks, customize priorities, switch views, and test LocalStorage persistence instantly.
            </p>
          </div>
          <button
            onClick={onOpenDashboard}
            className="px-6 py-3 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
          >
            Open Interactive Demo
          </button>
        </div>
      </div>
    </section>
  );
};
