"use client";

import { useEffect, useState } from 'react';
import Logo from './Logo';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                setIsVisible(false);
                onComplete();
            }, 800);
        }, 3000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
            <button className="skip-btn" onClick={() => { setFadeOut(true); setTimeout(() => { setIsVisible(false); onComplete(); }, 800); }}>
                Saltar
            </button>

            <div className="splash-bg">
                <div className="splash-orb splash-orb-1" />
                <div className="splash-orb splash-orb-2" />
                <div className="splash-orb splash-orb-3" />
            </div>

            {/* Floating geometric particles */}
            <div className="particles">
                <svg className="particle particle-1" width="24" height="24" viewBox="0 0 24 24">
                    <polygon points="12,2 22,8.5 22,21.5 2,21.5 2,8.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
                </svg>
                <svg className="particle particle-2" width="16" height="16" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="6" fill="none" stroke="hsl(var(--gold))" strokeWidth="1" />
                </svg>
                <svg className="particle particle-3" width="20" height="20" viewBox="0 0 20 20">
                    <polygon points="10,2 18,7 16,16 4,16 2,7" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
                </svg>
                <svg className="particle particle-4" width="14" height="14" viewBox="0 0 14 14">
                    <rect x="1" y="1" width="12" height="12" rx="3" fill="none" stroke="hsl(var(--gold))" strokeWidth="1" />
                </svg>
                <svg className="particle particle-5" width="10" height="10" viewBox="0 0 10 10">
                    <circle cx="5" cy="5" r="4" fill="hsl(var(--primary) / 0.15)" />
                </svg>
                <svg className="particle particle-6" width="18" height="18" viewBox="0 0 18 18">
                    <polygon points="9,1 17,5 17,13 9,17 1,13 1,5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
                </svg>
            </div>

            <div className="splash-content">
                <div className="logoWrap">
                    <div className="logoRing" />
                    <div className={`logoRing ${'logoRing2'}`} />
                    <Logo className="splash-logo" />
                </div>

                <h1 className="splash-title">
                    <span className="splash-title-word">Nos</span>
                    <span className="splash-title-word">Falta</span>
                    <span className="splash-title-word">Uno</span>
                </h1>

                <p className="splash-tagline">Encuentra tu partido ideal</p>

                <div className="splash-loader">
                    <div className="loader-dot" />
                    <div className="loader-dot" />
                    <div className="loader-dot" />
                </div>
            </div>

            <div className="splash-bottom" />
        </div>
    );
}
