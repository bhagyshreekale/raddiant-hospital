
import ServiceCard from '../components/design/ServiceCard';
import CTABanner from '../components/sections/CTABanner';
import { SERVICES } from '../lib copy/data';
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/design/FloatingActions'
export const metadata = { 
  title: 'Our Services', 
  description: 'Comprehensive multispecialty medical services at Raddiant Plus Hospital Nashik – Cardiology, Orthopedics, Neurology, Diagnostics and more.' 
};

export default function ServicesPage() {
  return (
    <>
    <Navbar/>
      {/* Page Header */}
<section
  className="relative py-28 lg:py-36 text-center overflow-hidden"
  style={{
    background: "linear-gradient(270deg, #001E3C, #00509D, #003366)",
    backgroundSize: "400% 400%",
    animation: "gradientMove 10s ease infinite",
    clipPath: "ellipse(180% 110% at 50% 0%)", // 🔥 inverted U shape (top curve)
  }}
>
  {/* Animation styles */}
  <style>
    {`
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes floatUp {
        0% { opacity: 0; transform: translateY(50px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      .animate-float {
        animation: floatUp 1.5s ease-out forwards;
      }

      .animate-delay-1 {
        animation-delay: 0.3s;
      }

      .animate-delay-2 {
        animation-delay: 0.6s;
      }
    `}
  </style>

  <div className="container mx-auto px-4 relative z-10">
    
    <span className="animate-float inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide text-white/90">
      Specialties
    </span>

    <h1 className="animate-float animate-delay-1 mt-4 text-4xl font-extrabold text-white md:text-5xl">
      Our Medical Services
    </h1>

    <p className="animate-float animate-delay-2 mx-auto mt-6 max-w-xl text-lg text-white/75">
      20+ specialties, advanced diagnostics, and surgical excellence — all under one NABH-accredited roof.
    </p>

  </div>

  {/* Optional glowing effect */}
  <div className="absolute inset-0 bg-white/5 blur-3xl opacity-20"></div>
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

          {/* Diagnostics Highlight Card */}
<div
  className="mt-16 overflow-hidden rounded-3xl p-8 text-white shadow-2xl md:p-12 relative"
  style={{
    background: "linear-gradient(270deg, #001E3C, #00509D, #003366)",
    backgroundSize: "400% 400%",
    animation: "gradientMove 10s ease infinite",
  }}
>
  {/* Animation styles */}
  <style>
    {`
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes floatUp {
        0% { opacity: 0; transform: translateY(50px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      .animate-float {
        animation: floatUp 1.2s ease-out forwards;
      }

      .delay-1 { animation-delay: 0.3s; }
      .delay-2 { animation-delay: 0.6s; }
      .delay-3 { animation-delay: 0.9s; }
      .delay-4 { animation-delay: 1.2s; }
    `}
  </style>

  <div className="flex flex-col items-center gap-10 lg:flex-row relative z-10">
    
    {/* Left Content */}
    <div className="w-full lg:w-7/12">
      
      <h2 className="animate-float text-3xl font-bold text-white">
        NABL-Accredited Diagnostic Centre
      </h2>

      <p className="animate-float delay-1 mt-4 text-white/85">
        Our state-of-the-art diagnostic centre offers the full spectrum of tests with rapid turnaround times, digital reports, and the highest quality standards.
      </p>
      
      {/* Features */}
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          '3T MRI Scan', '128-Slice CT', 'Digital X-Ray', 'Colour Doppler USG',
          'Full Pathology', 'ECG & Holter', 'PFT & ABG', 'Bone Densitometry'
        ].map((t, i) => (
          <div
            key={t}
            className={`flex items-center gap-2 text-sm font-medium text-white/90 animate-float delay-${i % 4}`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
              ✓
            </span>
            {t}
          </div>
        ))}
      </div>
    </div>

    {/* Right CTA */}
    <div className="w-full flex-col items-center text-center lg:w-5/12">
      
      <div className="animate-float delay-2 mb-6 text-7xl transition-transform hover:scale-110">
        🔬
      </div>

      <a 
        href="/appointment" 
        className="animate-float delay-3 inline-block rounded-full bg-white text-black px-10 py-4 text-base font-extrabold text-[var(--primary)] shadow-lg transition-all hover:bg-gray-50 hover:shadow-white/20 active:scale-95"
      >
        Book a Test
      </a>

      <p className="animate-float delay-4 mt-4 text-xs font-semibold uppercase tracking-widest text-white/60">
        Reports available online
      </p>
    </div>

  </div>

  {/* Glow effect */}
  <div className="absolute inset-0 bg-white/10 blur-3xl opacity-20"></div>
</div>
        </div>
      </section>

      <CTABanner />
<FloatingActions/>
      <Footer/>
    </>
  );
}