import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, LayoutDashboard } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenDashboard: () => void;
  activeView: 'landing' | 'dashboard';
  setActiveView: (view: 'landing' | 'dashboard') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDashboard,
  activeView,
  setActiveView,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (activeView === 'dashboard') {
      setActiveView('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-8">
          {/* Brand Zone */}
          <button
            onClick={() => {
              setActiveView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl p-1"
            aria-label="TaskFlow Home"
          >
            <Logo size="md" variant="light" />
          </button>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => {
                setActiveView('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-indigo-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-indigo-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-indigo-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="hover:text-indigo-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="hover:text-indigo-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-indigo-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              Contact
            </button>
          </nav>

          {/* Action Zone */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {activeView === 'landing' ? (
              <button
                onClick={onOpenDashboard}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm shadow-indigo-600/30 hover:shadow-md hover:shadow-indigo-600/25 transition-all cursor-pointer whitespace-nowrap"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Launch Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setActiveView('landing')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Back to Overview</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenDashboard}
              className="p-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>App</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setActiveView('landing');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-left px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-left px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Contact
            </button>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDashboard();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl shadow-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Launch Live Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
