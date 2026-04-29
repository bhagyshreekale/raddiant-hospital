'use client';

import { Link } from '@inertiajs/react';

type Blog = {
  id: number;
  title: string;
  category: string;
  description: string;
  read_time: string;
  image: string | null;
};

function getBlogImage(image: string | null): string {
  if (!image) return '/images/preloader.png';
  if (image.startsWith('http')) return image;
  return `/storage/${image}`;
}

function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').slice(0, 200) + (html.length > 200 ? '...' : '');
}

interface FeaturedCardProps {
  post: Blog;
  onReadMore?: (post: Blog) => void;
}

export default function FeaturedCard({ post, onReadMore }: FeaturedCardProps) {
  const blogLink = `/blog/${post.id}`;

  return (
    <Link href={blogLink} className="group block">
      <article className="relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-auto overflow-hidden">
            <img
              src={getBlogImage(post.image)}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
          </div>
          
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-teal-600 text-white text-xs font-bold uppercase tracking-widest rounded-lg">
                {post.category}
              </span>
              <span className="text-slate-400 text-sm">{post.read_time || '5 min read'}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-serif leading-tight mb-4 group-hover:text-teal-700 transition-colors">
              {post.title}
            </h2>

            <p className="text-slate-600 leading-relaxed line-clamp-3 mb-6">
              {stripHtml(post.description)}
            </p>

            <div className="flex items-center text-teal-700 font-bold">
              <span className="group-hover:underline decoration-2 underline-offset-4">
                Read Article
              </span>
              <svg 
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
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