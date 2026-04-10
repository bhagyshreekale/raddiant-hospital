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
<section className="bg-white py-16 lg:py-24">
  <div className="container mx-auto px-4">
    <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
      
      {/* Left Content */}
      <div className="w-full max-w-2xl text-center lg:text-left">
        {/* Changed bg opacity and text color for visibility */}
        <div className="mb-6 inline-flex items-center rounded-lg bg-blue-600/10 px-3 py-1 text-sm font-bold uppercase tracking-wider text-green-600">
          Meet Our Team
        </div>
        
        {/* Changed text-white to text-slate-900 */}
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
          World-Class Care by <br className="hidden md:block" />
          <span className="text-green-600">Expert Specialists</span>
        </h1>
        
        {/* Changed text-white/70 to text-slate-600 */}
        <p className="mt-6 text-lg leading-relaxed text-slate-600 md:text-xl">
          Our team of 60+ board-certified doctors brings decades of combined 
          experience to ensure you receive the highest standard of medical excellence.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
          <button className="rounded-full bg-cyan-500 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700">
            Find a Doctor
          </button>
          <button className="rounded-full border border-slate-200 px-8 py-4 font-bold text-slate-700 transition-all hover:bg-slate-50">
            Our Specialties
          </button>
        </div>
      </div>

      {/* Right Content: Stats */}
      <div className="grid w-full grid-cols-2 gap-4 sm:max-w-md lg:mt-4">
        {/* Stat Box 1 */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
          <h3 className="text-3xl font-black text-slate-900">60+</h3>
          <p className="mt-1 text-sm font-medium text-slate-500 uppercase tracking-wide">Specialists</p>
        </div>
        
        {/* Stat Box 2 */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
          <h3 className="text-3xl font-black text-slate-900">15+</h3>
          <p className="mt-1 text-sm font-medium text-slate-500 uppercase tracking-wide">Departments</p>
        </div>

        {/* Highlighted Box - Using blue-600 for contrast */}
        <div className="col-span-2 flex items-center justify-between rounded-2xl bg-red-600 p-6 text-white shadow-xl shadow-blue-600/10">
          <div className="text-left">
            <h3 className="text-2xl font-bold text-white">24/7 Care</h3>
            <p className="text-sm text-blue-50">Emergency Assistance</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white">
             <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
             </svg>
          </div>
        </div>
      </div>

    </div>
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
          {/* <div className="mt-16 rounded-3xl bg-[var(--off-white)] p-8 text-center md:p-12 shadow-sm border border-gray-100">
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
          </div> */}
        </div>
      </section>

      <CTABanner />
<FloatingActions/>
      <Footer/>
    </>
  );
}