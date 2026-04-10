'use client';
import { useState } from 'react';
import { FAQS } from '../lib copy/data';
import CTABanner from '../components/sections/CTABanner';

export default function FAQPage() {
  const [open, setOpen] = useState(null);

  return (
    <>
      {/* Hero */}
      <section style={{ background: '#0f172a', padding: '80px 24px 64px', textAlign: 'center' }}>
        <p style={{ color: '#38bdf8', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px' }}>FAQ</p>
        <h1 style={{ color: '#fff', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, margin: '0 0 14px', lineHeight: 1.2 }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
          Everything you need to know about our services and patient care.
        </p>
      </section>

      {/* FAQ List */}
      <section style={{ background: '#f8fafc', padding: 'clamp(40px, 6vw, 72px) 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  background: '#fff',
                  border: `1px solid ${isOpen ? '#0ea5e9' : '#e2e8f0'}`,
                  borderRadius: 12,
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    padding: '20px 24px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600, color: isOpen ? '#0284c7' : '#1e293b', lineHeight: 1.4 }}>
                    {faq.q}
                  </span>
                  <span style={{
                    flexShrink: 0,
                    width: 26, height: 26,
                    borderRadius: '50%',
                    background: isOpen ? '#0ea5e9' : '#f1f5f9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, lineHeight: 1,
                    color: isOpen ? '#fff' : '#64748b',
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                    transition: 'transform 0.3s, background 0.2s',
                  }}>+</span>
                </button>

                <div style={{
                  display: 'grid',
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.3s ease',
                  overflow: 'hidden',
                }}>
                  <div style={{ minHeight: 0 }}>
                    <p style={{ margin: 0, padding: '0 24px 20px', fontSize: 14.5, color: '#475569', lineHeight: 1.8 }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Contact */}
          <div style={{ marginTop: 24, background: '#0f172a', borderRadius: 16, padding: '32px 28px', textAlign: 'center' }}>
            <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 600, margin: '0 0 8px' }}>Still have questions?</h3>
            <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 24px' }}>Our patient care team is happy to help.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <a href="tel:+91..." style={{
                display: 'inline-block', padding: '10px 22px', borderRadius: 8,
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', fontSize: 14, fontWeight: 500, textDecoration: 'none',
              }}>Call Support</a>
              <a href="https://wa.me/..." style={{
                display: 'inline-block', padding: '10px 22px', borderRadius: 8,
                background: '#22c55e', color: '#fff', fontSize: 14, fontWeight: 500, textDecoration: 'none',
              }}>WhatsApp Us</a>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
