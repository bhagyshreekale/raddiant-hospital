import DoctorCard from '../components/design/DoctorCard';
import CTABanner from '../components/sections/CTABanner';
import { DOCTORS } from '../lib copy/data';
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/design/FloatingActions'
export const metadata = { 
  title: 'Our Doctors & Specialists', 
  description: 'Meet the expert team of 60+ specialist doctors at Raddiant Plus Hospital Nashik.' 
};

export default function DoctorsPage() {
  return (
 <>

    <Navbar/>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] pb-16 pt-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide text-[var(--accent-light)]">
            Our Team
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
            Meet Our Specialists
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/75">
            60+ experienced doctors dedicated to your health across every major specialty.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Doctors Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {DOCTORS.map((d) => (
              <div key={d.id} className="transition-transform duration-300 hover:z-10 hover:scale-[1.02]">
                <DoctorCard doctor={d} />
              </div>
            ))}
          </div>

          {/* Help/Support Box */}
          <div className="mt-16 rounded-3xl bg-[var(--off-white)] p-8 text-center md:p-12 shadow-sm border border-gray-100">
            <h3 className="mb-2 text-2xl font-bold text-gray-900">
              Need a Specialist Not Listed?
            </h3>
            <p className="mx-auto mb-8 max-w-xl text-gray-500">
              We have 60+ doctors across 20+ specialties. Call us to find the right expert for your needs.
            </p>
            <a 
              href="tel:+919876543210" 
              className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[var(--primary-dark)] hover:shadow-xl active:scale-95"
            >
              📞 Call OPD Desk
            </a>
          </div>
        </div>
      </section>

      <CTABanner />
<FloatingActions/>
      <Footer/>
    </>
  );
}