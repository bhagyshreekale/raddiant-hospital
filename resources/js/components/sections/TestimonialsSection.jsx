import TestimonialCard from '../design/TestimonialCard';
import SectionHeader from '../design/SectionHeader';
import { TESTIMONIALS } from '../../lib copy/data';

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center md:mb-16">
          <SectionHeader 
            label="Patient Stories" 
            title="What Our Patients Say" 
            subtitle="Thousands of families trust Raddiant Plus for their healthcare needs." 
            align="center" 
          />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="h-full">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>

        {/* Social Proof Footer */}
        <div className="mt-12 flex flex-col items-center justify-center gap-2 text-center md:mt-16">
          <div className="flex items-center gap-1 text-[var(--gold)]">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p className="text-sm text-gray-500">
            <span className="font-bold text-gray-900">4.9/5</span> average rating from 2,000+ patient reviews
          </p>
        </div>
      </div>
    </section>
  );
}