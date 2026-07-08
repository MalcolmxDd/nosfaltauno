"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Plus, Shirt, List } from 'lucide-react';
import styles from './BottomNav.module.css';

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');
    const isCreatePage = pathname === '/create';

    const navItems = [
        { path: '/feed', label: 'Inicio', icon: Home },
        { path: '/discover', label: 'Descubrir', icon: Compass },
        { path: '/teams', label: 'Equipos', icon: Shirt },
        { path: '/my-matches', label: 'Mis Partidos', icon: List },
    ];

    return (
        <nav className={styles.nav}>
            {navItems.slice(0, 2).map(({ path, label, icon: Icon }) => {
                const active = isActive(path);
                return (
                    <Link key={path} href={path} className={`${styles.link} ${active ? styles.linkActive : ''}`}>
                        <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                        <span className={styles.label}>{label}</span>
                        {active && <span className={styles.dot} />}
                    </Link>
                );
            })}

            <div className={styles.fabWrap}>
                <Link
                    href="/create"
                    className={`${styles.fab} ${isCreatePage ? styles.fabActive : ''}`}
                    aria-label="Crear partido"
                >
                    <Plus size={28} strokeWidth={3} />
                    {isCreatePage && <span className={styles.fabActiveDot} />}
                </Link>
            </div>

            {navItems.slice(2).map(({ path, label, icon: Icon }) => {
                const active = isActive(path);
                return (
                    <Link key={path} href={path} className={`${styles.link} ${active ? styles.linkActive : ''}`}>
                        <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                        <span className={styles.label}>{label}</span>
                        {active && <span className={styles.dot} />}
                    </Link>
                );
            })}
        </nav>
    );
}
