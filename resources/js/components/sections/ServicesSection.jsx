'use client';

import { useEffect, useRef, useState } from 'react';
import ServiceCard from '../design/ServiceCard';
import SectionHeader from '../design/SectionHeader';
import { SERVICES } from '../../lib copy/data';

/* ────────────────────────────────────────────────
   Filter tags (derive from SERVICES or define manually)
─────────────────────────────────────────────── */
const FILTERS = ['All', 'Diagnostics', 'Surgery', 'Specialty', 'Emergency'];

export default function ServicesSection({ services = [] }) {
  // Use database services if available, otherwise use static data
  const displayServices = services.length > 0 ? services : SERVICES;
  
  const sectionRef = useRef(null);
  const [inView, setInView]       = useState(false);
  const [active, setActive]       = useState('All');
  const [visible, setVisible]     = useState([]);

  /* Intersection observer for fade-in trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* Stagger cards into view */
  useEffect(() => {
    if (!inView) return;
    displayServices.forEach((_, i) => {
      setTimeout(() => setVisible(prev => [...prev, i]), i * 80);
    });
  }, [inView, displayServices]);

  /* Filter logic */
  const filtered = active === 'All'
    ? displayServices
    : displayServices.filter(s => s.category === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

        .srv-section { font-family: 'Sora', sans-serif; }

        /* mesh bg */
        .srv-mesh {
          background-color: #ffffff;
          background-image:
            radial-gradient(ellipse 70% 50% at 10%  0%,  rgba(14,165,233,.07) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 100%, rgba(16,185,129,.06) 0%, transparent 55%);
        }

        /* card stagger */
        .srv-card-wrap { opacity: 0; transform: translateY(28px); transition: opacity .5s ease, transform .5s ease; }
        .srv-card-wrap.srv-in { opacity: 1; transform: translateY(0); }

        /* filter pill */
        .srv-pill {
          border: 1.5px solid #e2e8f0;
          color: #64748b;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: .07em;
          text-transform: uppercase;
          padding: 0.45rem 1.1rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all .22s ease;
          background: white;
        }
        .srv-pill:hover { border-color: #0ea5e9; color: #0ea5e9; background: #f0f9ff; }
        .srv-pill.srv-pill-active {
          background: #0ea5e9;
          border-color: #0ea5e9;
          color: white;
          box-shadow: 0 4px 14px rgba(14,165,233,.35);
        }

        /* eyebrow */
        @keyframes pulseRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(14,165,233,.45); }
          50%       { box-shadow: 0 0 0 8px rgba(14,165,233,0); }
        }
        .srv-pulse { animation: pulseRing 2.5s ease-in-out infinite; }

        /* gradient text */
        .srv-grad {
          background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 60%, #14b8a6 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* grid responsive */
        .srv-grid {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px)  { .srv-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .srv-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1280px) { .srv-grid { grid-template-columns: repeat(4, 1fr); } }
      `}</style>

      <section ref={sectionRef} className="srv-section srv-mesh py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-10 max-w-7xl">

          {/* ── HEADER ── */}
          <div className="flex flex-col items-center text-center mb-14">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200
                            text-sky-700 text-xs font-bold uppercase tracking-widest
                            px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-sky-500 rounded-full srv-pulse" />
              Our Specialties
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-black text-slate-900
                           leading-[1.08] tracking-tight mb-5 max-w-3xl">
              Comprehensive{' '}
              <span className="font-[serif] italic font-normal srv-grad">
                Multispecialty
              </span>
              {' '}Care
            </h2>

            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
              From advanced diagnostics to complex surgeries — all under one
              NABH-accredited roof in Nashik.
            </p>
          </div>

          {/* ── FILTER PILLS ── */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`srv-pill ${active === f ? 'srv-pill-active' : ''}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* ── SERVICES GRID ── */}
          <div className="srv-grid">
            {filtered.map((s, i) => (
              <div
                key={s.id}
                className={`srv-card-wrap ${visible.includes(i) ? 'srv-in' : ''}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <ServiceCard service={s} />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}