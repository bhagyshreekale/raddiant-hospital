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
                        setTimeout(() => setVisible(false), 800);
                    }, 300);
                    return 100;
                }
                return p + Math.random() * 16;
            });
        }, 180);
        return () => clearInterval(timer);
    }, []);

    if (!visible) return null;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap');

                :root {
                    --pg-bg:        #0C2B18;
                    --pg-bg-deep:   #081F11;
                    --pg-accent:    #4ADE80;
                    --pg-accent2:   #86EFAC;
                    --pg-white:     #FFFFFF;
                    --pg-white-40:  rgba(255,255,255,0.40);
                    --pg-white-20:  rgba(255,255,255,0.20);
                }

                @keyframes pg-fadein  { from { opacity:0; } to { opacity:1; } }
                @keyframes pg-fadeout { from { opacity:1; } to { opacity:0; } }
                @keyframes pg-rise {
                    from { opacity:0; transform:translateY(20px); }
                    to   { opacity:1; transform:translateY(0); }
                }
                @keyframes pg-pop {
                    0%   { opacity:0; transform:scale(0.7) rotate(-10deg); }
                    70%  { opacity:1; transform:scale(1.05) rotate(1deg); }
                    100% { opacity:1; transform:scale(1) rotate(0deg); }
                }
                @keyframes pg-content-out {
                    from { opacity:1; transform:translateY(0); }
                    to   { opacity:0; transform:translateY(-20px); }
                }
                @keyframes pg-breathe {
                    0%,100% { transform:translate(-50%,-50%) scale(1);   opacity:0.07; }
                    50%     { transform:translate(-50%,-50%) scale(1.05); opacity:0.18; }
                }
                @keyframes pg-scan {
                    0%   { top:-15%; }
                    100% { top:110%; }
                }
                @keyframes pg-eqbar {
                    0%,100% { transform:scaleY(0.25); opacity:0.25; }
                    50%     { transform:scaleY(1);    opacity:0.9; }
                }
                @keyframes pg-shimmer-bar {
                    0%   { left:-60%; }
                    100% { left:120%; }
                }

                .pg-overlay {
                    position:fixed; inset:0; z-index:9999;
                    background:var(--pg-bg);
                    display:flex; align-items:center; justify-content:center;
                    font-family:'Outfit',sans-serif;
                    overflow:hidden;
                    animation:pg-fadein 0.35s ease both;
                }
                .pg-overlay.leaving { animation:pg-fadeout 0.8s ease forwards; }

                .pg-noise {
                    position:absolute; inset:0; pointer-events:none;
                    background-image:radial-gradient(circle, rgba(255,255,255,0.022) 1px, transparent 1px);
                    background-size:28px 28px;
                }
                .pg-grid {
                    position:absolute; inset:0; pointer-events:none;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.016) 1px,transparent 1px);
                    background-size:44px 44px;
                }
                .pg-scan-wrap { position:absolute; inset:0; overflow:hidden; pointer-events:none; }
                .pg-scan-line {
                    position:absolute; left:0; right:0; height:100px;
                    background:linear-gradient(to bottom,
                        transparent 0%,
                        rgba(74,222,128,0.04) 50%,
                        transparent 100%
                    );
                    animation:pg-scan 4s linear infinite;
                }

                .pg-blob { position:absolute; border-radius:50%; pointer-events:none; }

                .pg-ring {
                    position:absolute; border-radius:50%;
                    border:1px solid rgba(74,222,128,0.16);
                    top:50%; left:50%;
                    animation:pg-breathe 6s ease-in-out infinite;
                }

                .pg-topbar {
                    position:absolute; top:0; left:0; right:0; height:2px;
                    background:linear-gradient(90deg,
                        transparent 0%,
                        rgba(74,222,128,0.5) 25%,
                        rgba(255,255,255,0.85) 50%,
                        rgba(74,222,128,0.5) 75%,
                        transparent 100%
                    );
                }

                .pg-corner { position:absolute; width:32px; height:32px; pointer-events:none; }
                .pg-c-tl { top:22px; left:22px;
                    border-top:1.5px solid rgba(74,222,128,0.4);
                    border-left:1.5px solid rgba(74,222,128,0.4); }
                .pg-c-tr { top:22px; right:22px;
                    border-top:1.5px solid rgba(74,222,128,0.4);
                    border-right:1.5px solid rgba(74,222,128,0.4); }
                .pg-c-bl { bottom:22px; left:22px;
                    border-bottom:1.5px solid rgba(74,222,128,0.4);
                    border-left:1.5px solid rgba(74,222,128,0.4); }
                .pg-c-br { bottom:22px; right:22px;
                    border-bottom:1.5px solid rgba(74,222,128,0.4);
                    border-right:1.5px solid rgba(74,222,128,0.4); }

                .pg-content {
                    position:relative; z-index:10;
                    display:flex; flex-direction:column; align-items:center;
                    text-align:center; width:100%; max-width:480px; padding:0 24px;
                }
                .pg-content.leaving { animation:pg-content-out 0.6s ease forwards; }

                .pg-cross {
                    width:56px; height:56px; position:relative;
                    margin-bottom:26px;
                    animation:pg-pop 0.75s cubic-bezier(0.34,1.56,0.64,1) both;
                }
                .pg-cross-bar {
                    position:absolute; background:var(--pg-white);
                    border-radius:4px;
                    box-shadow:0 0 22px rgba(255,255,255,0.22);
                }
                .pg-cross-h { top:50%; left:0; transform:translateY(-50%); width:100%; height:13px; }
                .pg-cross-v { left:50%; top:0; transform:translateX(-50%); width:13px; height:100%; }
                .pg-cross::after {
                    content:''; position:absolute; inset:18px;
                    background:var(--pg-accent); border-radius:2px; opacity:0.55;
                }

                .pg-logo-wrap {
                    animation:pg-rise 0.7s ease 0.18s both;
                    margin-bottom:10px;
                    display:flex; flex-direction:column; align-items:center;
                }
                .pg-logo-img {
                    height:70px; width:auto; object-fit:contain;
                    filter:brightness(0) invert(1);
                }
                .pg-brand {
                    font-family:'Cormorant Garamond',serif;
                    font-size:clamp(36px,9vw,58px);
                    font-weight:700;
                    letter-spacing:0.05em;
                    color:var(--pg-white);
                    line-height:1;
                }
                .pg-brand span { color:var(--pg-accent); }

                .pg-tagline {
                    font-size:10px; font-weight:500;
                    letter-spacing:0.30em; text-transform:uppercase;
                    color:var(--pg-white-40);
                    margin-top:10px;
                    animation:pg-rise 0.5s ease 0.32s both;
                }

                .pg-rule {
                    width:48px; height:1px;
                    background:linear-gradient(90deg,transparent,rgba(74,222,128,0.55),transparent);
                    margin:22px auto;
                    animation:pg-rise 0.5s ease 0.42s both;
                }

                .pg-pills {
                    display:flex; gap:8px; flex-wrap:wrap;
                    justify-content:center; margin-bottom:22px;
                    animation:pg-rise 0.5s ease 0.48s both;
                }
                .pg-pill {
                    padding:4px 12px;
                    border:1px solid rgba(74,222,128,0.28);
                    border-radius:20px;
                    font-size:10px; font-weight:500;
                    letter-spacing:0.12em; text-transform:uppercase;
                    color:var(--pg-accent2);
                    background:rgba(74,222,128,0.08);
                }

                .pg-progress-wrap {
                    width:100%; max-width:300px;
                    animation:pg-rise 0.5s ease 0.52s both;
                }
                .pg-prog-header {
                    display:flex; justify-content:space-between;
                    align-items:baseline; margin-bottom:9px;
                }
                .pg-prog-label {
                    font-size:9px; letter-spacing:0.24em;
                    text-transform:uppercase; color:var(--pg-white-40);
                }
                .pg-prog-pct {
                    font-size:14px; font-weight:600;
                    color:var(--pg-accent);
                    font-variant-numeric:tabular-nums;
                }
                .pg-track {
                    width:100%; height:3px;
                    background:rgba(255,255,255,0.12);
                    border-radius:3px;
                    position:relative; overflow:hidden;
                }
                .pg-fill {
                    height:100%; border-radius:3px;
                    background:linear-gradient(90deg,rgba(74,222,128,0.55),#4ADE80,#86EFAC);
                    transition:width 0.22s ease;
                    position:relative;
                    overflow:hidden;
                }
                .pg-fill::after {
                    content:'';
                    position:absolute; top:0; bottom:0; width:50%;
                    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent);
                    animation:pg-shimmer-bar 1.8s ease-in-out infinite;
                }
                .pg-fill-dot {
                    position:absolute; right:-1px; top:50%;
                    transform:translateY(-50%);
                    width:7px; height:7px; border-radius:50%;
                    background:#fff;
                    box-shadow:0 0 10px rgba(74,222,128,0.9);
                }

                .pg-eq {
                    display:flex; gap:5px; align-items:flex-end;
                    height:18px; margin-top:20px;
                    animation:pg-rise 0.5s ease 0.6s both;
                }
                .pg-eq-b {
                    width:3px; border-radius:2px;
                    background:var(--pg-accent2);
                    transform-origin:bottom;
                    animation:pg-eqbar 1.1s ease-in-out infinite;
                }

                .pg-caption {
                    font-size:11px; color:var(--pg-white-20);
                    letter-spacing:0.07em;
                    margin-top:18px;
                    animation:pg-rise 0.5s ease 0.68s both;
                }

                .pg-version {
                    position:absolute; bottom:16px; right:20px;
                    font-size:10px; color:var(--pg-white-20);
                    letter-spacing:0.1em;
                }

                @media (max-width:480px) {
                    .pg-corner { width:20px; height:20px; }
                    .pg-c-tl,.pg-c-tr { top:12px; }
                    .pg-c-bl,.pg-c-br { bottom:12px; }
                    .pg-c-tl,.pg-c-bl { left:12px; }
                    .pg-c-tr,.pg-c-br { right:12px; }
                    .pg-cross { width:44px; height:44px; }
                }
            `}</style>

            <div className={`pg-overlay${leaving ? ' leaving' : ''}`}>

                <div className="pg-noise" />
                <div className="pg-grid" />
                <div className="pg-scan-wrap"><div className="pg-scan-line" /></div>
                <div className="pg-topbar" />

                {/* Glow blobs */}
                <div className="pg-blob" style={{
                    top:'-8%', left:'50%', transform:'translateX(-50%)',
                    width:'70vw', height:'45vw', maxWidth:560, maxHeight:350,
                    background:'radial-gradient(ellipse,rgba(74,222,128,0.12) 0%,transparent 65%)',
                }} />
                <div className="pg-blob" style={{
                    bottom:'-8%', left:'50%', transform:'translateX(-50%)',
                    width:'55vw', height:'35vw', maxWidth:440, maxHeight:280,
                    background:'radial-gradient(ellipse,rgba(74,222,128,0.07) 0%,transparent 65%)',
                }} />

                {/* Rings */}
                {[160, 280, 420, 580].map((size, i) => (
                    <div key={size} className="pg-ring" style={{
                        width:size, height:size,
                        transform:'translate(-50%,-50%)',
                        animationDelay:`${i * 1.1}s`,
                    }} />
                ))}

                {/* Corners */}
                <div className="pg-corner pg-c-tl" />
                <div className="pg-corner pg-c-tr" />
                <div className="pg-corner pg-c-bl" />
                <div className="pg-corner pg-c-br" />
                <div className="pg-version">v2.0</div>

                {/* Content */}
                <div className={`pg-content${leaving ? ' leaving' : ''}`}>

                    {/* <div className="pg-cross">
                        <div className="pg-cross-bar pg-cross-h" />
                        <div className="pg-cross-bar pg-cross-v" />
                    </div> */}

                    <div className="pg-logo-wrap">
                        <img
                            src="images/preloader.png"
                            alt="Raddiant Plus"
                            className="pg-logo-img"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                        {/* <div className="pg-brand">
                            Raddiant<span>+</span>
                        </div> */}
                    </div>

                    <div className="pg-tagline">Touching Lives · Healing Souls</div>
                    <div className="pg-rule" />

                    <div className="pg-pills">
                        <div className="pg-pill">Healthcare</div>
                        <div className="pg-pill">Excellence</div>
                        <div className="pg-pill">Compassion</div>
                    </div>

                    <div className="pg-progress-wrap">
                        <div className="pg-prog-header">
                            <span className="pg-prog-label">Initialising</span>
                            <span className="pg-prog-pct">
                                {Math.min(Math.round(progress), 100)}%
                            </span>
                        </div>
                        <div className="pg-track">
                            <div
                                className="pg-fill"
                                style={{ width:`${Math.min(progress, 100)}%` }}
                            >
                                <div className="pg-fill-dot" />
                            </div>
                        </div>
                    </div>

                    <div className="pg-eq">
                        {([10,14,9,18,13,18,9,14,10] as number[]).map((h,i) => (
                            <div key={i} className="pg-eq-b"
                                style={{ height:h, animationDelay:`${i*0.11}s` }} />
                        ))}
                    </div>

                    <div className="pg-caption">Excellence in Care · Compassion in Practice</div>
                </div>
            </div>
        </>
    );
};

export default Preloader;  