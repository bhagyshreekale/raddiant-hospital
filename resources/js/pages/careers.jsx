// app/careers/page.jsx
import JobListingsClient from '../components/sections/JobListingsClient';
import { PERKS, STATS } from '../lib copy/careersData';
import { FaEnvelope, FaPhoneAlt, FaUserMd, FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/design/FloatingActions'
export const metadata = {
  title: 'Careers | Raddiant Plus Hospital',
  description: 'Join the Raddiant Plus Hospital team in Nashik. Explore open positions in clinical, nursing, radiology, administration, and more.',
};

export default function CareersPage() {
  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-white">
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative bg-gradient-to-br from-blue-700 to-blue-600 py-24 px-4 overflow-hidden">
        {/* Animated Background Rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[300, 460, 600].map((size, i) => (
            <div
              key={i}
              className="absolute top-1/2 -right-16 -translate-y-1/2 rounded-full border border-white/15 animate-pulse"
              style={{ 
                width: size, 
                height: size, 
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i}s` 
              }}
            />
          ))}
          {/* Dot Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:28px_28px]" />
        </div>

        <div className="container relative z-10 mx-auto">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest mb-6">
              <FaUserMd className="text-blue-300" />
              We’re Hiring
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Build a Career That <br />
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Saves Lives
              </span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Join Raddiant Plus Hospital's growing team of 350+ healthcare professionals 
              dedicated to compassionate care in Nashik.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#open-positions" className="flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold transition-all hover:shadow-xl hover:shadow-blue-900/20 active:scale-95">
                View Open Positions <FaArrowRight className="text-sm" />
              </a>
              <a href="mailto:careers@raddiantplus.com" className="px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-colors">
                Send Your CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. STATS BAR ─── */}
      <section className="bg-blue-600 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center group">
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 transition-colors group-hover:text-amber-300">
                  {s.value}
                </div>
                <div className="text-blue-100 text-xs font-bold uppercase tracking-widest opacity-70">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. WHY JOIN US ─── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-16">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">Life at Raddiant Plus</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Why Work With Us?</h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map((perk, i) => (
              <div 
                key={perk.title} 
                className="bg-white p-8 rounded-3xl border border-slate-200 text-left transition-all hover:shadow-xl hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">
                  {perk.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-3">{perk.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. OPEN POSITIONS ─── */}
      <section id="open-positions" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">Opportunities</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">Current Openings</h2>
            <p className="text-slate-500 mt-4 max-w-lg">
              Filter by department and click Apply Now to submit your application directly.
            </p>
          </div>
          <JobListingsClient />
        </div>
      </section>

      {/* ─── 5. WALK-IN CTA ─── */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest">
                Don't See a Fit?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">
                Send Us a General Application
              </h2>
              <p className="text-white/60 text-lg">
                We're always looking for passionate healthcare professionals. Drop your CV 
                and we'll reach out when a suitable opening arises.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <a href="mailto:careers@raddiantplus.com" className="group flex items-center gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/20">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Email HR</p>
                  <p className="text-white font-bold group-hover:text-blue-400 transition-colors">careers@raddiantplus.com</p>
                </div>
              </a>

              {/* Phone */}
              <a href="tel:+911234567890" className="group flex items-center gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Call HR Dept</p>
                  <p className="text-white font-bold group-hover:text-emerald-400 transition-colors">+91 123 456 7890</p>
                </div>
              </a>

              {/* Walk-in Box */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                <p className="text-sm text-white/60 leading-relaxed">
                  🏢 <strong className="text-white/90">Walk-in interviews</strong> every 
                  Saturday 10:00 AM – 1:00 PM at the HR Department, Ground Floor, 
                  Raddiant Plus Hospital, Nashik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <FloatingActions/>
    <Footer/>
    </>
  );
}