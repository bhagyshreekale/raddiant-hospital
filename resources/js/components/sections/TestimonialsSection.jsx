import TestimonialCard from '../design/TestimonialCard';
import SectionHeader from '../design/SectionHeader';
import { TESTIMONIALS } from '../../lib copy/data';

export default function TestimonialsSection() {
  return (
    <section className="section-py">
      <div className="container">
        <div className="text-center">
          <SectionHeader label="Patient Stories" title="What Our Patients Say" subtitle="Thousands of families trust Raddiant Plus for their healthcare needs." align="center" />
        </div>
        <div className="row g-4">
          {TESTIMONIALS.map(t => (
            <div key={t.id} className="col-lg-3 col-md-6">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
        <div className="text-center mt-4" style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>
          ⭐⭐⭐⭐⭐ <strong>4.9/5</strong> average rating from 2,000+ patient reviews
        </div>
      </div>
    </section>
  );
}
