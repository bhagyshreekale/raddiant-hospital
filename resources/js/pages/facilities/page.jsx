'use client';
import { useState, useEffect } from 'react';
import CTABanner from '../../components/sections/CTABanner';

/* ── BED DATA ── */
const BED_TYPES = [
  {
    type: "General Ward",
    icon: "🛏️",
    total: 40,
    available: 12,
    price: "₹1,200",
    priceNote: "per day",
    includes: ["Nursing care", "Meals (basic)", "Doctor rounds", "Medicines (basic)"],
    color: "#2a9d8f",
  },
  {
    type: "Semi-Private Room",
    icon: "🏨",
    total: 20,
    available: 6,
    price: "₹2,500",
    priceNote: "per day",
    includes: ["Shared AC room (2 beds)", "Attached washroom", "Meals included", "TV & Wi-Fi"],
    color: "#1a6bbf",
  },
  {
    type: "Private Room",
    icon: "🏩",
    total: 16,
    available: 4,
    price: "₹4,000",
    priceNote: "per day",
    includes: ["Single AC room", "Attendant sofa bed", "All meals included", "TV, Wi-Fi & Fridge"],
    color: "#013a6f",
  },
  {
    type: "Deluxe Suite",
    icon: "✨",
    total: 6,
    available: 2,
    price: "₹7,500",
    priceNote: "per day",
    includes: ["Luxury AC suite", "Living area for family", "Premium meals", "Dedicated nurse"],
    color: "#e8a838",
  },
  {
    type: "ICU / CCU",
    icon: "❤️",
    total: 16,
    available: 5,
    price: "₹8,500",
    priceNote: "per day",
    includes: ["24×7 intensivist", "Ventilator support", "Continuous monitoring", "Isolation facility"],
    color: "#e63946",
  },
  {
    type: "NICU",
    icon: "👶",
    total: 10,
    available: 3,
    price: "₹6,000",
    priceNote: "per day",
    includes: ["Neonatologist on call", "Incubator / warmer", "Phototherapy unit", "Parent counselling"],
    color: "#00b4d8",
  },
];

const TPA_INSURERS = [
  { name: "Star Health", logo: "★", type: "Direct Cashless" },
  { name: "HDFC ERGO", logo: "H", type: "Direct Cashless" },
  { name: "ICICI Lombard", logo: "IC", type: "Direct Cashless" },
  { name: "New India Assurance", logo: "NI", type: "Direct Cashless" },
  { name: "United India", logo: "UI", type: "Direct Cashless" },
  { name: "Oriental Insurance", logo: "OI", type: "Direct Cashless" },
  { name: "Bajaj Allianz", logo: "BA", type: "Direct Cashless" },
  { name: "Niva Bupa", logo: "NB", type: "Direct Cashless" },
  { name: "Aditya Birla Health", logo: "AB", type: "Direct Cashless" },
  { name: "Care Health", logo: "CH", type: "Direct Cashless" },
  { name: "Reliance General", logo: "RG", type: "Reimbursement" },
  { name: "PMJAY (Ayushman)", logo: "🏛", type: "Government" },
  { name: "Mahatma Jyotiba Phule", logo: "MJ", type: "Government" },
  { name: "ESIC", logo: "ES", type: "Government" },
  { name: "CGHS / ECHS", logo: "CG", type: "Government" },
  { name: "Medi Assist TPA", logo: "MA", type: "TPA" },
  { name: "Paramount TPA", logo: "PT", type: "TPA" },
  { name: "Vipul Medcorp TPA", logo: "VM", type: "TPA" },
];

/* ── data ── */
export const FACILITIES = [
  { title: "Modular Operation Theatres", desc: "4 fully equipped modular OTs with laminar airflow for infection-free surgeries.", icon: "🔬" },
  { title: "16-Bed ICU / CCU", desc: "Round-the-clock intensive care with latest ventilators and cardiac monitors.", icon: "❤️" },
  { title: "Digital Radiology Suite", desc: "3T MRI, 128-slice CT, CR/DR X-Ray, and colour Doppler USG.", icon: "🖥️" },
  { title: "NABL-Accredited Laboratory", desc: "Comprehensive pathology, biochemistry, microbiology, and serology testing.", icon: "🧪" },
  { title: "Neonatal ICU (NICU)", desc: "Specialized care for premature and critically ill newborns with expert neonatologists.", icon: "👶" },
  { title: "Pharmacy & Blood Bank", desc: "24×7 in-house pharmacy and licensed blood bank for emergency requirements.", icon: "💊" },
];

const AMENITIES = [
  'Ample free parking', 'In-house pharmacy 24×7', 'Cafeteria & canteen',
  'Patient counselling rooms', 'Private & semi-private rooms', 'Wheelchair access throughout',
  'Free Wi-Fi in waiting areas', 'Ambulance services',
];

const HEALTH_PACKAGES = [
  {
    name: "Essential Care",
    subtitle: "Basic Wellness Screening",
    price: "₹999",
    badge: null,
    color: "#1a6bbf",
    tests: 28,
    features: [
      "Complete Blood Count (CBC)",
      "Blood Sugar (Fasting)",
      "Lipid Profile",
      "Liver Function Test",
      "Kidney Function Test",
      "Urine Routine",
      "Chest X-Ray",
      "Doctor Consultation",
    ],
  },
  {
    name: "Comprehensive Health",
    subtitle: "Full Body Check-Up",
    price: "₹2,499",
    badge: "Most Popular",
    color: "#00b4d8",
    tests: 65,
    features: [
      "Everything in Essential Care",
      "Thyroid Profile (T3, T4, TSH)",
      "Vitamin B12 & D3",
      "HbA1c (Diabetes Screening)",
      "ECG",
      "Ultrasound Abdomen",
      "Eye & Dental Checkup",
      "Dietician Consultation",
    ],
  },
  {
    name: "Executive Platinum",
    subtitle: "Premium Head-to-Toe",
    price: "₹4,999",
    badge: "Best Value",
    color: "#e8a838",
    tests: 110,
    features: [
      "Everything in Comprehensive",
      "Cardiac Stress Test (TMT)",
      "CT Coronary Angiography",
      "Bone Density (DEXA Scan)",
      "Cancer Markers (PSA / CA-125)",
      "Sleep Study Consultation",
      "Pulmonary Function Test",
      "Senior Physician Review",
    ],
  },
  {
    name: "Women's Wellness",
    subtitle: "Designed for Her",
    price: "₹1,999",
    badge: null,
    color: "#e63946",
    tests: 48,
    features: [
      "CBC, Blood Sugar, Lipid Profile",
      "Thyroid & Hormonal Panel",
      "Pap Smear",
      "Breast Examination",
      "Pelvic Ultrasound",
      "Bone Health (Calcium / Vit D)",
      "Iron Studies",
      "Gynaecologist Consultation",
    ],
  },
  {
    name: "Senior Citizen Care",
    subtitle: "60+ Health Guard",
    price: "₹3,499",
    badge: null,
    color: "#2a9d8f",
    tests: 80,
    features: [
      "Comprehensive Blood Panel",
      "Cardiac Evaluation + ECG",
      "Joint & Bone Density Scan",
      "Prostate / Hormonal Screen",
      "Memory & Cognitive Screen",
      "Carotid Doppler Study",
      "Ophthalmology Review",
      "Geriatrician Consultation",
    ],
  },
  {
    name: "Diabetes Care Plus",
    subtitle: "Sugar & Beyond",
    price: "₹1,499",
    badge: null,
    color: "#e8a838",
    tests: 35,
    features: [
      "HbA1c, Fasting & PP Sugar",
      "Kidney & Liver Function",
      "Lipid Profile",
      "Foot Examination",
      "Fundus Eye Checkup",
      "Nerve Conduction Study",
      "Diet & Nutrition Plan",
      "Diabetologist Consultation",
    ],
  },
];

/* ── page-scoped styles only — all tokens from global CSS ── */
const pageStyles = `
  .fac-hero {
    background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 55%, var(--accent) 100%);
    padding: 96px 0 80px;
    position: relative;
    overflow: hidden;
  }
  .fac-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 50% 60% at 75% 40%, rgba(0,180,216,.18) 0%, transparent 65%);
    pointer-events: none;
  }
  .fac-hero::after {
    content: '';
    position: absolute; bottom: -1px; left: 0; right: 0; height: 56px;
    background: var(--white);
    clip-path: ellipse(54% 100% at 50% 100%);
  }
  .fac-hero-inner { position: relative; z-index: 1; text-align: center; }
  .fac-hero h1 { color: var(--white); margin-bottom: 16px; }
  .fac-hero > .container > .fac-hero-inner p {
    color: rgba(255,255,255,.75); max-width: 520px; margin: 0 auto;
  }
  .fac-stats {
    display: flex; justify-content: center; gap: 48px; margin-top: 52px; flex-wrap: wrap;
  }
  .fac-stat { text-align: center; }
  .fac-stat-num {
    display: block;
    font-family: var(--font-display); font-size: 2rem; font-weight: 700;
    color: var(--accent-light); line-height: 1;
  }
  .fac-stat-label { font-size: .78rem; color: rgba(255,255,255,.6); margin-top: 4px; letter-spacing: .05em; }

  /* facilities grid */
  .fac-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }
  .fac-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--gray-200);
    padding: 32px 28px;
    transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
    position: relative; overflow: hidden;
  }
  .fac-card::after {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--primary-light));
    transform: scaleX(0); transform-origin: left;
    transition: transform var(--transition);
  }
  .fac-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-xl); border-color: var(--accent); }
  .fac-card:hover::after { transform: scaleX(1); }
  .fac-num {
    width: 46px; height: 46px;
    background: linear-gradient(135deg, var(--primary-light), var(--primary));
    border-radius: var(--radius-md);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-weight: 700; font-size: 1rem; color: var(--white);
    margin-bottom: 14px;
  }
  .fac-icon { font-size: 1.4rem; margin-bottom: 6px; }
  .fac-card h3 { font-size: 1.05rem; margin-bottom: 8px; }
  .fac-card p { font-size: .875rem; line-height: 1.7; color: var(--gray-500); }

  /* amenities */
  .amenities-box {
    margin-top: 64px;
    background: var(--off-white);
    border-radius: var(--radius-xl);
    padding: 52px 44px;
    border: 1px solid var(--gray-200);
  }
  .amenities-box h2 { text-align: center; margin-bottom: 8px; }
  .amenities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 14px;
  }
  .amenity-pill {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 16px;
    background: var(--white); border-radius: var(--radius-md);
    border: 1px solid var(--gray-200); box-shadow: var(--shadow-sm);
    transition: border-color var(--transition), box-shadow var(--transition);
  }
  .amenity-pill:hover { border-color: var(--accent); box-shadow: var(--shadow-md); }
  .amenity-check {
    width: 22px; height: 22px; border-radius: 50%; background: var(--success);
    display: flex; align-items: center; justify-content: center;
    color: var(--white); font-size: .65rem; font-weight: 700; flex-shrink: 0;
  }
  .amenity-text { font-size: .875rem; font-weight: 500; color: var(--gray-700); }

  /* packages */
  .pkg-section {
    background: var(--gray-900);
    padding: 96px 0;
    position: relative; overflow: hidden;
  }
  .pkg-section::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 40% 45% at 8% 20%, rgba(0,180,216,.1) 0%, transparent 60%),
      radial-gradient(ellipse 35% 40% at 92% 80%, rgba(26,107,191,.12) 0%, transparent 60%);
    pointer-events: none;
  }
  .pkg-head { position: relative; z-index: 1; }
  .pkg-section .section-label {
    background: rgba(0,180,216,.12);
    color: var(--accent-light);
    border-color: rgba(0,180,216,.3);
  }
  .pkg-section h2 { color: var(--white); }
  .pkg-section .section-subtitle { color: rgba(255,255,255,.5); }

  .pkg-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    position: relative; z-index: 1;
  }
  .pkg-card {
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: var(--radius-lg);
    overflow: hidden;
    display: flex; flex-direction: column;
    transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
  }
  .pkg-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 60px rgba(0,0,0,.35);
    border-color: rgba(255,255,255,.16);
  }
  .pkg-card.featured {
    background: rgba(0,180,216,.06);
    border-color: rgba(0,180,216,.35);
    box-shadow: 0 0 0 1px rgba(0,180,216,.2), 0 8px 32px rgba(0,180,216,.15);
  }
  .pkg-header { padding: 30px 28px 22px; position: relative; }
  .pkg-badge {
    position: absolute; top: 18px; right: 18px;
    font-size: .68rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
    padding: 5px 13px; border-radius: var(--radius-full); color: var(--white);
  }
  .pkg-eyebrow {
    font-size: .72rem; font-weight: 600; letter-spacing: .1em;
    text-transform: uppercase; margin-bottom: 8px;
  }
  .pkg-name {
    font-family: var(--font-display); font-size: 1.3rem; font-weight: 700;
    color: var(--white); margin-bottom: 3px;
  }
  .pkg-sub { font-size: .82rem; color: rgba(255,255,255,.45); margin-bottom: 20px; }
  .pkg-price-row { display: flex; align-items: flex-end; gap: 6px; margin-bottom: 14px; }
  .pkg-price {
    font-family: var(--font-display); font-size: 2.4rem; font-weight: 700;
    color: var(--white); line-height: 1;
  }
  .pkg-per { font-size: .8rem; color: rgba(255,255,255,.4); margin-bottom: 5px; }
  .pkg-params {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 13px; border-radius: var(--radius-full);
    background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
    font-size: .78rem; font-weight: 500; color: rgba(255,255,255,.6);
  }
  .pkg-sep { height: 1px; background: rgba(255,255,255,.07); margin: 0 28px; }
  .pkg-features { padding: 22px 28px; flex: 1; }
  .pkg-features ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .pkg-features li {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: .875rem; color: rgba(255,255,255,.72); line-height: 1.55;
  }
  .pkg-tick {
    width: 18px; height: 18px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: .6rem; font-weight: 700; color: var(--white); flex-shrink: 0; margin-top: 1px;
  }
  .pkg-footer { padding: 18px 28px 28px; }
  .pkg-btn {
    width: 100%; padding: 13px;
    border-radius: var(--radius-full);
    font-family: var(--font-body); font-size: .9rem; font-weight: 600;
    border: none; cursor: pointer; color: var(--white);
    transition: filter var(--transition), transform .15s;
  }
  .pkg-btn:hover { filter: brightness(1.12); transform: scale(1.01); }
  .pkg-btn-ghost {
    background: rgba(255,255,255,.07) !important;
    border: 1.5px solid rgba(255,255,255,.15) !important;
  }
  .pkg-note {
    text-align: center; color: rgba(255,255,255,.32);
    font-size: .8rem; margin-top: 36px; position: relative; z-index: 1;
  }

  /* ── BED AVAILABILITY ── */
  .bed-section {
    background: var(--off-white);
    padding: 96px 0;
  }
  .bed-live-bar {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    margin-bottom: 48px;
  }
  .bed-live-dot {
    width: 10px; height: 10px; border-radius: 50%; background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34,197,94,.25);
    animation: pulse-dot 1.8s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,.25); }
    50% { box-shadow: 0 0 0 7px rgba(34,197,94,.08); }
  }
  .bed-live-text {
    font-size: .78rem; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: #16a34a;
  }
  .bed-live-time { font-size: .75rem; color: var(--gray-500); }

  .bed-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  .bed-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    border: 1.5px solid var(--gray-200);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    transition: transform var(--transition), box-shadow var(--transition);
  }
  .bed-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }

  .bed-card-top {
    padding: 22px 24px 18px;
    border-bottom: 1px solid var(--gray-200);
    display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
  }
  .bed-type-info { flex: 1; }
  .bed-icon { font-size: 1.5rem; margin-bottom: 6px; display: block; }
  .bed-type-name {
    font-family: var(--font-display); font-size: 1.05rem; font-weight: 600;
    color: var(--gray-900); margin-bottom: 2px;
  }
  .bed-avail-tag {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: var(--radius-full);
    font-size: .72rem; font-weight: 700;
  }
  .bed-avail-dot { width: 7px; height: 7px; border-radius: 50%; }

  .bed-price-block { text-align: right; flex-shrink: 0; }
  .bed-price {
    font-family: var(--font-display); font-size: 1.4rem; font-weight: 700;
  }
  .bed-price-note { font-size: .72rem; color: var(--gray-500); }

  .bed-meter { padding: 14px 24px; }
  .bed-meter-label {
    display: flex; justify-content: space-between;
    font-size: .75rem; color: var(--gray-500); margin-bottom: 6px;
  }
  .bed-meter-track {
    height: 7px; background: var(--gray-200); border-radius: 99px; overflow: hidden;
  }
  .bed-meter-fill {
    height: 100%; border-radius: 99px;
    transition: width .6s ease;
  }

  .bed-includes {
    padding: 14px 24px 20px;
    border-top: 1px solid var(--gray-100);
  }
  .bed-includes ul {
    list-style: none; display: flex; flex-direction: column; gap: 6px;
  }
  .bed-includes li {
    display: flex; align-items: center; gap: 8px;
    font-size: .8rem; color: var(--gray-700);
  }
  .bed-includes li::before {
    content: '✓'; font-weight: 700; font-size: .7rem;
    color: var(--success); flex-shrink: 0;
  }

  /* ── INSURANCE / TPA ── */
  .ins-section { padding: 96px 0; }
  .ins-filter-row {
    display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;
    margin-bottom: 40px;
  }
  .ins-filter-btn {
    padding: 7px 20px; border-radius: var(--radius-full);
    font-size: .82rem; font-weight: 600; border: 1.5px solid var(--gray-200);
    background: var(--white); color: var(--gray-500); cursor: pointer;
    transition: all var(--transition);
  }
  .ins-filter-btn:hover { border-color: var(--accent); color: var(--accent); }
  .ins-filter-btn.active {
    background: var(--primary); color: var(--white); border-color: var(--primary);
  }

  .ins-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    gap: 14px;
  }
  .ins-card {
    background: var(--white);
    border: 1.5px solid var(--gray-200);
    border-radius: var(--radius-md);
    padding: 18px 16px;
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    text-align: center;
    transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
    cursor: default;
  }
  .ins-card:hover { border-color: var(--primary-light); box-shadow: var(--shadow-md); transform: translateY(-3px); }
  .ins-logo {
    width: 46px; height: 46px; border-radius: var(--radius-md);
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: .85rem; color: var(--white);
  }
  .ins-name { font-size: .82rem; font-weight: 600; color: var(--gray-900); line-height: 1.3; }
  .ins-type-badge {
    font-size: .68rem; font-weight: 700; padding: 2px 9px;
    border-radius: var(--radius-full); letter-spacing: .05em;
  }

  .ins-helpbox {
    margin-top: 48px;
    background: linear-gradient(135deg, var(--primary-dark), var(--primary));
    border-radius: var(--radius-xl);
    padding: 40px 36px;
    display: flex; align-items: center; justify-content: space-between; gap: 24px;
    flex-wrap: wrap;
  }
  .ins-helpbox-text h3 { color: var(--white); margin-bottom: 6px; font-size: 1.2rem; }
  .ins-helpbox-text p { color: rgba(255,255,255,.7); font-size: .9rem; max-width: 480px; }
  .ins-helpbox-btns { display: flex; gap: 12px; flex-wrap: wrap; flex-shrink: 0; }

  /* responsive */
  @media (max-width: 768px) {
    .fac-hero { padding: 72px 0 60px; }
    .fac-stats { gap: 28px; }
    .amenities-box { padding: 36px 20px; }
    .pkg-section { padding: 64px 0; }
    .pkg-price { font-size: 2rem; }
    .bed-section, .ins-section { padding: 64px 0; }
    .ins-helpbox { text-align: center; justify-content: center; }
    .ins-helpbox-btns { justify-content: center; }
  }
  @media (max-width: 560px) {
    .fac-grid, .pkg-grid, .amenities-grid { grid-template-columns: 1fr; }
    .bed-grid { grid-template-columns: 1fr; }
    .ins-grid { grid-template-columns: repeat(2, 1fr); }
  }
`;

function getAvailColor(available, total) {
  const pct = available / total;
  if (pct === 0) return { bg: '#fee2e2', text: '#dc2626', dot: '#dc2626', label: 'Full' };
  if (pct <= 0.25) return { bg: '#fef3c7', text: '#d97706', dot: '#f59e0b', label: `${available} left` };
  return { bg: '#dcfce7', text: '#16a34a', dot: '#22c55e', label: `${available} available` };
}

function getInsColor(type) {
  if (type === 'Direct Cashless') return { bg: '#013a6f', badge: { bg: 'rgba(0,180,216,.12)', color: '#00b4d8' } };
  if (type === 'Government') return { bg: '#2a9d8f', badge: { bg: 'rgba(42,157,143,.12)', color: '#2a9d8f' } };
  if (type === 'TPA') return { bg: '#e8a838', badge: { bg: 'rgba(232,168,56,.12)', color: '#c48a1a' } };
  return { bg: '#64748b', badge: { bg: 'rgba(100,116,139,.12)', color: '#64748b' } };
}

export default function FacilitiesPage() {
  const [insFilter, setInsFilter] = useState('All');
  const [tick, setTick] = useState(0);

  // simulate live clock
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 60000);
    return () => clearInterval(t);
  }, []);

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  const insFilters = ['All', 'Direct Cashless', 'Government', 'TPA', 'Reimbursement'];
  const filteredIns = insFilter === 'All' ? TPA_INSURERS : TPA_INSURERS.filter(i => i.type === insFilter);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      {/* HERO */}
      <section className="fac-hero">
        <div className="container">
          <div className="fac-hero-inner">
            <span className="section-label">Infrastructure & Wellness</span>
            <h1>World-Class Facilities<br />& Health Packages</h1>
            <p>State-of-the-art infrastructure paired with affordable preventive health packages — your complete well-being, under one roof.</p>
            <div className="fac-stats">
              {[['6+', 'Specialty Depts'], ['110+', 'Tests in Premium'], ['24×7', 'Emergency Care'], ['NABL', 'Accredited Lab']].map(([num, label]) => (
                <div key={label} className="fac-stat">
                  <span className="fac-stat-num">{num}</span>
                  <div className="fac-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="section-py">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-label">Our Infrastructure</span>
            <h2 className="section-title">Advanced Medical Facilities</h2>
            <div className="divider-accent mx-auto" />
            <p className="section-subtitle mx-auto">
              Every department is equipped with cutting-edge technology and manned by experienced specialists.
            </p>
          </div>

          <div className="fac-grid">
            {FACILITIES.map((f, i) => (
              <div key={i} className="fac-card">
                <div className="fac-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="fac-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* AMENITIES */}
          <div className="amenities-box">
            <h2>Patient Amenities</h2>
            <div className="divider-accent mx-auto" style={{ marginBottom: 32, marginTop: 8 }} />
            <div className="amenities-grid">
              {AMENITIES.map(a => (
                <div key={a} className="amenity-pill">
                  <div className="amenity-check">✓</div>
                  <span className="amenity-text">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HEALTH PACKAGES */}
      <section className="pkg-section">
        <div className="container">
          <div className="text-center mb-5 pkg-head">
            <span className="section-label">Health Packages</span>
            <h2 className="section-title">Choose Your Wellness Plan</h2>
            <div className="divider-accent mx-auto" />
            <p className="section-subtitle mx-auto">
              Preventive health check-ups at transparent prices — no hidden charges, reports within 24 hours.
            </p>
          </div>

          <div className="pkg-grid">
            {HEALTH_PACKAGES.map((pkg, i) => (
              <div key={i} className={`pkg-card${pkg.badge === 'Most Popular' ? ' featured' : ''}`}>
                <div className="pkg-header">
                  {pkg.badge && (
                    <div className="pkg-badge" style={{ background: pkg.color }}>{pkg.badge}</div>
                  )}
                  <div className="pkg-eyebrow" style={{ color: pkg.color }}>{pkg.subtitle}</div>
                  <div className="pkg-name">{pkg.name}</div>
                  <div className="pkg-sub">{pkg.subtitle}</div>
                  <div className="pkg-price-row">
                    <div className="pkg-price">{pkg.price}</div>
                    <div className="pkg-per">/ person</div>
                  </div>
                  <div className="pkg-params">🧪 {pkg.tests}+ parameters included</div>
                </div>

                <div className="pkg-sep" />

                <div className="pkg-features">
                  <ul>
                    {pkg.features.map((feat, j) => (
                      <li key={j}>
                        <div className="pkg-tick" style={{ background: pkg.color }}>✓</div>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pkg-footer">
                  <button
                    className={`pkg-btn${pkg.badge ? '' : ' pkg-btn-ghost'}`}
                    style={pkg.badge ? { background: pkg.color } : {}}
                  >
                    Book This Package →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="pkg-note">
            * Home sample collection available on request &nbsp;·&nbsp; Reports within 24 hrs &nbsp;·&nbsp; No hidden charges
          </p>
        </div>
      </section>

      {/* ── LIVE BED AVAILABILITY ── */}
      <section className="bed-section">
        <div className="container">
          <div className="text-center mb-4">
            <span className="section-label">Live Availability</span>
            <h2 className="section-title">Bed Availability & Pricing</h2>
            <div className="divider-accent mx-auto" />
            <p className="section-subtitle mx-auto">
              Real-time bed status updated every hour. Call us to confirm or book instantly.
            </p>
          </div>

          <div className="bed-live-bar">
            <div className="bed-live-dot" />
            <span className="bed-live-text">Live Status</span>
            <span className="bed-live-time">— Last updated {timeStr}</span>
          </div>

          <div className="bed-grid">
            {BED_TYPES.map((bed, i) => {
              const avail = getAvailColor(bed.available, bed.total);
              const fillPct = Math.round((bed.available / bed.total) * 100);
              return (
                <div key={i} className="bed-card">
                  <div className="bed-card-top">
                    <div className="bed-type-info">
                      <span className="bed-icon">{bed.icon}</span>
                      <div className="bed-type-name">{bed.type}</div>
                      <div
                        className="bed-avail-tag"
                        style={{ background: avail.bg, color: avail.text }}
                      >
                        <div className="bed-avail-dot" style={{ background: avail.dot }} />
                        {avail.label}
                      </div>
                    </div>
                    <div className="bed-price-block">
                      <div className="bed-price" style={{ color: bed.color }}>{bed.price}</div>
                      <div className="bed-price-note">{bed.priceNote}</div>
                    </div>
                  </div>

                  <div className="bed-meter">
                    <div className="bed-meter-label">
                      <span>{bed.available} of {bed.total} beds free</span>
                      <span>{fillPct}% available</span>
                    </div>
                    <div className="bed-meter-track">
                      <div
                        className="bed-meter-fill"
                        style={{ width: `${fillPct}%`, background: avail.dot }}
                      />
                    </div>
                  </div>

                  <div className="bed-includes">
                    <ul>
                      {bed.includes.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{ textAlign: 'center', color: 'var(--gray-500)', fontSize: '.82rem', marginTop: 24 }}>
            * Prices are indicative and may vary based on doctor charges, investigations & duration of stay.
            &nbsp;Insurance & TPA admissible for all categories.
          </p>
        </div>
      </section>

      {/* ── INSURANCE & TPA ── */}
      <section className="ins-section">
        <div className="container">
          <div className="text-center mb-2">
            <span className="section-label">Cashless & TPA</span>
            <h2 className="section-title">Insurance & TPA Partners</h2>
            <div className="divider-accent mx-auto" />
            <p className="section-subtitle mx-auto">
              We are empanelled with 18+ leading insurance companies and TPAs for seamless cashless treatment.
            </p>
          </div>

          <div className="ins-filter-row">
            {insFilters.map(f => (
              <button
                key={f}
                className={`ins-filter-btn${insFilter === f ? ' active' : ''}`}
                onClick={() => setInsFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="ins-grid">
            {filteredIns.map((ins, i) => {
              const c = getInsColor(ins.type);
              return (
                <div key={i} className="ins-card">
                  <div className="ins-logo" style={{ background: c.bg }}>
                    {ins.logo}
                  </div>
                  <div className="ins-name">{ins.name}</div>
                  <div
                    className="ins-type-badge"
                    style={{ background: c.badge.bg, color: c.badge.color }}
                  >
                    {ins.type}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ins-helpbox">
            <div className="ins-helpbox-text">
              <h3>Need help with insurance pre-authorisation?</h3>
              <p>Our dedicated TPA desk is available 24×7 to assist with cashless claims, pre-auth letters, and reimbursement documentation.</p>
            </div>
            <div className="ins-helpbox-btns">
              <button className="btn-primary-custom">📞 TPA Helpdesk</button>
              <button className="btn-outline-custom">📋 Check Coverage</button>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
