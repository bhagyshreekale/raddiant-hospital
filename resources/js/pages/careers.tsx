// app/careers/page.jsx
// import { STATS } from '../lib copy/data';
import { FaEnvelope, FaPhoneAlt, FaUserMd, FaArrowRight, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { FaHospital, FaGraduationCap, FaHeart } from "react-icons/fa";
import FloatingActions from '../components/design/FloatingActions';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import JobListingsClient from '../components/sections/JobListingsClient';

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

 const floatingCards = [
    { icon: <FaHospital />, label: 'Modern Facility', sub: 'State-of-the-art equipment', color: 'from-blue-50 to-blue-100', accent: 'bg-blue-600', iconColor: 'text-blue-600' },
    { icon: <FaGraduationCap />, label: 'Continuous Learning', sub: 'CME & skill programs', color: 'from-emerald-50 to-emerald-100', accent: 'bg-emerald-600', iconColor: 'text-emerald-600' },
    { icon: <FaHeart />, label: 'Care Culture', sub: 'Patient-first values', color: 'from-rose-50 to-rose-100', accent: 'bg-rose-500', iconColor: 'text-rose-500' },
  ];
 
  const stats = [
    { value: '350+', label: 'Professionals' },
    { value: '18+', label: 'Specialties' },
    { value: '12yr', label: 'of Excellence' },
  ];
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* ════════════════════════════════════
            1. HERO
        ════════════════════════════════════ */}
  <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
 
      {/* Decorative geometric background shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="300" r="280" stroke="#1e40af" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="220" stroke="#1e40af" strokeWidth="1" />
          <circle cx="300" cy="300" r="160" stroke="#1e40af" strokeWidth="0.5" />
        </svg>
      </div>
 
      {/* Top-right accent blob */}
      <div className="absolute -top-16 right-0 w-[480px] h-[420px] rounded-full bg-gradient-to-bl from-blue-100/60 to-sky-50/40 blur-2xl pointer-events-none" />
 
      {/* Bottom-left blob */}
      <div className="absolute -bottom-24 -left-20 w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-emerald-100/50 to-teal-50/30 blur-2xl pointer-events-none" />
 
      {/* Dot pattern subtle */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #0f172a 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
 
      {/* Thin accent bar at top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-500" />
 
      <div className="relative z-10 container mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
 
          {/* LEFT: Content */}
          <div>
            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-200 text-blue-700 text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-7">
              <FaStar className="text-amber-400 text-[10px]" />
              We're Hiring · Nashik, MH
            </div>
 
            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
              Build a Career{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  That Saves
                </span>
                {/* Underline accent */}
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-gradient-to-r from-green-200 to-green-200 rounded-full -z-0" />
              </span>
              <br />
              <span className="text-slate-800">Lives Every Day.</span>
            </h1>
 
            {/* Sub text */}
            <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Join Raddiant Plus Hospital's growing team of{' '}
              <strong className="text-slate-800 font-semibold">350+ dedicated professionals</strong>{' '}
              who believe exceptional care starts with exceptional people.
            </p>
 
            {/* Stat row */}
            <div className="flex items-center gap-6 mb-10 pb-10 border-b border-slate-200">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-black text-blue-600 leading-none">{s.value}</p>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide mt-1">{s.label}</p>
                </div>
              ))}
              <div className="flex -space-x-2 ml-auto">
                {['bg-blue-400', 'bg-sky-400', 'bg-emerald-400', 'bg-teal-400'].map((c, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center`}>
                    <FaUserMd className="text-white text-[10px]" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-slate-600">
                  +300
                </div>
              </div>
            </div>
 
            {/* CTA buttons */}
            {/* <div className="flex flex-wrap items-center gap-4">
              <a
                href="#open-positions"
                className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 transition-all duration-200 hover:shadow-blue-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                View Open Positions
                <span className="bg-white/20 rounded-lg p-1">
                  <FaArrowRight className="text-[10px]" />
                </span>
              </a>
 
              <a
                href="mailto:careers@raddiantplus.com"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold text-sm hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
              >
                <FaEnvelope className="text-blue-400 text-xs" />
                Send Your CV
              </a>
            </div> */}
 
            {/* Scroll hint */}
            <div className="mt-10 flex items-center gap-3 text-slate-300 text-[10px] font-bold tracking-[0.2em] uppercase">
              <div className="w-8 h-px bg-slate-300" />
              Scroll to explore
            </div>
          </div>
 
          {/* RIGHT: Feature Cards */}
          <div className="hidden lg:flex flex-col gap-5">
 
            {/* Large feature card at top */}
            <div className="relative bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm shadow-slate-100 overflow-hidden">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-50 to-transparent rounded-3xl" />
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200">
                  <FaHospital className="text-white text-lg" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-base mb-1">Modern Facility</p>
                  <p className="text-slate-500 text-sm leading-relaxed">State-of-the-art equipment, 200+ bed capacity, and advanced diagnostic labs across all specialties.</p>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {['ICU', 'NICU', 'Cath Lab', 'OT Suite'].map(tag => (
                      <span key={tag} className="text-[10px] font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full border border-blue-100">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
 
            {/* Two smaller cards side by side */}
            <div className="grid grid-cols-2 gap-5">
              {/* Learning Card */}
              <div className="relative bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm shadow-slate-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-50 to-transparent rounded-3xl" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center mb-4 shadow-md shadow-emerald-100">
                    <FaGraduationCap className="text-white text-sm" />
                  </div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Continuous Learning</p>
                  <p className="text-slate-500 text-xs leading-relaxed">CME credits, workshops & fellowship programs.</p>
                </div>
              </div>
 
              {/* Culture Card */}
              <div className="relative bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm shadow-slate-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-50 to-transparent rounded-3xl" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center mb-4 shadow-md shadow-rose-100">
                    <FaHeart className="text-white text-sm" />
                  </div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Care Culture</p>
                  <p className="text-slate-500 text-xs leading-relaxed">Compassion-driven values with patient-first approach.</p>
                </div>
              </div>
            </div>
 
            {/* Bottom highlight strip */}
            <div className="bg-gradient-to-r from-blue-600 to-sky-500 rounded-3xl p-5 flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-sm">Ready to join us?</p>
                <p className="text-blue-100 text-xs mt-0.5">Multiple roles open across departments</p>
              </div>
              <a
                href="#open-positions"
                className="flex-shrink-0 bg-white text-blue-700 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
              >
                 View Open Positions →
              </a>
            </div>
 
          </div>
        </div>
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
                   +91 93565 10704
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