"use client";

import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';
import TopBarWrapper from './TopBarWrapper';
import { ToastProvider } from '@/contexts/ToastContext';
import { ErrorBoundary } from './ErrorBoundary';
import '@/app/globals.css';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Define paths where we don't want the nav/topbar (e.g., landing, login, register, onboarding)
    const isAuthPage = pathname === '/' || pathname === '/login' || pathname === '/register' || pathname === '/onboarding' || pathname === '/forgot-password';

    return (
        <ErrorBoundary>
            <ToastProvider>
                {!isAuthPage && <TopBarWrapper />}
                <main id="main-content" className={isAuthPage ? 'main-auth' : 'main-app'}>
                    {children}
                </main>
                {!isAuthPage && <BottomNav />}
                <footer className="text-center text-xs text-muted py-4" style={{ borderTop: '1px solid var(--border)', marginTop: '0' }}>
                    Nos Falta Uno v0.1.0 &copy; {new Date().getFullYear()}
                </footer>
            </ToastProvider>
        </ErrorBoundary>
    );
}
