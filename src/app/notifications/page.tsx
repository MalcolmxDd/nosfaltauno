"use client";

import { Bell, Target, MessageCircle, Sparkles } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import styles from './Notifications.module.css';

const notificationIcons: Record<string, 'match' | 'message' | 'system'> = {
    match: 'match',
    message: 'message',
    system: 'system',
};

const notifications = [
    { id: 1, type: 'match' as const, title: '¡Partido Confirmado!', message: 'Te has unido a "Fútbol 5 - Canchas del Sur".', time: 'Hace 5 min', read: false },
    { id: 2, type: 'message' as const, title: 'Nuevo Mensaje', message: 'Juan Pérez te envió un mensaje.', time: 'Hace 1 hora', read: true },
    { id: 3, type: 'system' as const, title: 'Bienvenido', message: 'Gracias por unirte a Nos Falta Uno.', time: 'Ayer', read: true },
];

const iconMap = {
    match: Target,
    message: MessageCircle,
    system: Sparkles,
};

export default function NotificationsPage() {
    return (
        <div className={`container ${styles.page}`}>
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>Notificaciones</h1>
            </header>

            {notifications.length > 0 ? (
                <div className={styles.list}>
                    {notifications.map((notif) => {
                        const Icon = iconMap[notif.type];
                        const iconClass = notif.type === 'match' ? styles.iconMatch
                            : notif.type === 'message' ? styles.iconMessage
                            : styles.iconSystem;
                        return (
                            <div key={notif.id} className={`${styles.item} ${!notif.read ? styles.itemUnread : ''}`}>
                                {!notif.read && <span className={styles.unreadDot} />}
                                <div className={`${styles.iconWrap} ${iconClass}`}>
                                    <Icon size={18} />
                                </div>
                                <div className={styles.content}>
                                    <h3 className={styles.title}>{notif.title}</h3>
                                    <p className={styles.message}>{notif.message}</p>
                                    <span className={styles.time}>{notif.time}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <EmptyState
                    icon={Bell}
                    title="No tienes notificaciones"
                    message="Te avisaremos cuando haya actividad en tus partidos o mensajes."
                />
            )}
        </div>
    );
}
