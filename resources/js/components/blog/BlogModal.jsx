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

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
        style={{ animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Header Image Area */}
        <div className="relative w-full h-48 sm:h-80 flex-shrink-0">
          <img
            src={post.image || 'https://via.placeholder.com/800x400'}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Close Button - Floats over image */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white hover:text-slate-900 transition-all duration-300"
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-6 sm:p-10 custom-scrollbar">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3 py-1 bg-teal-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg">
              {post.category}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 text-sm font-medium">{post.readTime || '5 min read'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 leading-tight mb-6">
            {post.title}
          </h2>

          <article className="prose prose-slate max-w-none">
            {/* If content is an array, map it. If it's a string, just display it */}
            {Array.isArray(post.content) ? (
              post.content.map((para, i) => (
                <p key={i} className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4">
                  {para}
                </p>
              ))
            ) : (
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {post.description}
              </p>
            )}
          </article>

          {/* Footer Tags */}
          {post.tags && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-slate-100">
              {post.tags.map((tag) => (
                <span key={tag} className="text-teal-600 text-sm font-semibold">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}