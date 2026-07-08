"use client";
import Link from 'next/link';
import Logo from '@/components/Logo';
import React from 'react';
import SplashScreen from '@/components/SplashScreen';
import { Goal, Users } from 'lucide-react';
import styles from './Landing.module.css';

export default function Home() {
  const [showSplash, setShowSplash] = React.useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <main className={styles.main}>
          <div className={styles.glowTop} />
          <div className={styles.glowBottom} />
          <div className={styles.glowMid} />

          <div className={styles.floatingParticles}>
            <svg className={styles.floatParticle} width="22" height="22" viewBox="0 0 22 22">
              <polygon points="11,2 20,7 20,17 11,21 2,17 2,7" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
            </svg>
            <svg className={styles.floatParticle} width="14" height="14" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="5" fill="none" stroke="hsl(var(--gold))" strokeWidth="1" />
            </svg>
            <svg className={styles.floatParticle} width="18" height="18" viewBox="0 0 18 18">
              <rect x="2" y="2" width="14" height="14" rx="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
            </svg>
            <svg className={styles.floatParticle} width="12" height="12" viewBox="0 0 12 12">
              <polygon points="6,1 11,4 11,9 6,11 1,9 1,4" fill="none" stroke="hsl(var(--gold))" strokeWidth="1" />
            </svg>
            <svg className={styles.floatParticle} width="8" height="8" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="3" fill="hsl(var(--primary) / 0.15)" />
            </svg>
            <svg className={styles.floatParticle} width="16" height="16" viewBox="0 0 16 16">
              <polygon points="8,1 15,4 15,12 8,15 1,12 1,4" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
            </svg>
          </div>

          <div className={styles.gridOverlay} />

          <div className={styles.inner}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoCircle}>
                <div className={styles.logoCircleGlow} />
                <div className={styles.logoCircleGlow2} />
                <Logo className={styles.logo} />
              </div>
            </div>

            <h1 className={styles.title}>Nos Falta Uno</h1>

            <p className={styles.subtitle}>
              Encuentra tu partido ideal o completa tu equipo en segundos
            </p>

            <div className={styles.features}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Goal size={20} />
                </div>
                <div className={styles.featureText}>
                  <p className={styles.featureTitle}>Partidos cerca de ti</p>
                  <p className={styles.featureDesc}>Encuentra partidos en tu zona al instante</p>
                </div>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Users size={20} />
                </div>
                <div className={styles.featureText}>
                  <p className={styles.featureTitle}>Comunidad activa</p>
                  <p className={styles.featureDesc}>Conecta con otros jugadores de tu nivel</p>
                </div>
              </div>
            </div>

            <div className={styles.ctas}>
              <Link href="/login" className={styles.ctaPrimary}>
                Iniciar Sesión
              </Link>
              <Link href="/register" className={styles.ctaSecondary}>
                Crear Cuenta
              </Link>
            </div>
          </div>

          
        </main>
      )}
    </>
  );
}
