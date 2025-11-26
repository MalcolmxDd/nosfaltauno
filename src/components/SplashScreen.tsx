"use client";

import { useEffect, useState } from 'react';
import Logo from './Logo';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Show splash for 2.5 seconds
        const timer = setTimeout(() => {
            setFadeOut(true);
            // Wait for fade out animation to complete
            setTimeout(() => {
                setIsVisible(false);
                onComplete();
            }, 600);
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
            {/* Animated Background */}
            <div className="splash-bg">
                <div className="splash-gradient-1"></div>
                <div className="splash-gradient-2"></div>
                <div className="splash-gradient-3"></div>
            </div>

            {/* Soccer Field Lines Animation */}
            <div className="field-lines">
                <div className="field-line field-line-1"></div>
                <div className="field-line field-line-2"></div>
                <div className="field-line field-line-3"></div>
                <div className="field-circle"></div>
            </div>

            {/* Content */}
            <div className="splash-content">
                {/* Logo with Animation */}
                <div className="splash-logo-container">
                    <div className="splash-logo-glow"></div>
                    <Logo className="splash-logo" />
                </div>

                {/* App Name */}
                <h1 className="splash-title">
                    <span className="splash-title-word">Nos</span>
                    <span className="splash-title-word">Falta</span>
                    <span className="splash-title-word">Uno</span>
                </h1>

                {/* Tagline */}
                <p className="splash-tagline">Encuentra tu partido ideal</p>

                {/* Loading Animation */}
                <div className="splash-loader">
                    <div className="loader-ball"></div>
                    <div className="loader-ball"></div>
                    <div className="loader-ball"></div>
                </div>
            </div>

            {/* Particles Effect */}
            <div className="splash-particles">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
