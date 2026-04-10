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
     <section className="relative isolate overflow-hidden bg-slate-950 pb-32 pt-6">
  {/* Modern Mesh Gradient Background */}
  <div className="absolute inset-0 -z-10">
    <div 
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 35%, rgba(6, 71, 0, 0.4) 0%, transparent 40%),
          radial-gradient(circle at 80% 10%, rgba(0, 61, 7, 0.3) 0%, transparent 50%)
        `
      }}
    />
    {/* Subtle Grid Pattern */}
    <div className="absolute inset-0 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
  </div>

  <div className="container relative z-10 mx-auto px-6 text-center">
    {/* Refined Badge */}
    <div className="flex justify-center">
      <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
        Get in Touch
      </span>
    </div>
    
    {/* Heading with tight kerning and gradient text */}
    <h1 className="mt-8 text-5xl font-black tracking-tighter text-white sm:text-7xl lg:text-8xl">
      Contact <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Us</span>
    </h1>
    
    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
      We're here to help — appointments, queries, second opinions, or emergencies. 
      <span className="hidden sm:inline"> Reach out and start a conversation today.</span>
    </p>

    {/* CTA Group (Optional but modern) */}
    {/* <div className="mt-10 flex flex-wrap justify-center gap-4">
      <button className="rounded-xl bg-cyan-500 px-8 py-4 font-bold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
        Book Appointment
      </button>
      <button className="rounded-xl border border-slate-800 bg-slate-900/50 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-slate-800">
        View Services
      </button>
    </div> */}
  </div>

  {/* Modern Slanted Divider */}
  <div 
    className="absolute bottom-0 left-0 right-0 h-24 bg-white" 
    style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 0)' }} 
  />
</section>

      {/* Main Content Sections */}
      <main className="relative z-20 -mt-8">
        <PatientInquiryForm />
      </main>

   
        <MapSection />
 

        <Faqsection />
  

      <Footer/>
      <FloatingActions/>
    </>
  );
}