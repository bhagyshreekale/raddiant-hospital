'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

/* ─── DATA ──────────────────────────────────────────────────────────────── */
export const BLOG_POSTS = [
 
{
  id: 1,
  title: "Heart Health: 10 Tips to Keep Your Heart Strong",
  excerpt: "Cardiologists at Raddiant Plus share simple, evidence-based habits to protect your cardiovascular health.",
  description: `Your heart works tirelessly every second of your life. Maintaining heart health is essential to prevent serious conditions like heart attacks and hypertension.

Key tips:
• Exercise daily (at least 30 minutes)
• Eat low-sodium, heart-friendly diet
• Manage stress effectively
• Avoid smoking and limit alcohol
• Monitor blood pressure regularly

Preventive care and early screening can significantly reduce risks. Regular consultations with specialists help you stay ahead of potential problems.`,
  category: "Cardiology",
  date: "May 10, 2025",
  readTime: "5 min",
  image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
},
{
  id: 2,
  title: "Understanding NABH Accreditation in Healthcare",
  excerpt: "Learn how NABH standards ensure patient safety and quality care in hospitals.",
  description: `NABH accreditation ensures hospitals meet strict quality and safety standards.

Benefits:
• Standardised treatment protocols
• Infection control measures
• Patient rights protection
• Continuous monitoring and improvement

Choosing an NABH-accredited hospital ensures reliable and safe healthcare services.`,
  category: "Quality & Safety",
  date: "Apr 22, 2025",
  readTime: "4 min",
  image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
},
{
  id: 3,
  title: "Early Signs of Diabetes You Should Not Ignore",
  excerpt: "Recognize early symptoms of diabetes and take action before complications arise.",
  description: `Diabetes often develops silently. Early symptoms include:

• Frequent urination  
• Excessive thirst  
• Fatigue  
• Blurred vision  
• Slow wound healing  

Early diagnosis through regular screening can prevent complications and improve quality of life.`,
  category: "Wellness",
  date: "Apr 5, 2025",
  readTime: "6 min",
  image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
},
{
  id: 4,
  title: "Why Choose a Multispeciality Hospital?",
  excerpt: "Experience complete healthcare with multiple specialists under one roof.",
  description: `Multispeciality hospitals provide integrated care across various medical fields.

Advantages:
• Access to multiple specialists
• Faster diagnosis and treatment
• Advanced medical technology
• Comprehensive care under one roof

This approach improves patient outcomes and saves time and effort.`,
  category: "Healthcare",
  date: "Jun 2, 2025",
  readTime: "5 min",
  image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80",
},
{
  id: 5,
  title: "Essential Eye Care Tips for Healthy Vision",
  excerpt: "Simple habits to protect your eyes and maintain clear vision.",
  description: `Eye care is essential in today’s digital world.

Tips:
• Follow 20-20-20 rule  
• Limit screen time  
• Use proper lighting  
• Wear sunglasses  
• Eat vitamin-rich foods  

Regular eye check-ups help detect issues early and maintain healthy vision.`,
  category: "Eye Care",
  date: "Jun 5, 2025",
  readTime: "4 min",
  image: "https://images.unsplash.com/photo-1581091012184-5c4c1c3b1a5b?w=800&q=80",
},
{
  id: 6,
  title: "Digital Eye Strain: Causes & Prevention",
  excerpt: "Learn how to reduce eye strain caused by prolonged screen usage.",
  description: `Digital eye strain is becoming increasingly common.

Symptoms:
• Dry eyes  
• Headaches  
• Blurred vision  

Prevention:
• Take frequent breaks  
• Adjust screen brightness  
• Maintain proper distance  
• Use blue light filters  

Protecting your eyes is crucial in a digital lifestyle.`,
  category: "Eye Care",
  date: "Jun 8, 2025",
  readTime: "5 min",
  image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80",
},
{
  id: 7,
  title: "Importance of Regular Health Check-ups",
  excerpt: "Routine check-ups help detect diseases early and improve health outcomes.",
  description: `Preventive health check-ups are essential for long-term wellness.

Benefits:
• Early disease detection  
• Better treatment outcomes  
• Reduced healthcare costs  
• Monitoring health conditions  

Annual screenings are highly recommended for adults above 30.`,
  category: "Wellness",
  date: "Jun 10, 2025",
  readTime: "4 min",
  image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
},
{
  id: 8,
  title: "Advanced Eye Care Treatments Available Today",
  excerpt: "Explore modern eye treatments that improve vision and quality of life.",
  description: `Modern eye care has advanced significantly with new technologies.

Treatments include:
• LASIK for vision correction  
• Cataract surgery with advanced lenses  
• Glaucoma management  
• Retina treatments  

Early consultation with specialists ensures better vision care and long-term eye health.`,
  category: "Eye Care",
  date: "Jun 12, 2025",
  readTime: "5 min",
  image: "https://images.unsplash.com/photo-1580281657527-47b3a4a5c1b0?w=800&q=80",
},
{
  id: 9,
  title: "Cataract Surgery: When Do You Really Need It?",
  excerpt: "Blurred vision or difficulty seeing at night? Learn when cataract surgery becomes necessary.",
  description: `Cataracts are one of the leading causes of vision impairment, especially as we age. They occur when the natural lens of the eye becomes cloudy, leading to blurred or dim vision.

Common symptoms of cataracts include:

• Blurry or cloudy vision  
• Difficulty seeing at night  
• Sensitivity to light and glare  
• Faded or yellowish colors  
• Frequent changes in glasses number  

Many people delay treatment, thinking it’s a normal part of aging — but timely intervention is important.

When should you consider cataract surgery?

• When vision starts affecting daily activities like reading or driving  
• If glasses no longer improve clarity  
• When glare from lights becomes uncomfortable  
• If your doctor detects advanced lens opacity  

Cataract surgery is a safe and highly effective procedure where the cloudy lens is replaced with an artificial intraocular lens (IOL). Modern techniques ensure quick recovery and minimal discomfort.

At our eye care centre, we offer advanced cataract surgery with precision technology, ensuring clear vision and improved quality of life.

Early consultation can help you decide the right time for treatment — don’t ignore the signs your eyes are giving you.`,
  category: "Eye Care",
  date: "Jun 15, 2025",
  readTime: "5 min",
  image: "https://images.unsplash.com/photo-1588776814546-ec7e5f59c54f?w=800&q=80",
}
];

/* ─── CATEGORY COLOURS ──────────────────────────────────────────────────── */
const CATEGORY_STYLES = {
  Cardiology:        { bg: '#FEE2E2', color: '#991B1B' },
  'Quality & Safety': { bg: '#DBEAFE', color: '#1E40AF' },
  Wellness:          { bg: '#D1FAE5', color: '#065F46' },
};

const getCategoryStyle = (cat) =>
  CATEGORY_STYLES[cat] || { bg: '#F3F4F6', color: '#374151' };

/* ─── MODAL ─────────────────────────────────────────────────────────────── */
function BlogModal({ post, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const catStyle = getCategoryStyle(post.category);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(10, 25, 41, 0.65)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 1050,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        animation: 'fadeInOverlay 0.25s ease forwards',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
          animation: 'scaleInModal 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'sticky', top: 12,
            float: 'right',
            marginRight: 12,
            zIndex: 10,
            width: 36, height: 36,
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(4px)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            fontSize: '18px',
            color: '#374151',
            lineHeight: 1,
            transition: 'transform 0.15s, background 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(90deg)'; e.currentTarget.style.background = '#f3f4f6'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(0deg)'; e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; }}
        >
          ×
        </button>

        {/* Hero image */}
        <div style={{ height: 260, overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
          <img
            src={post.image}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Body */}
        <div style={{ padding: '28px 32px 36px' }}>
          {/* Meta row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{
              padding: '4px 12px',
              borderRadius: 999,
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
              background: catStyle.bg,
              color: catStyle.color,
            }}>
              {post.category}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>{post.date}</span>
            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>· {post.readTime} read</span>
          </div>

          <h2 style={{
            fontSize: '1.45rem',
            fontWeight: 700,
            lineHeight: 1.35,
            color: '#111827',
            marginBottom: 20,
          }}>
            {post.title}
          </h2>

          {/* Full description — newlines → paragraphs */}
          {post.description.split('\n\n').map((para, i) => (
            <p key={i} style={{
              fontSize: '0.95rem',
              lineHeight: 1.8,
              color: '#374151',
              marginBottom: 14,
              whiteSpace: 'pre-line',
            }}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── BLOG CARD ─────────────────────────────────────────────────────────── */
function BlogCard({ post, onReadMore }) {
  const [hovered, setHovered] = useState(false);
  const catStyle = getCategoryStyle(post.category);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #E5E7EB',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 50px rgba(0,0,0,0.12)'
          : '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* Image with zoom */}
      <div style={{ height: 200, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            display: 'block',
          }}
        />
        {/* Subtle gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 55%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{
            padding: '4px 11px',
            borderRadius: 999,
            fontSize: '0.73rem',
            fontWeight: 600,
            letterSpacing: '0.03em',
            background: catStyle.bg,
            color: catStyle.color,
          }}>
            {post.category}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{post.readTime} read</span>
        </div>

        <h3 style={{
          fontSize: '1rem',
          fontWeight: 700,
          lineHeight: 1.5,
          color: '#111827',
          marginBottom: 10,
        }}>
          {post.title}
        </h3>

        <p style={{
          fontSize: '0.855rem',
          color: '#6B7280',
          lineHeight: 1.7,
          marginBottom: 20,
          flex: 1,
        }}>
          {post.excerpt}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>{post.date}</span>
          <button
            onClick={() => onReadMore(post)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontSize: '0.83rem',
              fontWeight: 600,
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'gap 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.gap = '8px'; }}
            onMouseLeave={(e) => { e.currentTarget.style.gap = '4px'; }}
          >
            Read More <span style={{ fontSize: '1rem' }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────────────────── */
export default function BlogPage() {
  const [activePost, setActivePost] = useState(null);

  const handleReadMore = useCallback((post) => setActivePost(post), []);
  const handleClose    = useCallback(() => setActivePost(null),  []);

  return (
    <>
      {/* Keyframes injected once */}
      <style>{`
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleInModal {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
        padding: '80px 0 64px',
      }}>
        <div className="container text-center">
          <span
            className="section-label"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'var(--accent-light)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            Health Blog
          </span>
          <h1 style={{ color: 'white', marginTop: 12 }}>Health Tips & Insights</h1>
          <p style={{
            color: 'rgba(255,255,255,0.75)',
            maxWidth: 520,
            margin: '16px auto 0',
            fontSize: '1.05rem',
          }}>
            Expert medical knowledge from our specialists to help you live healthier.
          </p>
        </div>
      </section>

      {/* Blog grid */}
      <section className="section-py">
        <div className="container">
          <div className="row g-4">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="col-lg-4 col-md-6">
                <BlogCard post={post} onReadMore={handleReadMore} />
              </div>
            ))}
          </div>

          {/* Subscribe */}
          <div
            className="text-center mt-5"
            style={{
              padding: '40px',
              background: 'var(--off-white)',
              borderRadius: 'var(--radius-xl)',
            }}
          >
            <h3 style={{ marginBottom: 8 }}>Subscribe for Health Updates</h3>
            <p style={{ color: 'var(--gray-500)', marginBottom: 20 }}>
              Get monthly health tips from our expert doctors directly in your inbox.
            </p>
            <div style={{ display: 'flex', gap: 12, maxWidth: 460, margin: '0 auto' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--gray-200)',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                }}
              />
              <button className="btn-primary-custom" style={{ whiteSpace: 'nowrap' }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activePost && <BlogModal post={activePost} onClose={handleClose} />}
    </>
  );
}
