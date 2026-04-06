'use client';
import { useState } from 'react';
import { FAQS } from '../../lib/data';
import CTABanner from '../../components/sections/CTABanner';

export default function FAQPage() {
  const [open, setOpen] = useState(null);
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', padding: '80px 0 64px' }}>
        <div className="container text-center">
          <span className="section-label" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--accent-light)', border: '1px solid rgba(255,255,255,0.2)' }}>FAQ</span>
          <h1 style={{ color: 'white', marginTop: 12 }}>Frequently Asked Questions</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 520, margin: '16px auto 0', fontSize: '1.05rem' }}>Everything you need to know about Raddiant Plus Hospital.</p>
        </div>
      </section>

      <section className="section-py">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {FAQS.map((faq, i) => (
                <div key={i} className="card-custom mb-3" style={{ overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '20px 24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}
                    aria-expanded={open === i}
                  >
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', color: 'var(--gray-900)', lineHeight: 1.4 }}>{faq.q}</span>
                    <span style={{ fontSize: '1.4rem', color: 'var(--primary)', flexShrink: 0, transition: 'transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                  </button>
                  {open === i && (
                    <div style={{ padding: '0 24px 20px', borderTop: '1px solid var(--gray-200)' }}>
                      <p style={{ margin: '16px 0 0', fontSize: '0.9rem', lineHeight: 1.75 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}

              <div className="text-center mt-5" style={{ padding: '32px', background: 'var(--off-white)', borderRadius: 'var(--radius-xl)' }}>
                <h3 style={{ marginBottom: 8 }}>Still Have Questions?</h3>
                <p style={{ color: 'var(--gray-500)', marginBottom: 20 }}>Our patient care team is available Mon–Sat, 9 AM – 6 PM.</p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <a href="tel:+919876543210" className="btn-primary-custom">📞 Call Us</a>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25d366', color: 'white', padding: '13px 28px', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.95rem' }}>
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
