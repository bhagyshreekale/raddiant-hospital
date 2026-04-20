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
  
    {
id:"Eye Care",
image: "/images/services/eye-care.jpg",
title: "Eye Care",
desc: "Comprehensive ophthalmology services including cataract surgery and vision correction.",
color: "#f4a261",
  },
  {
    id: "cardiology",
    image: "/images/services/cardiology.jpg",
    title: "Cardiology",
    desc: "Advanced cardiac care with state-of-the-art catheterization labs and expert cardiologists.",
    color: "#e63946",
  },
    {
    id: "pediatrics",
    image: "/images/services/pediatrics.jpg",
    title: "Pediatrics",
    desc: "Specialized care for children from newborns to adolescents in a child-friendly environment.",
    color: "#00b4d8",
  },
  {
    id: "orthopedics",
    image: "/images/services/orthopedics.jpg",
    title: "Orthopedics",
    desc: "Comprehensive bone, joint, and muscle treatments including joint replacement surgeries.",
    color: "#0a4d8c",
  },
    {
    id: "gynecology",
    image: "/images/services/gynecology.jpg",
    title: "Gynecology & Obstetrics",
    desc: "Complete women's health care from prenatal to postnatal with experienced specialists.",
    color: "#e8a838",
  },
  {
    id: "neurology",
    image: "/images/services/neurology.jpg",
    title: "Neurology",
    desc: "Expert diagnosis and treatment of neurological disorders with advanced imaging.",
    color: "#7b2d8b",
  },


  {
    id: "diagnostics",
    image: "/images/services/diagnostics.jpg",
    title: "Diagnostics",
    desc: "NABL-accredited lab with advanced imaging: MRI, CT Scan, X-Ray, USG, and pathology.",
    color: "#2a9d8f",
  },
  {
    id: "emergency",
    image: "/images/services/emergency.jpg",
    title: "24x7 Emergency",
    desc: "Round-the-clock emergency services with a dedicated trauma centre and ICU.",
    color: "#e63946",
  },
  {
    id: "surgery",
    image: "/images/services/surgery.jpg",
    title: "General Surgery",
    desc: "Minimally invasive laparoscopic and open surgery by experienced surgeons.",
    color: "#0a4d8c",
  },

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



export const FACILITIES = [
  { title: "Modular Operation Theatres", desc: "4 fully equipped modular OTs with laminar airflow for infection-free surgeries." },
  { title: "16-Bed ICU / CCU", desc: "Round-the-clock intensive care with latest ventilators and cardiac monitors." },
  { title: "Digital Radiology Suite", desc: "3T MRI, 128-slice CT, CR/DR X-Ray, and colour Doppler USG." },
  { title: "NABL-Accredited Laboratory", desc: "Comprehensive pathology, biochemistry, microbiology, and serology testing." },
  { title: "Neonatal ICU (NICU)", desc: "Specialized care for premature and critically ill newborns with expert neonatologists." },
  { title: "Pharmacy & Blood Bank", desc: "24×7 in-house pharmacy and licensed blood bank for emergency requirements." },
];


export const BLOG_POSTS = [
  {
    id: 'featured',
    featured: true,
    category: 'Cardiology',
    catClass: 'bg-rose-50 text-rose-700',
    date: 'June 12, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80',
    title: 'Understanding Heart Health: Prevention Strategies That Actually Work',
    excerpt: 'Cardiovascular disease remains one of the leading causes of mortality worldwide, yet up to 80% of premature heart disease and strokes can be prevented through healthy lifestyle choices.',
    tags: ['Heart Health', 'Prevention', 'Hypertension', 'Diet', 'Exercise'],
    content: [
      'Cardiovascular disease remains one of the leading causes of mortality worldwide, yet up to 80% of premature heart disease and strokes can be prevented through healthy lifestyle choices and regular medical care.',
      'Our cardiology team at Raddint Hospital recommends focusing on five core pillars: regular physical activity (at least 150 minutes of moderate intensity exercise per week), a heart-healthy diet rich in fiber and low in saturated fats, maintaining a healthy weight, avoiding tobacco, and managing stress effectively.',
      'Blood pressure monitoring is critical — hypertension is often called the "silent killer" because it presents no obvious symptoms. We recommend adults over 40 have their blood pressure checked at least annually, and more frequently if there is a family history of heart disease.',
      'Cholesterol management through diet and, when necessary, medication can significantly reduce the risk of coronary artery disease. Foods like oats, nuts, and fatty fish have shown measurable benefits in multiple clinical studies.',
      'Finally, do not underestimate the role of sleep. Poor sleep quality is now firmly linked to increased cardiovascular risk. Adults should aim for 7–9 hours of quality sleep per night.',
    ],
  },
  {
    id: 'post1',
    category: 'Wellness',
    catClass: 'bg-emerald-50 text-emerald-700',
    date: 'May 28, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    title: '10 Daily Habits for Optimal Mental & Physical Balance',
    excerpt: 'Small lifestyle changes can lead to dramatic improvements in your overall health. Discover the science behind habits that actually stick long-term.',
    tags: ['Wellness', 'Mental Health', 'Lifestyle', 'Habits'],
    content: [
      'Building a healthier life does not require dramatic overhauls — it starts with small, consistent habits practiced daily. Our wellness specialists have identified ten habits that are supported by research and easy to implement.',
      'Morning hydration: drink a glass of water within 15 minutes of waking. After 7–8 hours without water, your body needs rehydration before caffeine. Mindful movement: even a 10-minute walk after meals significantly improves blood glucose regulation.',
      'Consistent sleep schedule: going to bed and waking at the same time every day — including weekends — regulates your circadian rhythm and improves sleep quality dramatically.',
      'Gratitude practice: just three minutes of noting what you are grateful for each morning has been shown in studies to reduce cortisol and improve emotional resilience significantly.',
    ],
  },
  {
    id: 'post2',
    category: 'Quality & Safety',
    catClass: 'bg-blue-50 text-blue-700',
    date: 'May 20, 2025',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    title: 'How Modern Hospitals Ensure Patient Safety Standards',
    excerpt: 'From digital checklists to AI-driven diagnostics, learn how Raddint Hospital sets new benchmarks in patient care quality and safety.',
    tags: ['Patient Safety', 'Quality Care', 'Hospital Standards'],
    content: [
      'Patient safety is the foundation of quality healthcare. At Raddint Multispecialty Hospital, we have implemented a multi-layered approach to safety that goes far beyond standard protocols.',
      'Our electronic health record system flags potential drug interactions automatically, reducing medication errors by over 60% compared to manual processes. Every prescription order is cross-checked against the patient\'s complete history and known allergies in real time.',
      'Infection control is another critical pillar. We follow WHO-recommended hand hygiene protocols and conduct monthly audits. Our HAI rates are consistently below the national average.',
      'We also embrace a culture of open incident reporting, where staff are encouraged — not penalized — for reporting near-misses. These reports feed into continuous improvement cycles.',
    ],
  },
  {
    id: 'post3',
    category: 'Eye Care',
    catClass: 'bg-sky-50 text-sky-700',
    date: 'May 14, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=800&q=80',
    title: 'Protecting Your Vision in the Age of Screens',
    excerpt: 'Extended screen time is causing a global surge in digital eye strain. Our ophthalmologists explain what works and what does not.',
    tags: ['Eye Care', 'Digital Eye Strain', 'Vision Health'],
    content: [
      'Digital eye strain — also known as computer vision syndrome — now affects an estimated 65% of adults who use screens for more than two hours daily. Symptoms range from dry, irritated eyes to blurred vision and headaches.',
      'The 20-20-20 rule is the most evidence-backed intervention: every 20 minutes, look at something 20 feet away for at least 20 seconds. This gives your ciliary muscles a chance to relax.',
      'Proper screen positioning matters enormously: your monitor should be 20–28 inches from your face, with the top of the screen at or slightly below eye level.',
      'If you wear glasses or contact lenses, ensure your prescription is current. An outdated prescription is one of the most common — and most overlooked — causes of persistent eye strain.',
    ],
  },
  {
    id: 'post4',
    category: 'Neurology',
    catClass: 'bg-amber-50 text-amber-700',
    date: 'May 5, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80',
    title: 'Migraine vs. Headache: Key Differences & When to See a Doctor',
    excerpt: 'Not all head pain is the same. Understanding the distinction can help you seek the right treatment at the right time.',
    tags: ['Neurology', 'Migraine', 'Headache', 'Brain Health'],
    content: [
      'Many people use the terms "migraine" and "headache" interchangeably, but they represent very different neurological conditions requiring different treatments.',
      'A tension headache typically presents as a dull, pressing pain on both sides of the head, often described as a tight band. It is usually mild to moderate in intensity and does not worsen with routine activity.',
      'Migraines are a neurological disorder characterized by moderate-to-severe throbbing pain, typically on one side. They are often accompanied by nausea, vomiting, and extreme sensitivity to light and sound.',
      'You should seek medical attention if headaches are new and severe, occur after a head injury, are accompanied by fever, stiff neck, confusion, or vision changes, or if your pattern changes significantly.',
    ],
  },
  {
    id: 'post5',
    category: 'Orthopedics',
    catClass: 'bg-slate-100 text-slate-700',
    date: 'April 30, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?w=800&q=80',
    title: 'Back Pain Relief: Evidence-Based Exercises You Can Do at Home',
    excerpt: 'Chronic back pain affects millions. Our orthopedic specialists share targeted exercises that provide lasting relief without medication.',
    tags: ['Orthopedics', 'Back Pain', 'Exercise', 'Physiotherapy'],
    content: [
      'Chronic lower back pain is one of the most common reasons people visit a doctor worldwide, yet many cases can be effectively managed through targeted exercise.',
      'Contrary to old advice, bed rest is now known to worsen back pain. Movement, done correctly, promotes healing by increasing blood flow, improving spinal flexibility, and strengthening supportive muscles.',
      'The cat-cow stretch is an excellent starting point: on hands and knees, alternate between arching your back upward and letting it sag downward, holding each for 3–5 seconds. Repeat 10 times daily.',
      'The McGill Big Three (curl-up, side bridge, and bird-dog) have the strongest evidence base for chronic lower back pain. Our physiotherapy team can guide you through a tailored program.',
    ],
  },
  {
    id: 'post6',
    category: 'Wellness',
    catClass: 'bg-emerald-50 text-emerald-700',
    date: 'April 22, 2025',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    title: 'Nutrition Science: Foods That Genuinely Boost Immunity',
    excerpt: 'The relationship between diet and immune function is complex. We break down what the science actually says about immune-boosting foods.',
    tags: ['Nutrition', 'Immunity', 'Wellness', 'Diet Science'],
    content: [
      'The immune system is extraordinarily complex, and no single food can "supercharge" it overnight. However, consistent nutrition patterns do meaningfully influence immune function over time.',
      'Vitamin C is well-established as supportive for immune health. Beyond citrus fruits, excellent sources include bell peppers (which contain nearly 3x the vitamin C of an orange), broccoli, kiwi, and strawberries.',
      'Fermented foods like yogurt, kefir, kimchi, and sauerkraut support gut health, and given that approximately 70% of the immune system is located in the gut-associated lymphoid tissue, this connection is significant.',
      'Perhaps most important: no supplement can compensate for poor sleep, chronic stress, or a consistently poor diet. Immunity is built through foundational healthy habits.',
    ],
  },
];

export const CATEGORIES = ['All', 'Cardiology', 'Wellness', 'Quality & Safety', 'Eye Care', 'Neurology', 'Orthopedics'];


