import React from 'react';
import { Head } from '@inertiajs/react';
import MapSection from '../components/sections/MapSection';
import PatientInquiryForm from '../components/sections/PatientInquiryForm';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FloatingActions from '../components/design/FloatingActions';

// 1. Define the Interface for the contact data
interface ContactData {
    address: string;
    phone: string;
    email: string;
    open_hours: string;
    map_link: string;
}

// 2. Define the Interface for the Page Props
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
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#020617] via-[#071a3d] to-[#020617] py-16 md:py-20 lg:py-24 text-center">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(0, 102, 255, 0.35) 0%, transparent 45%),
                radial-gradient(circle at 80% 20%, rgba(0, 180, 255, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 50% 80%, rgba(0, 80, 200, 0.25) 0%, transparent 50%)
              `
            }}
          />

          <div className="absolute inset-0">
            <div className="bubble bubble1" />
            <div className="bubble bubble2" />
            <div className="bubble bubble3" />
            <div className="bubble bubble4" />
          </div>

          <div className="absolute inset-0 opacity-[0.05] 
            bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),
            linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] 
            bg-[size:28px_28px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full 
                          bg-white/10 border border-white/20 text-white/80 text-xs font-semibold tracking-wider backdrop-blur-sm">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            Contact Us
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Let’s Start a
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Conversation
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
            We're here to help — appointments, queries, second opinions, or emergencies.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
      </section>

      {/* STYLES */}
      <style dangerouslySetInnerHTML={{ __html: `
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,180,255,0.12), transparent);
          animation: float 12s infinite ease-in-out;
          opacity: 0.3;
        }
        .bubble1 { width: 120px; height: 120px; left: 10%; top: 70%; animation-delay: 0s; }
        .bubble2 { width: 80px; height: 80px; left: 80%; top: 60%; animation-delay: 2s; }
        .bubble3 { width: 60px; height: 60px; left: 30%; top: 80%; animation-delay: 4s; }
        .bubble4 { width: 140px; height: 140px; left: 60%; top: 75%; animation-delay: 1s; }

        @keyframes float {
          0% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-120px) scale(1.1); opacity: 1; }
          100% { transform: translateY(0px) scale(1); opacity: 0.6; }
        }

        @media (max-width: 640px) {
          .bubble { display: none; }
        }
      `}} />

      {/* Main Content Sections */}
      <main className="relative z-20 -mt-8">
        <PatientInquiryForm />
      </main>

      <MapSection contactData={contactData} />

      <Footer/>
      <FloatingActions/>
    </>
  );
}