'use client';

import CTABanner from '../components/sections/CTABanner';
import DoctorsSection from '../components/sections/DoctorsSection';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FloatingActions from '../components/design/FloatingActions';

export default function AboutPage() {
  const stats = [
    ['1,00,000+', 'Patients Served'],
    ['15,000+', 'Surgeries Performed'],
    ['60+', 'Specialists'],
    ['15+', 'Years of Service'],
  ];

  const values = [
    { icon: '❤️', color: 'bg-red-50',    title: 'Compassion',   desc: 'Every patient is treated with dignity, empathy, and genuine concern for their well-being.' },
    { icon: '🔬', color: 'bg-blue-50',   title: 'Excellence',   desc: 'We pursue the highest clinical and service standards through continuous improvement.' },
    { icon: '🛡️', color: 'bg-green-50',  title: 'Integrity',    desc: 'Transparent communication, ethical practice, and trust form the foundation of our care.' },
    { icon: '🤝', color: 'bg-amber-50',  title: 'Collaboration',desc: 'Our multidisciplinary teams work together to deliver integrated, holistic patient care.' },
  ];

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2460] via-green-700 to-green-700 py-20 lg:py-28 text-center">
        {/* Floating orbs */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-80 w-80 animate-[orbFloat_8s_ease-in-out_infinite] rounded-full bg-white/[0.04]" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-52 w-52 animate-[orbFloat_6s_3s_ease-in-out_infinite] rounded-full bg-white/[0.03]" />

        <div className="relative z-10 container mx-auto px-4">
          {/* Pill */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-200">About Us</span>
          </div>

          <h1 className="mx-auto mb-5 font-serif text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            Our Story &amp; Mission
          </h1>
          <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-blue-100/80 md:text-lg">
            Building healthier communities in Nashik through excellence, compassion, and innovation.
          </p>

          {/* Hero stat strip */}
          <div className="flex flex-wrap justify-center gap-3">
            {stats.map(([val, lbl]) => (
              <div
                key={lbl}
                className="min-w-[130px] rounded-2xl border border-white/15 bg-white/8 px-6 py-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/14"
              >
                <div className="font-serif text-2xl font-extrabold text-white">{val}</div>
                <div className="mt-1 text-[11px] font-semibold tracking-wide text-blue-200/75">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">

            {/* Text */}
            <div className="w-full lg:w-1/2">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-blue-700">Who We Are</span>
              </div>
              <h2 className="mb-2 font-serif text-3xl font-extrabold text-slate-900 md:text-4xl">
                Part of the Trusted Raddiant Group
              </h2>
              <div className="mb-6 h-[3px] w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
              <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">
                <p>Raddiant Plus Hospital delivers comprehensive hospital and diagnostic care in a state-of-the-art hub. As part of the <strong className="font-bold text-slate-900">NABH-compliant Raddiant Group</strong>, we are committed to high-quality, patient-centric healthcare.</p>
                <p>Established over 15 years ago, Raddiant Plus has grown to become one of Nashik's most trusted multispecialty hospitals, serving thousands of patients annually across all age groups.</p>
                <p>Our multidisciplinary teams collaborate closely to ensure seamless, holistic care — from first consultation through recovery and follow-up.</p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                {stats.map(([val, lbl]) => (
                  <div
                    key={lbl}
                    className="group rounded-2xl border border-slate-100 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-800 hover:shadow-xl hover:shadow-cyan-100/60"
                  >
                    <div className="font-serif text-3xl font-extrabold text-blue-700 md:text-4xl">{val}</div>
                    <div className="mt-3 text-xs font-semibold tracking-wide text-slate-500">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-10 md:p-16">

            <div className="mb-10 text-center">
              <h2 className="mb-2 font-serif text-3xl font-extrabold text-slate-900 md:text-4xl">Our Core Values</h2>
              <p className="text-sm text-slate-500">The principles that guide every interaction, every day.</p>
              <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map(({ icon, color, title, desc }) => (
                <div
                  key={title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
                >
                  <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-[26px] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${color}`}>
                    {icon}
                  </div>
                  <h3 className="mb-2 text-base font-extrabold text-slate-900">{title}</h3>
                  <p className="text-[13px] leading-relaxed text-slate-500">{desc}</p>
                </div>
              ))}
            </div>

            {/* Inline CTA */}
            <div className="mt-12 flex flex-col items-center justify-between gap-5 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-cyan-700 p-8 sm:flex-row">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Ready to Experience the Raddiant Difference?</h3>
                <p className="mt-1 text-sm text-blue-100/80">Book an appointment with our specialist today.</p>
              </div>
              <a
                href="/book"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-blue-800 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95"
              >
                Book Appointment →
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
      <DoctorsSection />
      <FloatingActions />
      <Footer />
    </>
  );
}