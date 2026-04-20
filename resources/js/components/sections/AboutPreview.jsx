'use client';

import React from 'react';

export default function AboutPreview() {
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
    <section className="overflow-hidden bg-slate-50 py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16 xl:gap-20">
          
          {/* —— Left Column: Content —— */}
          <div className="w-full lg:w-1/2">
            {/* Animated pill label */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-sky-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-700 md:text-[11px]">
                About Raddiant Plus
              </span>
            </div>

            <h2 className="mb-4 font-serif text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
              Healthcare Excellence in the Heart of Nashik
           
            </h2>

            {/* Animated underline */}
            <div className="mb-6 h-[3px] w-14 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" />

            <div className="space-y-4 text-gray-700">
              <p className="text-base leading-relaxed md:text-lg">
                Raddiant Plus Hospital delivers comprehensive hospital and diagnostic care 
                in a state-of-the-art hub. As part of the{' '}
                <strong className="font-bold text-gray-900 underline decoration-sky-200 decoration-[3px] underline-offset-2">
                  NABH-compliant Raddiant Group
                </strong>, we are committed to providing high-quality healthcare.
              </p>
              <p className="text-sm leading-relaxed text-gray-500 md:text-base">
                Our multispecialty facility brings together 60+ experienced doctors across 
                20+ specialties, ensuring seamless care for every patient under one roof.
              </p>
            </div>

            {/* Stats grid */}
            <div className="my-8 grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map(([label, icon], i) => (
                <div
                  key={label}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100 md:rounded-2xl md:p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-xl transition-transform duration-300 group-hover:scale-110 md:h-12 md:w-12 md:rounded-xl">
                    {icon}
                  </span>
                  <span className="text-xs font-bold text-slate-700 md:text-sm">{label}</span>
                </div>
              ))}
            </div>

            <a
              href="/about"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-700/25 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-800 hover:shadow-xl active:scale-95 sm:w-auto md:text-base"
            >
              Learn More About Us
              <span className="text-lg">→</span>
            </a>
          </div>

          {/* —— Right Column: Card —— */}
          <div className="relative mt-8 w-full sm:px-4 lg:mt-0 lg:w-1/2">
            
            {/* Soft glow behind card */}
            <div className="absolute -inset-4 -z-10 animate-pulse rounded-[2.5rem] bg-sky-100/60 blur-2xl md:-inset-6" />

            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-900 via-cyan-600 to-teal-600 p-8 shadow-2xl md:p-12">
              
              {/* Decorative Floating orbs */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/[0.06] blur-xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/[0.04] blur-lg" />

              <h3 className="relative z-10 mb-8 font-serif text-2xl font-bold text-white md:text-3xl">
                Our Promise to You
              </h3>

              <ul className="relative z-10 space-y-5">
                {promises.map((item, i) => (
                  <li
                    key={i}
                    className="group flex items-start gap-4"
                  >
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[10px] text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-emerald-400/40">
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
            <div className="absolute -right-2 -top-6 rotate-6 cursor-default rounded-2xl border-[4px] border-slate-50 bg-gradient-to-br from-orange-500 to-orange-600 p-4 text-center shadow-2xl transition-transform duration-500 hover:rotate-0 md:-right-8 md:-top-10 md:rounded-3xl md:border-[6px] md:p-7">
              <div className="text-2xl font-black leading-none text-white drop-shadow md:text-5xl">
                15+
              </div>
              <div className="mt-1 text-[8px] font-black uppercase tracking-widest text-white/90 md:mt-2 md:text-[10px]">
                Years of Trust
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}