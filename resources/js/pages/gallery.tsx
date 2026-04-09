'use client';
import GalleryGrid from '../components/gallery/GalleryGrid';
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/design/FloatingActions'
/* ─── METADATA ───────────────────────────────────────────────────────────── */
// Note: In Next.js App Router, metadata should be in a separate layout.js 
// or a server component. If this is a client file, export it from a page.js wrapper.
export const metadata = {
  title: 'Hospital Gallery | Raddiant Plus',
  description: 'Visual tour of Raddiant Plus Hospital facilities and technology.',
};

/* ─── GALLERY DATA ───────────────────────────────────────────────────────── */
const CATEGORIES = ['All', 'Facilities', 'Technology', 'Staff', 'Patients'];

const GALLERY_ITEMS = [
  { id: 1, title: 'Modern Operating Theatre', category: 'Facilities', image: '/images/gallery/theatre.jpg' },
  { id: 2, title: 'Advanced CT Scanner', category: 'Technology', image: '/images/gallery/ct-scanner.jpg' },
  { id: 3, title: 'Patient Care Unit', category: 'Facilities', image: '/images/gallery/care-unit.jpg' },
];

export default function GalleryPage() {
  return (
    <>
    <Navbar/>
    <main className="min-vh-100">
      {/* ── Hero Section ────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)',
          padding: '100px 0 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated Background Elements */}
        <div className="hero-blob-top" />
        <div className="hero-blob-bottom" />

        <div className="container text-center position-relative">
          <span className="gallery-badge">
            Visual Tour
          </span>
          <h1 className="gallery-title">
            Our Hospital Gallery
          </h1>
          <p className="gallery-subtitle">
            Explore our world-class infrastructure, advanced medical technology, 
            and the compassionate environment we provide for our patients.
          </p>
        </div>
      </section>

      {/* ── Gallery Grid Component ──────────────────────────────────────── */}
      <section className="section-py bg-light">
        <div className="container">
          {/* Ensure GalleryGrid handles category filtering internally via state */}
          <GalleryGrid 
            items={GALLERY_ITEMS} 
            categories={CATEGORIES} 
          />
        </div>
      </section>

      <style>{`
        .gallery-badge {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: var(--accent-light);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .gallery-title {
          color: white;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-top: 20px;
          letter-spacing: -0.03em;
        }
        .gallery-subtitle {
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 20px auto 0;
          font-size: 1.1rem;
          line-height: 1.6;
        }
        .hero-blob-top {
          position: absolute; right: -5%; top: -10%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(0, 180, 216, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-blob-bottom {
          position: absolute; left: -5%; bottom: -10%;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
          pointer-events: none;
        }
      `}</style>
    </main>
    <FloatingActions/>
    <Footer/>
    </>
  );
}