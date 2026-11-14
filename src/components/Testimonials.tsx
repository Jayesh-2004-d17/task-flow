import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Agile Engineering Lead',
      company: 'CloudScale Technologies',
      avatar: '/src/assets/images/avatar_sarah_jenkins_1794419410553.jpg',
      quote:
        'TaskFlow replaced our convoluted Jira workflows for internal sprints. Our developers love the instant keyboard shortcuts, fast status updates, and how easy it is to see who owns what.',
      metrics: '35% reduction in cycle time',
    },
    {
      name: 'Rohit Sharma',
      role: 'Founder & CEO',
      company: 'DevNest Labs',
      avatar: '/src/assets/images/avatar_rohit_sharma_1794419411866.jpg',
      quote:
        'As an early-stage startup founder, I needed zero fluff. TaskFlow gives us crystal clear visibility on sprint deliverables, deadlines, and high-priority milestones without enterprise bloat.',
      metrics: 'Shipped 14 features on schedule',
    },
    {
      name: 'Alex Chen',
      role: 'Principal Product Designer',
      company: 'FlowStudio UI',
      avatar: '/src/assets/images/avatar_alex_chen_1794419410607.jpg',
      quote:
        'The interface is remarkably fast and clean. Being able to jump between list view, calendar deadlines, and category priorities makes managing client projects a genuine joy.',
      metrics: 'Saved ~5 hours every week',
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/70 rounded-full mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Trusted by creators, builders, and teams
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 text-balance">
            See how high-performing teams streamline their daily task pipelines and hit goals faster.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-2xl p-7 border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>

                {/* Outcome badge */}
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                  <span>Impact:</span>
                  <span className="font-mono">{t.metrics}</span>
                </div>
              </div>

              {/* Author profile */}
              <div className="mt-6 pt-5 border-t border-slate-200/70 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-2xs"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                  <p className="text-[11px] font-medium text-indigo-600">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sample notice */}
        <div className="mt-12 text-center text-xs text-slate-400">
          * Representative customer testimonials crafted as sample marketing scenarios.
        </div>
      </div>
    </section>
  );
};
