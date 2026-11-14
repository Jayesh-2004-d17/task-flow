import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Building2, User, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    message?: string;
  }>({});

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!validateEmail(email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., name@domain.com).';
    }

    if (!message.trim()) {
      newErrors.message = 'Please provide a message or inquiry detail.';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success state
    setErrors({});
    setIsSubmitted(true);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Reset fields after successful submission as required
    setFullName('');
    setEmail('');
    setCompany('');
    setMessage('');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/70 rounded-full mb-3 shadow-2xs">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Request a personalized team demo
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 text-balance">
            Have questions about team workflows, custom integrations, or volume pricing? Reach out to our solution architects.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 sm:p-10 text-center shadow-md animate-fade-in">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-950">
                Demo Request Received!
              </h3>
              <p className="mt-3 text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                Thank you for your inquiry. Our product team will review your requirements and reach out within 24 business hours.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-slate-50/70 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-5"
            >
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    Full Name <span className="text-rose-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  placeholder="e.g. Alex Henderson"
                  className={`w-full px-4 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden transition-all ${
                    errors.fullName
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-400/20'
                      : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    Email Address <span className="text-rose-500">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="e.g. alex@company.com"
                  className={`w-full px-4 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden transition-all ${
                    errors.email
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-400/20'
                      : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Company Name (optional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Company Name (Optional)</span>
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Acme Innovations"
                  className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    Message / Team Requirements <span className="text-rose-500">*</span>
                  </span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Tell us about your team size, current workflow bottlenecks, or any questions..."
                  className={`w-full px-4 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden transition-all resize-none ${
                    errors.message
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-400/20'
                      : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Demo Request</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-400">
                🔒 Frontend demo validation · Responses are processed client-side.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
