'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/* ─── CATEGORY COLOUR MAP ────────────────────────────────────────────────── */
const CAT_COLORS = {
  Facilities:          { bg: 'bg-sky-50', text: 'text-sky-700' },
  Diagnostics:         { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  'Operation Theatre': { bg: 'bg-purple-50', text: 'text-purple-700' },
  'Our Team':          { bg: 'bg-rose-50', text: 'text-rose-700' },
  Events:              { bg: 'bg-amber-50', text: 'text-amber-700' },
};

/* ─── LIGHTBOX ───────────────────────────────────────────────────────────── */
function Lightbox({ items, activeIndex, onClose, onPrev, onNext }) {
  const item = items[activeIndex];

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  const catStyle = CAT_COLORS[item.category] || { bg: 'bg-gray-50', text: 'text-gray-700' };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-gray-950/95 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>
      {/* Close Button */}
      <button className="absolute top-6 right-6 z-10 p-3 text-white/50 hover:text-white transition-colors" onClick={onClose}>
        <svg width="24" height="24" viewBox="0 0 18 18" fill="none"><path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
      </button>

      {/* Main Panel */}
      <div className="flex flex-1 flex-col items-center justify-center p-4 md:p-10" onClick={(e) => e.stopPropagation()}>
        <div className="relative max-h-full max-w-5xl">
          <img
            key={item.id}
            src={item.src}
            alt={item.title}
            className="mx-auto max-h-[75vh] w-auto rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
          />
        </div>
      </div>

      {/* Footer / Meta Area */}
      <div className="bg-gray-900/80 p-6 backdrop-blur-xl border-t border-white/5">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${catStyle.bg} ${catStyle.text}`}>
              {item.category}
            </span>
            <h2 className="text-xl font-bold text-white">{item.title}</h2>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-sm font-mono text-gray-400">{activeIndex + 1} / {items.length}</span>
            <div className="flex gap-2">
              <button disabled={activeIndex === 0} onClick={onPrev} className="p-3 rounded-full bg-white/5 text-white hover:bg-white/10 disabled:opacity-20 transition-all">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button disabled={activeIndex === items.length - 1} onClick={onNext} className="p-3 rounded-full bg-white/5 text-white hover:bg-white/10 disabled:opacity-20 transition-all">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── GALLERY ITEM ───────────────────────────────────────────────────────── */
function GalleryItem({ item, index, onClick }) {
  const spanClass = 
    item.span === 'tall' ? 'row-span-2' : 
    item.span === 'wide' ? 'col-span-1 md:col-span-2' : 
    '';

  return (
    <figure
      className={`group relative cursor-zoom-in overflow-hidden rounded-2xl bg-gray-100 ${spanClass}`}
      style={{ animation: `fadeInUp 0.5s ease-out forwards ${Math.min(index * 50, 400)}ms`, opacity: 0 }}
      onClick={() => onClick(index)}
    >
      <img
        src={item.thumb}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="mb-2 inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white backdrop-blur-md">
          {item.category}
        </span>
        <p className="text-base font-bold text-white leading-tight">{item.title}</p>
        
        <div className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-transform duration-300 group-hover:rotate-90">
           <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3 3h5M3 3v5M17 3h-5M17 3v5M3 17h5M3 17v-5M17 17h-5M17 17v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      </div>
    </figure>
  );
}

/* ─── MAIN GRID ──────────────────────────────────────────────────────────── */
export default function GalleryGrid({ items, categories }) {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const indicatorRef = useRef(null);
  const tabsRef = useRef(null);

  const filtered = active === 'All' ? items : items.filter((i) => i.category === active);

  useEffect(() => {
    const tabsEl = tabsRef.current;
    const activeBtn = tabsEl?.querySelector(`[data-active="true"]`);
    if (activeBtn && indicatorRef.current) {
      indicatorRef.current.style.width = `${activeBtn.offsetWidth}px`;
      indicatorRef.current.style.left = `${activeBtn.offsetLeft}px`;
    }
  }, [active]);

  const openLightbox = useCallback((i) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section className="py-12 md:py-20">
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="container mx-auto px-4">
        {/* Filter Tabs */}
        <div className="relative mb-12 flex justify-center">
          <div ref={tabsRef} className="relative flex flex-wrap items-center gap-1 rounded-2xl bg-gray-100 p-1.5">
            <div 
              ref={indicatorRef} 
              className="absolute h-[calc(100%-12px)] rounded-xl bg-white shadow-sm transition-all duration-300 ease-out" 
            />
            {categories.map((cat) => (
              <button
                key={cat}
                data-active={active === cat}
                onClick={() => { setActive(cat); setLightbox(null); }}
                className={`relative z-10 px-6 py-2.5 text-xs font-bold transition-colors duration-300 ${active === cat ? 'text-[var(--primary)]' : 'text-gray-500 hover:text-gray-800'}`}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="ml-2 text-[0.65rem] opacity-50">
                    {items.filter((i) => i.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-8 text-center text-sm font-medium text-gray-500">
          Showing <span className="font-bold text-gray-900">{filtered.length}</span> photos
          {active !== 'All' && <span> in <span className="text-[var(--primary)] italic">{active}</span></span>}
        </p>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[250px]">
          {filtered.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} onClick={openLightbox} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-gray-400 font-medium italic">
            No photos found in this category.
          </div>
        )}
      </div>

      {lightbox !== null && (
        <Lightbox
          items={filtered}
          activeIndex={lightbox}
          onClose={closeLightbox}
          onPrev={() => setLightbox(p => Math.max(0, p - 1))}
          onNext={() => setLightbox(p => Math.min(filtered.length - 1, p + 1))}
        />
      )}
    </section>
  );
}