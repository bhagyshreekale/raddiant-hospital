import { SITE } from '../../lib copy/data';

export default function EmergencyBanner() {
  return (
    <div className="bg-[var(--danger)] py-3 shadow-lg">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-3 md:gap-6 text-center">
        
        {/* Urgent Label */}
        <span className="flex items-center gap-2 text-[0.95rem] font-bold text-white uppercase tracking-tight">
          <span className="animate-pulse">🚨</span> Medical Emergency? Call Immediately:
        </span>

        {/* Primary Emergency Link */}
        <a 
          href={`tel:${SITE.emergency}`} 
          className="inline-flex items-center rounded-full border border-white/40 bg-white/20 px-5 py-1.5 text-lg font-extrabold text-white transition-all hover:bg-white/30 active:scale-95 shadow-sm"
        >
          {SITE.emergency} <span className="ml-2 text-xs font-medium opacity-80">(Free)</span>
        </a>

        {/* Secondary Phone */}
        <a 
          href={`tel:${SITE.phone}`} 
          className="text-sm font-medium text-white/80 transition-colors hover:text-white"
        >
          or <span className="underline decoration-white/30 underline-offset-4">{SITE.phone}</span>
        </a>
        
      </div>
    </div>
  );
}