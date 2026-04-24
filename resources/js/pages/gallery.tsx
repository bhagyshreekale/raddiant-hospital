'use client';

import FloatingActions from '../components/design/FloatingActions';
import GalleryGrid from '../components/gallery/GalleryGrid';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

type GalleryImage = {
  id: number;
  title: string;
  image: string;
  category: string;
  span: string;
};

interface GalleryPageProps {
  images: GalleryImage[];
}

const CATEGORIES = ['All', 'Facilities', 'Technology', 'Operation Theatre', 'Staff', 'Patients'];

export default function GalleryPage({ images = [] }: GalleryPageProps) {
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
            items={images} 
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