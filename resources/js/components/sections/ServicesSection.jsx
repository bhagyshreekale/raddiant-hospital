
import ServiceCard from '../design/ServiceCard';
import SectionHeader from '../design/SectionHeader';
import { SERVICES } from '../../lib copy/data';

export default function ServicesSection() {
  return (
    <section className="section-py">
      <div className="container">
        <div className="text-center">
          <SectionHeader label="Our Specialties" title="Comprehensive Multispecialty Care" subtitle="From advanced diagnostics to complex surgeries — all under one NABH-accredited roof in Nashik." align="center" />
        </div>
        <div className="row g-4">
          {SERVICES.map(s => (
            <div key={s.id} className="col-lg-3 col-md-6">
              <ServiceCard service={s} />
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <a href="/services" className="btn-primary-custom">View All Services</a>
        </div>
      </div>
    </section>
  );
}
