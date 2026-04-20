"use client";
import { useState, useEffect } from "react";
import { SITE } from "../../lib copy/data";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/facilities", label: "Facilities" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },

];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
{/* Top bar */}
<div className="bg-slate-900 text-blue-100 text-[0.82rem] py-2 md:py-1.5">
  <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-2">
    
    {/* Left side: Location & Email */}
    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
      <span className="flex items-center gap-1.5">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        Nashik, Maharashtra
      </span>
      <span className="hidden sm:flex items-center gap-1.5">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
        {SITE.email}
      </span>
    </div>

    {/* Right side: Emergency & Phone */}
    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
      <span className="flex items-center gap-1.5">
        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Emergency: <strong className="text-red-400">{SITE.emergency}</strong>
      </span>
      <span className="flex items-center gap-1.5">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
        <a href={`tel:${SITE.phone}`} className="text-blue-100 hover:text-white transition-colors">
          {SITE.phone}
        </a>
      </span>
    </div>

  </div>
</div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-[1050] transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md" 
            : "bg-white border-b border-gray-200"
        }`}
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 flex items-center justify-between py-2.5">
          {/* Logo */}
          <a href="/" className="no-underline flex items-center gap-2">
            <img
              src="images/logo.png"
              alt="Raddiant Plus Hospital"
              width={160}
              height={85}
              className="rounded-lg object-contain"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3.5 py-2 rounded-lg text-gray-700 font-medium text-[0.9rem] transition-all duration-200 hover:bg-gray-100 hover:text-blue-600"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/appoinment"
              className="ml-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-[0.88rem] font-semibold hover:bg-blue-700 transition-all shadow-sm active:scale-95"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden flex flex-col justify-center items-end gap-1.5 border border-gray-200 rounded-lg p-2.5 transition-colors active:bg-gray-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`h-0.5 bg-blue-600 rounded-full transition-all duration-300 ${menuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
            <span className={`h-0.5 bg-blue-600 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : "w-6"}`} />
            <span className={`h-0.5 bg-blue-600 rounded-full transition-all duration-300 ${menuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-4"}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div 
          className={`lg:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-[500px] py-4" : "max-h-0"
          }`}
        >
          <div className="container mx-auto px-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-gray-700 font-medium text-[0.95rem] hover:bg-gray-100 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/appoinment"
              className="mt-2 bg-blue-600 text-white text-center py-3 rounded-lg font-semibold active:bg-blue-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Book Appointment
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}