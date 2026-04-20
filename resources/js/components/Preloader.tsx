import React, { useEffect, useState } from 'react';

const Preloader: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setVisible(false), 400);
                    return 100;
                }
                return p + Math.random() * 18;
            });
        }, 180);
        return () => clearInterval(timer);
    }, []);

    if (!visible) return null;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes rpl-pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.7; transform: translate(-50%, -50%) scale(1.02); }
        }
        @keyframes rpl-logo-in {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes rpl-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rpl-dot {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.5); }
        }
        @keyframes rpl-fadeout {
          from { opacity: 1; }
          to   { opacity: 0; pointer-events: none; }
        }

        .rpl-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.06);
          top: 50%;
          left: 50%;
          animation: rpl-pulse 4s ease-in-out infinite;
        }
        .rpl-logo-in   { animation: rpl-logo-in  0.6s ease both; }
        .rpl-fade-up-1 { animation: rpl-fade-up  0.6s ease 0.20s both; }
        .rpl-fade-up-2 { animation: rpl-fade-up  0.5s ease 0.40s both; }
        .rpl-fade-up-3 { animation: rpl-fade-up  0.5s ease 0.55s both; }
        .rpl-fade-up-4 { animation: rpl-fade-up  0.5s ease 0.65s both; }

        .rpl-dot-1 { animation: rpl-dot 1.2s ease-in-out 0.0s infinite; }
        .rpl-dot-2 { animation: rpl-dot 1.2s ease-in-out 0.2s infinite; }
        .rpl-dot-3 { animation: rpl-dot 1.2s ease-in-out 0.4s infinite; }

        .rpl-fadeout { animation: rpl-fadeout 0.4s ease forwards; }
      `}</style>

            {/* ── Overlay ── */}
            <div
                className={progress >= 100 ? 'rpl-fadeout' : ''}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    background: '#060F24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'DM Sans', sans-serif",
                    overflow: 'hidden',
                }}
            >
                {/* Tri-color top bar */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background:
                            'linear-gradient(90deg, #DC2626 0%, #16A34A 50%, #1D4ED8 100%)',
                        opacity: 0.75,
                    }}
                />

                {/* Grid texture */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),' +
                            'linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
                        backgroundSize: '36px 36px',
                    }}
                />

                {/* Glow blobs */}
                <div
                    style={{
                        position: 'absolute',
                        top: -80,
                        right: -60,
                        width: 360,
                        height: 360,
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle, rgba(220,38,38,0.13) 0%, transparent 70%)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: -60,
                        left: -40,
                        width: 280,
                        height: 280,
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle, rgba(22,101,52,0.13) 0%, transparent 70%)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        width: 480,
                        height: 280,
                        background:
                            'radial-gradient(ellipse, rgba(30,58,138,0.16) 0%, transparent 70%)',
                    }}
                />

                {/* Concentric rings */}
                {[200, 320, 450].map((size, i) => (
                    <div
                        key={size}
                        className="rpl-ring"
                        style={{
                            width: size,
                            height: size,
                            animationDelay: `${i * 0.8}s`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                ))}

                {/* ── Center content ── */}
                <div
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* Medical cross icon */}
                    <div
                        className="rpl-logo-in"
                        style={{
                            position: 'relative',
                            width: 56,
                            height: 56,
                            marginBottom: 24,
                        }}
                    >
                        {/* Horizontal bar */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: 0,
                                transform: 'translateY(-50%)',
                                width: '100%',
                                height: 14,
                                background: '#DC2626',
                                borderRadius: 3,
                            }}
                        />
                        {/* Vertical bar */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: 0,
                                transform: 'translateX(-50%)',
                                width: 14,
                                height: '100%',
                                background: '#DC2626',
                                borderRadius: 3,
                            }}
                        />
                    </div>

                    {/* Brand name + tagline */}
                    <div
                        className="rpl-fade-up-1"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: 32,
                        }}
                    >
                        <img
                            src="images/preloader.png" // 🔁 put your logo path here
                            alt="Raddiant Plus"
                            className="h-30 w-auto object-contain md:h-12"
                        />
                        <div
                            style={{
                                fontSize: 11,
                                fontWeight: 500,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.35)',
                                marginTop: 7,
                            }}
                        >
                            Advanced Healthcare
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div
                        className="rpl-fade-up-2"
                        style={{
                            width: 210,
                            height: 2,
                            background: 'rgba(255,255,255,0.08)',
                            borderRadius: 2,
                            overflow: 'hidden',
                            marginBottom: 14,
                        }}
                    >
                        <div
                            style={{
                                height: '100%',
                                width: `${Math.min(progress, 100)}%`,
                                borderRadius: 2,
                                background:
                                    'linear-gradient(90deg, #1D4ED8, #DC2626, #16A34A)',
                                transition: 'width 0.18s ease',
                            }}
                        />
                    </div>

                    {/* Progress % */}
                    <div
                        className="rpl-fade-up-3"
                        style={{
                            fontSize: 11,
                            color: 'rgba(255,255,255,0.25)',
                            letterSpacing: '0.06em',
                            marginBottom: 16,
                        }}
                    >
                        {Math.min(Math.round(progress), 100)}%
                    </div>

                    {/* Tri-color dots */}
                    <div
                        className="rpl-fade-up-3"
                        style={{ display: 'flex', gap: 7, marginBottom: 20 }}
                    >
                        {[
                            ['rpl-dot-1', '#1D4ED8'],
                            ['rpl-dot-2', '#DC2626'],
                            ['rpl-dot-3', '#16A34A'],
                        ].map(([cls, color]) => (
                            <div
                                key={color}
                                className={cls as string}
                                style={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: '50%',
                                    background: color as string,
                                }}
                            />
                        ))}
                    </div>

                    {/* Slogan */}
                    <div
                        className="rpl-fade-up-4"
                        style={{
                            fontSize: 12,
                            color: 'rgba(255,255,255,0.25)',
                            letterSpacing: '0.05em',
                            textAlign: 'center',
                            lineHeight: 1.6,
                        }}
                    >
                        Healing with Compassion · Excellence in Care
                    </div>
                </div>
            </div>
        </>
    );
};

export default Preloader;
