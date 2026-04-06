
import { SITE } from '../../lib copy/data';

export default function CTABanner() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)',
      padding: '72px 0', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />
      <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
        <h2 style={{ color: 'white', marginBottom: 16 }}>Ready to Take Charge of Your Health?</h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
          Book an appointment today and experience healthcare that puts you first. Available 24×7 for emergencies.
        </p>
        <div className="d-flex justify-content-center flex-wrap gap-3">
          <a href="/appointment" style={{
            background: 'white', color: 'var(--primary)', padding: '14px 32px',
            borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '1rem',
            boxShadow: 'var(--shadow-lg)', transition: 'all 0.3s', display: 'inline-flex', alignItems: 'center', gap: 8
          }}>
            📅 Book Appointment
          </a>
          <a href={`tel:${SITE.phone}`} className="btn-outline-custom" style={{ fontSize: '1rem', padding: '14px 32px' }}>
            📞 Call {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
