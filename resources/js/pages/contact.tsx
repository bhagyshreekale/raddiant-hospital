import { Head } from '@inertiajs/react';
import React from 'react';

// Layout & Design Components
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FloatingActions from '../components/design/FloatingActions';

// Section Components
import MapSection from '../components/sections/MapSection';
import PatientInquiryForm from '../components/sections/PatientInquiryForm';
import Faqsection from '../components/sections/Faqsection'; 

// 1. Interfaces
interface ContactData {
    address: string;
    phone: string;
    email: string;
    open_hours: string;
    map_link: string;
}

interface PageProps {
    contactData: ContactData | null;
}

export default function ContactPage({ contactData }: PageProps) {
  return (
    <>
      <Head>
        <title>Contact Us | Raddiant Plus Hospital</title>
        <meta name="description" content="Contact Raddiant Plus Hospital Nashik – phone, email, address and map location." />
      </Head>

      <Navbar/>

{/* HERO SECTION */}
<section className="relative isolate overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50 py-16 md:py-20 lg:py-24 text-center">

  {/* Background Effects */}
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">

    {/* Soft color blobs */}
    <div
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 15% 20%, rgba(186,230,253,0.6) 0%, transparent 50%),
          radial-gradient(ellipse at 85% 15%, rgba(199,210,254,0.5) 0%, transparent 45%),
          radial-gradient(ellipse at 50% 90%, rgba(224,242,254,0.4) 0%, transparent 50%)
        `
      }}
    />

    {/* Subtle dot grid */}
    <div
      className="absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage: `radial-gradient(circle, #94a3b8 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }}
    />

    {/* Decorative rings */}
    <div className="hero-ring hero-ring-1" />
    <div className="hero-ring hero-ring-2" />
    <div className="hero-ring hero-ring-3" />

    {/* Floating accent dots */}
    <div className="hero-dot dot-a" />
    <div className="hero-dot dot-b" />
    <div className="hero-dot dot-c" />
  </div>

  <div className="container relative z-10 mx-auto px-4">

    {/* Badge */}
    <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full
                    bg-white border border-sky-200 text-sky-700 text-xs font-semibold tracking-wider shadow-sm">
      <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
      Contact Us
    </div>

    {/* Headline */}
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
      Let's Start a
      <span className="relative block w-fit mx-auto">
        <span className="bg-gradient-to-r from-sky-500 via-green-500 to-green-500 bg-clip-text text-transparent">
          Conversation
        </span>
        <span className="hero-underline" />
      </span>
    </h1>

    {/* Subtext */}
    <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed">
      We're here to help — appointments, queries, FAQ, or emergencies.
    </p>

    {/* CTA chips */}
    <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-medium">
      {["Appointments", "General Enquiries", "FAQ", "Emergency Support"].map((label) => (
        <span
          key={label}
          className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm hover:shadow-md hover:border-sky-300 hover:text-sky-700 transition-all duration-200 cursor-pointer"
        >
          {label}
        </span>
      ))}
    </div>
  </div>

  {/* Bottom fade */}
  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/60 to-transparent" />
</section>

{/* STYLES */}
<style dangerouslySetInnerHTML={{ __html: `
  .hero-ring {
    position: absolute;
    border-radius: 50%;
    border: 1.5px solid rgba(148, 163, 184, 0.25);
    animation: ring-pulse 6s ease-in-out infinite;
  }
  .hero-ring-1 { width: 320px; height: 320px; top: -80px; right: -60px; animation-delay: 0s; }
  .hero-ring-2 { width: 220px; height: 220px; bottom: -40px; left: -40px; animation-delay: 2s; }
  .hero-ring-3 { width: 160px; height: 160px; top: 30%; left: 5%; animation-delay: 4s; }

  @keyframes ring-pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.06); opacity: 1; }
  }

  .hero-dot {
    position: absolute;
    border-radius: 50%;
    animation: dot-float 8s ease-in-out infinite;
  }
  .dot-a { width: 10px; height: 10px; background: rgba(56,189,248,0.5); top: 20%; right: 15%; animation-delay: 0s; }
  .dot-b { width: 7px;  height: 7px;  background: rgba(99,102,241,0.4); bottom: 25%; left: 12%; animation-delay: 3s; }
  .dot-c { width: 12px; height: 12px; background: rgba(56,189,248,0.3); top: 60%; right: 8%;  animation-delay: 1.5s; }

  @keyframes dot-float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-14px); }
  }

  .hero-underline {
    display: block;
    height: 4px;
    border-radius: 99px;
    background: linear-gradient(to right, #38bdf8, #6366f1);
    margin: 6px auto 0;
    width: 0%;
    animation: underline-grow 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;
  }

  @keyframes underline-grow {
    to { width: 100%; }
  }

  @media (max-width: 640px) {
    .hero-ring { display: none; }
  }
`}} />

      {/* Main Content Sections */}
      <main className="relative z-20 -mt-8">
        <PatientInquiryForm />
        
        {/* Pass contactData safely to MapSection */}
        <MapSection contactData={contactData} />
        
        <Faqsection />
      </main>

      <Footer/>
      <FloatingActions/>
    </>
  );
}
