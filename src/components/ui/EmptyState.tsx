"use client";
import { LucideIcon } from 'lucide-react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    message: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export default function EmptyState({ icon: Icon, title, message, action }: EmptyStateProps) {
    return (
        <div className={styles.wrapper}>
            <Icon size={48} className={styles.icon} />
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className={`text-sm text-muted ${styles.message}`}>{message}</p>
            {action && (
                <button onClick={action.onClick} className="btn btn-primary" type="button">
                    {action.label}
                </button>
            )}
        </div>
    );
}
