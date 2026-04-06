import { SITE } from '../../lib copy/data';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
export default function MapSection() {

    const items = [
    { icon: <FaMapMarkerAlt />, label: 'Address', value: SITE.address },
    { icon: <FaPhoneAlt />, label: 'Phone', value: SITE.phone },
    { icon: <FaEnvelope />, label: 'Email', value: SITE.email },
    { icon: <FaClock />, label: 'OPD Hours', value: 'Mon–Sat: 9:00 AM – 8:00 PM | Emergency: 24×7' },
  ];

  return (

    
    <section className="section-py-sm" style={{ background: 'var(--gray-100)' }}>
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-5">
            <span className="section-label">Find Us</span>
            <h2 style={{ marginBottom: 12 }}>Visit Raddiant Plus Hospital</h2>
            <div className="divider-accent" />
         <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {items.map(item => (
        <div key={item.label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          
          {/* Icon */}
          <div style={{
            width: 40,
            height: 40,
            background: 'var(--primary)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
            color: 'white',
            flexShrink: 0
          }}>
            {item.icon}
          </div>

          {/* Label + Value */}
          <div>
            <div style={{
              fontWeight: 600,
              fontSize: '0.85rem',
              color: 'var(--gray-500)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 2
            }}>
              {item.label}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--gray-700)' }}>
              {item.value}
            </div>
          </div>

        </div>
      ))}
    </div>
          </div>
          <div className="col-lg-7">
            <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', height: 360 }}>
              <iframe
                src={SITE.mapEmbedUrl}
                width="100%" height="360" style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Raddiant Plus Hospital Location Map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
