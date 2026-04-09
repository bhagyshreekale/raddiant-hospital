'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email) return;
    setSubmitted(true);
    // TODO: wire to Laravel POST /api/newsletter
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 mb-16">
      <div className="relative bg-slate-900 rounded-3xl overflow-hidden px-8 sm:px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-800/20 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        {/* Left */}
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 rounded-full border border-teal-500/30 bg-teal-900/40 text-teal-400 text-[0.65rem] font-bold uppercase tracking-[0.18em] mb-4">
            Stay Informed
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
            Get Monthly Health Insights in Your Inbox
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Join 2,400+ readers receiving expert-curated health tips, hospital news, and appointment reminders. No spam, ever.
          </p>
        </div>

        {/* Right */}
        <div className="relative z-10">
          {submitted ? (
            <div className="bg-teal-900/40 border border-teal-500/30 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-teal-700 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p className="text-white font-bold text-base mb-1">You're subscribed!</p>
              <p className="text-slate-400 text-sm">Thank you, {form.name || 'friend'}. Watch your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500/60 focus:bg-white/12 transition-all"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              />
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500/60 transition-all"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-teal-700 hover:bg-teal-600 text-white font-bold text-sm rounded-xl transition-all duration-200 hover:-translate-y-px"
              >
                Subscribe to Newsletter
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <p className="text-slate-600 text-xs text-center">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
