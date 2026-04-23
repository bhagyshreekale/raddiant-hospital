"use client";

import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import type { JSX } from "react";
import FloatingActions from '../components/design/FloatingActions';
import ServiceCard from '../components/design/ServiceCard';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import CTABanner from '../components/sections/CTABanner';
import { SERVICES } from '../lib copy/data';

// ─── Types ───────────────────────────────────────────────────────────────────

interface RadialBgStyle {
  backgroundColor: string;
  background: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const DIAGNOSTIC_TESTS: string[] = [
  '3T MRI Scan', '128-Slice CT', 'Digital X-Ray', 'Colour Doppler USG',
  'Full Pathology', 'ECG & Holter', 'PFT & ABG', 'Bone Densitometry',
];

const radialBgStyle: RadialBgStyle = {
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

const textReveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: "easeInOut" } as Transition,
  },
};

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

const heroStagger: Variants = {
  show: { transition: { staggerChildren: 0.2 } as Transition },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function ServicesPage(): JSX.Element {
  return (
    <>
      <Navbar />

      {/* Page Header */}
      <section
        className="relative overflow-hidden py-28 text-center lg:py-28"
        style={{
          ...radialBgStyle,
          clipPath: "ellipse(180% 110% at 50% 0%)",
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <motion.div
          initial="hidden"
          animate="show"
          variants={heroStagger}
          className="container relative z-10 mx-auto px-4"
        >
          {/* Badge */}
          <motion.div variants={textReveal} className="flex justify-center">
            <div className="relative group overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#001E3C_0%,#00C2CB_25%,#052c1a_50%,#10B981_75%,#001E3C_100%)] opacity-80" />
              <span className="relative inline-block rounded-full bg-[#010b14]/90 backdrop-blur-xl px-4 py-1 text-sm font-semibold tracking-wide text-white shadow-2xl">
                Specialties
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={textReveal}
            className="mt-6 text-4xl font-extrabold text-white md:text-5xl tracking-tight"
          >
            Our Medical Services
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={textReveal}
            className="mx-auto mt-6 max-w-xl text-lg text-slate-300 font-medium leading-relaxed"
          >
            20+ specialties, advanced diagnostics, and surgical excellence — all under one NABH-accredited roof.
          </motion.p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.id}>
                <ServiceCard service={s} />
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
