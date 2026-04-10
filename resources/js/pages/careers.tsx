// app/careers/page.jsx
import JobListingsClient from '../components/sections/JobListingsClient';
// import { STATS } from '../lib copy/data';
import { FaEnvelope, FaPhoneAlt, FaUserMd, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FloatingActions from '../components/design/FloatingActions';

export const metadata = {
  title: 'Careers | Raddiant Plus Hospital',
  description:
    'Join the Raddiant Plus Hospital team in Nashik. Explore open positions in clinical, nursing, radiology, administration, and more.',
};

// ── Inline perks — no external data dependency ──
const PERKS = [
  {
    icon: '🏥',
    title: 'Modern Facilities',
    desc: 'State-of-the-art equipment and technology to deliver the highest standard of care.',
  },
  {
    icon: '🎓',
    title: 'Continuous Learning',
    desc: 'Regular CME programs, workshops, and skill-upgrade opportunities for every team member.',
  },
  {
    icon: '💼',
    title: 'Competitive Pay',
    desc: 'Industry-leading compensation packages with performance bonuses and timely increments.',
  },
  {
    icon: '❤️',
    title: 'Health Benefits',
    desc: 'Comprehensive medical, dental and vision coverage extended to you and your family.',
  },
  {
    icon: '🌱',
    title: 'Career Growth',
    desc: 'Structured growth paths with mentorship from senior specialists and leadership programs.',
  },
  {
    icon: '🤝',
    title: 'Inclusive Culture',
    desc: 'A collaborative, respectful workplace where every voice is heard and valued.',
  },
];

const DEFAULT_STATS = [
  { value: '350+', label: 'Team Members' },
  { value: '20+',  label: 'Departments' },
  { value: '15K+', label: 'Patients Served' },
  { value: '4.9★', label: 'Average Rating' },
];

export default function CareersPage() {
  const stats = DEFAULT_STATS;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* ════════════════════════════════════
            1. HERO
        ════════════════════════════════════ */}
        <section className="relative min-h-[70vh] flex items-center bg-[#0A1F44] overflow-hidden">

          {/* Dot-grid texture */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          {/* Glow blobs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-32 left-0 w-[400px] h-[400px] rounded-full bg-sky-500/10 blur-[100px] pointer-events-none" />

          {/* Decorative rings */}
          {[360, 520, 680].map((size, i) => (
            <div
              key={i}
              className="absolute top-1/2 -right-16 -translate-y-1/2 rounded-full border border-white/10 animate-pulse pointer-events-none"
              style={{
                width: size,
                height: size,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${5 + i}s`,
              }}
            />
          ))}

          <div className="relative z-10 container mx-auto px-6 md:px-10 py-28 md:py-36">
            <div className="max-w-2xl">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 text-white/85 text-[11px] font-bold uppercase tracking-[0.14em] px-4 py-2 rounded-full mb-8">
                <FaUserMd className="text-amber-400 text-xs" />
                We're Hiring · Nashik
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-[60px] font-extrabold text-white leading-[1.08] tracking-tight mb-6">
                Build a Career<br />
                That{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400 bg-clip-text text-transparent">
                    Saves Lives
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-2 bg-amber-400/20 rounded-sm pointer-events-none" />
                </span>
              </h1>

              {/* Sub */}
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
                Join Raddiant Plus Hospital's growing team of{' '}
                <strong className="text-white/90 font-semibold">350+ healthcare professionals</strong>{' '}
                dedicated to compassionate care in Nashik.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#open-positions"
                  className="inline-flex items-center gap-2.5 bg-white text-blue-800 px-7 py-4 rounded-2xl font-bold text-sm shadow-2xl shadow-black/30 transition-all duration-200 hover:bg-amber-300 hover:text-blue-900 active:scale-95"
                >
                  View Open Positions <FaArrowRight className="text-xs" />
                </a>
                <a
                  href="mailto:careers@raddiantplus.com"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl border border-white/25 text-white/85 font-bold text-sm hover:bg-white/10 transition-colors duration-200"
                >
                  <FaEnvelope className="text-xs" /> Send Your CV
                </a>
              </div>

              {/* Scroll hint */}
              <div className="mt-14 flex items-center gap-3 text-white/25 text-[10px] font-bold tracking-widest uppercase select-none">
                <div className="w-6 h-px bg-white/25" />
                Scroll to explore
              </div>
            </div>
          </div>

          {/* Floating feature cards — xl screens only */}
          <div className="hidden xl:flex absolute right-24 top-1/2 -translate-y-1/2 flex-col gap-3 z-10">
            {[
              { emoji: '🏥', text: 'State-of-the-art facility' },
              { emoji: '🎓', text: 'Continuous learning' },
              { emoji: '❤️', text: 'Patient-first culture' },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 bg-white/8 border border-white/12 backdrop-blur-md rounded-2xl px-5 py-3.5 text-white/75 text-sm font-medium"
              >
                <span className="text-lg">{item.emoji}</span>
                {item.text}
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            2. STATS BAR
        ════════════════════════════════════ */}
        {/* <section className="bg-gradient-to-r from-blue-700 to-blue-600 py-10 md:py-12">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
              {stats.map((s) => (
                <div key={s.label} className="group flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-extrabold text-white tabular-nums transition-colors duration-200 group-hover:text-amber-300">
                    {s.value}
                  </span>
                  <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-200/65">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ════════════════════════════════════
            3. WHY JOIN US — PERKS CARDS
        ════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">

          {/* Background blob */}
          <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-blue-50 blur-3xl opacity-60 pointer-events-none" />

          <div className="relative z-10 container mx-auto px-6 md:px-10">

            {/* Header */}
            <div className="text-center mb-14 md:mb-16">
              <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Life at Raddiant Plus
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                Why Work With Us?
              </h2>
              <div className="flex justify-center items-center gap-1.5 mb-5">
                <div className="h-1 w-10 rounded-full bg-amber-500" />
                <div className="h-1 w-4 rounded-full bg-amber-300" />
                <div className="h-1 w-2 rounded-full bg-amber-200" />
              </div>
              <p className="text-slate-500 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                More than a job — a mission, a community, and a career that truly matters.
              </p>
            </div>

            {/* Cards grid — 1 col → 2 col → 3 col */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {PERKS.map((perk) => (
                <div
                  key={perk.title}
                  className="group relative bg-white rounded-3xl border border-slate-100 p-7 md:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/60 hover:-translate-y-1.5 hover:border-blue-100 overflow-hidden"
                >
                  {/* Accent dot */}
                  <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-slate-100 group-hover:bg-amber-400 transition-colors duration-300" />

                  {/* Icon box */}
                  <div className="w-14 h-14 bg-blue-50 group-hover:bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-colors duration-200">
                    {perk.icon}
                  </div>

                  {/* Title */}
                  <h4 className="text-[15px] font-bold text-slate-800 mb-2.5 group-hover:text-blue-700 transition-colors duration-200 leading-snug">
                    {perk.title}
                  </h4>

                  {/* Description */}
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {perk.desc}
                  </p>

                  {/* Bottom slide-in accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-sky-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-3xl" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            4. OPEN POSITIONS
        ════════════════════════════════════ */}
        <section id="open-positions" className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-10">

            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">
              <div>
                <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Now Hiring
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Current Openings
                </h2>
                <p className="text-slate-500 mt-3 max-w-md text-sm leading-relaxed">
                  Filter by department and click{' '}
                  <strong className="font-semibold text-slate-700">Apply Now</strong>{' '}
                  to submit your application directly.
                </p>
              </div>
              <a
                href="mailto:careers@raddiantplus.com"
                className="inline-flex shrink-0 items-center gap-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                <FaEnvelope className="text-xs" />
                Email General Application
              </a>
            </div>

            <JobListingsClient />
          </div>
        </section>

        {/* ════════════════════════════════════
            5. WALK-IN / CONTACT CTA
        ════════════════════════════════════ */}
        <section className="py-24 md:py-28 bg-[#060F22] relative overflow-hidden">

          {/* Dot texture */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          {/* Top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-56 bg-blue-600/15 blur-[80px] pointer-events-none" />

          <div className="relative z-10 container mx-auto px-6 md:px-10">

            {/* Header */}
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-white/8 border border-white/12 text-white/50 text-[11px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-5">
                Don't See a Fit?
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                Send a General Application
              </h2>
              <p className="text-white/45 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                We're always looking for passionate healthcare professionals. Drop your CV and we'll reach out when the right role opens up.
              </p>
            </div>

            {/* Contact cards — 1 col → 2 col → 3 col */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">

              {/* Email */}
              <a
                href="mailto:careers@raddiantplus.com"
                className="group flex flex-col gap-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/40 rounded-3xl p-7 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.14em] mb-1.5">
                    Email HR
                  </p>
                  <p className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors break-all">
                    careers@raddiantplus.com
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+911234567890"
                className="group flex flex-col gap-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/40 rounded-3xl p-7 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.14em] mb-1.5">
                    Call HR Dept
                  </p>
                  <p className="text-white font-bold text-sm group-hover:text-emerald-400 transition-colors">
                    +91 123 456 7890
                  </p>
                </div>
              </a>

              {/* Walk-in */}
              <div className="flex flex-col gap-4 bg-amber-500/10 border border-amber-500/20 rounded-3xl p-7">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.14em] mb-1.5">
                    Walk-in Interviews
                  </p>
                  <p className="text-amber-300 font-bold text-sm">Every Saturday</p>
                  <p className="text-white/55 text-[13px] mt-1.5 leading-relaxed">
                    10:00 AM – 1:00 PM<br />
                    HR Dept, Ground Floor<br />
                    Raddiant Plus Hospital, Nashik
                  </p>
                </div>
              </div>
            </div>

            {/* Footer line */}
            <p className="mt-14 text-center text-white/20 text-xs">
              Raddiant Plus Hospital · Nashik, Maharashtra · careers@raddiantplus.com
            </p>
          </div>
        </section>

      </main>
      <FloatingActions />
      <Footer />
    </>
  );
}