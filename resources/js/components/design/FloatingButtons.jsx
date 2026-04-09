'use client';
import { SITE } from '../../lib/data';

export default function FloatingButtons() {
  return (
    <>
      {/* Sticky Call Bar — mobile only */}
      <a
        href={`tel:${SITE.phone}`}
        aria-label="Call hospital"
        className="
          fixed bottom-0 left-0 right-0 z-50
          flex items-center justify-center gap-2
          bg-blue-700 text-white text-sm font-semibold
          py-3 px-4 shadow-lg
          sm:hidden
          active:bg-blue-800 transition-colors duration-150
        "
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79a15.054 15.054 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.07 21 3 13.93 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        Call Us: {SITE.phone}
      </a>

      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${SITE.whatsapp}?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Raddiant%20Plus%20Hospital.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          group fixed bottom-24 right-5
          sm:bottom-28 sm:right-6
          z-50 flex items-center gap-2
          bg-[#25D366] hover:bg-[#1ebe5d]
          text-white rounded-full
          w-14 h-14 justify-center
          shadow-[0_4px_20px_rgba(37,211,102,0.45)]
          hover:shadow-[0_6px_24px_rgba(37,211,102,0.6)]
          hover:scale-110 active:scale-95
          transition-all duration-200 ease-out
        "
      >
        {/* Tooltip */}
        <span className="
          absolute right-16 whitespace-nowrap
          bg-gray-900 text-white text-xs font-medium
          px-3 py-1.5 rounded-lg
          opacity-0 group-hover:opacity-100
          translate-x-2 group-hover:translate-x-0
          pointer-events-none
          transition-all duration-200
          after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2
          after:left-full after:border-4 after:border-transparent
          after:border-l-gray-900
        ">
          Chat on WhatsApp
        </span>

        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </a>

      {/* Call FAB */}
      <a
        href={`tel:${SITE.phone}`}
        aria-label="Call Now"
        className="
          group fixed bottom-8 right-5
          sm:bottom-12 sm:right-6
          z-50 flex items-center justify-center
          bg-blue-700 hover:bg-blue-600
          text-white rounded-full
          w-14 h-14
          shadow-[0_4px_20px_rgba(29,78,216,0.4)]
          hover:shadow-[0_6px_24px_rgba(29,78,216,0.55)]
          hover:scale-110 active:scale-95
          transition-all duration-200 ease-out
        "
      >
        {/* Tooltip */}
        <span className="
          absolute right-16 whitespace-nowrap
          bg-gray-900 text-white text-xs font-medium
          px-3 py-1.5 rounded-lg
          opacity-0 group-hover:opacity-100
          translate-x-2 group-hover:translate-x-0
          pointer-events-none
          transition-all duration-200
          after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2
          after:left-full after:border-4 after:border-transparent
          after:border-l-gray-900
        ">
          Call Now
        </span>

        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79a15.054 15.054 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.07 21 3 13.93 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </a>
    </>
  );
}