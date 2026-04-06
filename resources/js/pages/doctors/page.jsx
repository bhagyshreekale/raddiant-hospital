import DoctorCard from '../../components/ui/DoctorCard';
import CTABanner from '../../components/sections/CTABanner';
import { DOCTORS } from '../../lib/data';

export const metadata = { title: 'Our Doctors & Specialists', description: 'Meet the expert team of 60+ specialist doctors at Raddiant Plus Hospital Nashik.' };

export default function DoctorsPage() {
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', padding: '80px 0 64px' }}>
        <div className="container text-center">
          <span className="section-label" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--accent-light)', border: '1px solid rgba(255,255,255,0.2)' }}>Our Team</span>
          <h1 style={{ color: 'white', marginTop: 12 }}>Meet Our Specialists</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 560, margin: '16px auto 0', fontSize: '1.05rem' }}>60+ experienced doctors dedicated to your health across every major specialty.</p>
        </div>
      </section>

      <section className="section-py">
        <div className="container">
          <div className="row g-4">
            {DOCTORS.map(d => (
              <div key={d.id} className="col-lg-4 col-md-6"><DoctorCard doctor={d} /></div>
            ))}
          </div>

          <div className="text-center mt-5" style={{ padding: '32px', background: 'var(--off-white)', borderRadius: 'var(--radius-xl)' }}>
            <h3 style={{ marginBottom: 8 }}>Need a Specialist Not Listed?</h3>
            <p style={{ color: 'var(--gray-500)', marginBottom: 20 }}>We have 60+ doctors across 20+ specialties. Call us to find the right expert for your needs.</p>
            <a href="tel:+919876543210" className="btn-primary-custom">📞 Call OPD Desk</a>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
