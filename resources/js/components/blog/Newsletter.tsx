'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface FormData {
  name: string;
  email: string;
}

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({ name: '', email: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.email) return;
    setSubmitted(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 mb-16">
      <div className="relative bg-slate-900 rounded-[2.5rem] overflow-hidden px-8 sm:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-slate-800 shadow-2xl">
        
        {/* Background Design Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-teal-900/20 blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        {/* Left Side: Content */}
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-400 text-[0.7rem] font-bold uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Stay Informed
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Get Monthly Health <span className="text-teal-400">Insights</span>
          </h3>
          <p className="text-slate-400 text-base sm:text-lg max-w-md leading-relaxed">
            Join <span className="text-white font-semibold">2,400+</span> readers receiving expert health tips and hospital updates once a month.
          </p>
        </div>

        {/* Right Side: Interaction */}
        <div className="relative z-10 w-full max-w-md ml-auto">
          {submitted ? (
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-8 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 rounded-2xl bg-teal-600 flex items-center justify-center mx-auto mb-4 rotate-3 shadow-lg shadow-teal-900/20">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h4 className="text-white font-bold text-xl mb-2">You're on the list!</h4>
              <p className="text-slate-400 text-sm">Thanks {form.name.split(' ')[0] || 'there'}, check your inbox soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="group space-y-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/50 transition-all duration-300"
                />
              </div>
              <div className="group space-y-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/50 transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-2xl transition-all duration-300 shadow-xl shadow-teal-900/40 hover:-translate-y-1 active:scale-95"
              >
                Join Newsletter
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <p className="text-slate-500 text-[11px] text-center px-4 leading-relaxed">
                By subscribing, you agree to our <span className="text-slate-400 underline cursor-pointer">Privacy Policy</span>. No spam, just value.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}