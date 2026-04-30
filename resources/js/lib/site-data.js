// ===========================
// RADDIANT PLUS — Dynamic Site Data
// ===========================

export const getSiteData = () => {
    return window.__SITE_DATA__ || {
        name: "Raddiant Plus Hospital",
        tagline: "Multispecialty & Diagnostic Centre",
        phone: "+91 93565 10704",
        whatsapp: "91 93565 10704",
        email: "care@raddiantplus.com",
        address: "Nashik, Maharashtra",
        social: {
            facebook: "#",
            instagram: "#",
            youtube: "#",
        },
        emergency: "108",
        nav: {
            home: true,
            about: true,
            services: true,
            facilities: true,
            blog: true,
            gallery: true,
            contact: true,
            careers: true,
            appointment: true,
        },
        footerAbout: "Raddiant Plus Hospital is a leading multispecialty hospital in Nashik providing world-class healthcare services.",
        timing: "24x7 Emergency | OPD: Mon-Sat 9:00 AM - 6:00 PM",
    };
};

export const SITE = getSiteData();

export const NAV_LINKS = [
    SITE.nav.home && { href: "/", label: "Home" },
    SITE.nav.about && { href: "/about", label: "About Us" },
    SITE.nav.services && { href: "/services", label: "Services" },
    SITE.nav.facilities && { href: "/facilities", label: "Facilities" },
    SITE.nav.blog && { href: "/blog", label: "Blog" },
    SITE.nav.gallery && { href: "/gallery", label: "Gallery" },
    SITE.nav.contact && { href: "/contact", label: "Contact" },
    SITE.nav.careers && { href: "/careers", label: "Careers" },
].filter(Boolean);