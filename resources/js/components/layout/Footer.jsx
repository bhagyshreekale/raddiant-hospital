'use client';

import { SITE } from '../../lib copy/data';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const socialLinks = [
  { icon: <FaFacebookF />, url: 'https://www.facebook.com/raddiantplushospitalBhabhaNagarNashik/' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/raddiantplushospitals/' },
  { icon: <FaYoutube />, url: 'https://www.youtube.com/@raddiantplus' },
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-[#94a3b8] font-sans">
      {/* Emergency Banner */}
      <div className="bg-red-600 py-3.5">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-3">
          <div className="text-white font-bold text-base">
            🚨 24×7 Emergency:{' '}
            <a href={`tel:${SITE.emergency}`} className="text-white underline underline-offset-4">
              {SITE.emergency}
            </a>
          </div>
          <a href={`tel:${SITE.phone}`} className="text-white font-semibold text-sm sm:text-base">
            📞 {SITE.phone}
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-extrabold text-base shadow-md">
                R+
              </div>
              <span className="text-white text-lg font-bold tracking-tight">
                Raddiant Plus Hospital
              </span>
            </div>
            <p className="text-[0.88rem] leading-[1.7] max-w-xs">
              Delivering comprehensive multispecialty hospital and diagnostic care. 
              NABH-compliant, patient-centric healthcare with advanced medical technology.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ icon, url }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-[#94a3b8] text-base transition-all duration-200 hover:bg-blue-500 hover:text-white"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-0">
            <div className="flex flex-col">
              <h5 className="text-white text-[0.95rem] font-semibold mb-4">Quick Links</h5>
              <ul className="flex flex-col gap-2">
                {[
                  ['Home', '/'], ['About Us', '/about'], ['Services', '/services'], 
                  ['Doctors', '/doctors'], ['Facilities', '/facilities'], 
                  ['Gallery', '/gallery'], ['Blog', '/blog']
                ].map(([label, href]) => (
                  <li key={label}>
                    <a 
                      href={href} 
                      className="text-[0.875rem] text-[#94a3b8] hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Specialties */}
          <div className="flex flex-col">
            <h5 className="text-white text-[0.95rem] font-semibold mb-4">Specialties</h5>
            <ul className="flex flex-col gap-2">
              {['Cardiology', 'Orthopedics', 'Neurology', 'Gynaecology', 'Pediatrics', 'Diagnostics'].map((s) => (
                <li key={s}>
                  <a 
                    href="/services" 
                    className="text-[0.875rem] text-[#94a3b8] hover:text-white transition-colors duration-200"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-4">
            <h5 className="text-white text-[0.95rem] font-semibold mb-4">Contact Information</h5>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2.5 items-start">
                <span className="mt-0.5">📍</span>
                <span className="text-[0.875rem]">{SITE.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <a href={`tel:${SITE.phone}`} className="text-[0.875rem] text-[#94a3b8] hover:text-white transition-colors">
                  {SITE.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span>✉️</span>
                <a href={`mailto:${SITE.email}`} className="text-[0.875rem] text-[#94a3b8] hover:text-white transition-colors">
                  {SITE.email}
                </a>
              </div>
              <div className="mt-2">
                <a
                  href="/appointment"
                  className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-full text-[0.875rem] font-semibold transition-all hover:bg-blue-700 active:scale-95"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 text-[0.82rem]">
          <p>© {new Date().getFullYear()} Raddiant Plus Hospital. All rights reserved.</p>
          <p>
            Part of the <strong className="text-cyan-400">Raddiant Group</strong> 
            <span className="mx-2 opacity-20">|</span> 
            NABH Compliant
          </p>
        </div>
      </div>
    </footer>
  );
}