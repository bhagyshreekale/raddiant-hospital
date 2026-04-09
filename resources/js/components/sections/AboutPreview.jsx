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
    <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content Column */}
          <div className="w-full lg:w-1/2">
            <SectionHeader 
              label="About Raddiant Plus" 
              title="Healthcare Excellence in the Heart of Nashik" 
            />
            
            <div className="mt-6 text-gray-700 leading-relaxed text-lg">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Healthcare Excellence in the Heart of Nashik</h1>
              <p className="mb-5">
                Raddiant Plus Hospital delivers comprehensive hospital and diagnostic care in a state-of-the-art hub. As part of the <strong className="text-gray-900 font-bold underline decoration-blue-200 decoration-4 underline-offset-2">NABH-compliant Raddiant Group</strong>, we are committed to providing high-quality healthcare.
              </p>
              <p className="mb-8 text-gray-600">
                Our multispecialty facility brings together 60+ experienced doctors across 20+ specialties, ensuring seamless care for every patient under one roof.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {stats.map(([label, icon]) => (
                <div 
                  key={label} 
                  className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
                  <span className="font-bold text-sm md:text-base text-slate-700">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <a 
              href="/about" 
              className="inline-flex items-center justify-center bg-cyan-700 hover:bg-cyan-800 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-cyan-700/20 hover:-translate-y-1 active:scale-95"
            >
              Learn More About Us
            </a>
          </div>

          {/* Right Card Column */}
          <div className="w-full lg:w-1/2 relative">
            {/* Background Decorative Element */}
            <div className="absolute -inset-4 bg-cyan-100/50 rounded-[2.5rem] -rotate-2 scale-95 blur-xl -z-10" />
            
            <div className="relative">
              {/* Main Feature Card */}
              <div className="bg-gradient-to-br from-blue-800 via-blue-700 to-emerald-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                {/* Subtle Glow Overlay */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-10 tracking-tight">
                  Our Promise to You
                </h3>
                
                <div className="space-y-6">
                  {promises.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xs mt-0.5 group-hover:bg-emerald-400 group-hover:text-emerald-900 transition-colors">
                        ✓
                      </span>
                      <p className="text-sm md:text-lg text-white/90 font-medium leading-snug">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Trust Badge */}
              <div className="absolute -top-8 -right-4 md:-right-8 bg-orange-500 rounded-3xl p-5 md:p-7 text-center shadow-2xl border-[6px] border-slate-50 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <div className="text-3xl md:text-5xl font-black text-white leading-none drop-shadow-md">
                  15+
                </div>
                <div className="text-[10px] md:text-xs text-white font-black uppercase tracking-[0.2em] mt-2">
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