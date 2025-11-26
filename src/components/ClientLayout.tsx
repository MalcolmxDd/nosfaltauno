"use client";

import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';
import TopBarWrapper from './TopBarWrapper';
import { ToastProvider } from '@/contexts/ToastContext';
import { ErrorBoundary } from './ErrorBoundary';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Define paths where we don't want the nav/topbar (e.g., landing, login, register, onboarding)
    const isAuthPage = pathname === '/' || pathname === '/login' || pathname === '/register' || pathname === '/onboarding';

    return (
        <ErrorBoundary>
            <ToastProvider>
                {!isAuthPage && <TopBarWrapper />}
                <main style={{
                    paddingTop: !isAuthPage ? '5rem' : 0, // Space for TopBar
                    paddingBottom: !isAuthPage ? '6rem' : 0, // Space for BottomNav + extra buffer
                    minHeight: '100vh'
                }}>
                    {children}
                </main>
                {!isAuthPage && <BottomNav />}
            </ToastProvider>
        </ErrorBoundary>
    );
}
