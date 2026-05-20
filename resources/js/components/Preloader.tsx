import React, { useEffect, useState } from 'react';

const Preloader: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setLeaving(true);
                        setTimeout(() => setVisible(false), 900);
                    }, 400);
                    return 100;
                }
                return p + Math.random() * 14;
            });
        }, 140);
        return () => clearInterval(timer);
    }, []);

    if (!visible) return null;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&family=Outfit:wght@200;400;600&display=swap');

                :root {
                    --bg-matte: #060807;       /* Soft dark canvas */
                    --glow-emerald: #4ADE80;   /* Brand color */
                    --text-bright: #ffffff;
                }

                .mid-preloader-canvas {
                    position: fixed; inset: 0; z-index: 9999;
                    background: var(--bg-matte);
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Outfit', sans-serif;
                    overflow: hidden;
                    transition: opacity 0.9s cubic-bezier(0.76, 0, 0.24, 1);
                }

                .mid-preloader-canvas.leaving {
                    opacity: 0;
                    pointer-events: none;
                }

                /* Central Absolute Core Block - Expanded slightly to frame the larger logo */
                .mid-stage {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    width: 360px;
                    height: 360px;
                    transition: transform 0.9s cubic-bezier(0.76, 0, 0.24, 1);
                }

                .mid-preloader-canvas.leaving .mid-stage {
                    transform: scale(1.1);
                }

                /* Fluid Morphing Orb Layer */
                .fluid-orb {
                    position: absolute;
                    inset: 0;
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    border-radius: 41% 59% 45% 55% / 40% 45% 55% 60%;
                    background: linear-gradient(135deg, rgba(74, 222, 128, 0.02) 0%, transparent 100%);
                    box-shadow: inset 0 0 40px rgba(255,255,255,0.01);
                    animation: morphLiquid 10s ease-in-out infinite alternate;
                    transition: all 0.5s ease;
                }

                /* Secondary internal glow panel to give dimension */
                .fluid-orb-core {
                    position: absolute;
                    inset: 20px;
                    border-radius: 55% 45% 52% 48% / 48% 52% 48% 52%;
                    background: radial-gradient(circle at 50% 50%, rgba(74, 222, 128, calc(0.04 + (0.12 * ${progress / 100}))), transparent 75%);
                    filter: blur(12px);
                    animation: morphLiquid 7s ease-in-out infinite alternate-reverse;
                }

                /* The actual internal values */
                .inner-content {
                    position: relative;
                    z-index: 5;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    width: 100%;
                }

                /* Increased size + added subtle organic breathing animation */
                .mid-logo {
                    width: 130px; 
                    height: auto;
                    margin-bottom: 16px;
                    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.05));
                    animation: logoPulse 4s ease-in-out infinite alternate;
                }

                .mid-motto {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 15px;
                    font-style: italic;
                    color: rgba(255, 255, 255, 0.4);
                    letter-spacing: 0.08em;
                    margin-bottom: 1.5rem;
                }

                .mid-counter-group {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2px;
                }

                .mid-pct {
                    font-size: 34px;
                    font-weight: 200;
                    color: var(--text-bright);
                    letter-spacing: -0.04em;
                    line-height: 1;
                    font-variant-numeric: tabular-nums;
                }

                .mid-status {
                    font-size: 8px;
                    font-weight: 400;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: rgba(255, 255, 255, 0.25);
                    text-indent: 0.25em;
                }

                /* Morphing Liquid Keyframes */
                @keyframes morphLiquid {
                    0% {
                        border-radius: 42% 58% 45% 55% / 40% 45% 55% 60%;
                        transform: rotate(0deg);
                    }
                    50% {
                        border-radius: 50% 50% 40% 60% / 45% 55% 45% 55%;
                    }
                    100% {
                        border-radius: 48% 52% 55% 45% / 55% 40% 60% 45%;
                        transform: rotate(180deg);
                    }
                }

                /* Elegant Breathe animation for the logo */
                @keyframes logoPulse {
                    0% {
                        transform: scale(1);
                        filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.05));
                    }
                    100% {
                        transform: scale(1.03);
                        filter: drop-shadow(0 0 25px rgba(74, 222, 128, 0.15));
                    }
                }
            `}</style>

            <div className={`mid-preloader-canvas ${leaving ? 'leaving' : ''}`}>
                <div className="mid-stage">
                    {/* Atmospheric Layering */}
                    <div className="fluid-orb" />
                    <div className="fluid-orb-core" />

                    {/* All information packed inside the orb core */}
                    <div className="inner-content">
                        <img 
                            src="/images/preloader.png" 
                            alt="Midway Medical Logo" 
                            className="mid-logo" 
                        />
                        <p className="mid-motto">Touching Lives · Healing Souls</p>

                        <div className="mid-counter-group">
                            <span className="mid-pct">
                                {Math.min(Math.round(progress), 100)}%
                            </span>
                            <span className="mid-status">Initializing</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Preloader;