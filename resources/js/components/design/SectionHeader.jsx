// components/design/SectionHeader.jsx

export default function SectionHeader({ label, title, subtitle, align = 'left' }) {
  const isCenter = align === 'center';

  return (
    <div className={`flex flex-col gap-3 ${isCenter ? 'items-center text-center' : 'items-start text-left'}`}>

      {/* Label pill — only renders if provided */}
      {label && (
        <span className="inline-flex items-center gap-2 bg-blue-500 border border-blue-100 text-blue-700 text-[11px] font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
          {label}
        </span>
      )}

      {/* Title */}
      {title && (
        <h2 className={`text-[28px] md:text-[36px] font-bold leading-tight tracking-tight text-cyan-900 ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
          {title}
        </h2>
      )}

      {/* Animated accent bar */}
      <div className={`flex gap-1.5 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <div className="h-1 w-10 rounded-full bg-blue-600" />
        <div className="h-1 w-3 rounded-full bg-blue-300" />
        <div className="h-1 w-1.5 rounded-full bg-blue-200" />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className={`text-[15px] text-gray-500 leading-relaxed ${isCenter ? 'max-w-xl mx-auto' : 'max-w-lg'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
