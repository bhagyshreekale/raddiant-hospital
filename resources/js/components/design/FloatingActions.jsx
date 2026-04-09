'use client';

import { useEffect, useState, useRef } from 'react';
import { SITE } from '../../lib copy/data';

/* ─────────────────────────────────────────────
   Config — update hrefs / colors as needed
───────────────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    id:    'whatsapp',
    label: 'WhatsApp',
    href:  `https://wa.me/${SITE.whatsapp ?? '919999999999'}`,
    color: '#25D366',
    hoverShadow: 'rgba(37,211,102,.45)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.554 4.1 1.523 5.824L.057 23.428a.75.75 0 00.922.921l5.763-1.51A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.7-.497-5.254-1.367l-.374-.217-3.875 1.016 1.032-3.77-.232-.385A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    ),
  },
  {
    id:    'instagram',
    label: 'Instagram',
    href:  SITE.instagram ?? 'https://instagram.com',
    color: '#E1306C',
    hoverShadow: 'rgba(225,48,108,.40)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    id:    'facebook',
    label: 'Facebook',
    href:  SITE.facebook ?? 'https://facebook.com',
    color: '#1877F2',
    hoverShadow: 'rgba(24,119,242,.40)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  {
    id:    'youtube',
    label: 'YouTube',
    href:  SITE.youtube ?? 'https://youtube.com',
    color: '#FF0000',
    hoverShadow: 'rgba(255,0,0,.35)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────
   Main FloatingActions component
───────────────────────────────────────────── */
export default function FloatingActions() {
  const [open,       setOpen]       = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [pulse,      setPulse]      = useState(true);
  const wrapRef = useRef(null);

  /* Hide pulse dot after 6 s */
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  /* Show scroll-to-top after 300 px */
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        .fab-wrap * { font-family: 'Sora', sans-serif; box-sizing: border-box; }

        /* ── Tooltip ── */
        .fab-tooltip {
          position: absolute; right: calc(100% + 14px); top: 50%;
          transform: translateY(-50%); white-space: nowrap;
          background: rgba(6,16,31,.92); color: #fff;
          font-size: 11px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
          padding: 5px 11px; border-radius: 8px;
          opacity: 0; pointer-events: none;
          transition: opacity .2s ease, transform .2s ease;
          transform: translateY(-50%) translateX(6px);
        }
        .fab-tooltip::after {
          content: ''; position: absolute; left: 100%; top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent; border-left-color: rgba(6,16,31,.92);
        }
        .fab-item:hover .fab-tooltip {
          opacity: 1; transform: translateY(-50%) translateX(0);
        }

        /* ── Social items stagger in ── */
        .fab-item {
          opacity: 0; transform: translateX(20px) scale(.85);
          transition: opacity .3s ease, transform .3s ease,
                      box-shadow .25s ease, filter .25s ease;
        }
        .fab-open .fab-item { opacity: 1; transform: translateX(0) scale(1); }

        /* ── Main dial button ── */
        @keyframes fabPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(14,165,233,.55); }
          50%      { box-shadow: 0 0 0 14px rgba(14,165,233,0); }
        }
        .fab-dial-pulse { animation: fabPulse 2s ease-in-out infinite; }

        /* ── Call button ring ── */
        @keyframes callRing {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,.6); }
          50%      { box-shadow: 0 0 0 12px rgba(34,197,94,0); }
        }
        .fab-call-ring { animation: callRing 2.2s ease-in-out infinite; }

        /* ── Scroll-top ── */
        .fab-scroll {
          opacity: 0; transform: translateY(12px);
          transition: opacity .35s ease, transform .35s ease;
          pointer-events: none;
        }
        .fab-scroll.fab-scroll-show {
          opacity: 1; transform: translateY(0);
          pointer-events: all;
        }

        /* ── Notification dot ── */
        @keyframes dotBounce {
          0%,100%{ transform: scale(1); }
          50%     { transform: scale(1.3); }
        }
        .fab-dot { animation: dotBounce 1s ease-in-out infinite; }

        /* ── Rotate X icon ── */
        .fab-x-enter { transform: rotate(0deg) scale(0);   opacity: 0; }
        .fab-x-active { transform: rotate(180deg) scale(1); opacity: 1; }
        .fab-plus-enter { transform: rotate(180deg) scale(0); opacity: 0; }
        .fab-plus-active { transform: rotate(0deg)  scale(1); opacity: 1; }
        .fab-icon-t { transition: transform .35s cubic-bezier(.34,1.56,.64,1), opacity .25s ease; }
      `}</style>

      {/* ── FIXED CONTAINER ── */}
      <div ref={wrapRef}
           className="fab-wrap fixed right-5 bottom-6 z-[9999] flex flex-col items-end gap-3 select-none">

        {/* ── SCROLL-TO-TOP ── */}
        <button
          onClick={scrollTop}
          aria-label="Scroll to top"
          className={`fab-scroll ${showScroll ? 'fab-scroll-show' : ''}
                      w-10 h-10 rounded-2xl bg-white border border-slate-200
                      flex items-center justify-center text-slate-500
                      shadow-md hover:shadow-lg hover:text-sky-600 hover:border-sky-300
                      hover:-translate-y-0.5 active:scale-95 transition-all duration-200`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M5 15l7-7 7 7"/>
          </svg>
        </button>

        {/* ── SOCIAL ITEMS (shown when open) ── */}
        <div className={`flex flex-col items-end gap-3 ${open ? 'fab-open' : ''}`}>
          {SOCIAL_LINKS.map((s, i) => (
            <div
              key={s.id}
              className="fab-item relative flex items-center"
              style={{ transitionDelay: open ? `${i * 55}ms` : `${(SOCIAL_LINKS.length - i) * 35}ms` }}
            >
              {/* Tooltip */}
              <span className="fab-tooltip">{s.label}</span>

              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-12 h-12 rounded-2xl flex items-center justify-center
                           text-white shadow-lg active:scale-95 transition-all duration-200
                           hover:-translate-x-0.5 hover:rounded-xl"
                style={{
                  background: s.color,
                  boxShadow: `0 4px 18px ${s.hoverShadow}`,
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 6px 24px ${s.hoverShadow}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = `0 4px 18px ${s.hoverShadow}`}
              >
                {s.icon}
              </a>
            </div>
          ))}
        </div>

        {/* ── CALL BUTTON (always visible) ── */}
        <div className="relative flex items-center">
          <span className="fab-tooltip" style={{ right: 'calc(100% + 14px)' }}>Call Us Now</span>
          <a
            href={`tel:${SITE.phone}`}
            aria-label="Call us"
            className="fab-call-ring w-14 h-14 rounded-2xl flex items-center justify-center
                       text-white shadow-xl active:scale-95 transition-all duration-200
                       hover:-translate-y-0.5 hover:rounded-xl"
            style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </a>
        </div>

        {/* ── MAIN DIAL BUTTON ── */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open social links'}
          className={`relative w-14 h-14 rounded-2xl flex items-center justify-center
                      text-white shadow-xl active:scale-95 transition-all duration-300
                      hover:-translate-y-0.5 hover:rounded-xl
                      ${!open ? 'fab-dial-pulse' : ''}`}
          style={{ background: 'linear-gradient(135deg,#0ea5e9,#0369a1)' }}
        >
          {/* Notification dot */}
          {pulse && !open && (
            <span className="fab-dot absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full
                             bg-rose-500 border-2 border-white" />
          )}

          {/* Plus / X icon swap */}
          <span className="relative w-6 h-6">
            {/* Plus */}
            <svg
              className={`fab-icon-t absolute inset-0 w-6 h-6 ${open ? 'fab-plus-enter' : 'fab-plus-active'}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M12 4v16m8-8H4"/>
            </svg>
            {/* X */}
            <svg
              className={`fab-icon-t absolute inset-0 w-6 h-6 ${open ? 'fab-x-active' : 'fab-x-enter'}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </span>
        </button>

      </div>
    </>
  );
}
