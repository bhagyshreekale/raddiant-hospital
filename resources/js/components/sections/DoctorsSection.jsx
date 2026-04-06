
import DoctorCard from '../design/DoctorCard';
import SectionHeader from '../design/SectionHeader';
import { DOCTORS } from '../../lib copy/data';

export default function DoctorsSection() {
  return (
    <section className="section-py" style={{ background: 'var(--off-white)' }}>
      <div className="container">
        <div className="text-center">
          <SectionHeader label="Our Specialists" title="Meet Our Expert Doctors" subtitle="Experienced, compassionate specialists committed to your health and well-being." align="center" />
        </div>
        <div className="row g-4">
          {DOCTORS.map(d => (
            <div key={d.id} className="col-lg-4 col-md-6">
              <DoctorCard doctor={d} />
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <a href="/doctors" className="btn-primary-custom">View All Doctors</a>
        </div>
      </div>
    </section>
  );
}
