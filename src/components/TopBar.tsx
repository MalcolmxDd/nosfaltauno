"use client";

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Map, Bell, ArrowLeft, Search, MessageCircle, User } from 'lucide-react';
import styles from './TopBar.module.css';

interface TopBarProps {
    title?: string;
    showBack?: boolean;
}

export default function TopBar({ title, showBack }: TopBarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const isAuthPage = pathname === '/' || pathname === '/login' || pathname === '/register' || pathname === '/onboarding';

    // Back button on all non-auth pages, always
    const shouldShowBack = !isAuthPage;

    // Search icon on main browse pages
    const showSearch = pathname === '/feed' || pathname === '/discover';

    // Map toggle only on feed
    const isFeedPage = pathname === '/feed';
    const isMapView = isFeedPage && searchParams.get('view') === 'map';

    const handleBack = () => {
        router.back();
    };

    const mapToggleHref = isMapView ? '/feed' : '/feed?view=map';
    const mapToggleLabel = isMapView ? 'Volver a lista' : 'Ver en mapa';

    const getTitle = () => {
        if (title) return title;
        if (pathname.startsWith('/match/')) return 'Detalles del Partido';
        if (pathname.startsWith('/venue/')) return 'Detalles del Recinto';
        if (pathname.startsWith('/user/')) return 'Perfil';
        if (pathname.startsWith('/teams/')) return 'Detalles del Equipo';
        if (pathname.startsWith('/messages/') && pathname !== '/messages') return 'Chat';
        if (pathname === '/messages') return 'Mensajes';
        if (pathname === '/notifications') return 'Notificaciones';
        if (pathname === '/search') return 'Buscar';
        if (pathname === '/my-matches') return 'Mis Partidos';
        if (pathname === '/settings') return 'Configuración';
        if (pathname === '/teams') return 'Equipos';
        if (pathname === '/create') return 'Crear Partido';
        if (pathname === '/discover') return 'Descubrir';
        if (pathname === '/profile') return 'Mi Perfil';
        return null;
    };

    const isProfilePage = pathname === '/profile' || pathname.startsWith('/profile/') || pathname === '/settings';

    const pageTitle = getTitle();

    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                {shouldShowBack && (
                    <button
                        onClick={handleBack}
                        type="button"
                        aria-label="Volver"
                        className={styles.backButton}
                    >
                        <ArrowLeft size={24} />
                    </button>
                )}
                {pageTitle ? (
                    <h1 className={`${styles.title} ${styles.titlePlain}`}>{pageTitle}</h1>
                ) : (
                    <h1 className={`${styles.title} ${styles.titleGradient}`}>Nos Falta Uno</h1>
                )}
            </div>
            <div className={styles.rightSection}>
                {showSearch && (
                    <Link
                        href="/search"
                        aria-label="Buscar"
                        className={styles.iconButton}
                    >
                        <Search size={22} />
                    </Link>
                )}
                {isFeedPage && (
                    <Link
                        href={mapToggleHref}
                        aria-label={mapToggleLabel}
                        className={`${styles.mapToggle} ${isMapView ? styles.mapToggleActive : styles.mapToggleInactive}`}
                    >
                        <Map size={22} />
                    </Link>
                )}
                <Link
                    href="/messages"
                    aria-label="Ver mensajes"
                    className={`${styles.iconButton} ${pathname.startsWith('/messages') ? styles.iconButtonActive : ''}`}
                >
                    <div className={styles.notificationDot}>
                        <MessageCircle size={22} />
                        <span className={styles.badge} />
                    </div>
                </Link>
                <Link
                    href="/notifications"
                    aria-label="Ver notificaciones"
                    className={`${styles.iconButton} ${pathname === '/notifications' ? styles.iconButtonActive : ''}`}
                >
                    <div className={styles.notificationDot}>
                        <Bell size={22} />
                        <span className={styles.badge} />
                    </div>
                </Link>
                <Link
                    href="/profile"
                    aria-label="Mi perfil"
                    className={`${styles.profileBtn} ${isProfilePage ? styles.profileBtnActive : ''}`}
                >
                    <User size={20} />
                </Link>
            </div>
        </header>
    );
}
