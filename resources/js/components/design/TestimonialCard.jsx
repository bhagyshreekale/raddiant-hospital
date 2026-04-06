export default function TestimonialCard({ testimonial }) {
  return (
    <div className="card-custom h-100 p-4">
      <div className="d-flex gap-1 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} style={{ color: 'var(--gold)', fontSize: '1rem' }}>★</span>
        ))}
      </div>
      <p style={{ fontSize: '0.9rem', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 20 }}>
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--gray-900)' }}>{testimonial.name}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--gray-500)' }}>Verified Patient</div>
        </div>
        <span className="badge-custom badge-primary" style={{ fontSize: '0.72rem' }}>{testimonial.tag}</span>
      </div>
    </div>
  );
}
