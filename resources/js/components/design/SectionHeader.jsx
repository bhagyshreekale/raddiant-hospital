export default function SectionHeader({ label, title, subtitle, align = 'left' }) {
  const textAlign = align === 'center' ? 'center' : 'left';
  const marginClass = align === 'center' ? 'mx-auto' : '';
  return (
    <div style={{ textAlign, marginBottom: 8 }}>
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      <div className={`divider-accent ${marginClass}`} style={align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}} />
      {subtitle && <p className={`section-subtitle ${marginClass}`}>{subtitle}</p>}
    </div>
  );
}
