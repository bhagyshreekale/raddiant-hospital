'use client';

import CTABanner from '../components/sections/CTABanner';
import DoctorsSection from '../components/sections/DoctorsSection';
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/design/FloatingActions'
export default function AboutPage() {
  const stats = [
    ['1,00,000+', 'Patients Served'],
    ['15,000+', 'Surgeries Performed'],
    ['60+', 'Specialists'],
    ['15+', 'Years of Service']
  ];

  const values = [
    ['❤️', 'Compassion', 'Every patient is treated with dignity, empathy, and genuine concern for their well-being.'],
    ['🔬', 'Excellence', 'We pursue the highest clinical and service standards through continuous improvement.'],
    ['🛡️', 'Integrity', 'Transparent communication, ethical practice, and trust form the foundation of our care.'],
    ['🤝', 'Collaboration', 'Our multidisciplinary teams work together to deliver integrated, holistic patient care.']
  ];

  return (
    <>

    <Navbar/>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-cyan-300 border border-white/20 text-sm font-medium tracking-wide">
            About Us
          </span>
          <h1 className="text-white text-4xl md:text-5xl font-bold mt-4">
            Our Story & Mission
          </h1>
          <p className="text-blue-100/75 max-w-xl mx-auto mt-6 text-lg">
            Building healthier communities in Nashik through excellence, compassion, and innovation.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
            {/* Text Column */}
            <div className="w-full lg:w-1/2">
              <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Who We Are</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                Part of the Trusted Raddiant Group
              </h2>
              <div className="w-20 h-1.5 bg-cyan-500 mb-6 rounded-full" />
              
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Raddiant Plus Hospital delivers comprehensive hospital and diagnostic care in a state-of-the-art commercial hub. As part of the <strong className="text-slate-900 font-bold">NABH-compliant Raddiant Group</strong>, we are committed to providing high-quality, patient-centric healthcare services.
                </p>
                <p>
                  Established over 15 years ago, Raddiant Plus has grown to become one of Nashik's most trusted multispecialty hospitals, serving thousands of patients annually across all age groups.
                </p>
                <p>
                  Our multidisciplinary teams collaborate closely to ensure seamless, holistic care — from first consultation through recovery and follow-up.
                </p>
              </div>
            </div>

            {/* Stats Column */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                {stats.map(([value, label]) => (
                  <div key={label} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center hover:translate-y-[-4px] transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-black text-blue-700 leading-none">
                      {value}
                    </div>
                    <div className="text-sm text-slate-500 font-medium mt-3">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="bg-slate-50 rounded-[2.5rem] p-10 md:p-16">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-2">Our Core Values</h2>
            <div className="w-16 h-1 bg-cyan-500 mx-auto mb-12 rounded-full" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map(([icon, title, desc]) => (
                <div key={title} className="text-center group">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">
                    {icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
      <DoctorsSection />
      <FloatingActions/>
      <Footer/>
    </>
  );
}