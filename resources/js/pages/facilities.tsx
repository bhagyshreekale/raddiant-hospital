'use client';
import type { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import FloatingActions from '../components/design/FloatingActions';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

/* ─── TYPES ─────────────────────────────────────────────────────────────── */
interface HealthPackage {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface StaticHealthPackage {
  name: string;
  price: string;
  features: string[];
  badge?: string;
  featured?: boolean;
}

interface Props extends PageProps {
  healthPackages: HealthPackage[];
  bedAvailability: BackendBedType[];
  partners: InsurancePartnerData[];
  canRegister?: boolean;
}

interface BackendBedType {
  id: number;
  type: string;
  available: number;
  total: number;
  status: string;
}

interface InsurancePartnerData {
  id: number;
  name: string;
  category: 'public' | 'private' | 'tpa';
  logo: string | null;
}

interface BedType {
  type: string;
  available: number;
  total: number;
  icon: string;
  cat: string;
}

interface TPA {
  name: string;
  cat: 'public' | 'private' | 'tpa';
  color: string;
  abbr: string;
  logo?: string | null;
}

interface Facility {
  name: string;
  description: string;
  icon: string;
  tags: string[];
  highlight?: boolean;
}

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const BED_TYPES: BedType[] = [
  { type: 'ICU / Intensive Care', available: 4, total: 12, icon: '♥', cat: 'critical' },
  { type: 'Private Rooms', available: 8, total: 15, icon: '⊞', cat: 'private' },
  { type: 'General Ward', available: 12, total: 30, icon: '≡', cat: 'general' },
  { type: 'Emergency / ER', available: 2, total: 8, icon: '✚', cat: 'emergency' },
  { type: 'NICU', available: 3, total: 6, icon: '◉', cat: 'critical' },
  { type: 'Post-Op Recovery', available: 5, total: 10, icon: '⊙', cat: 'general' },
  { type: 'Isolation Ward', available: 2, total: 4, icon: '⊗', cat: 'critical' },
  { type: 'Maternity', available: 6, total: 10, icon: '◎', cat: 'private' },
];

const HEALTH_PACKAGES: StaticHealthPackage[] = [
  {
    name: 'Basic Health Checkup',
    price: '₹1,499',
    features: ['Complete Blood Count', 'Blood Sugar (Fasting)', 'Urine Analysis', 'Physician Consultation'],
  },
  {
    name: 'Full Body Pro',
    price: '₹4,999',
    features: ['50+ Diagnostic Tests', '12-Lead ECG', 'Chest X-Ray', 'Lipid Profile', 'Specialist Physician'],
    badge: 'Most Popular',
    featured: true,
  },
  {
    name: 'Cardiac Care Plus',
    price: '₹7,999',
    features: ['TMT / Stress Test', '2D Echocardiography', 'Lipid & Liver Panel', 'Cardiologist Review', 'Diet Consultation'],
  },
];

const TPA_LIST: TPA[] = [
  { name: 'Star Health', cat: 'private', color: '#1d4ed8', abbr: 'SH', logo: undefined },
  { name: 'ICICI Lombard', cat: 'private', color: '#0f766e', abbr: 'IL', logo: undefined },
  { name: 'HDFC ERGO', cat: 'private', color: '#7c3aed', abbr: 'HE', logo: undefined },
  { name: 'Bajaj Allianz', cat: 'private', color: '#b45309', abbr: 'BA', logo: undefined },
  { name: 'New India Assurance', cat: 'public', color: '#166534', abbr: 'NI', logo: undefined },
  { name: 'United India', cat: 'public', color: '#1e3a5f', abbr: 'UI', logo: undefined },
  { name: 'Oriental Insurance', cat: 'public', color: '#7c2d12', abbr: 'OI', logo: undefined },
  { name: 'National Insurance', cat: 'public', color: '#0f172a', abbr: 'NA', logo: undefined },
  { name: 'Medi Assist', cat: 'tpa', color: '#0e7490', abbr: 'MA', logo: undefined },
  { name: 'Paramount TPA', cat: 'tpa', color: '#4338ca', abbr: 'PT', logo: undefined },
  { name: 'Heritage Health TPA', cat: 'tpa', color: '#065f46', abbr: 'HH', logo: undefined },
  { name: 'E-Meditek', cat: 'tpa', color: '#991b1b', abbr: 'EM', logo: undefined },
  { name: 'Raksha TPA', cat: 'tpa', color: '#6b21a8', abbr: 'RT', logo: undefined },
  { name: 'Alankit Assignments', cat: 'tpa', color: '#854d0e', abbr: 'AA', logo: undefined },
  { name: 'Vidal Health TPA', cat: 'tpa', color: '#0369a1', abbr: 'VH', logo: undefined },
  { name: 'Genins India TPA', cat: 'tpa', color: '#155e75', abbr: 'GI', logo: undefined },
];

const FACILITIES: Facility[] = [
  {
    name: 'Advanced Diagnostics Lab',
    description: 'NABL-accredited laboratory with automated analysers for 500+ tests. Results within 4–6 hours for most panels.',
    icon: '🔬',
    tags: ['NABL Accredited', '24/7 Open', '500+ Tests'],
    highlight: true,
  },
  {
    name: 'Digital Radiology & Imaging',
    description: '3T MRI, 128-slice CT, PET-CT, digital X-Ray, and ultrasound — all in a single, connected imaging suite.',
    icon: '🩻',
    tags: ['3T MRI', '128-Slice CT', 'PET-CT'],
    highlight: false,
  },
  {
    name: 'Modular Operation Theatres',
    description: '10 laminar-flow OTs equipped with HD cameras, robotic-assisted surgery support, and HEPA-filtered air systems.',
    icon: '⚕️',
    tags: ['10 OTs', 'Robotic Surgery', 'HEPA Filtered'],
    highlight: false,
  },
  {
    name: 'Cardiac Catheterisation Lab',
    description: 'Bi-plane cath lab for complex interventional cardiology, electrophysiology studies, and primary angioplasty.',
    icon: '❤️',
    tags: ['Bi-Plane Cath Lab', 'EP Studies', 'Primary PCI'],
    highlight: true,
  },
  {
    name: 'Pharmacy & Dispensary',
    description: '24-hour in-house pharmacy stocking over 3,000 branded and generic medicines with automated dispensing.',
    icon: '💊',
    tags: ['24/7 Open', '3000+ Medicines', 'Auto Dispensing'],
    highlight: false,
  },
  {
    name: 'Blood Bank & Transfusion',
    description: 'Component separation facility with a walking donor panel, nucleic acid testing, and cold-chain compliance.',
    icon: '🩸',
    tags: ['NAT Tested', 'Component Separation', 'Cold Chain'],
    highlight: false,
  },
  {
    name: 'Physiotherapy & Rehab',
    description: 'Comprehensive rehabilitation centre for orthopaedic, neurological, and cardiac recovery with hydrotherapy pool.',
    icon: '🏃',
    tags: ['Neuro Rehab', 'Hydro Pool', 'Sports Medicine'],
    highlight: false,
  },
  {
    name: 'Patient Amenities',
    description: 'Air-conditioned rooms, patient-controlled entertainment, free Wi-Fi, cafeteria, and 24-hour attendant lounge.',
    icon: '🛋️',
    tags: ['Free Wi-Fi', 'AC Rooms', '24h Cafeteria'],
    highlight: false,
  },
];

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
function getBedColor(available: number, total: number) {
  const r = available / total;

  if (r > 0.5) {
return { hex: '#059669', chipBg: '#d1fae5', chipText: '#065f46', label: 'Good Availability' };
}

  if (r > 0.2) {
return { hex: '#d97706', chipBg: '#fef3c7', chipText: '#92400e', label: 'Limited Beds' };
}

  return { hex: '#dc2626', chipBg: '#fee2e2', chipText: '#991b1b', label: 'Critical — Low' };
}

const TPA_CAT_LABELS: Record<string, string> = {
  private: 'Private',
  public: 'Public Sector',
  tpa: 'TPA Agency',
};

/* ─── PAGE COMPONENT ─────────────────────────────────────────────────────── */
export default function FacilitiesPage() {
  const { props } = usePage<Props>();
  
  // Logic Setup
  const healthPackagesFromBackend = props.healthPackages || [];
  const bedAvailabilityFromBackend = props.bedAvailability || [];
  const [tpaFilter, setTpaFilter] = useState<'all' | 'public' | 'private' | 'tpa'>('all');
  const [timeStr, setTimeStr] = useState<string>('');

  // UseEffect to set time on client-side only (prevents hydration mismatch)
  useEffect(() => {
    setTimeStr(new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }));
  }, []);

  // Map Backend Beds to include icons
  const displayBeds = bedAvailabilityFromBackend.length > 0 
    ? bedAvailabilityFromBackend.map(backendBed => {
        const staticMatch = BED_TYPES.find(b => b.type === backendBed.type);

        return {
          ...backendBed,
          icon: staticMatch?.icon || '🏥',
        };
      })
    : BED_TYPES;

  // Map Backend Packages to display format
  const displayPackages = healthPackagesFromBackend.length > 0
    ? healthPackagesFromBackend.map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        price: pkg.price,
        features: Array.isArray(pkg.features) ? pkg.features : (typeof pkg.description === 'string' ? pkg.description.split(',') : [])
      }))
    : HEALTH_PACKAGES.map((pkg, i) => ({
        id: i,
        name: pkg.name,
        price: pkg.price.replace('₹', '').replace(',', ''),
        features: pkg.features
      }));

  // Convert backend partners to TPA format
  const staticPartnerNames: Record<string, { cat: 'public' | 'private' | 'tpa'; color: string }> = {
    'Star Health': { cat: 'private', color: '#1d4ed8' },
    'ICICI Lombard': { cat: 'private', color: '#0f766e' },
    'HDFC ERGO': { cat: 'private', color: '#7c3aed' },
    'Bajaj Allianz': { cat: 'private', color: '#b45309' },
    'New India Assurance': { cat: 'public', color: '#166534' },
    'United India': { cat: 'public', color: '#1e3a5f' },
    'Oriental Insurance': { cat: 'public', color: '#7c2d12' },
    'National Insurance': { cat: 'public', color: '#0f172a' },
    'Medi Assist': { cat: 'tpa', color: '#0e7490' },
    'Paramount TPA': { cat: 'tpa', color: '#4338ca' },
    'Heritage Health TPA': { cat: 'tpa', color: '#065f46' },
    'E-Meditek': { cat: 'tpa', color: '#991b1b' },
    'Raksha TPA': { cat: 'tpa', color: '#6b21a8' },
    'Alankit Assignments': { cat: 'tpa', color: '#854d0e' },
    'Vidal Health TPA': { cat: 'tpa', color: '#0369a1' },
    'Genins India TPA': { cat: 'tpa', color: '#155e75' },
  };

  const partnersFromBackend = props.partners || [];
  
  const partnerColors: Record<string, string> = {
    public: '#166534',
    private: '#1d4ed8',
    tpa: '#0e7490',
  };

  const displayPartners = partnersFromBackend.length > 0
    ? partnersFromBackend.map(p => {
        const cat = p.category || 'tpa';
        const abbr = p.name.split(' ').map(w => w[0]).slice(0, 2).join('');

        return { name: p.name, cat: cat as 'public' | 'private' | 'tpa', color: partnerColors[cat] || '#0e7490', abbr, logo: p.logo };
      })
    : TPA_LIST;

  const filteredTpa = tpaFilter === 'all' ? displayPartners : displayPartners.filter((t) => t.cat === tpaFilter);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 font-sans">

        {/* ── HERO ── */}
    <section
          className="relative overflow-hidden px-4 py-5 text-center"
          style={{ backgroundColor: '#f0f8ff' }}
        >
          {/* subtle grid overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: 0.045,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230a2342'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* soft radial glow — top-right */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 55% 50% at 80% 10%, rgba(0,194,203,0.10) 0%, transparent 70%),' +
                'radial-gradient(ellipse 50% 45% at 15% 80%, rgba(180,230,255,0.40) 0%, transparent 65%)',
            }}
          />

          <div className="relative mx-auto max-w-3xl">
            {/* Badge */}
            <span
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{
                border: '1px solid rgba(0,150,190,0.25)',
                backgroundColor: 'rgba(0,194,203,0.08)',
                color: '#007a99',
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ backgroundColor: '#00a8b5' }}
              />
              Infrastructure Overview
            </span>

            {/* Heading */}
            <h1
              className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl"
              style={{ color: '#0a1f3c' }}
            >
              World-Class<br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #00a8b5, #00c2cb)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Medical Facilities
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed"
              style={{ color: 'rgba(10,31,60,0.58)' }}
            >
              State-of-the-art equipment, 24/7 emergency support, and dedicated care teams ensuring
              the highest standards of patient treatment.
            </p>

            {/* Stats row */}
            <div
              className="mt-12 grid grid-cols-3 pt-8"
              style={{ borderTop: '1px solid rgba(0,150,200,0.15)' }}
            >
              {[
                { num: '350+', lbl: 'Total Beds' },
                { num: '40+',  lbl: 'Specialties' },
                { num: '24/7', lbl: 'Emergency'   },
              ].map((s, i) => (
                <div
                  key={s.lbl}
                  className="px-4"
                  style={i > 0 ? { borderLeft: '1px solid rgba(0,150,200,0.15)' } : {}}
                >
                  <div
                    className="font-serif text-3xl font-semibold"
                    style={{ color: '#0a1f3c' }}
                  >
                    {s.num}
                  </div>
                  <div
                    className="mt-1 text-xs uppercase tracking-widest"
                    style={{ color: 'rgba(10,31,60,0.42)' }}
                  >
                    {s.lbl}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-14 space-y-20">

          {/* ── LIVE BED AVAILABILITY ── */}
          <section>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-serif text-2xl font-medium text-slate-900 md:text-3xl">Live Bed Availability</h2>
                <p className="mt-1 text-sm text-slate-500">Real-time occupancy — syncs every 5 min once connected to backend</p>
              </div>
              <div className="flex items-center gap-2 self-start rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-teal-700 sm:self-auto">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-teal-500" />
                Updated {timeStr || '--:--'}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {displayBeds.map((bed) => {
                const c = getBedColor(bed.available, bed.total);
                const pct = Math.round((bed.available / bed.total) * 100);

                return (
                  <div
                    key={bed.type}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                        style={{ background: c.chipBg, color: c.hex }}
                      >
                        {bed.icon}
                      </div>
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                        style={{ background: c.chipBg, color: c.chipText }}
                      >
                        {c.label}
                      </span>
                    </div>
                    <div className="font-serif text-3xl font-semibold text-slate-900">
                      {bed.available}{' '}
                      <span className="font-sans text-base font-normal text-slate-400">/ {bed.total}</span>
                    </div>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">{bed.type}</p>
                    <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${pct}%`, backgroundColor: c.hex }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: c.hex }}>
                        {pct}% vacant
                      </span>
                      <span className="text-[10px] text-slate-400">Live</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── FACILITIES SECTION ── */}
          <section>
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-medium text-slate-900 md:text-3xl">Our Facilities</h2>
              <p className="mt-1 text-sm text-slate-500">
                Advanced infrastructure designed around patient outcomes and clinical excellence
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {FACILITIES.map((f) => (
                <div
                  key={f.name}
                  className={`group relative flex flex-col rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg
                    ${f.highlight
                      ? 'border-teal-200 bg-gradient-to-br from-teal-50 to-white shadow-sm'
                      : 'border-slate-200 bg-white shadow-sm hover:border-slate-300'
                    }`}
                >
                  {f.highlight && (
                    <span className="absolute right-4 top-4 rounded-full bg-teal-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-teal-700">
                      Featured
                    </span>
                  )}
                  <div className="mb-4 text-3xl">{f.icon}</div>
                  <h3 className="mb-1.5 text-sm font-semibold leading-snug text-slate-900">{f.name}</h3>
                  <p className="mb-4 text-xs leading-relaxed text-slate-500">{f.description}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {f.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold
                          ${f.highlight
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-slate-100 text-slate-600'
                          }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── HEALTH PACKAGES ── */}
          <section className="overflow-hidden rounded-3xl px-6 py-14 md:px-10" style={{ backgroundColor: '#0a2342' }}>
            <div className="mb-10 text-center">
              <h2 className="font-serif text-2xl font-medium md:text-3xl" style={{ color: '#ffffff' }}>Preventive Health Packages</h2>
              <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Comprehensive screenings for you and your family</p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {displayPackages.map((pkg, index) => (
                <div
                  key={pkg.id || index}
                  className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-200 hover:-translate-y-1
                    ${index === 1
                      ? 'border-teal-400 bg-teal-600'
                      : 'border-white/10 bg-white/5 hover:bg-white/8'
                    }`}
                >
                  {index === 1 && (
                    <div className="absolute -top-px right-6 rounded-b-lg bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-teal-700">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-serif text-lg font-medium" style={{ color: '#ffffff' }}>{pkg.name}</h3>
                  <div className="my-5 border-b pb-5" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
                    <span className="font-serif text-3xl font-semibold" style={{ color: '#ffffff' }}>₹{Number(pkg.price).toLocaleString('en-IN')}</span>
                  </div>
                  <ul className="mb-7 space-y-2.5">
                    {(pkg.features || []).map((f: string, i: number) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>
                        <span
                          className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold
                            ${index === 1 ? 'bg-white/25' : 'bg-white/15'}`}
                        >
                          ✓
                        </span>
                        {f.trim()}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`mt-auto w-full rounded-xl py-3 text-sm font-semibold tracking-wide transition-all
                      ${index === 1
                        ? 'bg-white text-teal-700 hover:bg-white/90'
                        : 'border border-white/25 bg-transparent text-white hover:bg-white/10'
                      }`}
                  >
                    Book Package
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── INSURANCE & TPA ── */}
          <section>
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-medium text-slate-900 md:text-3xl">Insurance & TPA Partners</h2>
              <p className="mt-1 text-sm text-slate-500">Cashless treatment available — TPA desk open 24/7</p>
            </div>

            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50 to-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-teal-600 text-lg text-white">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Cashless Hospitalization Available</h4>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                    Our dedicated TPA desk handles pre-authorization and direct billing with all empanelled insurers.
                  </p>
                </div>
              </div>
              <button className="self-start rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-teal-700 sm:self-auto sm:flex-shrink-0">
                How It Works →
              </button>
            </div>

            <div className="mb-5 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-1.5">
              {(['all', 'public', 'private', 'tpa'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTpaFilter(cat)}
                  className={`flex-1 min-w-[80px] rounded-lg px-4 py-2 text-xs font-semibold capitalize transition-all
                    ${tpaFilter === cat
                      ? 'text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                    }`}
                  style={tpaFilter === cat ? { backgroundColor: '#0a2342' } : {}}
                >
                  {cat === 'all' ? 'All Insurers' : cat === 'tpa' ? 'TPA Agencies' : `${cat.charAt(0).toUpperCase() + cat.slice(1)} Sector`}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {filteredTpa.map((t) => (
                <div
                  key={t.name}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  {t.logo ? (
                    <img 
                      src={t.logo} 
                      alt={t.name}
                      className="h-9 w-9 object-contain rounded-lg"
                    />
                  ) : (
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white"
                      style={{ backgroundColor: t.color }}
                    >
                      {t.abbr}
                    </div>
                  )}
                  <span className="text-center text-[11px] font-medium leading-tight text-slate-800">{t.name}</span>
                  <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-teal-700">
                    {TPA_CAT_LABELS[t.cat]}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA BANNER ── */}
          <section className="flex flex-col items-start justify-between gap-8 rounded-3xl p-8 sm:flex-row sm:items-center md:p-12" style={{ backgroundColor: '#0a2342' }}>
            <div className="max-w-lg">
              <h2 className="font-serif text-2xl font-medium md:text-3xl" style={{ color: '#ffffff' }}>Need help navigating our services?</h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Our patient care coordinators are available around the clock to assist with admissions, insurance queries, and appointments.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-wrap gap-3">
              <button className="rounded-xl bg-teal-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700">
                Book Appointment
              </button>
              <button className="rounded-xl border border-white/20 bg-transparent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                Call Helpdesk
              </button>
            </div>
          </section>

        </div>
      </div>
      <FloatingActions />
      <Footer />
    </>
  );
}