'use client';
import { useState } from 'react';
import { FAQS } from '../lib copy/data';
import CTABanner from '../components/sections/CTABanner';
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
export default function FAQPage() {
  const [open, setOpen] = useState(null);

  // Schema.org Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
    {/* <Navbar/> */}
      {/* Injecting SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="faq-hero" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', padding: '96px 0 80px' }}>
        <div className="container text-center">
          <span className="section-label-light">FAQ</span>
          <h1 style={{ color: 'white', marginTop: 12 }}>Frequently Asked Questions</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 520, margin: '16px auto 0' }}>
            Everything you need to know about our services and patient care.
          </p>
        </div>
      </section>

      <section className="section-py">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {FAQS.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <div 
                    key={faq.q} 
                    className={`card-custom mb-3 ${isOpen ? 'active-faq' : ''}`} 
                    style={{ border: isOpen ? '1px solid var(--primary-light)' : '1px solid var(--gray-200)' }}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      aria-expanded={isOpen}
                    >
                      <span style={{ fontWeight: 600, color: isOpen ? 'var(--primary)' : 'var(--gray-900)' }}>{faq.q}</span>
                      <span style={{ 
                        fontSize: '1.2rem', 
                        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' 
                      }}>+</span>
                    </button>
                    
                    {/* Smooth Transition Container */}
                    <div style={{ 
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.3s ease-out',
                      overflow: 'hidden'
                    }}>
                      <div style={{ minHeight: 0 }}>
                         <div style={{ padding: '0 24px 24px', color: 'var(--gray-600)', fontSize: '0.92rem', lineHeight: 1.8 }}>
                           {faq.a}
                         </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Contact Footer */}
              <div className="text-center mt-5" style={{ padding: '40px', background: 'var(--off-white)', borderRadius: '24px' }}>
                <h3 className="mb-2">Still Have Questions?</h3>
                <p className="text-muted mb-4">Our patient care team is happy to help you.</p>
                <div className="d-flex justify-content-center gap-3">
                  <a href="tel:+91..." className="btn-primary-custom">Call Support</a>
                  <a href="https://wa.me/..." className="btn-whatsapp-custom">WhatsApp Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTABanner />

      {/* <Footer/> */}
    </>
  );
}