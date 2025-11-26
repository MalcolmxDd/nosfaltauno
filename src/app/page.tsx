"use client";
import Link from 'next/link';
import Logo from '@/components/Logo';
import React from 'react';
import SplashScreen from '@/components/SplashScreen';
import { Goal, Users } from 'lucide-react';
import '@/components/SplashScreen.css';
import '@/components/DynamicMap.css';

export default function Home() {
  const [showSplash, setShowSplash] = React.useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <main style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          textAlign: 'center',
          background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 50%, hsl(var(--background)) 100%)',
          padding: '2rem 1rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: 0
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30%',
            left: '-15%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, hsl(var(--secondary) / 0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: 0
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '500px', width: '100%' }}>
            {/* Logo with enhanced styling */}
            <div style={{ 
              marginBottom: '2rem', 
              animation: 'fadeIn 1s ease-out',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <div style={{
                position: 'relative',
                padding: '1.5rem',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
              }}>
                <Logo style={{ width: '120px', height: '120px', filter: 'drop-shadow(0 10px 30px rgba(34, 197, 94, 0.3))' }} />
              </div>
            </div>

            {/* Title */}
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: '900', 
              marginBottom: '1rem', 
              background: 'linear-gradient(135deg, #22c55e, #3b82f6)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              animation: 'fadeInUp 0.8s ease-out 0.2s both'
            }}>
              Nos Falta Uno
            </h1>

            {/* Subtitle */}
            <p style={{ 
              color: 'var(--muted-foreground)', 
              marginBottom: '3rem', 
              fontSize: '1.25rem',
              lineHeight: '1.6',
              animation: 'fadeInUp 0.8s ease-out 0.4s both'
            }}>
              Encuentra tu partido ideal o completa tu equipo en segundos
            </p>

            {/* Features */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '3rem',
              animation: 'fadeInUp 0.8s ease-out 0.6s both'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: 'hsl(var(--card) / 0.6)',
                borderRadius: 'var(--radius)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <Goal size={20} />
                </div>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Partidos cerca de ti</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Encuentra partidos en tu zona</p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: 'hsl(var(--card) / 0.6)',
                borderRadius: 'var(--radius)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <Users size={20} />
                </div>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Comunidad activa</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Conecta con otros jugadores</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem', 
              width: '100%',
              animation: 'fadeInUp 0.8s ease-out 0.8s both'
            }}>
              <Link 
                href="/login" 
                className="btn btn-primary"
                style={{
                  height: '3.5rem',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 4px 20px hsl(var(--primary) / 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 25px hsl(var(--primary) / 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px hsl(var(--primary) / 0.3)';
                }}
              >
                Iniciar Sesión
              </Link>
              <Link 
                href="/register" 
                className="btn btn-ghost"
                style={{
                  height: '3.5rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  borderRadius: 'var(--radius)',
                  border: '2px solid var(--border)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--card))';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Crear Cuenta
              </Link>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
