import Link from 'next/link';
import ServiceCard from '../../components/ui/ServiceCard';
import CTABanner from '../../components/sections/CTABanner';
import { SERVICES } from '../../lib/data';

export const metadata = { title: 'Our Services', description: 'Comprehensive multispecialty medical services at Raddiant Plus Hospital Nashik – Cardiology, Orthopedics, Neurology, Diagnostics and more.' };

export default function ServicesPage() {
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', padding: '80px 0 64px' }}>
        <div className="container text-center">
          <span className="section-label" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--accent-light)', border: '1px solid rgba(255,255,255,0.2)' }}>Specialties</span>
          <h1 style={{ color: 'white', marginTop: 12 }}>Our Medical Services</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 560, margin: '16px auto 0', fontSize: '1.05rem' }}>20+ specialties, advanced diagnostics, and surgical excellence — all under one NABH-accredited roof.</p>
        </div>
      </section>

      <section className="section-py">
        <div className="container">
          <div className="row g-4">
            {SERVICES.map(s => (
              <div key={s.id} className="col-lg-3 col-md-6"><ServiceCard service={s} /></div>
            ))}
          </div>

          {/* Diagnostics highlight */}
          <div style={{ marginTop: 64, background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: 'var(--radius-xl)', padding: '48px 40px', color: 'white' }}>
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <h2 style={{ color: 'white', marginBottom: 16 }}>NABL-Accredited Diagnostic Centre</h2>
                <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 24 }}>Our state-of-the-art diagnostic centre offers the full spectrum of tests with rapid turnaround times, digital reports, and the highest quality standards.</p>
                <div className="row g-2">
                  {['3T MRI Scan','128-Slice CT','Digital X-Ray','Colour Doppler USG','Full Pathology','ECG & Holter','PFT & ABG','Bone Densitometry'].map(t => (
                    <div key={t} className="col-6 col-md-4">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
                        <span style={{ color: 'var(--accent-light)' }}>✓</span>{t}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-5 text-center">
                <div style={{ fontSize: '4rem', marginBottom: 16 }}>🔬</div>
                <Link href="/appointment" style={{ background: 'white', color: 'var(--primary)', padding: '14px 32px', borderRadius: 'var(--radius-full)', fontWeight: 700, display: 'inline-block' }}>
                  Book a Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
