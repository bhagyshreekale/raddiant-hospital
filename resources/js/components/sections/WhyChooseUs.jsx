'use client';
import SectionHeader from '../../components/design/SectionHeader';
import { USPS } from '../../lib copy/data';

const ICON_MAP = {
  FaClock: '⏰', FaUserMd: '👨‍⚕️', FaMicroscope: '🔬',
  FaShieldAlt: '🛡️', FaHeartbeat: '❤️', FaParking: '🏢'
};

export default function WhyChooseUs() {
  return (
    <section className="section-py" style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)' }}>
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-label" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--accent-light)' }}>Why Raddiant Plus</span>
          <h2 style={{ color: 'white', marginBottom: 12 }}>The Raddiant Difference</h2>
          <div className="divider-accent mx-auto" style={{ background: 'linear-gradient(90deg, var(--accent-light), white)' }} />
          <p style={{ color: 'rgba(255,255,255,0.72)', maxWidth: 520, margin: '0 auto' }}>We combine clinical excellence with compassionate care to deliver outcomes you can trust.</p>
        </div>
        <div className="row g-4">
          {USPS.map(usp => (
            <div key={usp.title} className="col-lg-4 col-md-6">
              <div style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 'var(--radius-lg)', padding: '28px 28px', backdropFilter: 'blur(8px)',
                transition: 'all 0.3s', cursor: 'default', height: '100%'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: 14 }}>{ICON_MAP[usp.icon] || '✅'}</div>
                <h3 style={{ color: 'white', fontSize: '1.05rem', marginBottom: 8 }}>{usp.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', margin: 0, lineHeight: 1.65 }}>{usp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
