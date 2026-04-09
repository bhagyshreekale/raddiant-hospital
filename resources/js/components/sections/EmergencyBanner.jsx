import { SITE } from '../../lib copy/data';

export default function EmergencyBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-red-500">
      {/* Diagonal stripe texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(0,0,0,0.04) 12px, rgba(0,0,0,0.04) 24px)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-14 max-w-7xl flex-wrap items-stretch px-4 sm:px-6">

        {/* Label section */}
        <div className="flex w-full items-center gap-3 border-b border-white/20 py-3 sm:w-auto sm:border-b-0 sm:border-r sm:py-0 sm:pr-5 sm:mr-5">
          {/* Animated pulse dot */}
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          <span className="font-heading text-[0.7rem] font-extrabold uppercase tracking-widest text-white sm:text-[0.75rem] whitespace-nowrap">
            Medical Emergency?&nbsp;&nbsp;Call Immediately
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-1 flex-wrap items-center gap-3 py-2.5 sm:py-0">

          {/* Primary CTA */}
          <a
            href={`tel:${SITE.emergency}`}
            className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2 font-heading text-base font-extrabold tracking-tight text-red-700 shadow-[0_2px_0_rgba(0,0,0,0.15)] transition-all hover:-translate-y-px hover:shadow-[0_4px_0_rgba(0,0,0,0.15)] active:translate-y-px active:shadow-none"
          >
            {SITE.emergency}
            <span className="rounded-full border border-red-200/60 bg-red-50 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-red-500">
              Free
            </span>
          </a>

          {/* Vertical divider — hidden on mobile */}
          <div className="hidden h-6 w-px bg-white/25 sm:block" />

          {/* Secondary phone */}
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/20 px-3 py-1.5 text-sm font-medium text-white/85 transition-all hover:bg-white/10 hover:text-white"
          >
            <span className="text-white/50 text-xs">or</span>
            {SITE.phone}
          </a>

        </div>
      </div>
    </div>
  );
}