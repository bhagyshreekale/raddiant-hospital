'use client';

import SectionHeader from '../design/SectionHeader';

export default function AboutPreview() {
  const stats = [
    ['NABH Compliant', '✅'],
    ['NABL Lab', '🔬'],
    ['60+ Doctors', '👨‍⚕️'],
    ['24×7 Care', '🕐']
  ];

  const promises = [
    'Compassionate, patient-first care at every step',
    'Transparent pricing with no hidden charges',
    'Evidence-based medicine by experienced specialists',
    'Clean, safe, and comfortable hospital environment',
    'Prompt appointment scheduling and minimal wait times',
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Content Column */}
          <div className="w-full lg:w-1/2">
            <SectionHeader 
              label="About Raddiant Plus" 
              title="Healthcare Excellence in the Heart of Nashik" 
            />
            
            <div className="mt-6 text-gray-700 leading-relaxed">
              <p className="mb-5">
                Raddiant Plus Hospital delivers comprehensive hospital and diagnostic care in a state-of-the-art commercial hub. As part of the <strong className="text-gray-900 font-bold">NABH-compliant Raddiant Group</strong>, we are committed to providing high-quality, patient-centric healthcare services.
              </p>
              <p className="mb-8">
                Our multispecialty facility brings together 60+ experienced doctors across 20+ specialties under one roof, ensuring seamless care for every patient.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {stats.map(([label, icon]) => (
                <div 
                  key={label} 
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="font-semibold text-sm md:text-base text-gray-800">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Standard Anchor Tag for Laravel routing */}
            <a 
              href="/about" 
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg active:transform active:scale-95"
            >
              Learn More About Us
            </a>
          </div>

          {/* Right Card Column */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* Main Feature Card */}
              <div className="bg-gradient-to-br from-blue-800 to-emerald-600 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl">
                <h3 className="text-white text-xl md:text-2xl font-bold mb-8">
                  Our Promise to You
                </h3>
                
                <div className="space-y-5">
                  {promises.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] mt-1">
                        ✓
                      </span>
                      <p className="text-sm md:text-base text-white/90 leading-snug">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Trust Badge */}
              <div className="absolute -top-6 -right-2 md:-right-6 bg-orange-500 rounded-2xl p-4 md:p-6 text-center shadow-xl border-4 border-white transform rotate-3">
                <div className="text-2xl md:text-4xl font-black text-white leading-none">
                  15+
                </div>
                <div className="text-[10px] md:text-xs text-white/90 font-bold uppercase tracking-widest mt-1">
                  Years of Trust
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}