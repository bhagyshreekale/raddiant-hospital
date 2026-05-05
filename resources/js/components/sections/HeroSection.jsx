import { useEffect, useRef } from 'react';

const PHONE = '+911234567890';

const STATS = [
  { val: '60+',  lbl: 'Specialists' },
  { val: '20+',  lbl: 'Specialties' },
  { val: '24×7', lbl: 'Emergency'   },
  { val: 'NABH', lbl: 'Accredited'  },
];

const FEATURE_CARDS = [
  { icon: '🚨', title: 'Emergency Care',       desc: '24/7 trauma & emergency services',          variant: 'emergency',  live: true  },
  { icon: '🔬', title: 'Advanced Diagnostics', desc: 'MRI, CT Scan, full pathology lab',           variant: 'diagnostic', live: false },
  { icon: '👨‍⚕️', title: 'Expert Specialists',   desc: '60+ doctors across all major specialties', variant: 'specialist', live: false },
];

const TRUST_ITEMS = ['ISO Certified', 'Cashless Insurance', 'Patient Safety'];

const CARD_STYLES = {
  emergency:  { card: { background: 'rgba(220,38,38,0.06)',  border: '1px solid rgba(220,38,38,0.15)'  }, icon: { background: 'rgba(220,38,38,0.10)'  } },
  diagnostic: { card: { background: 'rgba(0,194,203,0.06)',  border: '1px solid rgba(0,194,203,0.18)'  }, icon: { background: 'rgba(0,194,203,0.12)'  } },
  specialist: { card: { background: 'rgba(255,255,255,0.80)', border: '1px solid rgba(0,150,180,0.12)' }, icon: { background: 'rgba(0,194,203,0.10)'  } },
};

export default function HeroSection() {
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 18; i++) {
      const p       = document.createElement('div');
      const size    = Math.random() * 3 + 1.5;
      const dur     = Math.random() * 12 + 10;
      const delay   = Math.random() * 15;
      const leftPct = Math.random() * 100;
      p.style.cssText = `
        position:absolute;border-radius:50%;
        background:rgba(0,194,203,0.35);
        width:${size}px;height:${size}px;
        left:${leftPct}%;bottom:-10px;
        opacity:${(Math.random() * 0.4 + 0.15).toFixed(2)};
        animation:particleDrift ${dur.toFixed(1)}s ${(-delay).toFixed(1)}s linear infinite;
      `;
      container.appendChild(p);
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes particleDrift {
          0%   { transform:translateY(100vh) translateX(0);   opacity:0; }
          10%  { opacity:1; }
          90%  { opacity:1; }
          100% { transform:translateY(-10vh) translateX(30px);opacity:0; }
        }
        @keyframes orbFloat {
          0%,100% { transform:translateY(0)    scale(1);    }
          50%      { transform:translateY(-30px) scale(1.05); }
        }
        @keyframes pulseRing {
          0%   { transform:scale(0.8); opacity:0.6; }
          100% { transform:scale(1.4); opacity:0;   }
        }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(40px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes slideRight {
          from { opacity:0; transform:translateX(40px); }
          to   { opacity:1; transform:translateX(0);    }
        }
        @keyframes scrollDot {
          0%,100% { transform:translateY(0);    opacity:1;   }
          50%      { transform:translateY(10px); opacity:0.3; }
        }
        @keyframes blinkDot {
          0%,100% { opacity:1;   }
          50%      { opacity:0.3; }
        }

        .hs-grid {
          background-image:
            linear-gradient(rgba(0,150,200,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,150,200,0.04) 1px, transparent 1px);
          background-size:60px 60px;
        }

        .hs-su1 { animation: slideUp   0.8s 0.10s cubic-bezier(.22,1,.36,1) both; }
        .hs-su2 { animation: slideUp   0.7s 0.20s cubic-bezier(.22,1,.36,1) both; }
        .hs-su3 { animation: slideUp   0.7s 0.30s cubic-bezier(.22,1,.36,1) both; }
        .hs-su4 { animation: slideUp   0.7s 0.40s cubic-bezier(.22,1,.36,1) both; }
        .hs-su5 { animation: slideUp   0.7s 0.50s cubic-bezier(.22,1,.36,1) both; }
        .hs-sr  { animation: slideRight 0.8s 0.30s cubic-bezier(.22,1,.36,1) both; }

        .hs-orb1 { animation: orbFloat 8s      ease-in-out infinite; }
        .hs-orb2 { animation: orbFloat 8s  4s  ease-in-out infinite; }

        .hs-pr1 { animation: pulseRing 4s      ease-out infinite; }
        .hs-pr2 { animation: pulseRing 4s 1.3s ease-out infinite; }
        .hs-pr3 { animation: pulseRing 4s 2.6s ease-out infinite; }

        .hs-stat {
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .hs-stat:hover {
          background:    rgba(0,194,203,0.10) !important;
          border-color:  rgba(0,194,203,0.30) !important;
          transform:     translateY(-3px);
        }

        .hs-fcard {
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        .hs-fcard:hover               { transform: translateX(8px); }
        .hs-fcard:hover .hs-fcard-icon{ transform: scale(1.1) rotate(-5deg); }
        .hs-fcard-icon                { transition: transform 0.25s ease; }

        .hs-btn-primary {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hs-btn-primary:hover {
          transform:  translateY(-2px) scale(1.03);
          box-shadow: 0 12px 40px rgba(0,194,203,0.45) !important;
        }
        .hs-btn-primary:active { transform: scale(0.97); }

        .hs-btn-outline {
          transition: background 0.2s, border-color 0.2s, transform 0.2s, color 0.2s;
        }
        .hs-btn-outline:hover {
          background:   rgba(0,194,203,0.08);
          border-color: rgba(0,194,203,0.50);
          transform:    translateY(-2px);
        }

        .hs-scroll-cue {
          animation: slideUp 1s 1.2s both;
        }
        .hs-scroll-dot {
          animation: scrollDot 2s ease-in-out infinite;
        }

        @media (min-width: 1024px) {
          .hs-inner { grid-template-columns: 7fr 5fr !important; gap: 4rem !important; }
          .hs-right  { display: flex !important; }
        }
        @media (max-width: 640px) {
          .hs-stats  { grid-template-columns: repeat(2,1fr) !important; }
          .hs-btns   { flex-direction: column !important; }
          .hs-btns a { justify-content: center; }
        }
      `}</style>

      <section
        aria-label="Hero section"
        style={{
          position:   'relative',
          display:    'flex',
          alignItems: 'center',
          minHeight:  '100vh',
          overflow:   'hidden',
          backgroundColor: '#f0f8ff',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Mesh gradient — light version */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 70% 60% at 15% 60%, rgba(180,230,255,0.55) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 85% 15%, rgba(0,194,203,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 100%, rgba(160,220,250,0.35) 0%, transparent 60%)`,
        }} />

        {/* Grid overlay */}
        <div className="hs-grid" style={{ position:'absolute', inset:0, pointerEvents:'none' }} />

        {/* Orb 1 */}
        <div className="hs-orb1" style={{
          position:'absolute', borderRadius:'50%', pointerEvents:'none',
          width:500, height:500, left:-100, top:-100,
          background:'radial-gradient(circle, rgba(0,180,220,0.14) 0%, transparent 70%)',
        }} />

        {/* Orb 2 */}
        <div className="hs-orb2" style={{
          position:'absolute', borderRadius:'50%', pointerEvents:'none',
          width:400, height:400, right:-80, bottom:100,
          background:'radial-gradient(circle, rgba(0,194,203,0.10) 0%, transparent 70%)',
        }} />

        {/* Particles */}
        <div ref={particlesRef} style={{ position:'absolute', inset:0, pointerEvents:'none' }} />

        {/* Inner grid */}
        <div style={{
          position:'relative', zIndex:10,
          width:'100%', maxWidth:1200,
          margin:'0 auto', padding:'6rem 1.5rem',
          display:'grid',
          gridTemplateColumns:'1fr',
          gap:'3rem',
          alignItems:'center',
        }}>
          <div className="hs-inner" style={{
            display:'grid', gridTemplateColumns:'1fr', gap:'3rem', alignItems:'center',
          }}>

            {/* ── LEFT COLUMN ── */}
            <div>

              {/* NABH badge */}
              <div className="hs-su1" style={{
                display:'inline-flex', alignItems:'center', gap:8,
                borderRadius:50, padding:'7px 18px', marginBottom:'1.75rem',
                border:'1px solid rgba(0,120,160,0.20)',
                background:'rgba(0,150,200,0.08)',
              }}>
                <span style={{
                  display:'inline-block', width:6, height:6, borderRadius:'50%',
                  background:'#0090b0', animation:'blinkDot 2s infinite',
                }} />
                <span style={{
                  fontFamily:"'Syne',sans-serif", fontSize:11, fontWeight:700,
                  letterSpacing:'1.5px', textTransform:'uppercase', color:'#007a99',
                }}>
                  🏅 NABH Compliant · Raddiant Group
                </span>
              </div>

              {/* Heading */}
              <h1 className="hs-su2" style={{
                fontFamily:"serif",
                fontSize:'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight:800, lineHeight:1.1, color:'#0a1f3c',
                marginBottom:'1.5rem',
              }}>
                Advanced Healthcare,<br />
                <span style={{
                  background:'linear-gradient(90deg,#00a8b5,#00c2cb)',
                  WebkitBackgroundClip:'text',
                  WebkitTextFillColor:'transparent',
                  backgroundClip:'text',
                }}>
                  Compassionate Care
                </span>
              </h1>

              {/* Subtitle */}
              <p className="hs-su3" style={{
                fontSize:'1.05rem', fontWeight:300, lineHeight:1.75,
                color:'rgba(10,31,60,0.58)',
                maxWidth:520, marginBottom:'2.5rem',
              }}>
                Raddiant Plus Hospital delivers comprehensive multispecialty and diagnostic care in
                Nashik. Expert doctors, advanced technology, and a patient-first approach — available 24×7.
              </p>

              {/* Stats grid */}
              <div className="hs-su4 hs-stats" style={{
                display:'grid', gridTemplateColumns:'repeat(4,1fr)',
                gap:'0.75rem', marginBottom:'2.75rem',
              }}>
                {STATS.map(({ val, lbl }) => (
                  <div key={lbl} className="hs-stat" style={{
                    padding:'1rem 0.75rem', borderRadius:14, textAlign:'center',
                    background:'rgba(255,255,255,0.75)',
                    border:'1px solid rgba(0,150,200,0.14)',
                    boxShadow:'0 2px 12px rgba(0,150,200,0.07)',
                    cursor:'default',
                  }}>
                    <div style={{
                      fontFamily:"serif",
                      fontSize:'1.5rem', fontWeight:800, color:'#0a1f3c', lineHeight:1,
                    }}>{val}</div>
                    <div style={{
                      fontSize:10, fontWeight:500,
                      textTransform:'uppercase', letterSpacing:'1px',
                      color:'rgba(10,31,60,0.42)', marginTop:5,
                    }}>{lbl}</div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="hs-su5 hs-btns" style={{ display:'flex', flexWrap:'wrap', gap:'0.85rem' }}>
                <a href="/appoinment" className="hs-btn-primary" style={{
                  display:'inline-flex', alignItems:'center', gap:10,
                  padding:'14px 32px', borderRadius:50,
                  background:'linear-gradient(135deg,#00c2cb,#0090b0)',
                  color:'#fff', textDecoration:'none',
                  fontFamily:"'Syne',sans-serif", fontSize:'0.9rem', fontWeight:700,
                  letterSpacing:'0.3px',
                  boxShadow:'0 8px 32px rgba(0,194,203,0.30)',
                }}>
                  <span style={{
                    display:'flex', alignItems:'center', justifyContent:'center',
                    width:24, height:24, borderRadius:'50%',
                    background:'rgba(255,255,255,0.25)', fontSize:12,
                  }}>📅</span>
                  Book Appointment
                </a>

                <a href={`tel:${PHONE}`} className="hs-btn-outline" style={{
                  display:'inline-flex', alignItems:'center', gap:10,
                  padding:'14px 32px', borderRadius:50,
                  border:'1.5px solid rgba(0,150,190,0.30)',
                  background:'rgba(255,255,255,0.60)',
                  backdropFilter:'blur(10px)',
                  color:'#0a1f3c', textDecoration:'none',
                  fontFamily:"'Syne',sans-serif", fontSize:'0.9rem', fontWeight:600,
                }}>
                  <span style={{
                    display:'flex', alignItems:'center', justifyContent:'center',
                    width:24, height:24, borderRadius:'50%',
                    background:'rgba(0,150,190,0.12)', fontSize:12,
                  }}>📞</span>
                  Call Now
                </a>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="hs-sr hs-right" style={{ display:'none', flexDirection:'column', gap:'1rem' }}>

              {FEATURE_CARDS.map(card => {
                const s = CARD_STYLES[card.variant];
                return (
                  <div key={card.title} className="hs-fcard" style={{
                    display:'flex', alignItems:'center', gap:'1.25rem',
                    padding:'1.35rem 1.5rem', borderRadius:18,
                    ...s.card,
                    boxShadow:'0 2px 16px rgba(0,120,180,0.07)',
                    backdropFilter:'blur(8px)',
                    cursor:'default',
                  }}>
                    <div className="hs-fcard-icon" style={{
                      ...s.icon,
                      width:52, height:52, borderRadius:14,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:22, flexShrink:0,
                    }}>
                      {card.icon}
                    </div>

                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{
                        fontFamily:"serif",
                        fontSize:'0.95rem', fontWeight:700, color:'#0a1f3c', marginBottom:3,
                      }}>{card.title}</div>
                      <div style={{ fontSize:'0.82rem', color:'rgba(10,31,60,0.52)', lineHeight:1.4 }}>
                        {card.desc}
                      </div>
                    </div>

                    {card.live && (
                      <div style={{
                        marginLeft:'auto', flexShrink:0,
                        display:'inline-flex', alignItems:'center', gap:5,
                        background:'rgba(220,38,38,0.08)',
                        border:'1px solid rgba(220,38,38,0.22)',
                        borderRadius:50, padding:'4px 10px',
                        fontSize:10, fontWeight:700,
                        textTransform:'uppercase', letterSpacing:'0.8px', color:'#dc2626',
                      }}>
                        <span style={{
                          display:'inline-block', width:5, height:5, borderRadius:'50%',
                          background:'#dc2626', animation:'blinkDot 1s infinite',
                        }} />
                        Live
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Trust bar */}
              <div style={{
                display:'flex', alignItems:'center', flexWrap:'wrap', gap:'1rem',
                padding:'1rem 1.5rem', borderRadius:14,
                background:'rgba(255,255,255,0.70)',
                border:'1px solid rgba(0,150,200,0.12)',
                boxShadow:'0 2px 12px rgba(0,150,200,0.06)',
              }}>
                {TRUST_ITEMS.map((item, i) => (
                  <div key={item} style={{ display:'flex', alignItems:'center', gap:6 }}>
                    {i > 0 && (
                      <div style={{ width:1, height:14, background:'rgba(0,150,200,0.18)', marginRight:4 }} />
                    )}
                    <div style={{
                      width:16, height:16, borderRadius:'50%', flexShrink:0,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:8, color:'#00a8b5',
                      background:'rgba(0,194,203,0.12)',
                      border:'1px solid rgba(0,194,203,0.30)',
                    }}>✓</div>
                    <span style={{
                      fontSize:11, fontWeight:500,
                      textTransform:'uppercase', letterSpacing:'0.8px',
                      color:'rgba(10,31,60,0.50)',
                    }}>{item}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hs-scroll-cue" style={{
          position:'absolute', bottom:'2rem',
          left:'50%', transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:6,
          color:'rgba(10,31,60,0.35)',
          fontSize:10, letterSpacing:'1.5px', textTransform:'uppercase',
          fontFamily:"'Syne',sans-serif",
        }}>
          <div style={{
            width:28, height:44, borderRadius:14,
            border:'1.5px solid rgba(0,150,200,0.25)',
            display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:6,
          }}>
            <div className="hs-scroll-dot" style={{
              width:4, height:8, borderRadius:2,
              background:'rgba(0,194,203,0.80)',
            }} />
          </div>
          Scroll
        </div>

      </section>
    </>
  );
}