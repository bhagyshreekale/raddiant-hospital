import { motion } from "framer-motion";

const ICON_MAP = {
  FaHeartbeat:   { accent: '#ef4444' },
  FaBone:        { accent: '#f97316' },
  FaBrain:       { accent: '#8b5cf6' },
  FaFemale:      { accent: '#ec4899' },
  FaChild:       { accent: '#06b6d4' },
  FaMicroscope:  { accent: '#10b981' },
  FaAmbulance:   { accent: '#f59e0b' },
  FaScalpel:     { accent: '#3b82f6' },
};

export default function ServiceCard({ service, index = 0 }) {
  const meta = ICON_MAP[service.icon] ?? { accent: '#0ea5e9' };

  // Premium Entrance Animation (Scroll Reveal)
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Super smooth custom easing
        delay: index * 0.1, // Stagger effect based on index in grid
      },
    },
  };

  return (
    <motion.article
      // Framer Motion Triggers
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }} // Triggers when 50px into view
      whileHover={{ y: -8 }} // Replaces Tailwind hover lift for smoother animation
      
      className="
        group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden
        border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/60
      "
    >
      {/* 🔝 Top Image */}
      <div className="relative w-full h-44 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition duration-500" />
      </div>

      {/* Accent line */}
      <span
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl origin-left
                   scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-10"
        style={{ background: `linear-gradient(90deg, ${meta.accent}, ${meta.accent}88)` }}
      />

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 md:p-7">
        {/* Title */}
        <h3 className="text-base md:text-[1.05rem] font-bold text-slate-900 mb-2 leading-snug">
          <span className="group-hover:text-sky-600 transition-colors duration-300">
            {service.title}
          </span>
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-500 flex-1 mb-6">
          {service.desc}
        </p>

        {/* CTA */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-100">
      <button
  onClick={() => window.location.href = "/appoinment"}
  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider
             text-sky-600 hover:text-sky-700 transition-colors duration-200 group"
>
  Book Now
  <svg
    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
</button>

          {/* Glowing dot */}
          <span
            className="w-2.5 h-2.5 rounded-full opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(0,0,0,0.4)] transition-all duration-300"
            style={{ 
              backgroundColor: meta.accent,
              boxShadow: `0 0 0 0 ${meta.accent}`
            }}
          />
        </div>
      </div>
    </motion.article>
  );
}
