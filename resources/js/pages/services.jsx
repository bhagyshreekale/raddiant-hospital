"use client"; // Ensure this is at the top if using Next.js App Router

import ServiceCard from '../components/design/ServiceCard';
import CTABanner from '../components/sections/CTABanner';
import { motion } from "framer-motion";
import { SERVICES } from '../lib copy/data';
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/design/FloatingActions'

export default function ServicesPage() {

  // Cinematic reveal animation for text elements
  const textReveal = {
    hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Stagger container for the list items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Navbar />

      {/* Page Header */}
      <section
        className="relative overflow-hidden py-28 text-center lg:py-36"
        style={{
          background: "linear-gradient(270deg, #001E3C, #00509D, #003366)",
          backgroundSize: "400% 400%",
          animation: "gradientMove 15s ease infinite",
          clipPath: "ellipse(180% 110% at 50% 0%)",
        }}
      >
        <style>
          {`
            @keyframes gradientMove {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>

        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-[10%] h-96 w-96 rounded-full bg-blue-300 blur-[100px] pointer-events-none mix-blend-overlay"
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-[10%] h-96 w-96 rounded-full bg-cyan-200 blur-[120px] pointer-events-none mix-blend-overlay"
        />

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="container relative z-10 mx-auto px-4"
        >
          <motion.div variants={textReveal} className="flex justify-center">
            <div className="relative group overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#001E3C_0%,#60A5FA_50%,#001E3C_100%)] opacity-70" />
              <span className="relative inline-block rounded-full bg-[#001E3C]/80 backdrop-blur-md px-4 py-1 text-sm font-semibold tracking-wide text-white/90 shadow-2xl">
                Specialties
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={textReveal}
            className="mt-6 text-4xl font-extrabold text-white md:text-5xl tracking-tight drop-shadow-lg"
          >
            Our Medical Services
          </motion.h1>

          <motion.p
            variants={textReveal}
            className="mx-auto mt-6 max-w-xl text-lg text-white/80 font-medium leading-relaxed drop-shadow-md"
          >
            20+ specialties, advanced diagnostics, and surgical excellence — all
            under one NABH-accredited roof.
          </motion.p>
        </motion.div>
      </section>


      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.id}>
                <ServiceCard service={s} />
              </div>
            ))}
          </div>

          {/* --- UPDATED DIAGNOSTICS SECTION --- */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-16 overflow-hidden rounded-3xl p-8 text-white shadow-2xl md:p-12 relative group transition-all duration-500 hover:shadow-[0_25px_70px_rgba(0,80,157,0.45)]"
            style={{
              background: "linear-gradient(270deg, #001E3C, #00509D, #003366)",
              backgroundSize: "300% 300%",
              animation: "gradientMove 8s ease infinite",
            }}
          >
            {/* Overlay Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex flex-col lg:flex-row gap-10 relative z-10">

              {/* LEFT CONTENT */}
              <div className="w-full lg:w-7/12">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-white"
                >
                  NABL-Accredited Diagnostic Centre
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 text-white/80"
                >
                  Our state-of-the-art diagnostic centre offers the full spectrum of tests with rapid turnaround times, digital reports, and the highest quality standards.
                </motion.p>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {[
                    '3T MRI Scan', '128-Slice CT', 'Digital X-Ray', 'Colour Doppler USG',
                    'Full Pathology', 'ECG & Holter', 'PFT & ABG', 'Bone Densitometry'
                  ].map((t) => (
                    <motion.div
                      key={t}
                      variants={itemVariants}
                      className="flex items-center gap-3 text-sm text-white/90 font-medium group/item"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)] group-hover/item:scale-125 transition-transform" />
                      {t}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT CONTENT (CTA) */}
              <div className="w-full lg:w-5/12 text-center flex flex-col justify-center items-center">
                <motion.div 
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                  className="text-7xl mb-8 drop-shadow-2xl"
                >
                  🔬
                </motion.div>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/appointment"
                  className="inline-block bg-white text-[#003366] font-bold px-12 py-4 rounded-full shadow-xl hover:bg-blue-50 transition-colors"
                >
                  Book a Test
                </motion.a>

                <motion.p 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   transition={{ delay: 0.8 }}
                   className="mt-5 text-xs uppercase tracking-[0.2em] text-white/60"
                >
                  Reports available online
                </motion.p>
              </div>

            </div>

            {/* Subtle Glass Shapes for extra "Good Animation" feel */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      <CTABanner />
      <FloatingActions />
      <Footer />
    </>
  );
}