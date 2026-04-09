'use client';

const TAG_COLORS = {
  Cardiology:    { bg: '#fef2f2', text: '#dc2626', dot: '#ef4444' },
  Orthopedics:   { bg: '#fff7ed', text: '#c2410c', dot: '#f97316' },
  Neurology:     { bg: '#faf5ff', text: '#7c3aed', dot: '#8b5cf6' },
  Gynecology:    { bg: '#fdf2f8', text: '#be185d', dot: '#ec4899' },
  Pediatrics:    { bg: '#ecfeff', text: '#0e7490', dot: '#06b6d4' },
  Diagnostics:   { bg: '#f0fdf4', text: '#15803d', dot: '#10b981' },
  Emergency:     { bg: '#fffbeb', text: '#b45309', dot: '#f59e0b' },
  Surgery:       { bg: '#eff6ff', text: '#1d4ed8', dot: '#3b82f6' },
};

const DEFAULT_TAG = { bg: '#f0f9ff', text: '#0369a1', dot: '#0ea5e9' };

export default function TestimonialCard({ testimonial }) {
  const tagStyle = TAG_COLORS[testimonial.tag] ?? DEFAULT_TAG;

  /* Avatar initials */
  const initials = testimonial.name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('');

  return (
    <article
      className="
        group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden
        border border-slate-100
        shadow-sm hover:shadow-xl hover:shadow-slate-200/50
        hover:-translate-y-1.5 transition-all duration-400 ease-out
      "
    >
      {/* Top accent bar — slides in on hover */}
      <span
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl
                   origin-left scale-x-0 group-hover:scale-x-100
                   transition-transform duration-500 ease-out"
        style={{ background: `linear-gradient(90deg, ${tagStyle.dot}, ${tagStyle.dot}66)` }}
      />

      <div className="flex flex-col flex-1 p-6">

        {/* ── Top row: rating + tag ── */}
        <div className="flex items-center justify-between mb-5">
          {/* Stars */}
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i}
                className={`w-4 h-4 transition-transform duration-200 ${i < testimonial.rating ? 'group-hover:scale-110' : 'opacity-20'}`}
                style={{ color: i < testimonial.rating ? '#f59e0b' : '#94a3b8',
                         transitionDelay: `${i * 40}ms` }}
                fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>

          {/* Tag pill */}
          <span
            className="inline-flex items-center gap-1.5 text-[0.68rem] font-black uppercase tracking-wider px-3 py-1 rounded-full"
            style={{ background: tagStyle.bg, color: tagStyle.text }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: tagStyle.dot }} />
            {testimonial.tag}
          </span>
        </div>

        {/* ── Quote icon ── */}
        <svg className="w-7 h-7 mb-3 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
             style={{ color: tagStyle.dot }}
             fill="currentColor" viewBox="0 0 32 32">
          <path d="M10 8C5.582 8 2 11.582 2 16s3.582 8 8 8h1v4l5-4h6c4.418 0 8-3.582 8-8s-3.582-8-8-8H10z"/>
        </svg>

        {/* ── Testimonial text ── */}
        <p className="text-sm md:text-[0.9375rem] text-slate-600 leading-relaxed italic flex-1 mb-6">
          &ldquo;{testimonial.text}&rdquo;
        </p>

        {/* ── Footer: avatar + name ── */}
        <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
          {/* Avatar circle */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center
                       text-xs font-black flex-shrink-0 border-2"
            style={{
              background: tagStyle.bg,
              color: tagStyle.text,
              borderColor: tagStyle.dot + '33',
            }}
          >
            {initials}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">{testimonial.name}</p>
            <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400">
              Verified Patient
            </p>
          </div>

          {/* Verified tick */}
          <div className="ml-auto flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200
                          flex items-center justify-center">
            <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        </div>

      </div>
    </article>
  );
}
