'use client';

import { Link } from '@inertiajs/react';

type Blog = {
  id: number;
  title: string;
  category: string;
  description: string;
  excerpt?: string;
  image: string | null;
  date?: string;
  readTime?: string;
  catClass?: string;
};

function getBlogImage(image: string | null): string {
  if (!image) return '/images/preloader.png';
  if (image.startsWith('http')) return image;
  return `/storage/${image}`;
}

function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').slice(0, 150) + (html.length > 150 ? '...' : '');
}

interface BlogCardProps {
  post: Blog;
  onReadMore?: (post: Blog) => void;
}

export default function BlogCard({ post, onReadMore }: BlogCardProps) {
  const blogLink = `/blog/${post.id}`;

  if (onReadMore) {
    return (
      <article 
        onClick={() => onReadMore(post)}
        className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden cursor-pointer h-full"
      >
        <div className="relative h-52 overflow-hidden flex-shrink-0">
          <img
            src={getBlogImage(post.image)}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest shadow-sm backdrop-blur-md ${post.catClass || 'bg-teal-600 text-white'}`}>
              {post.category}
            </span>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-6">
          <div className="flex items-center gap-2 mb-3 text-slate-400 text-xs font-semibold">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-teal-700 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
            {post.excerpt || stripHtml(post.description)}
          </p>

          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
            <span className="text-teal-700 font-bold text-sm tracking-tight group-hover:underline decoration-2 underline-offset-4">
              Learn More
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-all duration-300">
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <Link href={blogLink} className="group block h-full">
      <article className="flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden h-full">
        <div className="relative h-52 overflow-hidden flex-shrink-0">
          <img
            src={getBlogImage(post.image)}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest shadow-sm backdrop-blur-md ${post.catClass || 'bg-teal-600 text-white'}`}>
              {post.category}
            </span>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-6">
          <div className="flex items-center gap-2 mb-3 text-slate-400 text-xs font-semibold">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-teal-700 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
            {post.excerpt || stripHtml(post.description)}
          </p>

          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
            <span className="text-teal-700 font-bold text-sm tracking-tight group-hover:underline decoration-2 underline-offset-4">
              Learn More
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-all duration-300">
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}