// src/app/contact/page.jsx
import MapSection from '../components/sections/MapSection';
import Faqsection from '../pages/faq';
import PatientInquiryForm from '../components/sections/PatientInquiryForm';
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/design/FloatingActions'
export const metadata = {
  title: 'Contact Us',
  description: 'Contact Raddiant Plus Hospital Nashik – phone, email, address and map location.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar/>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] pb-24 pt-32">
        
        {/* Decorative Glow */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-40" 
          style={{
            background: 'radial-gradient(ellipse 50% 60% at 70% 40%, rgba(0,180,216,0.5) 0%, transparent 65%)'
          }} 
        />
        
        {/* Wave Cut (Bottom) */}
        <div 
          className="absolute -bottom-px left-0 right-0 h-[52px] bg-white" 
          style={{ clipPath: 'ellipse(54% 100% at 50% 100%)' }} 
        />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide text-[var(--accent-light)]">
            Get in Touch
          </span>
          
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-6xl">
            Contact Us
          </h1>
          
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/75">
            We're here to help — appointments, queries, second opinions, or emergencies.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="relative z-20 -mt-8">
        <PatientInquiryForm />
      </main>

      <section className="py-16 md:py-24">
        <MapSection />
      </section>

      <div className="bg-[var(--off-white)] py-16">
        <Faqsection />
      </div>

      <Footer/>
      <FloatingActions/>
    </>
  );
}