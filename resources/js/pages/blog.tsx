'use client';

import { useState, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FeaturedCard from '../components/blog/FeaturedCard';
import BlogCard from '../components/blog/BlogCard';
import BlogModal from '../components/blog/BlogModal';
import FloatingActions from '../components/design/FloatingActions'
import { BLOG_POSTS, CATEGORIES } from '../lib copy/data';

const STATS = [
  { num: '48+', label: 'Articles' },
  { num: '12',  label: 'Specialists' },
  { num: '8',   label: 'Departments' },
  { num: '2.4k', label: 'Readers' },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePost, setActivePost] = useState<any>(null);

  const handleReadMore = useCallback((post: any) => setActivePost(post), []);
  const handleClose    = useCallback(() => setActivePost(null), []);

  const featured   = BLOG_POSTS.find((p) => p.featured);
  const gridPosts  = BLOG_POSTS.filter((p) => !p.featured);
  const filtered   = activeCategory === 'All'
    ? gridPosts
    : gridPosts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* ── HERO ── */}
        <section className="relative bg-slate-900 overflow-hidden py-10 px-4 mb-10">
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-teal-700/25 blur-3xl -translate-y-1/2" />
            <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-amber-600/10 blur-3xl translate-y-1/2" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-900/50 border border-teal-500/25 text-teal-400 text-[0.68rem] font-bold uppercase tracking-[0.18em] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Health Journal — Expert Insights
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Your Guide to a{' '}
              <span className="text-teal-400">Healthier</span> Life
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Evidence-based medical insights from our specialists across cardiology, neurology, wellness, and more — crafted for you.
            </p>

            {/* Stats */}
            {/* <div className="flex justify-center gap-8 sm:gap-12 border-t border-white/10 pt-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-white leading-none">{s.num}</p>
                  <p className="text-slate-500 text-[0.68rem] uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div> */}
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <div className="bg-white border-b border-slate-100 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-1.5 py-3 min-w-max sm:min-w-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-teal-700 text-white border-teal-700'
                      : 'bg-transparent text-slate-500 border-slate-200 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* ── FEATURED ── */}
          {featured && activeCategory === 'All' && (
            <section className="pt-10 pb-4">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-teal-700">
                  Featured Article
                </span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
              <FeaturedCard post={featured} onReadMore={handleReadMore} />
            </section>
          )}

          {/* ── GRID ── */}
          <section className="py-10">
            <div className="flex items-center justify-between mb-7">
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                {activeCategory === 'All' ? 'Latest Articles' : activeCategory}
              </h2>
              <button className="flex items-center gap-1 text-sm font-semibold text-teal-700 hover:gap-2 transition-all duration-200">
                View all →
              </button>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p className="text-lg font-medium mb-2">No articles found</p>
                <p className="text-sm">Check back soon for new content in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((post) => (
                  <BlogCard key={post.id} post={post} onReadMore={handleReadMore} />
                ))}
              </div>
            )}
          </section>

        </div>


      </main>

    


      {/* ── MODAL ── */}
      {activePost && <BlogModal post={activePost} onClose={handleClose} />}

        <Footer />
      <FloatingActions />
    </>
  );
}
