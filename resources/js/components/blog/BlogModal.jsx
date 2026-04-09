'use client';

import { useEffect } from 'react';


export default function BlogModal({ post, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      style={{ background: 'rgba(13,37,53,0.75)', backdropFilter: 'blur(10px' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-2xl my-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ animation: 'slideUp 0.32s cubic-bezier(.22,.9,.42,1)' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg text-xl hover:rotate-90 transition-all duration-200 border border-slate-100"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-64 sm:h-72">
          <img
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>

        {/* Content */}
        <div className="p-7 sm:p-10">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${post.catClass}`}>
              {post.category}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-500 text-xs font-medium">{post.date}</span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-500 text-xs font-medium">{post.readTime}</span>
          </div>

          {/* Title */}
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">
            {post.title}
          </h2>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-teal-600 rounded-full mb-6" />

          {/* Body */}
          <div className="space-y-4">
            {post.content.map((para, i) => (
              <p key={i} className="text-slate-600 text-[0.925rem] leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
