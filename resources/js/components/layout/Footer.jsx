"use client";

import { usePage } from "@inertiajs/react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const DEFAULT_FOOTER_LINKS = [
  { id: 1, label: "Home", url: "/", is_visible: true },
  { id: 2, label: "About Us", url: "/about", is_visible: true },
  { id: 3, label: "Services", url: "/services", is_visible: true },
  { id: 4, label: "Doctors", url: "/doctors", is_visible: true },
  { id: 5, label: "Facilities", url: "/facilities", is_visible: true },
  { id: 6, label: "Gallery", url: "/gallery", is_visible: true },
  { id: 7, label: "Blog", url: "/blog", is_visible: true },
];

const DEFAULT_SPECIALTIES = [
  { label: "Cardiology", url: "/services" },
  { label: "Orthopedics", url: "/services" },
  { label: "Neurology", url: "/services" },
  { label: "Gynaecology", url: "/services" },
  { label: "Pediatrics", url: "/services" },
];

const DEFAULT_SITE_DATA = {
  name: "Raddiant Plus Hospital",
  logo: "/images/logo.png",
  phone: "+91 93565 10704",
  email: "care@raddiantplus.com",
  address: "Nashik, Maharashtra",
  emergency: "108",
  timing: "24x7 Emergency | OPD: Mon-Sat 9:00 AM - 6:00 PM",
  social: { facebook: "#", instagram: "#", youtube: "#" },
  footer: {
    tagline: "Touching Lives, Healing Souls",
    description: "Delivering comprehensive multispecialty hospital and diagnostic care.",
    specialtiesTitle: "Specialties",
    contactTitle: "Contact Information",
  },
};

export default function Footer() {
  const { props } = usePage();
  
  const siteData = props.siteData || {};
  const footerLinks = siteData.footerLinks;
  const links = footerLinks && footerLinks.length > 0 ? footerLinks : DEFAULT_FOOTER_LINKS;
  
  const siteFooter = siteData.footer || {};
  const specialtiesTitle = siteFooter.specialtiesTitle || DEFAULT_SITE_DATA.footer.specialtiesTitle;
  const specialties = siteFooter.specialties && siteFooter.specialties.length > 0 
    ? siteFooter.specialties.map((s) => ({ label: s, url: "/services" }))
    : DEFAULT_SPECIALTIES;
  
  const data = {
    ...DEFAULT_SITE_DATA,
    ...siteData,
    footer: { ...DEFAULT_SITE_DATA.footer, ...siteFooter },
  };

  const socialLinks = [
    { icon: <FaFacebookF />, url: data.social?.facebook || "#" },
    { icon: <FaInstagram />, url: data.social?.instagram || "#" },
    { icon: <FaYoutube />, url: data.social?.youtube || "#" },
  ];

  return (
    <footer className="bg-[#111827] text-[#94a3b8] font-sans">
      <div className="bg-red-600 py-3.5">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-3">
          <div className="text-white font-bold text-base">
            🚨 24×7 Emergency:{" "}
            <a href={"tel:" + data.emergency} className="text-white underline underline-offset-4">
              {data.emergency}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white text-sm">{data.timing}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 lg:gap-12">
        {/* Column 1: Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <a href="/" className="no-underline flex items-center gap-2">
              <img src={data.logo} alt={data.name} width={140} height={70} className="rounded-lg object-contain" />
            </a>
          </div>
          <p>{data.footer?.tagline}</p>
          <p className="text-[0.88rem] leading-[1.7] max-w-xs">{data.footer?.description}</p>
          <div className="flex gap-2">
            {socialLinks.map(function (item, index) {
              return <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-[#94a3b8] text-base transition-all duration-200 hover:bg-blue-500 hover:text-white">
                {item.icon}
              </a>;
            })}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-0">
          <div className="flex flex-col">
            <h5 className="text-white text-[0.95rem] font-semibold mb-4">Quick Links</h5>
            <ul className="flex flex-col gap-2">
              {links.map(function (link) {
                return <li key={link.id}><a href={link.url} className="text-[0.875rem] text-[#94a3b8] hover:text-white transition-colors duration-200">{link.label}</a></li>;
              })}
            </ul>
          </div>
        </div>

        {/* Column 3: Specialties */}
        <div className="flex flex-col">
          <h5 className="text-white text-[0.95rem] font-semibold mb-4">{specialtiesTitle}</h5>
          <ul className="flex flex-col gap-2">
            {specialties.map(function (s, i) {
              return <li key={i}><a href={s.url} className="text-[0.875rem] text-[#94a3b8] hover:text-white transition-colors duration-200">{s.label}</a></li>;
            })}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="flex flex-col gap-4">
          <h5 className="text-white text-[0.95rem] font-semibold mb-4">{data.footer?.contactTitle}</h5>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2.5 items-start">
              <span className="mt-0.5">📍</span>
              <span className="text-[0.875rem]">{data.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <a href={"tel:" + data.phone} className="text-[0.875rem] text-[#94a3b8] hover:text-white transition-colors">{data.phone}</a>
            </div>
            <div className="flex items-center gap-2">
              <span>✉️</span>
              <a href={"mailto:" + data.email} className="text-[0.875rem] text-[#94a3b8] hover:text-white transition-colors">{data.email}</a>
            </div>
            <div className="mt-2">
              <a href="/appointment" className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-full text-[0.875rem] font-semibold transition-all hover:bg-blue-700 active:scale-95">
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 text-[0.82rem]">
          <p>© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
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