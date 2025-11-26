"use client";

import { Suspense } from 'react';
import TopBar from './TopBar';

export default function TopBarWrapper() {
    return (
        <Suspense fallback={
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '4rem',
                backgroundColor: 'hsl(var(--card) / 0.8)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 50,
                padding: '0 1rem',
                paddingTop: 'env(safe-area-inset-top)'
            }}>
                <h1 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #4ade80, #3b82f6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Nos Falta Uno
                </h1>
            </header>
        }>
            <TopBar />
        </Suspense>
    );
}

