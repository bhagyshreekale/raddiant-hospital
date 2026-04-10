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
      <div className="bg-slate-900 text-blue-100 text-[0.82rem] py-1.5">
        <div className="container mx-auto px-4 flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-4 items-center">
            <span>📍 Nashik, Maharashtra</span>
            <span className="hidden md:inline">✉️ {SITE.email}</span>
          </div>
          <div className="flex gap-4 items-center">
            <span>
              🚨 Emergency: <strong className="text-amber-400">{SITE.emergency}</strong>
            </span>
            <span>
              📞{" "}
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
              width={140}
              height={70}
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
              href="/appointment"
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