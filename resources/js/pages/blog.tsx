'use client';

import { useState, useMemo } from 'react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import BlogCard from '../components/blog/BlogCard';
import FeaturedCard from '../components/blog/FeaturedCard';
import FloatingActions from '../components/design/FloatingActions';

type Blog = {
  id: number;
  title: string;
  category: string;
  description: string;
  read_time: string;
  image: string | null;
};

interface BlogPageProps {
  blogs: Blog[];
}

export default function BlogPage({ blogs = [] }: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = blogs.map((b) => b.category);
    return ['All', ...Array.from(new Set(cats))];
  }, [blogs]);

  const featured = blogs.length > 0 ? blogs[0] : null;
  const gridPosts = blogs.length > 1 ? blogs.slice(1) : [];

  const filtered = activeCategory === 'All'
      ? gridPosts
      : gridPosts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
    <section className="relative bg-gradient-to-b from-emerald-50 via-white to-white overflow-hidden pt-16 pb-0 px-4">
 
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#0f766e 1px, transparent 1px), linear-gradient(90deg, #0f766e 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
 
      {/* Soft corner glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] bg-gradient-to-b from-emerald-100/70 to-transparent blur-3xl pointer-events-none" />
 
      {/* Thin top accent */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400" />
 
      <div className="relative z-10 max-w-4xl mx-auto text-center">
 
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Health Journal · Raddiant Plus Hospital
        </div>
 
        {/* Heading */}
        <h1 className="font-black text-4xl sm:text-5xl md:text-6xl text-slate-900 leading-[1.05] tracking-tight mb-5">
          Your Guide to a{' '}
          <span className="relative">
            <span className="text-emerald-600">Healthier</span>
            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0 6 Q50 1 100 5 Q150 9 200 4" stroke="#6ee7b7" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </svg>
          </span>
          {' '}Life
        </h1>
 
        {/* Sub */}
        <p className="text-slate-500 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Expert insights, wellness tips, and medical guidance from our team of{' '}
          <strong className="text-slate-700 font-semibold">board-certified specialists</strong>.
        </p>
 
        {/* Search bar */}
        {/* <div className="relative max-w-xl mx-auto mb-10">
          <div className="flex items-center bg-white border-2 border-slate-200 focus-within:border-emerald-400 rounded-2xl overflow-hidden shadow-sm shadow-slate-100 transition-all duration-200">
            <span className="pl-4 text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search articles, topics, conditions…"
              className="flex-1 px-3 py-3.5 text-sm text-slate-700 placeholder:text-slate-400 bg-transparent outline-none"
            />
            <button className="m-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors">
              Search
            </button>
          </div>
        </div> */}
 
        {/* Category pills */}
        {/* <div className="flex flex-wrap justify-center gap-2 mb-0">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-150 ${
                i === 0
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-200'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div> */}
 
      </div>
 
      {/* Bottom fade into page */}
      <div className="relative mt-10 h-10 bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </section>

        <div className="bg-white border-b sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
            <div className="flex gap-2 py-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${
                    activeCategory === cat
                      ? 'bg-teal-700 text-white'
                      : 'text-slate-500 border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          {featured && activeCategory === 'All' && (
            <section className="pt-10">
              <FeaturedCard post={featured} />
            </section>
          )}

          <section className="py-10">
            {filtered.length === 0 ? (
              <p className="text-center text-gray-400">No blogs found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}