"use client";

import Link from 'next/link';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingMap = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
};

export default function Card({ children, className = '', onClick, href, padding = 'md' }: CardProps) {
    const baseClass = `bg-card rounded-md border ${paddingMap[padding]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={`${baseClass} block cursor-pointer`}>
                {children}
            </Link>
        );
    }

    if (onClick) {
        return (
            <div className={`${baseClass} cursor-pointer`} onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}>
                {children}
            </div>
        );
    }

    return (
        <div className={baseClass}>
            {children}
        </div>
    );
}
