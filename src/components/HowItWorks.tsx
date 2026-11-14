import React from 'react';
import { FolderPlus, ListTodo, Award, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onGetStarted: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onGetStarted }) => {
  const steps = [
    {
      number: '01',
      title: 'Create Your Project',
      subtitle: 'Workspace Setup',
      description:
        'Set up a dedicated project container for your team or personal sprint. Define initial milestones, deliverables, and category domains in seconds.',
      icon: FolderPlus,
      tag: 'Step 1',
    },
    {
      number: '02',
      title: 'Organize and Manage Tasks',
      subtitle: 'Execution Flow',
      description:
        'Add granular action items with explicit due dates, priority tiers, and rich notes. Assign owners and update status from Pending to In Progress with one click.',
      icon: ListTodo,
      tag: 'Step 2',
    },
    {
      number: '03',
      title: 'Track Progress and Achieve Goals',
      subtitle: 'Velocity & Impact',
      description:
        'Watch your dashboard completion rates update in real time. Celebrate shipped milestones, prevent deadline slips, and hit sprint targets with confidence.',
      icon: Award,
      tag: 'Step 3',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/70 rounded-full mb-3 shadow-2xs">
            <span>Simple 3-Step Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            How TaskFlow powers your daily momentum
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 text-balance">
            From quick brainstorm to verified completion, streamline every phase of your project without bloated enterprise overhead.
          </p>
        </div>

        {/* Steps Container (Horizontal on Desktop, Vertical on Mobile) */}
        <div className="relative">
          {/* Connector line for desktop */}
          <div
            className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-400 to-purple-300 -translate-y-8 -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row with Step number and Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-indigo-500/20">
                        <Icon className="w-6 h-6 stroke-[2]" />
                      </div>
                      <span className="font-mono text-3xl font-extrabold text-slate-200">
                        {step.number}
                      </span>
                    </div>

                    <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
                      {step.subtitle}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{step.tag}</span>
                    <span className="font-mono text-indigo-600">Phase 0{idx + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA trigger */}
        <div className="mt-14 text-center">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <span>Try the 3-step flow right now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
