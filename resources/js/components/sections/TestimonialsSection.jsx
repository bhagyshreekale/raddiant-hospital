'use client';

import { useEffect, useRef, useState } from 'react';

const TESTIMONIALS = [
  {
    id: 1, name: 'Priya Sharma', initials: 'PS', role: 'Cardiac Patient',
    dept: 'Cardiology', from: '#8b5cf6', to: '#a78bfa',
    avFrom: '#3C3489', avTo: '#7F77DD', stars: 5,
    text: 'The cardiology team at Raddiant Plus gave me my life back. From diagnosis to surgery, everything was handled with incredible precision and warmth. I felt safe every step of the way.',
  },
  {
    id: 2, name: 'Rajan Mehta', initials: 'RM', role: 'Orthopaedic Surgery',
    dept: 'Orthopaedics', from: '#0ea5e9', to: '#38bdf8',
    avFrom: '#0C447C', avTo: '#378ADD', stars: 5,
    text: 'After my knee replacement, the physiotherapy team guided me through recovery so patiently. I was back to walking without pain in just six weeks. Truly world-class care.',
  },
  {
    id: 3, name: 'Anita Kulkarni', initials: 'AK', role: 'Maternity Patient',
    dept: 'Obstetrics', from: '#ec4899', to: '#f472b6',
    avFrom: '#72243E', avTo: '#D4537E', stars: 5,
    text: 'Delivering my daughter at Raddiant Plus was a beautiful experience. The nursing staff were like family — attentive, kind, and always present. The facilities are spotless and modern.',
  },
  {
    id: 4, name: 'Deepak Joshi', initials: 'DJ', role: 'Cancer Survivor',
    dept: 'Oncology', from: '#10b981', to: '#34d399',
    avFrom: '#085041', avTo: '#1D9E75', stars: 5,
    text: 'Three years in remission and I owe it all to the oncology team. They were honest about my diagnosis, compassionate in treatment, and celebrated every milestone alongside me.',
  },
  {
    id: 5, name: 'Sunita Patil', initials: 'SP', role: 'Diabetes Management',
    dept: 'Endocrinology', from: '#f59e0b', to: '#fbbf24',
    avFrom: '#633806', avTo: '#BA7517', stars: 5,
    text: 'Managing Type 2 diabetes felt overwhelming until I joined the wellness programme here. The dietitian and endocrinologist work as one team. My HbA1c has dropped dramatically.',
  },
  {
    id: 6, name: 'Vikram Nair', initials: 'VN', role: 'Emergency Patient',
    dept: 'Emergency', from: '#ef4444', to: '#f87171',
    avFrom: '#791F1F', avTo: '#E24B4A', stars: 5,
    text: 'Brought in at midnight with severe chest pain, I was triaged within minutes. The emergency response here is genuinely life-saving. Cannot thank the team enough.',
  },
  {
    id: 7, name: 'Meera Desai', initials: 'MD', role: 'Paediatrics Parent',
    dept: 'Paediatrics', from: '#06b6d4', to: '#22d3ee',
    avFrom: '#0C447C', avTo: '#185FA5', stars: 5,
    text: 'Our son was admitted with dengue and the paediatric team monitored him round the clock. The doctors explained every step calmly. He recovered fully in five days.',
  },
  {
    id: 8, name: 'Arun Bhosale', initials: 'AB', role: 'Neurology Patient',
    dept: 'Neurology', from: '#8b5cf6', to: '#c084fc',
    avFrom: '#26215C', avTo: '#534AB7', stars: 5,
    text: 'After my stroke, the neurologist and rehab team designed a personalised recovery plan. Six months later I am back at work. This hospital is truly exceptional.',
  },
];

const RATING_BARS = [
  { label: 'Overall care', val: '4.9', pct: 97 },
  { label: 'Cleanliness',  val: '4.8', pct: 95 },
  { label: 'Wait time',    val: '4.4', pct: 88 },
  { label: 'Staff',        val: '5.0', pct: 99 },
];

function StarIcon({ filled }) {
  return (
    <svg viewBox="0 0 14 14" width="14" height="14">
      <path
        fill={filled ? '#f59e0b' : 'rgba(255,255,255,0.18)'}
        d="M7 .5l1.67 3.39 3.74.54-2.7 2.64.64 3.72L7 9.01 4.65 10.79l.64-3.72L2.59 4.43l3.74-.54z"
      />
    </svg>
  );
}

function TestimonialCard({ t, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 80);
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
      ref={ref}
      className="group relative flex flex-col rounded-[22px] overflow-hidden
                 border border-white/[0.09] bg-white/[0.04]
                 p-6 gap-4 cursor-default
                 hover:bg-white/[0.08] hover:-translate-y-1.5
                 transition-all duration-500 ease-out"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(36px) scale(0.97)',
        transition: `opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1),
                     background .3s, box-shadow .3s`,
      }}
    >
      {/* Top accent bar */}
      <span
        className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0
                   group-hover:scale-x-100 transition-transform duration-500 rounded-t-[22px]"
        style={{ background: `linear-gradient(90deg, ${t.from}, ${t.to})` }}
      />

      {/* Dept badge */}
      <span
        className="absolute top-5 right-5 text-[9px] font-bold uppercase tracking-wider
                   px-2.5 py-1 rounded-full"
        style={{
          background: `${t.from}22`, color: t.to,
          border: `1px solid ${t.from}44`,
        }}
      >
        {t.dept}
      </span>

      {/* Quote mark */}
      <div className="text-4xl leading-none text-white/10 group-hover:text-white/20
                      transition-colors duration-300 font-serif select-none">
        "
      </div>

      {/* Stars */}
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < t.stars} />)}
      </div>

      {/* Text */}
      <p className="text-[13.5px] leading-relaxed text-white/55 flex-1 italic
                    group-hover:text-white/78 transition-colors duration-300">
        {t.text}
      </p>

      <hr className="border-none h-px bg-white/[0.07] m-0" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center
                     text-[13px] font-black text-white shrink-0"
          style={{ background: `linear-gradient(135deg, ${t.avFrom}, ${t.avTo})` }}
        >
          {t.initials}
        </div>
        <div>
          <div className="text-[13px] font-black text-white leading-tight">{t.name}</div>
          <div className="text-[11px] text-white/38 mt-0.5 tracking-wide">{t.role}</div>
        </div>
      </div>
    </article>
  );
}

function RatingBar({ label, val, pct, animate }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] text-white/35 w-24 text-right shrink-0">{label}</span>
      <div className="flex-1 h-1 bg-white/[0.08] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: animate ? `${pct}%` : '0%',
            background: 'linear-gradient(90deg, #8b5cf6, #38bdf8)',
            transition: 'width 1.3s cubic-bezier(.22,1,.36,1)',
          }}
        />
      </div>
      <span className="text-[11px] font-black text-white/50 w-7 shrink-0">{val}</span>
    </div>
  );
}

export default function TestimonialsSection() {
  const footerRef = useRef(null);
  const [footerIn, setFooterIn] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFooterIn(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;700;900&display=swap');
        .ts-section { font-family: 'Sora', sans-serif; }
        .ts-bg {
          background: #06101f;
          background-image:
            radial-gradient(ellipse 75% 50% at 100% 0%, #1e1040 0%, transparent 55%),
            radial-gradient(ellipse 55% 45% at 0% 100%, #0c3060 0%, transparent 55%);
        }
        .ts-grid-lines {
          background-image:
            linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
          background-size: 52px 52px;
        }
        @keyframes ts-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(167,139,250,.55); }
          50%      { box-shadow: 0 0 0 8px rgba(167,139,250,0); }
        }
        .ts-pulse { animation: ts-pulse 2.4s ease-in-out infinite; }
        .ts-grad {
          background: linear-gradient(135deg, #c4b5fd 0%, #818cf8 45%, #38bdf8 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
      `}</style>

      <section className="ts-section ts-bg ts-grid-lines relative overflow-hidden py-20 md:py-32">

        {/* Orbs */}
        <div className="pointer-events-none absolute -top-24 -right-20 w-[400px] h-[400px]
                        rounded-full bg-violet-600/[0.09] blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 w-[320px] h-[320px]
                        rounded-full bg-sky-600/[0.08] blur-[80px]" />

        <div className="relative container mx-auto px-4 lg:px-10 max-w-7xl">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-14">
            <div className="inline-flex items-center gap-2 border border-violet-500/35
                           bg-violet-500/12 text-violet-300 text-[11px] font-bold
                           uppercase tracking-[0.12em] px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-violet-400 rounded-full ts-pulse" />
              Patient Stories
            </div>

            <h2 className="text-4xl md:text-5xl xl:text-[3.2rem] font-black text-white
                           leading-[1.08] tracking-tight mb-4 max-w-2xl">
              What Our{' '}
              <span className="font-['Georgia',serif] italic font-normal ts-grad">Patients</span>
              {' '}Say
            </h2>

            <p className="text-white/48 text-[15px] leading-relaxed max-w-md">
              Thousands of families trust Raddiant Plus for their healthcare needs.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-14">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.id} t={t} index={i} />
            ))}
          </div>

          {/* Footer */}
          <div
            ref={footerRef}
            className="flex flex-col items-center gap-3 text-center"
            style={{
              opacity:   footerIn ? 1 : 0,
              transform: footerIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity .7s ease, transform .7s ease',
            }}
          >
            {/* Big stars */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" width="22" height="22">
                  <path fill="#f59e0b"
                    d="M10 1l2.39 4.84 5.35.78-3.87 3.77.91 5.32L10 13.27l-4.78 2.44.91-5.32L2.26 6.62l5.35-.78z"/>
                </svg>
              ))}
            </div>

            <p className="text-[13px] text-white/45">
              <span className="font-black text-white">4.9 / 5</span> average rating from 2,000+ patient reviews
            </p>

            {/* Rating bars */}
            <div className="mt-4 w-full max-w-xs flex flex-col gap-2.5">
              {RATING_BARS.map(b => (
                <RatingBar key={b.label} {...b} animate={footerIn} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}