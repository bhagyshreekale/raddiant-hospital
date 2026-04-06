// app/careers/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Full Careers page:
//   1. Hero with animated background rings
//   2. Stats bar
//   3. Why Join Us – perk cards
//   4. Open Positions – filterable job listings
//   5. Walk-in CTA banner
// ─────────────────────────────────────────────────────────────────────────────

// JobListingsClient is already 'use client' — plain import is all we need
import JobListingsClient from '../../components/sections/JobListingsClient';
import { PERKS, STATS } from '../../lib/careersData';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaUserMd,
  FaArrowRight,
} from 'react-icons/fa';

export const metadata = {
  title: 'Careers | Raddiant Plus Hospital',
  description:
    'Join the Raddiant Plus Hospital team in Nashik. Explore open positions in clinical, nursing, radiology, administration, and more.',
};

export default function CareersPage() {
  return (
    <>
      <style>{`
        @keyframes floatRing {
          0%, 100% { transform: scale(1) translateY(0); opacity: 0.15; }
          50%       { transform: scale(1.06) translateY(-12px); opacity: 0.25; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes perkCardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .perk-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 32px rgba(0,0,0,0.10) !important;
        }
        .stat-card:hover .stat-val { color: var(--accent, #f97316) !important; }
        .cta-email-btn:hover { background: white !important; color: var(--primary,#0d6efd) !important; }
        .hero-tag {
          animation: fadeUp 0.6s 0.1s ease both;
        }
        .hero-h1 { animation: fadeUp 0.6s 0.25s ease both; }
        .hero-p  { animation: fadeUp 0.6s 0.4s ease both; }
        .hero-btns{ animation: fadeUp 0.6s 0.55s ease both; }
        @media (max-width: 576px) {
          .expand-grid-resp { grid-template-columns: 1fr !important; }
          .modal-grid-resp  { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, var(--primary-dark,#0a4fa8), var(--primary,#0d6efd))',
        padding: '90px 0 72px',
        overflow: 'hidden',
      }}>
        {/* Decorative background rings */}
        {[300, 460, 600].map((size, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: '50%', right: '-60px',
            transform: 'translateY(-50%)',
            width: size, height: size,
            borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,0.15)',
            animation: `floatRing ${4 + i}s ease-in-out ${i * 0.6}s infinite`,
            pointerEvents: 'none',
          }} />
        ))}
        {/* Dot grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 620 }}>
            <span
              className="hero-tag section-label"
              style={{
                background: 'rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <FaUserMd style={{ marginRight: 7, fontSize: '0.75rem' }} />
              We&rsquo;re Hiring
            </span>

            <h1
              className="hero-h1"
              style={{ color: 'white', marginTop: 16, marginBottom: 16, lineHeight: 1.2 }}
            >
              Build a Career That <span style={{
                background: 'linear-gradient(90deg,#fbbf24,#f97316)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Saves Lives</span>
            </h1>

            <p
              className="hero-p"
              style={{
                color: 'rgba(255,255,255,0.78)', fontSize: '1.05rem',
                maxWidth: 480, lineHeight: 1.7, marginBottom: 32,
              }}
            >
              Join Raddiant Plus Hospital's growing team of 350+ healthcare professionals
              dedicated to compassionate, world-class care in Nashik.
            </p>

            <div className="hero-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="#open-positions"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 28px', borderRadius: 10,
                  background: 'white', color: 'var(--primary,#0d6efd)',
                  fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
                  transition: 'box-shadow 0.2s',
                }}
              >
                View Open Positions <FaArrowRight style={{ fontSize: '0.75rem' }} />
              </a>
              <a
                href="mailto:careers@raddiantplus.com"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px', borderRadius: 10,
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  color: 'white', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
                }}
              >
                Send Your CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. STATS BAR
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--primary,#0d6efd)', padding: '28px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 16,
          }}>
            {STATS.map((s) => (
              <div
                key={s.label}
                className="stat-card"
                style={{ textAlign: 'center', padding: '8px 0', cursor: 'default' }}
              >
                <div
                  className="stat-val"
                  style={{
                    fontSize: '2rem', fontWeight: 800,
                    color: 'white', lineHeight: 1,
                    transition: 'color 0.2s',
                  }}
                >
                  {s.value}
                </div>
                <div style={{
                  fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)',
                  marginTop: 4, fontWeight: 500, letterSpacing: '0.04em',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. WHY JOIN US
      ══════════════════════════════════════════════════════════ */}
      <section className="section-py-sm" style={{ background: 'var(--gray-100,#f3f4f6)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-label">Life at Raddiant Plus</span>
            <h2 style={{ marginTop: 10, marginBottom: 10 }}>Why Work With Us?</h2>
            <div className="divider-accent" style={{ margin: '0 auto' }} />
            <p style={{
              color: 'var(--gray-500,#6b7280)', maxWidth: 480,
              margin: '14px auto 0', fontSize: '0.92rem',
            }}>
              We invest in our people so our people can invest in their patients.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 20,
          }}>
            {PERKS.map((perk, i) => (
              <div
                key={perk.title}
                className="perk-card"
                style={{
                  background: 'white',
                  border: '1.5px solid var(--gray-200,#e5e7eb)',
                  borderRadius: 16,
                  padding: '24px 22px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  animation: `perkCardIn 0.5s ${i * 80}ms ease both`,
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'var(--gray-100,#f3f4f6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', marginBottom: 14,
                }}>
                  {perk.icon}
                </div>
                <h4 style={{
                  margin: '0 0 8px', fontSize: '0.95rem',
                  fontWeight: 700, color: 'var(--gray-800,#1f2937)',
                }}>
                  {perk.title}
                </h4>
                <p style={{
                  margin: 0, fontSize: '0.82rem',
                  color: 'var(--gray-500,#6b7280)', lineHeight: 1.65,
                }}>
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. OPEN POSITIONS
      ══════════════════════════════════════════════════════════ */}
      <section
        id="open-positions"
        className="section-py-sm"
        style={{ background: 'var(--gray-50,#f9fafb)' }}
      >
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <span className="section-label">Opportunities</span>
            <h2 style={{ marginTop: 10, marginBottom: 8 }}>Open Positions</h2>
            <div className="divider-accent" />
            <p style={{
              color: 'var(--gray-500,#6b7280)', maxWidth: 500,
              marginTop: 10, marginBottom: 0, fontSize: '0.9rem',
            }}>
              Filter by department and click <strong>Apply Now</strong> to submit your application directly.
            </p>
          </div>

          <JobListingsClient />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. WALK-IN / GENERAL APPLICATION CTA
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a, #1e3a5f)',
        padding: '60px 0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 32,
            alignItems: 'center',
          }}>
            {/* Left copy */}
            <div>
              <span className="section-label" style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}>
                Don&rsquo;t See a Fit?
              </span>
              <h2 style={{ color: 'white', marginTop: 12, marginBottom: 12 }}>
                Send Us a General Application
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 0 }}>
                We're always looking for passionate healthcare professionals. Drop your CV
                and we'll reach out when a suitable opening arises.
              </p>
            </div>

            {/* Right contact cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Email */}
              <a
                href="mailto:careers@raddiantplus.com"
                className="cta-email-btn"
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px 20px', borderRadius: 12,
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.07)',
                  color: 'white', textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'var(--primary,#0d6efd)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <FaEnvelope style={{ color: 'white', fontSize: '1rem' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>
                    Email HR
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                    careers@raddiantplus.com
                  </div>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+911234567890"
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px 20px', borderRadius: 12,
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white', textDecoration: 'none',
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: '#10b981',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <FaPhoneAlt style={{ color: 'white', fontSize: '0.9rem' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>
                    Call HR Dept
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                    +91 123 456 7890
                  </div>
                </div>
              </a>

              {/* Walk-in info */}
              <div style={{
                padding: '12px 16px', borderRadius: 10,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                  🏢 <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Walk-in interviews</strong> every
                  Saturday 10:00 AM – 1:00 PM at the HR Department, Ground Floor,
                  Raddiant Plus Hospital, Nashik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
