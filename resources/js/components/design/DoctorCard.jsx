

export default function DoctorCard({ doctor }) {
  return (
    <div className="card-custom h-100">
      <div style={{ position: 'relative', height: 220, overflow: 'hidden', background: 'var(--gray-100)' }}>
        <img
          src={doctor.img}
          alt={`${doctor.name} – ${doctor.specialty}`}
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div style={{
          position: 'absolute', bottom: 12, left: 12,
          background: 'rgba(10,77,140,0.9)', backdropFilter: 'blur(6px)',
          borderRadius: 6, padding: '4px 10px', color: 'white', fontSize: '0.75rem', fontWeight: 600
        }}>
          {doctor.experience}
        </div>
      </div>
      <div style={{ padding: '20px 24px 24px' }}>
        <div className="badge-custom badge-accent mb-2">{doctor.specialty}</div>
        <h3 style={{ fontSize: '1.05rem', marginBottom: 4 }}>{doctor.name}</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--gray-500)', marginBottom: 2 }}>{doctor.qual}</p>
        <p style={{ fontSize: '0.82rem', color: 'var(--gray-500)', marginBottom: 16 }}>Available: {doctor.available}</p>
        <a href="/appointment" className="btn-primary-custom" style={{ fontSize: '0.85rem', padding: '9px 18px' }}>
          Book Appointment
        </a>
      </div>
    </div>
  );
}
