// components/sections/DoctorsSection.jsx

import DoctorCard from '../design/DoctorCard';
import SectionHeader from '../design/SectionHeader';
import { DOCTORS } from '../../lib copy/data';

export default function DoctorsSection() {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 md:py-28 overflow-hidden">

      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-blue-50 opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-sky-50 opacity-50 blur-3xl" />

      <div className="relative container mx-auto px-4 max-w-7xl">

        {/* ── Section Header ── */}
        <div className="mb-14 text-center md:mb-16">

          {/* Label pill */}
          <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Our Specialists
          </span>

          <SectionHeader
            title="Meet Our Expert Doctors"
            subtitle="Experienced, compassionate specialists committed to your health and well-being."
            align="center"
          />

          {/* Accent underline */}
          {/* <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-blue-600 opacity-80" />
          </div> */}
        </div>

        {/* ── Stats Bar ── */}
        <div className="mb-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: "50+", label: "Specialist Doctors" },
            { value: "20+", label: "Departments" },
            { value: "15K+", label: "Happy Patients" },
            { value: "4.9★", label: "Average Rating" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-white border border-gray-100 px-4 py-5 shadow-sm"
            >
              <span className="text-2xl font-bold text-blue-700">{stat.value}</span>
              <span className="text-xs text-gray-500 text-center leading-snug">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ── Doctor Grid ── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-7">
          {DOCTORS.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <div className="mt-14 flex flex-col items-center gap-4 text-center md:mt-16">
          <p className="text-sm text-gray-400">
            Can't find the right specialist?{" "}
            <a href="/contact" className="text-blue-600 font-medium hover:underline">
              Contact us
            </a>
          </p>

          <a
            href="/doctors"
            className="group inline-flex items-center gap-2.5 rounded-full bg-blue-700 px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-blue-300 active:scale-95"
          >
            View All Doctors
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
