// ===========================
// RADDIANT PLUS — Site Data
// ===========================
export const SITE = {
  name: "Raddiant Plus Hospital",
  tagline: "Multispecialty & Diagnostic Centre",
  phone: "+91 93565 10704",
  whatsapp: "91 93565 10704",
  email: "care@raddiantplus.com",
  address: "4th & 5th Floor, Roongta Bellvista, Mumbai Agra Service road, near Bhujbal farm, Sadguru Nagar, Nashik, Maharashtra 422009",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.7186604907492!2d73.77543167522843!3d19.978330581421005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddebb97ecc1ae9%3A0x3edc146497f64723!2sRaddiant%20Plus%20Hospital%2C%20Bhujbal%20farm!5e0!3m2!1sen!2sin!4v1775040564194!5m2!1sen!2sin",
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
  },
  emergency: "108",
};

export const SERVICES = [
  { id: "cardiology", icon: "FaHeartbeat", title: "Cardiology", desc: "Advanced cardiac care with state-of-the-art catheterization labs and expert cardiologists.", color: "#e63946" },
  { id: "orthopedics", icon: "FaBone", title: "Orthopedics", desc: "Comprehensive bone, joint, and muscle treatments including joint replacement surgeries.", color: "#0a4d8c" },
  { id: "neurology", icon: "FaBrain", title: "Neurology", desc: "Expert diagnosis and treatment of neurological disorders with advanced imaging.", color: "#7b2d8b" },
  { id: "gynecology", icon: "FaFemale", title: "Gynecology & Obstetrics", desc: "Complete women's health care from prenatal to postnatal with experienced specialists.", color: "#e8a838" },
  { id: "pediatrics", icon: "FaChild", title: "Pediatrics", desc: "Specialized care for children from newborns to adolescents in a child-friendly environment.", color: "#00b4d8" },
  { id: "diagnostics", icon: "FaMicroscope", title: "Diagnostics", desc: "NABL-accredited lab with advanced imaging: MRI, CT Scan, X-Ray, USG, and pathology.", color: "#2a9d8f" },
  { id: "emergency", icon: "FaAmbulance", title: "24x7 Emergency", desc: "Round-the-clock emergency services with a dedicated trauma centre and ICU.", color: "#e63946" },
  { id: "surgery", icon: "FaScalpel", title: "General Surgery", desc: "Minimally invasive laparoscopic and open surgery by experienced surgeons.", color: "#0a4d8c" },
];

export const DOCTORS = [
  { id: 1, name: "Dr. Priya Sharma", specialty: "Cardiologist", experience: "18 Years", qual: "MD, DM (Cardiology)", img: "https://randomuser.me/api/portraits/women/44.jpg", available: "Mon–Sat" },
  { id: 2, name: "Dr. Rahul Desai", specialty: "Orthopedic Surgeon", experience: "15 Years", qual: "MS (Ortho), FICS", img: "https://randomuser.me/api/portraits/men/32.jpg", available: "Mon–Fri" },
  { id: 3, name: "Dr. Anita Kulkarni", specialty: "Gynaecologist", experience: "20 Years", qual: "MD, DNB (OBG)", img: "https://randomuser.me/api/portraits/women/68.jpg", available: "Tue–Sun" },
  { id: 4, name: "Dr. Suresh Patil", specialty: "Neurologist", experience: "12 Years", qual: "DM (Neurology), MD", img: "https://randomuser.me/api/portraits/men/56.jpg", available: "Mon–Sat" },
  { id: 5, name: "Dr. Kavita Joshi", specialty: "Pediatrician", experience: "14 Years", qual: "MD (Pediatrics), DCH", img: "https://randomuser.me/api/portraits/women/26.jpg", available: "Mon–Sat" },
  { id: 6, name: "Dr. Vikram Nair", specialty: "General Surgeon", experience: "16 Years", qual: "MS (Surgery), FIAGES", img: "https://randomuser.me/api/portraits/men/74.jpg", available: "Mon–Fri" },
];

export const TESTIMONIALS = [
  { id: 1, name: "Meera Joshi", text: "Exceptional care at Raddiant Plus. The doctors and staff were incredibly compassionate. My father's cardiac surgery went smoothly and recovery was fast.", rating: 5, tag: "Cardiac Care" },
  { id: 2, name: "Ramesh Pawar", text: "Best diagnostic centre in Nashik! Results were ready quickly and the lab is very clean and organized. Highly recommend for all tests.", rating: 5, tag: "Diagnostics" },
  { id: 3, name: "Sunita Bhandari", text: "Dr. Anita Kulkarni is wonderful. She made my entire pregnancy journey stress-free. The maternity ward is world-class!", rating: 5, tag: "Maternity" },
  { id: 4, name: "Anil Marathe", text: "After my knee replacement surgery, I can walk without pain for the first time in years. Thank you Dr. Desai and the entire team!", rating: 5, tag: "Orthopedics" },
];

export const USPS = [
  { icon: "FaClock", title: "24×7 Emergency Care", desc: "Round-the-clock emergency services with rapid response trauma teams always ready." },
  { icon: "FaUserMd", title: "Expert Specialists", desc: "60+ experienced doctors across 20+ specialties delivering world-class care." },
  { icon: "FaMicroscope", title: "Advanced Diagnostics", desc: "NABL-accredited lab with MRI, CT, digital X-ray, and full pathology services." },
  { icon: "FaShieldAlt", title: "NABH Compliant", desc: "Certified under the National Accreditation Board for Hospitals & Healthcare Providers." },
  { icon: "FaHeartbeat", title: "Patient-Centric Care", desc: "Holistic, compassionate approach keeping patient comfort and dignity at the forefront." },
  { icon: "FaParking", title: "Modern Infrastructure", desc: "State-of-the-art facility with ample parking, cafeteria, and patient-friendly amenities." },
];

export const FAQS = [
  { q: "What are the hospital's visiting hours?", a: "General visiting hours are 10:00 AM – 12:00 PM and 5:00 PM – 7:00 PM daily. ICU visiting is restricted to 15 minutes twice daily. Emergency contact is available 24×7." },
  { q: "How do I book an appointment?", a: "You can book an appointment online via our appointment form, call us at +91 98765 43210, or visit the OPD registration desk directly." },
  { q: "Does Raddiant Plus accept health insurance?", a: "Yes, we accept most major health insurance plans including cashless facilities with over 50 TPA (Third Party Administrator) empanelments." },
  { q: "Is the diagnostic lab NABL accredited?", a: "Yes, our pathology and radiology laboratory is NABL (National Accreditation Board for Testing and Calibration Laboratories) accredited, ensuring the highest quality standards." },
  { q: "What emergency services are available?", a: "We provide 24×7 emergency care including trauma management, cardiac emergencies, stroke care, and a fully equipped ICU with ventilator support." },
  { q: "How can I get my reports?", a: "Lab reports are available digitally via our patient portal, WhatsApp, or can be collected from the lab reception. Most reports are ready within 4–6 hours." },
];

export const BLOG_POSTS = [
  { id: 1, title: "Heart Health: 10 Tips to Keep Your Heart Strong", excerpt: "Cardiologists at Raddiant Plus share simple, evidence-based habits to protect your cardiovascular health this year.", category: "Cardiology", date: "May 10, 2025", readTime: "5 min" },
  { id: 2, title: "Everything You Need to Know About the NABH Standard", excerpt: "What does NABH accreditation mean for patients? Our quality team explains how this certification safeguards your care.", category: "Quality & Safety", date: "Apr 22, 2025", readTime: "4 min" },
  { id: 3, title: "Early Warning Signs of Diabetes You Should Not Ignore", excerpt: "Our endocrinology team outlines the subtle symptoms that often go unnoticed — and when to get tested.", category: "Wellness", date: "Apr 5, 2025", readTime: "6 min" },
];

export const FACILITIES = [
  { title: "Modular Operation Theatres", desc: "4 fully equipped modular OTs with laminar airflow for infection-free surgeries." },
  { title: "16-Bed ICU / CCU", desc: "Round-the-clock intensive care with latest ventilators and cardiac monitors." },
  { title: "Digital Radiology Suite", desc: "3T MRI, 128-slice CT, CR/DR X-Ray, and colour Doppler USG." },
  { title: "NABL-Accredited Laboratory", desc: "Comprehensive pathology, biochemistry, microbiology, and serology testing." },
  { title: "Neonatal ICU (NICU)", desc: "Specialized care for premature and critically ill newborns with expert neonatologists." },
  { title: "Pharmacy & Blood Bank", desc: "24×7 in-house pharmacy and licensed blood bank for emergency requirements." },
];


