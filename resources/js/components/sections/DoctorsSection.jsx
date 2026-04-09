import DoctorCard from '../design/DoctorCard';
import SectionHeader from '../design/SectionHeader';
import { DOCTORS } from '../../lib copy/data';

export default function DoctorsSection() {
  return (
    <section className="bg-[var(--off-white)] py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center md:mb-16">
          <SectionHeader 
            label="Our Specialists" 
            title="Meet Our Expert Doctors" 
            subtitle="Experienced, compassionate specialists committed to your health and well-being." 
            align="center" 
          />
        </div>

        {/* Responsive Grid System */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {DOCTORS.map((d) => (
            <div key={d.id} className="h-full">
              <DoctorCard doctor={d} />
            </div>
          ))}
        </div>

        {/* Footer Action */}
        <div className="mt-12 text-center md:mt-16">
          <a 
            href="/doctors" 
            className="inline-block rounded-full bg-[var(--primary)] px-10 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--accent)] hover:shadow-lg active:scale-95"
          >
            View All Doctors
          </a>
        </div>
      </div>
    </section>
  );
}