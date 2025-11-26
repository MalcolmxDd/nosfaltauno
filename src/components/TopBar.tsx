"use client";

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Map, Bell, ArrowLeft, Search, MessageCircle } from 'lucide-react';

export default function TopBar() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Determine if we should show back button (for detail pages)
    const showBackButton = pathname.startsWith('/match/') ||
        (pathname.startsWith('/messages/') && pathname !== '/messages') ||
        pathname === '/notifications';

    // Determine if we should show map toggle (only on feed)
    const isFeedPage = pathname === '/feed';
    const isMapView = isFeedPage && searchParams.get('view') === 'map';

    const handleBack = () => {
        router.back();
    };

    const mapToggleHref = isMapView ? '/feed' : '/feed?view=map';
    const mapToggleLabel = isMapView ? 'Volver a lista' : 'Ver en mapa';

    return (
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {showBackButton && (
                    <button
                        onClick={handleBack}
                        type="button"
                        aria-label="Volver"
                        style={{
                            padding: '0.5rem',
                            color: 'var(--foreground)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <ArrowLeft size={24} />
                    </button>
                )}
                <h1 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #4ade80, #3b82f6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Nos Falta Uno
                </h1>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                {isFeedPage && (
                    <>
                        <Link
                            href="/search"
                            aria-label="Buscar"
                            style={{
                                padding: '0.5rem',
                                color: 'var(--foreground)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Search size={22} />
                        </Link>
                        <Link
                            href={mapToggleHref}
                            aria-label={mapToggleLabel}
                            style={{
                                padding: '0.5rem',
                                color: isMapView ? 'hsl(var(--primary))' : 'var(--foreground)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '999px',
                                backgroundColor: isMapView ? 'hsl(var(--background))' : 'transparent',
                                border: isMapView ? '1px solid hsl(var(--primary))' : 'none',
                                transition: 'all 0.15s ease',
                            }}
                        >
                            <Map size={22} />
                        </Link>
                    </>
                )}
                <Link
                    href="/messages"
                    aria-label="Ver mensajes"
                    style={{
                        padding: '0.5rem',
                        position: 'relative',
                        color: pathname.startsWith('/messages') ? 'hsl(var(--primary))' : 'var(--foreground)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'color 0.2s',
                    }}
                >
                    <MessageCircle size={22} />
                    <span style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        width: '8px',
                        height: '8px',
                        backgroundColor: 'hsl(var(--destructive))',
                        borderRadius: '50%'
                    }} />
                </Link>
                <Link
                    href="/notifications"
                    aria-label="Ver notificaciones"
                    style={{
                        padding: '0.5rem',
                        position: 'relative',
                        color: pathname === '/notifications' ? 'hsl(var(--primary))' : 'var(--foreground)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'color 0.2s',
                    }}
                >
                    <Bell size={22} />
                    <span style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        width: '8px',
                        height: '8px',
                        backgroundColor: 'hsl(var(--destructive))',
                        borderRadius: '50%'
                    }} />
                </Link>
            </div>
        </header>
    );
}
