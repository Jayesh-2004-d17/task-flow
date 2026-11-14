import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingProps {
  onOpenDashboard: () => void;
  onContactClick: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenDashboard, onContactClick }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/70 rounded-full mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Simple, honest pricing for growing teams
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 text-balance">
            Start free with essential task management, or unlock advanced productivity analytics and unlimited projects.
          </p>

          {/* Billing Cadence Toggle */}
          <div className="mt-8 inline-flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* 2 Premium Pricing Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* FREE PLAN */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Free Plan</h3>
                  <p className="text-xs text-slate-500 mt-1">For students & solo freelancers</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  Starter
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900 font-mono">₹0</span>
                <span className="text-sm font-medium text-slate-500">/ month</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Free forever, no payment method required.</p>

              {/* Feature items */}
              <div className="mt-8 space-y-3.5 pt-6 border-t border-slate-100 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>Basic task management</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>Up to 3 active projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>Task progress tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>Basic interactive dashboard</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="w-4 h-4 flex items-center justify-center text-xs">—</span>
                  <span className="line-through">Productivity velocity analytics</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={onOpenDashboard}
                className="w-full py-3 px-4 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-colors cursor-pointer text-center block"
              >
                Get Started Free
              </button>
            </div>
          </div>

          {/* PRO PLAN (High visual treatment) */}
          <div className="relative bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 shadow-2xl border-2 border-indigo-400/50 flex flex-col justify-between">
            {/* Most popular floating tag */}
            <div className="absolute -top-3.5 right-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
              Most Popular
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Pro Plan</h3>
                  <p className="text-xs text-indigo-200 mt-1">For growing teams & ambitious startups</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  Full Power
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white font-mono">
                  {billingCycle === 'monthly' ? '₹299' : '₹2,490'}
                </span>
                <span className="text-sm font-medium text-indigo-200">
                  {billingCycle === 'monthly' ? '/ month' : '/ year'}
                </span>
              </div>
              <p className="text-xs text-indigo-300 mt-1">
                {billingCycle === 'monthly'
                  ? 'Billed monthly. Cancel anytime with one click.'
                  : 'Billed annually. 2 months complimentary.'}
              </p>

              {/* Feature items */}
              <div className="mt-8 space-y-3.5 pt-6 border-t border-indigo-800/60 text-sm text-indigo-100">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span className="font-medium text-white">Unlimited demo projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span className="font-medium text-white">Advanced task management (CRUD)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span className="font-medium text-white">Productivity & velocity analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span className="font-medium text-white">Priority management & filtering</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span className="font-medium text-white">Enhanced calendar & timeline dashboard</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-indigo-800/60 space-y-2">
              <button
                onClick={onOpenDashboard}
                className="w-full py-3 px-4 text-sm font-bold text-slate-900 bg-white hover:bg-indigo-50 active:bg-indigo-100 rounded-xl transition-all shadow-lg hover:shadow-xl cursor-pointer text-center block"
              >
                Launch Pro Experience Demo
              </button>
              <button
                onClick={onContactClick}
                className="w-full text-center text-xs text-indigo-300 hover:text-white transition-colors cursor-pointer py-1"
              >
                Questions? Request a team demo →
              </button>
            </div>
          </div>
        </div>

        {/* Trust badge */}
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Frontend demo edition · No real payment required · Full features unlocked</span>
        </div>
      </div>
    </section>
  );
};
