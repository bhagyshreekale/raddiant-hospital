

'use client';

import FloatingActions from '../components/design/FloatingActions';
import GalleryGrid from '../components/gallery/GalleryGrid';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

/* ─── GALLERY DATA ───────────────────────────────────────────────────────── */
// Adding 'span' property to create the "Attractive" Masonry effect
const CATEGORIES = ['All', 'Facilities', 'Technology', 'Operation Theatre', 'Staff', 'Patients'];

const GALLERY_ITEMS = [
  { 
    id: 1, 
    title: 'Advanced Modular OT', 
    category: 'Operation Theatre', 
    image: '/images/2024-10-14 (1).webp',
    span: 'wide' // Spans 2 columns on desktop
  },
  { 
    id: 2, 
    title: 'High-End CT Scan', 
    category: 'Technology', 
    image: '/images/2024-10-14 (2).webp' 
  },
  { 
    id: 3, 
    title: 'Executive Patient Suite', 
    category: 'Facilities', 
    image: '/images/2024-10-14 (3).webp',
    span: 'tall' // Spans 2 rows
  },
  { 
    id: 4, 
    title: 'Expert Medical Team', 
    category: 'Staff', 
    image: '/images/2024-10-14 (4).webp' 
  },
  { 
    id: 5, 
    title: 'Neonatal Care Unit', 
    category: 'Facilities', 
    image: '/images/2024-10-14 (5).webp' 
  },
  { 
    id: 6, 
    title: '24/7 Emergency Care', 
    category: 'Facilities', 
    image: '/images/2024-10-14 (6).webp',
    span: 'wide'
  },
  { 
    id: 7, 
    title: 'Robotic Surgery System', 
    category: 'Technology', 
    image: '/images/2024-10-14 (7).webp' 
  },
  { 
    id: 8, 
    title: 'Comfortable Recovery Lounge', 
    category: 'Patients', 
    image: '/images/2024-10-14.webp' 
  },
];

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="min-vh-100 bg-white">
        
        {/* ── Hero Section ────────────────────────────────────────────────── */}
      <section className="relative bg-slate-50 overflow-hidden pt-16 pb-0 text-center">
 
      {/* Top accent */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500" />
 
      {/* Soft top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-[radial-gradient(ellipse_at_top,#dbeafe60_0%,transparent_65%)] pointer-events-none" />
 
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #1e40af 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
 
      <div className="relative z-10 container mx-auto px-4">
 
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          NABH Accredited · Nashik, MH
        </div>
 
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.08] tracking-tight mb-5">
          Compassionate Care,{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            Advanced Medicine
          </span>
        </h1>
 
        {/* Subtitle */}
        <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-8">
          Raddiant Plus Hospital — your trusted partner for 20+ specialties,
          expert surgeons, and 24/7 emergency services under one roof.
        </p>
 
       
 
      </div>
 
      {/* Bottom fade */}
      <div className="mt-8 h-8 bg-gradient-to-b from-transparent to-slate-100 pointer-events-none" />
    </section>

        {/* ── Gallery Component ───────────────────────────────────────────── */}
        <div className="bg-light/30">
          <GalleryGrid 
            items={GALLERY_ITEMS} 
            categories={CATEGORIES} 
          />
        </div>

      </main>

      <FloatingActions />
      <Footer />

      <style>{`
        .gallery-hero {
          background: linear-gradient(135deg, #0f2027 0%, #203a43 100%);
          padding: 120px 0 100px;
          position: relative;
          overflow: hidden;
        }
        .gallery-badge {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #00d4ff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .gallery-title {
          color: white;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.04em;
        }
        .gallery-subtitle {
          color: rgba(255, 255, 255, 0.7);
          max-width: 650px;
          margin: 24px auto 0;
          font-size: 1.15rem;
          line-height: 1.7;
        }
        .hero-blob-top {
          position: absolute; right: -10%; top: -20%;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-blob-bottom {
          position: absolute; left: -10%; bottom: -20%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .gallery-hero { padding: 100px 20px 60px; }
        }
      `}</style>
    </>
  );
}
