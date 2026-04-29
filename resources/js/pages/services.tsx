"use client";

import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import type { JSX } from "react";
import FloatingActions from '../components/design/FloatingActions';
import ServiceCard from '../components/design/ServiceCard';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import CTABanner from '../components/sections/CTABanner';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ServiceData {
  id: number;
  title: string;
  image: string;
  desc: string;
  color: string;
}

interface ServicesPageProps {
  services: ServiceData[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const DIAGNOSTIC_TESTS: string[] = [
  '3T MRI Scan', '128-Slice CT', 'Digital X-Ray', 'Colour Doppler USG',
  'Full Pathology', 'ECG & Holter', 'PFT & ABG', 'Bone Densitometry',
];

const radialBgStyle = {
  backgroundColor: '#010b14',
  background: `
    radial-gradient(circle at 20% 30%, rgba(0, 194, 203, 0.4) 0%, transparent 50%), 
    radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 50% 10%, rgba(0, 50, 100, 0.6) 0%, transparent 60%),
    radial-gradient(circle at 10% 90%, rgba(5, 70, 40, 0.5) 0%, transparent 50%),
    linear-gradient(135deg, #001E3C 0%, #052c1a 100%)
  `,
};

// ─── Animation Variants ──────────────────────────────────────────────────────

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const textReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } as Transition,
  },
};
 
const stats = [
  { value: '20+', label: 'Specialties' },
  { value: 'NABH', label: 'Accredited' },
  { value: '350+', label: 'Specialists' },
  { value: '24/7', label: 'Emergency' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 } as Transition,
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 } as Transition,
  },
};



// ─── Component ──────────────────────────────────────────────────────────────

export default function ServicesPage({ services = [] }: ServicesPageProps): JSX.Element {
  return (
    <>

      <Navbar />

  <section className="relative overflow-hidden bg-white pt-20 pb-0 text-center">
 
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-violet-500 to-rose-400" />
 
      {/* Radial light bloom behind heading */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-[radial-gradient(ellipse_at_top,#ede9fe60_0%,transparent_65%)] pointer-events-none" />
 
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #1bd10e 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
 
      {/* Decorative half-ring top-right */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-violet-200/60 opacity-60 pointer-events-none" />
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full border border-violet-200/40 pointer-events-none" />
 
      {/* Decorative half-ring bottom-left */}
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full border border-blue-200/50 pointer-events-none" />
 
      <motion.div
        initial="hidden"
        animate="show"
        variants={heroStagger}
        className="relative z-10 container mx-auto px-4 pb-0"
      >
        {/* Badge */}
        <motion.div variants={textReveal} className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold uppercase tracking-widest px-5 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Our Specialties
          </span>
        </motion.div>
 
        {/* Title */}
        <motion.h1
          variants={textReveal}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.07] mb-5"
        >
          World-Class{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              Medical
            </span>
          </span>
          {' '}Services
        </motion.h1>
 
        {/* Subtitle */}
        <motion.p
          variants={textReveal}
          className="mx-auto max-w-lg text-slate-500 text-base sm:text-lg font-medium leading-relaxed mb-10"
        >
          20+ specialties, advanced diagnostics, and surgical excellence —{' '}
          <span className="text-slate-700 font-semibold">all under one NABH-accredited roof.</span>
        </motion.p>
 
        {/* Stats strip */}
        <motion.div
          variants={textReveal}
          className="inline-flex flex-wrap justify-center gap-0 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden mx-auto mb-0 shadow-sm"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center px-8 py-4 ${
                i !== stats.length - 1 ? 'border-r border-slate-200' : ''
              }`}
            >
              <span className="text-2xl font-black text-sky-600 leading-none">{s.value}</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-1">{s.label}</span>
            </div>
          ))}
        </motion.div>
 
      </motion.div>
 
      {/* Bottom fade */}
      <div className="relative mt-10 h-8 bg-gradient-to-b from-transparent to-slate-50 pointer-events-none" />
    </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, index) => (
              <div key={s.id}>
                <ServiceCard 
                  service={{
                    id: s.id,
                    image: s.image,
                    title: s.title,
                    desc: s.desc,
                    color: s.color,
                  }} 
                  index={index}
                />
              </div>
            ))}
          </div>

          {/* Diagnostics Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-16 overflow-hidden rounded-3xl p-8 text-white shadow-2xl md:p-12 relative group transition-all duration-500 hover:shadow-[0_25px_80px_rgba(0,194,203,0.15)]"
            style={radialBgStyle}
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(0,194,203,0.1)] to-[rgba(16,185,129,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="flex flex-col lg:flex-row gap-10 relative z-10">

              {/* Left: Text Content */}
              <div className="w-full lg:w-7/12">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-3xl font-bold text-white"
                >
                  NABL-Accredited Diagnostic Centre
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-slate-300"
                >
                  Our state-of-the-art diagnostic centre offers the full spectrum of tests with rapid turnaround times,
                  digital reports, and the highest quality standards.
                </motion.p>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {DIAGNOSTIC_TESTS.map((test: string) => (
                    <motion.div
                      key={test}
                      variants={itemVariants}
                      className="flex items-center gap-3 text-sm text-slate-200 font-medium group/item"
                    >
                      <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,194,203,0.8)] group-hover/item:scale-125 transition-transform" />
                      {test}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Right: CTA */}
              <div className="w-full lg:w-5/12 text-center flex flex-col justify-center items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                  className="text-7xl mb-8 drop-shadow-[0_0_25px_rgba(0,194,203,0.3)]"
                >
                  🔬
                </motion.div>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/appointment"
                  className="inline-block bg-white text-[#001E3C] font-bold px-12 py-4 rounded-full shadow-xl transition-all hover:bg-cyan-50"
                >
                  Book a Test
                </motion.a>

                <motion.p className="mt-5 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Reports available online
                </motion.p>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner />
      <FloatingActions />
      <Footer />
    </>
  );
}