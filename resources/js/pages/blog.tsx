'use client';

import { useState, useMemo, useCallback } from 'react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import BlogCard from '../components/blog/BlogCard';
import BlogModal from '../components/blog/BlogModal';
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
  const [activePost, setActivePost] = useState<Blog | null>(null);

  const handleReadMore = useCallback((post: Blog) => setActivePost(post), []);
  const handleClose = useCallback(() => setActivePost(null), []);

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
        <section className="relative bg-slate-900 overflow-hidden py-10 px-4 mb-10">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-5">
              Your Guide to a <span className="text-teal-400">Healthier</span> Life
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto mb-10">
              Latest blogs from our system — dynamically powered 🚀
            </p>
          </div>
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
              <FeaturedCard post={featured} onReadMore={handleReadMore} />
            </section>
          )}

          <section className="py-10">
            {filtered.length === 0 ? (
              <p className="text-center text-gray-400">No blogs found</p>
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

      {activePost && <BlogModal post={activePost} onClose={handleClose} />}
      <Footer />
      <FloatingActions />
    </>
  );
} 