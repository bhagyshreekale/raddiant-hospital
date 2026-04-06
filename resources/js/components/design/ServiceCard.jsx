

const ICON_MAP = {
  FaHeartbeat: '❤️', FaBone: '🦴', FaBrain: '🧠', FaFemale: '👩‍⚕️',
  FaChild: '👶', FaMicroscope: '🔬', FaAmbulance: '🚑', FaScalpel: '🔪',
};

export default function ServiceCard({ service }) {
  return (
    <div className="card-custom h-100 p-4">
      <div style={{
        width: 56, height: 56, background: `${service.color}15`,
        borderRadius: 14, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '1.6rem', marginBottom: 16
      }}>
        {ICON_MAP[service.icon] || '🏥'}
      </div>
      <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{service.title}</h3>
      <p style={{ fontSize: '0.875rem', marginBottom: 16, lineHeight: 1.65 }}>{service.desc}</p>
      <a href="/appointment" style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
        Learn More →
      </a>
    </div>
  );
}
