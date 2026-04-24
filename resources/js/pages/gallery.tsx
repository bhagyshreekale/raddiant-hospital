

'use client';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FloatingActions from '../components/design/FloatingActions';
import GalleryGrid from '../components/gallery/GalleryGrid';

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
        <section className="gallery-hero">
          <div className="hero-blob-top" />
          <div className="hero-blob-bottom" />

          <div className="container text-center position-relative">
            <span className="gallery-badge">
              Raddiant Plus Experience
            </span>
            <h1 className="gallery-title">
              Our Hospital Gallery
            </h1>
            <p className="gallery-subtitle">
              A visual journey through our state-of-the-art medical facilities, 
              cutting-edge technology, and the dedicated team behind our care.
            </p>
          </div>
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
