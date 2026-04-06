// src/app/contact/page.jsx
// ✅ SERVER COMPONENT — metadata export is allowed here
import MapSection from '../../components/sections/MapSection';
import Faqsection from '../faq/page';
import PatientInquiryForm from '../../components/sections/PatientInquiryForm';

export const metadata = {
  title: 'Contact Us',
  description: 'Contact Raddiant Plus Hospital Nashik – phone, email, address and map location.',
};

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
        padding: '96px 0 72px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* decorative glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 60% at 70% 40%, rgba(0,180,216,.18) 0%, transparent 65%)',
        }} />
        {/* wave cut */}
        <div style={{
          position: 'absolute', bottom: -1, left: 0, right: 0, height: 52,
          background: 'var(--white)',
          clipPath: 'ellipse(54% 100% at 50% 100%)',
        }} />

        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label" style={{
            background: 'rgba(255,255,255,0.1)',
            color: 'var(--accent-light)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            Get in Touch
          </span>
          <h1 style={{ color: 'white', marginTop: 12, marginBottom: 14 }}>Contact Us</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 520, margin: '0 auto', fontSize: '1.05rem' }}>
            We're here to help — appointments, queries, second opinions, or emergencies.
          </p>
        </div>
      </section>

      {/* CLIENT COMPONENT — inquiry form with all interactivity */}
      <PatientInquiryForm />

      {/* MAP */}
      <MapSection />

      {/* FAQ */}
      <Faqsection />
    </>
  );
}
