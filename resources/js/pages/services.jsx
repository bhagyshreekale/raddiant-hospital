
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
      <section className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] py-20 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide text-[var(--accent-light)]">
            Specialties
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">
            Our Medical Services
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
            20+ specialties, advanced diagnostics, and surgical excellence — all under one NABH-accredited roof.
          </p>
        </div>
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
          <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] p-8 text-white shadow-2xl shadow-[var(--primary)]/20 md:p-12">
            <div className="flex flex-col items-center gap-10 lg:flex-row">
              
              <div className="w-full lg:w-7/12">
                <h2 className="text-3xl font-bold text-white">
                  NABL-Accredited Diagnostic Centre
                </h2>
                <p className="mt-4 text-white/85">
                  Our state-of-the-art diagnostic centre offers the full spectrum of tests with rapid turnaround times, digital reports, and the highest quality standards.
                </p>
                
                {/* Features List */}
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    '3T MRI Scan', '128-Slice CT', 'Digital X-Ray', 'Colour Doppler USG',
                    'Full Pathology', 'ECG & Holter', 'PFT & ABG', 'Bone Densitometry'
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-sm font-medium text-white/90">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[var(--accent-light)]">
                        ✓
                      </span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: CTA */}
              <div className="w-full flex-col items-center text-center lg:w-5/12">
                <div className="mb-6 text-7xl transition-transform hover:scale-110">🔬</div>
                <a 
                  href="/appointment" 
                  className="inline-block rounded-full bg-white px-10 py-4 text-base font-extrabold text-[var(--primary)] shadow-lg transition-all hover:bg-gray-50 hover:shadow-white/20 active:scale-95"
                >
                  Book a Test
                </a>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/60">
                  Reports available online
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      <CTABanner />
<FloatingActions/>
      <Footer/>
    </>
  );
}