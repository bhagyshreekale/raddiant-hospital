'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE } from '../../lib copy/data'; // Adjust path if needed

/* ── Floating particle dot ──────────────────────────────── */
function Dot({ style, className }) {
  return (
    <span
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={style}
    />
  );
}

/* ── Animated counter ───────────────────────────────────── */
function Counter({ target, suffix, label, delay, inView }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      let cur = 0;
      const step = Math.ceil(target / (1400 / 16));
      const id = setInterval(() => {
        cur += step;
        if (cur >= target) { setCount(target); clearInterval(id); }
        else setCount(cur);
      }, 16);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [inView, target, delay]);

  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl md:text-4xl font-black text-slate-900 leading-none tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1.5">
        {label}
      </span>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────── */
export default function CTABanner() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const fade = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');
        .cta-section { font-family: 'Sora', sans-serif; }

        /* Clean white mesh bg */
        .cta-bg {
          background-color: #ffffff;
        }

        /* Subtle dark grid overlay for light theme */
        .cta-grid {
          background-image:
            linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        /* Professional blue/teal gradient headline */
        .cta-grad {
          background: linear-gradient(135deg, #0284c7 0%, #0d9488 100%);
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
          background-clip: text;
        }

        /* Divider adapted for light theme */
        .cta-div { width: 1px; background: rgba(15, 23, 42, 0.08); align-self: stretch; }

        /* Pulse ring on phone icon */
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50%      { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
        }
        .cta-ring { animation: ctaPulse 2.4s ease-in-out infinite; }

        /* Floating dots */
        @keyframes floatA { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-18px) scale(1.1)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(12px)  scale(0.9)} }
        .dot-a { animation: floatA 6s ease-in-out infinite; }
        .dot-b { animation: floatB 8s ease-in-out infinite; }
        .dot-c { animation: floatA 10s ease-in-out infinite reverse; }

        /* Shimmer on primary btn */
        @keyframes shimmer {
          0%  { background-position: -200% center; }
          100%{ background-position:  200% center; }
        }
        .cta-shimmer {
          background: linear-gradient(90deg,
            rgba(255,255,255,0) 0%, rgba(255,255,255,.25) 50%, rgba(255,255,255,0) 100%);
          background-size: 200% 100%;
          animation: shimmer 2.8s linear infinite;
        }
      `}</style>

      {/* Reduced top padding: changed pt-20/32 to pt-12 md:pt-16 */}
      <section ref={ref} className="cta-section cta-bg cta-grid relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-y border-slate-100">

        {/* ── Decorative blobs (Softened for light mode) ── */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 w-[420px] h-[420px] rounded-full bg-teal-100/60 blur-[100px]" />

        {/* ── Floating dots (Colors adjusted for white bg) ── */}
        <Dot style={{ top: '12%', left: '7%', width: 10, height: 10, background: '#0284c725' }} className="dot-a" />
        <Dot style={{ top: '70%', left: '3%', width: 6, height: 6, background: '#0d948825' }} className="dot-b" />
        <Dot style={{ top: '20%', right: '6%', width: 14, height: 14, background: '#4f46e525' }} className="dot-c" />
        <Dot style={{ bottom: '15%', right: '12%', width: 8, height: 8, background: '#0284c725' }} className="dot-a" />

        <div className="relative z-10 container mx-auto px-4 lg:px-10 max-w-5xl">

          {/* ── Eyebrow ── */}
          <div className="flex justify-center mb-7" style={fade(0)}>
            <span className="inline-flex items-center gap-2 border border-emerald-200
                             bg-emerald-50 text-emerald-700 text-xs font-bold
                             uppercase tracking-widest px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 cta-ring" />
              Available 24 × 7 for Emergencies
            </span>
          </div>

          {/* ── Headline ── */}
          <h2
            className="text-center text-4xl md:text-5xl xl:text-6xl font-black text-slate-900
                       leading-[1.07] tracking-tight mb-6 max-w-3xl mx-auto"
            style={fade(80)}
          >
            Ready to Take Charge{' '}
            <span className="font-['Instrument_Serif',serif] italic font-normal cta-grad">
              of Your Health?
            </span>
          </h2>

          {/* ── Sub-copy ── */}
          <p className="text-center text-slate-600 text-lg leading-relaxed max-w-xl mx-auto mb-12"
             style={fade(160)}>
            Book an appointment today and experience healthcare that puts you first —
            compassionate, expert care from day one.
          </p>

          {/* ── CTA BUTTONS ── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
               style={fade(240)}>

            {/* Primary — Book */}
            <a href="/appointment"
               className="group relative inline-flex items-center gap-3 overflow-hidden
                          bg-blue-600 hover:bg-blue-700 text-white font-bold
                          px-9 py-4 rounded-2xl shadow-lg shadow-blue-600/20
                          hover:shadow-blue-600/30 hover:-translate-y-1
                          active:scale-95 transition-all duration-300 text-base">
              <span className="absolute inset-0 cta-shimmer pointer-events-none" />
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Book Appointment
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>

            {/* Secondary — Call */}
            <a href={`tel:${SITE?.phone || '1-800-123-4567'}`}
               className="group inline-flex items-center gap-3
                          border-2 border-slate-200 hover:border-blue-600
                          text-slate-700 hover:text-blue-700 font-bold
                          px-9 py-4 rounded-2xl bg-white hover:bg-slate-50
                          active:scale-95 transition-all duration-300 text-base">
              <span className="relative flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50
                               border border-emerald-200 flex items-center justify-center cta-ring">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </span>
              Call {SITE?.phone || 'Us Now'}
            </a>

          </div>

          {/* ── STATS DIVIDER ROW ── */}
          {/* <div
            className="flex flex-wrap items-center justify-center gap-8 md:gap-0
                       border-t border-slate-200 pt-12"
            style={fade(340)}
          >
            {[
              { target: 60,  suffix: '+',  label: 'Expert Doctors', delay: 400  },
              { target: 15,  suffix: '+',  label: 'Years of Trust', delay: 500  },
              { target: 100, suffix: 'K+', label: 'Patients Served',delay: 600  },
              { target: 20,  suffix: '+',  label: 'Specialties',    delay: 700  },
            ].map((s, i, arr) => (
              <div key={s.label} className="flex items-center gap-8 md:gap-0">
                <Counter {...s} inView={inView} />
                {i < arr.length - 1 && (
                  <div className="cta-div hidden md:block mx-10" />
                )}
              </div>
            ))}
          </div> */}

          {/* ── Trust badges ── */}
          <div className="flex flex-wrap justify-center items-center gap-5 mt-10 pt-2 border-t border-slate-200"
               style={fade(420)}>
            {[
              { icon: '✅', label: 'NABH Accredited' },
              { icon: '🔬', label: 'NABL Lab'        },
              { icon: '🛡️', label: 'ISO Certified'   },
              { icon: '🏆', label: 'Award Winning'   },
            ].map(({ icon, label }) => (
              <span key={label}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800
                               text-xs font-semibold uppercase tracking-wider transition-colors duration-200">
                <span className="text-sm">{icon}</span>{label}
              </span>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}