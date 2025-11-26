"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlusCircle, User, Compass } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

    const navItems = [
        { path: '/feed', label: 'Inicio', icon: Home },
        { path: '/discover', label: 'Descubrir', icon: Compass },
        { path: '/create', label: 'Crear', icon: PlusCircle },
        { path: '/profile', label: 'Perfil', icon: User },
    ];

    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '5rem', // Increased height for better touch targets
            backgroundColor: 'hsl(var(--card) / 0.8)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 50,
            paddingBottom: 'env(safe-area-inset-bottom)'
        }}>
            {navItems.map(({ path, label, icon: Icon }) => (
                <Link key={path} href={path} style={{
                    color: isActive(path) ? 'hsl(var(--primary))' : 'var(--muted-foreground)',
                    fontSize: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.375rem',
                    transition: 'all 0.2s',
                    transform: isActive(path) ? 'scale(1.1)' : 'scale(1)',
                    padding: '0.5rem'
                }}>
                    <Icon size={24} strokeWidth={isActive(path) ? 2.5 : 2} />
                    <span style={{ fontWeight: isActive(path) ? 600 : 400 }}>{label}</span>
                </Link>
            ))}
        </nav>
    );
}
