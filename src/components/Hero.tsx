import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Clock, Users, Shield, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroProps {
  onGetStarted: () => void;
  onExploreFeatures: () => void;
  totalTasksCount: number;
  completedTasksCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onGetStarted,
  onExploreFeatures,
  totalTasksCount,
  completedTasksCount,
}) => {
  const [interactiveTaskChecked, setInteractiveTaskChecked] = useState(false);

  const handleToggleInteractiveTask = () => {
    const nextState = !interactiveTaskChecked;
    setInteractiveTaskChecked(nextState);
    if (nextState) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const progressPct = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 68;

  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-32 bg-radial-[at_top_center] from-indigo-50/70 via-slate-50 to-white">
      {/* Decorative ambient gradient blooms */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-100/50 via-purple-50/30 to-transparent blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Subtle Top Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/70 rounded-full mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Next-Generation Productivity Platform</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
            Manage Tasks.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600">
              Track Progress.
            </span>{' '}
            Achieve More.
          </h1>

          {/* Value Proposition */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto text-balance font-normal">
            Bring your projects, tasks, and team collaboration together in one powerful workspace. Stay organized and get more done with TaskFlow.
          </p>

          {/* CTA Button Group */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md shadow-indigo-600/30 hover:shadow-lg hover:shadow-indigo-600/25 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreFeatures}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Explore Features</span>
            </button>
          </div>

          {/* Trust proof metadata */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Free 14-day trial</span>
            </div>
            <span aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-indigo-600" />
              <span>No credit card required</span>
            </div>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <div className="hidden sm:flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-600" />
              <span>Instant local setup</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview Frame with Floating Interactive Cards */}
        <div className="mt-14 relative mx-auto max-w-5xl">
          <div className="relative rounded-2xl bg-slate-900/5 p-2 sm:p-4 ring-1 ring-slate-900/10 shadow-2xl shadow-indigo-500/10">
            {/* Top window styling header */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900 rounded-t-xl text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="ml-2 font-mono text-[11px] text-slate-300 hidden sm:inline">taskflow.app/workspace/sprint</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-slate-300">
                <span className="text-emerald-400 font-semibold">Active Sprint</span>
                <span className="hidden sm:inline text-slate-400">· 21 tasks queued</span>
              </div>
            </div>

            {/* Main Mockup Image */}
            <div className="relative overflow-hidden rounded-b-xl bg-white border border-slate-200">
              <img
                src="/src/assets/images/hero_dashboard_mockup_1794419410736.jpg"
                alt="TaskFlow interactive task and sprint velocity dashboard preview"
                className="w-full h-auto object-cover object-top select-none shadow-inner"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              
              {/* Subtle gradient overlay to tie into interface */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />

              {/* Live Overlay CTA trigger */}
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 backdrop-blur-[1px] hover:bg-slate-900/20 transition-colors group cursor-pointer"
                onClick={onGetStarted}
              >
                <div className="px-5 py-3 rounded-xl bg-white/95 text-slate-900 font-semibold text-sm shadow-xl flex items-center gap-2.5 group-hover:scale-105 transition-transform border border-slate-200/80">
                  <Play className="w-4 h-4 fill-indigo-600 text-indigo-600" />
                  <span>Launch Live Interactive Dashboard</span>
                </div>
              </div>
            </div>

            {/* Floating Notification Card 1: Milestone Progress */}
            <div className="absolute -top-6 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-200/90 max-w-[240px] sm:max-w-xs transition-transform hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Sprint Milestone Reached</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">84% of deliverables completed this cycle</div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Notification Card 2: Interactive Try-Me Task */}
            <div className="absolute -bottom-6 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl shadow-lg border border-slate-200/90 max-w-[260px] sm:max-w-sm transition-transform hover:-translate-y-1">
              <div className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Interactive Preview</span>
                <span className="text-[10px] text-slate-400 font-normal">Click to test</span>
              </div>
              <button
                onClick={handleToggleInteractiveTask}
                className="w-full text-left flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    interactiveTaskChecked
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 group-hover:border-indigo-400 text-transparent'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-medium truncate transition-all ${
                      interactiveTaskChecked ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    Deploy TaskFlow landing page & analytics
                  </p>
                  <p className="text-[10px] text-slate-400">High Priority · Due Today</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
