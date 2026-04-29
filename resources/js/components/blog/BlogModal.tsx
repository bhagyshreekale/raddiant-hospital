'use client';

import { useEffect, MouseEvent } from 'react';

type Blog = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string | null;
  readTime?: string;
  tags?: string[];
};

function getBlogImage(image: string | null): string {
  if (!image) return '/images/preloader.png';
  if (image.startsWith('http')) return image;
  return `/storage/${image}`;
}

function cleanBlogDescription(html: string): string {
  if (!html) return '';
  let cleaned = html
    // Fix broken tags from TinyMCE - convert <h1><br> to <h1>
    .replace(/<(h[1-6])>\s*<br\s*\/?>\s*/gi, '<$1>')
    .replace(/<\/(h[1-6])>\s*<br\s*\/?>\s*/gi, '</$1>')
    // Fix img src paths
    .replace(/src="(\.\.\/)+storage\/uploads/g, 'src="/storage/uploads')
    .replace(/src="(\.\.\/)+storage/g, 'src="/storage')
    .replace(/src="storage\//g, 'src="/storage/')
    // Clean &nbsp;
    .replace(/&nbsp;/g, ' ')
    // Remove empty p tags
    .replace(/<p>\s*<\/p>/g, '')
    // Clean extra br in headings
    .replace(/<(h[1-6])>([^<]*)<br\s*\/?>([^<]*)<\/(h[1-6])>/gi, '<$1>$2 $3</$4>');
  return cleaned;
}

interface BlogModalProps {
  post: Blog | null;
  onClose: () => void;
}

const slideUpKeyframes = `
@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
`;

const customScrollbarStyles = `
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
`;

const proseStyles = `
.prose img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1rem 0; }
.prose h1, .prose h2, .prose h3, .prose h4 { font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.5rem; }
.prose p { margin-bottom: 1rem; }
.prose ul, .prose ol { margin: 1rem 0; padding-left: 1.5rem; }
.prose li { margin-bottom: 0.5rem; }
.prose a { color: #0d9488; text-decoration: underline; }
.prose blockquote { border-left: 4px solid #e2e8f0; padding-left: 1rem; margin: 1rem 0; font-style: italic; }
`;

export default function BlogModal({ post, onClose }: BlogModalProps) {
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!post) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <style>{slideUpKeyframes}</style>
      <style>{customScrollbarStyles}</style>
      <style>{proseStyles}</style>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
        style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)' }}
        onClick={handleBackdropClick}
      >
        <div
          className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
          style={{ animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <div className="relative w-full h-48 sm:h-80 flex-shrink-0">
            <img
              src={getBlogImage(post.image)}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white hover:text-slate-900 transition-all duration-300"
            >
              <span className="text-2xl leading-none">&times;</span>
            </button>
          </div>

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

            <article 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: cleanBlogDescription(post.description) }}
            />

            {post.tags && (
              <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-slate-100">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="text-teal-600 text-sm font-semibold">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}