'use client';

const ICON_MAP = {
  FaHeartbeat:   { emoji: '❤️', bg: '#ef444415', accent: '#ef4444' },
  FaBone:        { emoji: '🦴', bg: '#f9731615', accent: '#f97316' },
  FaBrain:       { emoji: '🧠', bg: '#8b5cf615', accent: '#8b5cf6' },
  FaFemale:      { emoji: '👩‍⚕️', bg: '#ec489915', accent: '#ec4899' },
  FaChild:       { emoji: '👶', bg: '#06b6d415', accent: '#06b6d4' },
  FaMicroscope:  { emoji: '🔬', bg: '#10b98115', accent: '#10b981' },
  FaAmbulance:   { emoji: '🚑', bg: '#f59e0b15', accent: '#f59e0b' },
  FaScalpel:     { emoji: '⚕️', bg: '#3b82f615', accent: '#3b82f6' },
};

export default function ServiceCard({ service }) {
  const meta = ICON_MAP[service.icon] ?? { emoji: '🏥', bg: '#0ea5e915', accent: '#0ea5e9' };

  return (
    <article
      className="
        group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden
        border border-slate-100
        shadow-sm hover:shadow-2xl hover:shadow-slate-200/60
        hover:-translate-y-2 transition-all duration-500 ease-out
      "
    >
      {/* ── Accent line top (slides in on hover) ── */}
      <span
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl origin-left
                   scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
        style={{ background: `linear-gradient(90deg, ${meta.accent}, ${meta.accent}88)` }}
      />

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-6 md:p-7">

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6
                     transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: meta.bg }}
        >
          {meta.emoji}
        </div>

        {/* Title */}
        <h3
          className="text-base md:text-[1.05rem] font-bold text-slate-900 mb-2 leading-snug
                     transition-colors duration-300"
          style={{ color: undefined }}
        >
          <span className="group-hover:text-sky-600 transition-colors duration-300">
            {service.title}
          </span>
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-500 flex-1 mb-6">
          {service.desc}
        </p>

        {/* CTA row */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-100">
          <a
            href="/appointment"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider
                       text-sky-600 hover:text-sky-700 transition-colors duration-200"
          >
            Book Now
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Subtle specialty dot */}
          <span
            className="w-2 h-2 rounded-full opacity-60"
            style={{ backgroundColor: meta.accent }}
          />
        </div>
      </div>
    </article>
  );
}
