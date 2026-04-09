'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE } from '../../lib copy/data';

/* ── Floating particle dot ──────────────────────────────── */
function Dot({ style }) {
  return (
    <span
      className="absolute rounded-full pointer-events-none"
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
      <span className="text-3xl md:text-4xl font-black text-white leading-none tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-xs font-bold text-white/45 uppercase tracking-widest mt-1.5">
        {label}
      </span>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────── */
export default function CTABanner() {
  const ref   = useRef(null);
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
    opacity:    inView ? 1 : 0,
    transform:  inView ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');
        .cta-section { font-family: 'Sora', sans-serif; }

        /* Rich dark-teal mesh bg */
        .cta-bg {
          background-color: #030d1a;
          background-image:
            radial-gradient(ellipse 90% 65% at  0%   0%, #0c2a5e 0%, transparent 55%),
            radial-gradient(ellipse 70% 60% at 100% 100%, #043d2e 0%, transparent 55%),
            radial-gradient(ellipse 50% 45% at  50%  50%, #071830 0%, transparent 65%);
        }

        /* grid overlay */
        .cta-grid {
          background-image:
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        /* gradient headline */
        .cta-grad {
          background: linear-gradient(135deg, #38bdf8 0%, #818cf8 45%, #34d399 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* divider */
        .cta-div { width: 1px; background: rgba(255,255,255,.12); align-self: stretch; }

        /* pulse ring on phone icon */
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,.5); }
          50%       { box-shadow: 0 0 0 10px rgba(52,211,153,0); }
        }
        .cta-ring { animation: ctaPulse 2.4s ease-in-out infinite; }

        /* floating dots */
        @keyframes floatA { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-18px) scale(1.1)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(12px)  scale(0.9)} }
        .dot-a { animation: floatA 6s ease-in-out infinite; }
        .dot-b { animation: floatB 8s ease-in-out infinite; }
        .dot-c { animation: floatA 10s ease-in-out infinite reverse; }

        /* shimmer on primary btn */
        @keyframes shimmer {
          0%  { background-position: -200% center; }
          100%{ background-position:  200% center; }
        }
        .cta-shimmer {
          background: linear-gradient(90deg,
            rgba(255,255,255,0) 0%, rgba(255,255,255,.18) 50%, rgba(255,255,255,0) 100%);
          background-size: 200% 100%;
          animation: shimmer 2.8s linear infinite;
        }
      `}</style>

      <section ref={ref} className="cta-section cta-bg cta-grid relative overflow-hidden py-20 md:py-32">

        {/* ── Decorative blobs ── */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-sky-700/10 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 w-[420px] h-[420px] rounded-full bg-emerald-700/10 blur-[110px]" />

        {/* ── Floating dots ── */}
        <Dot style={{ top: '12%', left: '7%', width: 10, height: 10, background: '#38bdf822' }}
             className="dot-a" />
        <Dot style={{ top: '70%', left: '3%', width: 6, height: 6, background: '#34d39922' }}
             className="dot-b" />
        <Dot style={{ top: '20%', right: '6%', width: 14, height: 14, background: '#818cf822' }}
             className="dot-c" />
        <Dot style={{ bottom: '15%', right: '12%', width: 8, height: 8, background: '#38bdf822' }}
             className="dot-a" />

        <div className="relative z-10 container mx-auto px-4 lg:px-10 max-w-5xl">

          {/* ── Eyebrow ── */}
          <div className="flex justify-center mb-7" style={fade(0)}>
            <span className="inline-flex items-center gap-2 border border-emerald-500/30
                             bg-emerald-500/10 text-emerald-300 text-xs font-bold
                             uppercase tracking-widest px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 cta-ring" />
              Available 24 × 7 for Emergencies
            </span>
          </div>

          {/* ── Headline ── */}
          <h2
            className="text-center text-4xl md:text-5xl xl:text-6xl font-black text-white
                       leading-[1.07] tracking-tight mb-6 max-w-3xl mx-auto"
            style={fade(80)}
          >
            Ready to Take Charge{' '}
            <span className="font-['Instrument_Serif',serif] italic font-normal cta-grad">
              of Your Health?
            </span>
          </h2>

          {/* ── Sub-copy ── */}
          <p className="text-center text-white/55 text-lg leading-relaxed max-w-xl mx-auto mb-12"
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
                          bg-sky-500 hover:bg-sky-400 text-white font-black
                          px-9 py-4 rounded-2xl shadow-xl shadow-sky-500/30
                          hover:shadow-sky-400/40 hover:-translate-y-1
                          active:scale-95 transition-all duration-300 text-base">
              <span className="absolute inset-0 cta-shimmer pointer-events-none" />
              {/* Calendar icon */}
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
            <a href={`tel:${SITE.phone}`}
               className="group inline-flex items-center gap-3
                          border-2 border-white/20 hover:border-emerald-400/60
                          text-white/80 hover:text-white font-bold
                          px-9 py-4 rounded-2xl hover:bg-white/5
                          active:scale-95 transition-all duration-300 text-base">
              {/* Phone icon with pulse ring */}
              <span className="relative flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/15
                               border border-emerald-400/30 flex items-center justify-center cta-ring">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </span>
              Call {SITE.phone}
            </a>

          </div>

          {/* ── STATS DIVIDER ROW ── */}
          <div
            className="flex flex-wrap items-center justify-center gap-8 md:gap-0
                       border-t border-white/10 pt-12"
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
          </div>

          {/* ── Trust badges ── */}
          <div className="flex flex-wrap justify-center items-center gap-5 mt-10 pt-8 border-t border-white/10"
               style={fade(420)}>
            {[
              { icon: '✅', label: 'NABH Accredited' },
              { icon: '🔬', label: 'NABL Lab'        },
              { icon: '🛡️', label: 'ISO Certified'   },
              { icon: '🏆', label: 'Award Winning'   },
            ].map(({ icon, label }) => (
              <span key={label}
                    className="inline-flex items-center gap-2 text-white/40 hover:text-white/70
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
