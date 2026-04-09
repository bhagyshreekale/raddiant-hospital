import { SITE } from '../../lib copy/data';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

export default function MapSection() {
  const items = [
    { icon: <FaMapMarkerAlt />, label: 'Address', value: SITE.address },
    { icon: <FaPhoneAlt />, label: 'Phone', value: SITE.phone },
    { icon: <FaEnvelope />, label: 'Email', value: SITE.email },
    { icon: <FaClock />, label: 'OPD Hours', value: 'Mon–Sat: 9:00 AM – 8:00 PM | Emergency: 24/7' },
  ];

  return (
    <section className="bg-gray-100 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          
          {/* Left Column: Contact Info */}
          <div className="w-full lg:w-5/12">
            <span className="inline-block rounded-full bg-[var(--primary)]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
              Find Us
            </span>
            
            <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Visit Raddiant Plus Hospital
            </h2>
            
            <div className="my-6 h-1 w-16 rounded-full bg-[var(--accent)]" />

            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.label} className="group flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
                  
                  {/* Icon Square */}
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] text-lg text-white shadow-md shadow-[var(--primary)]/20 transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>

                  {/* Label + Value */}
                  <div>
                    <div className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-500">
                      {item.label}
                    </div>
                    <div className="mt-0.5 text-[0.95rem] font-medium leading-relaxed text-gray-700">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Google Map */}
          <div className="w-full lg:w-7/12">
            <div className="overflow-hidden rounded-3xl border-8 border-white bg-white shadow-2xl shadow-gray-300">
              <iframe
                src={SITE.mapEmbedUrl}
                width="100%"
                height="400"
                className="block border-0 grayscale-[0.2] transition-all hover:grayscale-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Raddiant Plus Hospital Location Map"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}