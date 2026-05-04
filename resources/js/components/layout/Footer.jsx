"use client";

import { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const DEFAULT_SITE_DATA = {
  name: "Raddiant Plus Hospital",
  phone: "+91 93565 10704",
  email: "care@raddiantplus.com",
  address: "Nashik, Maharashtra",
  social: { facebook: "#", instagram: "#", youtube: "#" },
  emergency: "108",
  nav: { home: true, about: true, services: true, facilities: true, blog: true, gallery: true, contact: true, careers: true, appointment: true },
  footer: {
    tagline: "Touching Lives, Healing Souls",
    description: "Delivering comprehensive multispecialty hospital and diagnostic care.",
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Doctors", href: "/doctors" },
      { label: "Facilities", href: "/facilities" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" },
    ],
    column3Title: "Specialties",
    column3Links: [
      { label: "Cardiology", href: "/services" },
      { label: "Orthopedics", href: "/services" },
      { label: "Neurology", href: "/services" },
      { label: "Gynaecology", href: "/services" },
      { label: "Pediatrics", href: "/services" },
    ],
    contactTitle: "Contact Information",
    address: "Nashik, Maharashtra",
    phone: "+91 93565 10704",
    email: "care@raddiantplus.com",
  },
  timing: "24x7 Emergency | OPD: Mon-Sat 9:00 AM - 6:00 PM",
};

export default function Footer() {
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/site-data')
      .then(res => res.json())
      .then(data => {
        setSiteData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return null;
  }

  const data = siteData || DEFAULT_SITE_DATA;

  const socialLinks = [
    { icon: <FaFacebookF />, url: data.social?.facebook || '#' },
    { icon: <FaInstagram />, url: data.social?.instagram || '#' },
    { icon: <FaYoutube />, url: data.social?.youtube || '#' },
  ];

  // Column 2: Quick Links from database
  const quickLinks = data.footer?.quickLinks || DEFAULT_SITE_DATA.footer.quickLinks;

  // Column 3: Custom Links from database
  const column3Title = data.footer?.column3Title || 'Specialties';
  const column3Links = data.footer?.column3Links || DEFAULT_SITE_DATA.footer.column3Links;

  return (
    <footer className="bg-[#111827] text-[#94a3b8] font-sans">
      <div className="bg-red-600 py-3.5">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-3">
          <div className="text-white font-bold text-base">
            🚨 24×7 Emergency:{' '}
            <a href={"tel:" + (data.emergency || '108')} className="text-white underline underline-offset-4">
              {data.emergency || '108'}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white text-sm">{data.timing || '24x7 Emergency | OPD: Mon-Sat 9:00 AM - 6:00 PM'}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 lg:gap-12">
        {/* Column 1: Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <a href="/" className="no-underline flex items-center gap-2">
              <img src="/images/preloader.png" alt={data.name} width={140} height={70} className="rounded-lg object-contain" />
            </a>
          </div>
          <p>{data.footer?.tagline || data.tagline || 'Touching Lives, Healing Souls'}</p>
          <p className="text-[0.88rem] leading-[1.7] max-w-xs">
            {data.footer?.description || data.description || 'Delivering comprehensive multispecialty hospital and diagnostic care.'}
          </p>
          <div className="flex gap-2">
            {socialLinks.map(function({ icon, url }, index) {
              return <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-[#94a3b8] text-base transition-all duration-200 hover:bg-blue-500 hover:text-white">
                {icon}
              </a>;
            })}
          </div>
        </div>

        {/* Column 2: Quick Links - fully dynamic from database */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-0">
          <div className="flex flex-col">
            <h5 className="text-white text-[0.95rem] font-semibold mb-4">Quick Links</h5>
            <ul className="flex flex-col gap-2">
              {quickLinks.map(function(link) {
                return <li key={link.label}>
                  <a href={link.href} className="text-[0.875rem] text-[#94a3b8] hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>;
              })}
            </ul>
          </div>
        </div>

        {/* Column 3: Custom Links - fully dynamic from database */}
        <div className="flex flex-col">
          <h5 className="text-white text-[0.95rem] font-semibold mb-4">{column3Title}</h5>
          <ul className="flex flex-col gap-2">
            {column3Links.map(function(link) {
              return <li key={link.label}>
                <a href={link.href} className="text-[0.875rem] text-[#94a3b8] hover:text-white transition-colors duration-200">
                  {link.label}
                </a>
              </li>;
            })}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="flex flex-col gap-4">
          <h5 className="text-white text-[0.95rem] font-semibold mb-4">{data.footer?.contactTitle || 'Contact Information'}</h5>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2.5 items-start">
              <span className="mt-0.5">📍</span>
              <span className="text-[0.875rem]">{data.footer?.address || 'Nashik, Maharashtra'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <a href={"tel:" + (data.footer?.phone || '+91 93565 10704')} className="text-[0.875rem] text-[#94a3b8] hover:text-white transition-colors">
                {data.footer?.phone || '+91 93565 10704'}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span>✉️</span>
              <a href={"mailto:" + (data.footer?.email || 'care@raddiantplus.com')} className="text-[0.875rem] text-[#94a3b8] hover:text-white transition-colors">
                {data.footer?.email || 'care@raddiantplus.com'}
              </a>
            </div>
            <div className="mt-2">
              <a href="/appoinment" className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-full text-[0.875rem] font-semibold transition-all hover:bg-blue-700 active:scale-95">
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>

    <div className="border-t border-white/10 py-4">
  <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 text-[0.82rem] text-white/70">
    <p>© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
    <p className="flex items-center flex-wrap justify-center">
      Part of the <strong className="text-cyan-400 ml-1">Raddiant Group</strong>
      <span className="mx-2 opacity-20">|</span>
      NABH Compliant
      <span className="mx-2 opacity-20">|</span>
      <span>Developed by <a href="https://blendigitals.com/" className="hover:text-cyan-400 transition-colors">Blen Digital</a></span>
    </p>
  </div>
</div>
    </footer>
  );
}