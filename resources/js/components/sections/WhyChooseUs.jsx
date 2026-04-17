'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { USPS } from '../../lib copy/data';

const ICON_MAP = {
  FaClock:      { emoji: '⏰', from: '#0ea5e9', to: '#38bdf8' },
  FaUserMd:     { emoji: '👨‍⚕️', from: '#8b5cf6', to: '#a78bfa' },
  FaMicroscope: { emoji: '🔬', from: '#10b981', to: '#34d399' },
  FaShieldAlt:  { emoji: '🛡️', from: '#f59e0b', to: '#fbbf24' },
  FaHeartbeat:  { emoji: '❤️', from: '#ef4444', to: '#f87171' },
  FaParking:    { emoji: '🏢', from: '#06b6d4', to: '#22d3ee' },
};
const DEFAULT_META = { emoji: '✅', from: '#0ea5e9', to: '#38bdf8' };

/* ── USP Card ── */
function UspCard({ usp, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const meta = ICON_MAP[usp.icon] ?? DEFAULT_META;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // stagger each card by its index
          setTimeout(() => setVisible(true), index * 90);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <article
      ref={cardRef}
      className="usp-card group relative flex flex-col h-full rounded-3xl overflow-hidden
                 border border-white/10 bg-white/5 backdrop-blur-md
                 hover:-translate-y-2 hover:bg-white/[0.09]
                 transition-all duration-500 ease-out cursor-default"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
        transition: `opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1),
                     box-shadow .3s ease, background .3s ease`,
      }}
    >
      {/* Glow blob */}
      <div
        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-500 -z-10 blur-xl"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${meta.from}33 0%, transparent 70%)` }}
      />

      {/* Animated top border */}
      <span
        className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0
                   group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-t-3xl"
        style={{ background: `linear-gradient(90deg, ${meta.from}, ${meta.to})` }}
      />

      <div className="relative flex flex-col flex-1 p-7 md:p-8">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6
                     transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
          style={{ background: `linear-gradient(135deg, ${meta.from}30, ${meta.to}20)`,
                   border: `1px solid ${meta.from}40` }}
        >
          {meta.emoji}
        </div>

        <span
          className="absolute top-7 right-7 text-[0.65rem] font-black tabular-nums
                     opacity-20 group-hover:opacity-50 transition-opacity duration-300"
          style={{ color: meta.to, letterSpacing: '0.05em' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <h3 className="text-base md:text-lg font-black text-white mb-3 leading-snug">
          {usp.title}
        </h3>

        <p className="text-sm leading-relaxed text-white/55 flex-1 group-hover:text-white/75
                      transition-colors duration-300">
          {usp.desc}
        </p>

        <div
          className="mt-6 h-px origin-left scale-x-0 group-hover:scale-x-100
                     transition-transform duration-500 ease-out rounded-full opacity-40"
          style={{ background: `linear-gradient(90deg, ${meta.from}, transparent)` }}
        />
      </div>
    </article>
  );
}

/* ── Stat pill ── */
function StatPill({ value, label, delay }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setInView(true), delay); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center px-8 py-4 rounded-2xl bg-white/5
                 border border-white/10 backdrop-blur-sm min-w-[120px]"
      style={{
        opacity:   inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity .6s ease, transform .6s ease`,
      }}
    >
      <span className="text-3xl font-black text-white tracking-tight leading-none">{value}</span>
      <span className="text-xs font-semibold text-white/50 uppercase tracking-wider mt-1">{label}</span>
    </div>
  );
}

/* ── Main Section ── */
export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const ctaRef = useRef(null);
  const headRef = useRef(null);
  const [headIn, setHeadIn] = useState(false);
  const [ctaIn, setCtaIn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeadIn(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (headRef.current) obs.observe(headRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setCtaIn(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ctaRef.current) obs.observe(ctaRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');
        .wcu-section { font-family: 'Sora', sans-serif; }
        .wcu-bg {
          background-color: #06101f;
          background-image:
            radial-gradient(ellipse 80% 55% at  0% -10%, #0c3060 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 100% 110%, #063028 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at  50%  50%, #0f2040 0%, transparent 60%);
        }
        .wcu-grid {
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .wcu-grad {
          background: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #34d399 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        @keyframes wcu-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56,189,248,.5); }
          50%       { box-shadow: 0 0 0 9px rgba(56,189,248,0); }
        }
        .wcu-pulse { animation: wcu-pulse 2.5s ease-in-out infinite; }
        .usp-card { will-change: transform, opacity; }
      `}</style>

      <section ref={sectionRef} className="wcu-section wcu-bg wcu-grid relative overflow-hidden py-20 md:py-32">

        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px]
                        rounded-full bg-sky-600/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px]
                        rounded-full bg-emerald-600/10 blur-[100px]" />

        <div className="relative container mx-auto px-4 lg:px-10 max-w-7xl">

          {/* HEADER */}
          <div ref={headRef} className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 border border-sky-500/30 bg-sky-500/10
                           text-sky-300 text-xs font-bold uppercase tracking-widest
                           px-4 py-2 rounded-full mb-7">
              <span className="w-2 h-2 bg-sky-400 rounded-full wcu-pulse" />
              Why Raddiant Plus
            </div>

            <h2
              className="text-4xl md:text-5xl xl:text-6xl font-black text-white
                         leading-[1.06] tracking-tight mb-5 max-w-3xl"
              style={{
                opacity:   headIn ? 1 : 0,
                transform: headIn ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity .7s ease .1s, transform .7s ease .1s',
              }}
            >
              The{' '}
              <span className="font-['Instrument_Serif',serif] italic font-normal wcu-grad">
                Raddiant
              </span>
              {' '}Difference
            </h2>

            <p
              className="text-white/55 text-lg leading-relaxed max-w-xl"
              style={{
                opacity:   headIn ? 1 : 0,
                transform: headIn ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity .7s ease .25s, transform .7s ease .25s',
              }}
            >
              We combine clinical excellence with compassionate care to deliver
              outcomes you can trust — every single time.
            </p>
          </div>

          {/* STATS */}
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            {[
              { value: '60+',  label: 'Specialists', delay: 0   },
              { value: '20+',  label: 'Departments', delay: 100 },
              { value: '15+',  label: 'Years Active', delay: 200 },
              { value: '24/7', label: 'Emergency',   delay: 300 },
            ].map(s => <StatPill key={s.label} {...s} />)}
          </div>

          {/* USP GRID — each card watches itself */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {USPS.map((usp, i) => (
              <UspCard key={usp.title} usp={usp} index={i} />
            ))}
          </div>

          {/* CTA BANNER */}
          <div
            ref={ctaRef}
            className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6
                       rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-7 md:p-9"
            style={{
              opacity:   ctaIn ? 1 : 0,
              transform: ctaIn ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity .7s ease, transform .7s ease',
            }}
          >
            <div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">
                Ready to experience the difference?
              </p>
              <p className="text-white text-xl md:text-2xl font-black leading-snug">
                Book your consultation today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a href="/appointment"
                 className="group inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400
                            text-white font-bold px-8 py-3.5 rounded-2xl
                            shadow-lg shadow-sky-500/30 hover:shadow-sky-400/40
                            hover:-translate-y-0.5 active:scale-95
                            transition-all duration-300 text-sm whitespace-nowrap">
                Book Appointment
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a href="/about"
                 className="inline-flex items-center gap-2 border border-white/20
                            text-white/80 hover:text-white hover:border-white/40
                            font-bold px-8 py-3.5 rounded-2xl hover:bg-white/5
                            active:scale-95 transition-all duration-300 text-sm whitespace-nowrap">
                Learn More
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}