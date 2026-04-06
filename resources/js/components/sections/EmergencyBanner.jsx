import { SITE } from '../../lib copy/data';

export default function EmergencyBanner() {
  return (
    <div style={{ background: 'var(--danger)', padding: '12px 0' }}>
      <div className="container d-flex justify-content-center align-items-center flex-wrap gap-3" style={{ textAlign: 'center' }}>
        <span style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>
          🚨 Medical Emergency? Call Immediately:
        </span>
        <a href={`tel:${SITE.emergency}`} style={{
          color: 'white', fontWeight: 800, fontSize: '1.1rem',
          background: 'rgba(255,255,255,0.2)', padding: '4px 18px',
          borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.4)'
        }}>
          {SITE.emergency} (Free)
        </a>
        <a href={`tel:${SITE.phone}`} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>
          or {SITE.phone}
        </a>
      </div>
    </div>
  );
}
