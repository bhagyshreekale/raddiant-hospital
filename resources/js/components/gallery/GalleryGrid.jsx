'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Gallery.module.css';

/* ─── CATEGORY COLOUR MAP ────────────────────────────────────────────────── */
const CAT_COLORS = {
  Facilities:          { bg: '#1B6CA818', text: '#1B6CA8' },
  Diagnostics:         { bg: '#2A9D8F18', text: '#2A9D8F' },
  'Operation Theatre': { bg: '#7B2D8B18', text: '#7B2D8B' },
  'Our Team':          { bg: '#E6394618', text: '#C0392B' },
  Events:              { bg: '#E8A83818', text: '#B7770D' },
};

/* ─── LIGHTBOX ───────────────────────────────────────────────────────────── */
function Lightbox({ items, activeIndex, onClose, onPrev, onNext }) {
  const item = items[activeIndex];

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft')  onPrev();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  const catStyle = CAT_COLORS[item.category] || { bg: '#0a4d8c18', text: '#0a4d8c' };

  return (
    <div className={styles.lbOverlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={item.title}>
      <div className={styles.lbPanel} onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button className={styles.lbClose} onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Image area */}
        <div className={styles.lbImgWrap}>
          <img
            key={item.id}
            src={item.src}
            alt={item.title}
            className={styles.lbImg}
          />
        </div>

        {/* Footer */}
        <div className={styles.lbFooter}>
          <div className={styles.lbMeta}>
            <span
              className={styles.lbBadge}
              style={{ background: catStyle.bg, color: catStyle.text }}
            >
              {item.category}
            </span>
            <h2 className={styles.lbTitle}>{item.title}</h2>
          </div>

          {/* Nav */}
          <div className={styles.lbNav}>
            <span className={styles.lbCounter}>
              {activeIndex + 1} / {items.length}
            </span>
            <button
              className={styles.lbArrow}
              onClick={onPrev}
              disabled={activeIndex === 0}
              aria-label="Previous image"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className={styles.lbArrow}
              onClick={onNext}
              disabled={activeIndex === items.length - 1}
              aria-label="Next image"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── GALLERY ITEM ───────────────────────────────────────────────────────── */
function GalleryItem({ item, index, onClick }) {
  const catStyle = CAT_COLORS[item.category] || { bg: '#0a4d8c18', text: '#0a4d8c' };

  const spanClass =
    item.span === 'tall'  ? styles.spanTall  :
    item.span === 'wide'  ? styles.spanWide  :
    styles.spanNormal;

  return (
    <figure
      className={`${styles.item} ${spanClass}`}
      style={{ animationDelay: `${Math.min(index * 55, 440)}ms` }}
      onClick={() => onClick(index)}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.title}`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(index)}
    >
      <img
        src={item.thumb}
        alt={item.title}
        className={styles.itemImg}
        loading="lazy"
      />

      {/* Hover overlay */}
      <div className={styles.overlay}>
        <div className={styles.overlayInner}>
          <span
            className={styles.catBadge}
            style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}
          >
            {item.category}
          </span>
          <p className={styles.itemTitle}>{item.title}</p>
          <span className={styles.zoomIcon} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 3h5M3 3v5M17 3h-5M17 3v5M3 17h5M3 17v-5M17 17h-5M17 17v-5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </span>
        </div>
      </div>
    </figure>
  );
}

/* ─── MAIN GRID ──────────────────────────────────────────────────────────── */
export default function GalleryGrid({ items, categories }) {
  const [active, setActive]     = useState('All');
  const [lightbox, setLightbox] = useState(null); // index into filtered
  const indicatorRef            = useRef(null);
  const tabsRef                 = useRef(null);

  const filtered = active === 'All'
    ? items
    : items.filter((i) => i.category === active);

  // Slide the active-tab indicator
  useEffect(() => {
    const tabsEl = tabsRef.current;
    if (!tabsEl) return;
    const activeBtn = tabsEl.querySelector('[data-active="true"]');
    if (!activeBtn || !indicatorRef.current) return;
    indicatorRef.current.style.width  = `${activeBtn.offsetWidth}px`;
    indicatorRef.current.style.left   = `${activeBtn.offsetLeft}px`;
  }, [active]);

  const openLightbox  = useCallback((i) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImg       = useCallback(() => setLightbox((p) => Math.max(0, p - 1)), []);
  const nextImg       = useCallback(() => setLightbox((p) => Math.min(filtered.length - 1, p + 1)), [filtered.length]);

  return (
    <section className={styles.section}>
      <div className="container">

        {/* ── Filter tabs ────────────────────────────────────────────────── */}
        <div className={styles.tabsWrap} ref={tabsRef}>
          <div className={styles.tabsInner}>
            <div className={styles.tabIndicator} ref={indicatorRef} />
            {categories.map((cat) => (
              <button
                key={cat}
                className={styles.tabBtn}
                data-active={active === cat ? 'true' : 'false'}
                onClick={() => { setActive(cat); setLightbox(null); }}
                aria-pressed={active === cat}
              >
                {cat}
                {cat !== 'All' && (
                  <span className={styles.tabCount}>
                    {items.filter((i) => i.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Count label ────────────────────────────────────────────────── */}
        <p className={styles.countLabel}>
          Showing <strong>{filtered.length}</strong> photo{filtered.length !== 1 ? 's' : ''}
          {active !== 'All' && <> in <em>{active}</em></>}
        </p>

        {/* ── Masonry grid ───────────────────────────────────────────────── */}
        <div className={styles.masonry}>
          {filtered.map((item, i) => (
            <GalleryItem
              key={item.id}
              item={item}
              index={i}
              onClick={openLightbox}
            />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className={styles.empty}>
            <span>No photos in this category yet.</span>
          </div>
        )}
      </div>

      {/* ── Lightbox ───────────────────────────────────────────────────────── */}
      {lightbox !== null && (
        <Lightbox
          items={filtered}
          activeIndex={lightbox}
          onClose={closeLightbox}
          onPrev={prevImg}
          onNext={nextImg}
        />
      )}
    </section>
  );
}
