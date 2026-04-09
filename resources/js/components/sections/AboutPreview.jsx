'use client';

import { useEffect, useRef } from 'react';
import SectionHeader from '../design/SectionHeader';

export default function AboutPreview() {
  const promisesRef = useRef(null);

  const stats = [
    ['NABH Compliant', '✅'],
    ['NABL Lab', '🔬'],
    ['60+ Doctors', '👨‍⚕️'],
    ['24×7 Care', '🕐'],
  ];

  const promises = [
    'Compassionate, patient-first care at every step',
    'Transparent pricing with no hidden charges',
    'Evidence-based medicine by experienced specialists',
    'Clean, safe, and comfortable hospital environment',
    'Prompt appointment scheduling and minimal wait times',
  ];

  return (
    <section className="overflow-hidden bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">

          {/* ── Left column ── */}
          <div className="w-full animate-fade-up lg:w-1/2">

            {/* Animated pill label */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-sky-500" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-sky-700">
                About Raddiant Plus
              </span>
            </div>

            <h2 className="mb-2 font-serif text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
              Healthcare Excellence in the Heart of Nashik
            </h2>

            {/* Animated underline */}
            <div className="mb-6 h-[3px] w-14 origin-left animate-scale-x rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" />

            <p className="mb-4 text-[15px] leading-relaxed text-gray-700">
              Raddiant Plus Hospital delivers comprehensive hospital and diagnostic care
              in a state-of-the-art hub. As part of the{' '}
              <strong className="font-bold text-gray-900 underline decoration-sky-200 decoration-[3px] underline-offset-2">
                NABH-compliant Raddiant Group
              </strong>
              , we are committed to providing high-quality healthcare.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-gray-500">
              Our multispecialty facility brings together 60+ experienced doctors across
              20+ specialties, ensuring seamless care for every patient under one roof.
            </p>

            {/* Stats grid */}
            <div className="mb-8 grid grid-cols-2 gap-3">
              {stats.map(([label, icon], i) => (
                <div
                  key={label}
                  style={{ animationDelay: `${i * 80}ms` }}
                  className="group flex animate-fade-up items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-sky-50 text-xl transition-transform duration-300 group-hover:scale-110">
                    {icon}
                  </span>
                  <span className="text-sm font-bold text-slate-700">{label}</span>
                </div>
              ))}
            </div>

            <a
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-700/25 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-800 hover:shadow-xl active:scale-95"
            >
              Learn More About Us
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* ── Right column ── */}
          <div className="relative w-full lg:w-1/2">

            {/* Soft glow behind card */}
            <div className="absolute -inset-6 -z-10 animate-pulse rounded-[2.5rem] bg-sky-100/60 blur-2xl" />

            <div className="relative rounded-[2rem] bg-gradient-to-br from-blue-900 via-blue-700 to-teal-600 p-8 shadow-2xl md:p-12">

              {/* Floating orbs */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 animate-[shimmer_4s_ease-in-out_infinite] rounded-full bg-white/[0.06]" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 animate-[shimmer_4s_2s_ease-in-out_infinite] rounded-full bg-white/[0.04]" />

              <h3 className="relative z-10 mb-8 font-serif text-2xl font-bold text-white md:text-3xl">
                Our Promise to You
              </h3>


              <ul className="relative z-10 space-y-5">
                {promises.map((item, i) => (
                  <li
                    key={i}
                    style={{ animationDelay: `${400 + i * 120}ms` }}
                    className="group flex animate-fade-up items-start gap-4 opacity-0 [animation-fill-mode:forwards]"
                  >
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs backdrop-blur-sm transition-colors duration-300 group-hover:bg-emerald-400/40">
                      ✓
                    </span>
                    <p className="text-sm font-medium leading-snug text-white/90 md:text-base">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Floating trust badge */}
            <div className="absolute -right-4 -top-6 rotate-6 cursor-default rounded-3xl border-[5px] border-slate-50 bg-gradient-to-br from-orange-500 to-orange-600 p-5 text-center shadow-2xl shadow-orange-500/30 transition-transform duration-500 hover:rotate-0 md:-right-8 md:p-7">
              <div className="text-3xl font-black leading-none text-white drop-shadow md:text-5xl">
                15+
              </div>
              <div className="mt-2 text-[9px] font-black uppercase tracking-[0.2em] text-white/85 md:text-[10px]">
                Years of Trust
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}