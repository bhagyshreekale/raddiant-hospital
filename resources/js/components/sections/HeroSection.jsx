'use client';
import { SITE } from '../../lib copy/data';

export default function HeroSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 50%, #0d5fa3 100%)',
        position: 'relative', overflow: 'hidden', minHeight: '92vh',
        display: 'flex', alignItems: 'center',
      }}
      aria-label="Hero section"
    >
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0,180,216,0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)`,
      }} />
      {/* Decorative circles */}
      <div style={{ position: 'absolute', right: '-80px', bottom: '-80px', width: 400, height: 400, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', right: '60px', bottom: '60px', width: 240, height: 240, borderRadius: '50%', border: '2px solid rgba(0,180,216,0.15)' }} />
      <div style={{ position: 'absolute', left: '-40px', top: '20%', width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '80px 16px' }}>
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            {/* NABH badge */}
            <div className="d-inline-flex align-items-center gap-2 mb-4" style={{
              background: 'rgba(232,168,56,0.15)', border: '1px solid rgba(232,168,56,0.35)',
              borderRadius: 'var(--radius-full)', padding: '6px 16px',
            }}>
              <span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                🏅 NABH Compliant · Raddiant Group
              </span>
            </div>

            <h1 style={{ color: 'white', marginBottom: 20, lineHeight: 1.18 }}>
              Advanced Healthcare,<br />
              <span style={{ color: 'var(--accent-light)' }}>Compassionate Care</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.1rem', marginBottom: 36, maxWidth: 520, lineHeight: 1.75 }}>
              Raddiant Plus Hospital delivers comprehensive multispecialty hospital and diagnostic care in Nashik. Expert doctors, advanced technology, and patient-first approach — available 24×7.
            </p>

            {/* Stats row */}
            <div className="d-flex flex-wrap gap-4 mb-40" style={{ marginBottom: 40 }}>
              {[['60+', 'Specialists'], ['20+', 'Specialties'], ['24×7', 'Emergency'], ['NABH', 'Accredited']].map(([val, lbl]) => (
                <div key={lbl} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{lbl}</div>
                </div>
              ))}
            </div>

            <div className="d-flex flex-wrap gap-3">
              <a href="/appointment" className="btn-primary-custom" style={{ background: 'linear-gradient(135deg, var(--accent), #0090b0)', boxShadow: '0 6px 24px rgba(0,180,216,0.4)', fontSize: '1rem', padding: '14px 32px' }}>
                📅 Book Appointment
              </a>
              <a href={`tel:${SITE.phone}`} className="btn-outline-custom" style={{ fontSize: '1rem', padding: '14px 32px' }}>
                📞 Call Now
              </a>
            </div>
          </div>

          {/* Info cards */}
          <div className="col-lg-5 d-none d-lg-block">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '🚨', title: 'Emergency Care', desc: '24×7 trauma & emergency services', color: 'rgba(230,57,70,0.2)' },
                { icon: '🔬', title: 'Advanced Diagnostics', desc: 'MRI, CT Scan, full pathology lab', color: 'rgba(0,180,216,0.2)' },
                { icon: '👨‍⚕️', title: 'Expert Specialists', desc: '60+ doctors across all major specialties', color: 'rgba(255,255,255,0.1)' },
              ].map(c => (
                <div key={c.title} style={{
                  background: c.color, backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--radius-lg)',
                  padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16,
                  transition: 'transform 0.3s', cursor: 'default'
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(8px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  <span style={{ fontSize: '2rem' }}>{c.icon}</span>
                  <div>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>{c.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem' }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
