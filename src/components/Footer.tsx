import React from 'react';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenDashboard }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" variant="dark" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              TaskFlow is a modern task management platform that helps students, freelancers, startups, and teams organize their daily tasks, manage projects, track progress, and improve productivity from one place.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('features')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('pricing')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pricing Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('testimonials')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Testimonials
                </button>
              </li>
            </ul>
          </div>

          {/* Product links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Product Demo
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={onOpenDashboard}
                  className="hover:text-white transition-colors cursor-pointer text-left text-indigo-400 font-medium"
                >
                  Interactive Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDashboard}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Kanban & Task List
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDashboard}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sprint Velocity Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDashboard}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Calendar Deadlines
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDashboard}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Local Storage Backup
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information (clearly marked demo details) */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Demo Contact Info
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>support@taskflow-demo.io</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>+91 98765 43210 (Demo line)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Bengaluru & San Francisco (Tech Hubs)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} TaskFlow Inc. All rights reserved. Built with React & Tailwind CSS.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Privacy Policy (Demo)</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
