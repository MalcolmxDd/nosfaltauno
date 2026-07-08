"use client";

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    backTo?: string;
    action?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, backTo, action }: PageHeaderProps) {
    const router = useRouter();

    const handleBack = () => {
        if (backTo) {
            router.push(backTo);
        } else {
            router.back();
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <button
                    onClick={handleBack}
                    type="button"
                    aria-label="Volver"
                    className={styles.backBtn}
                >
                    <ArrowLeft size={22} />
                </button>
                <div>
                    <h1 className="text-xl font-bold">{title}</h1>
                    {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
                </div>
            </div>
            {action && <div>{action}</div>}
        </header>
    );
}
