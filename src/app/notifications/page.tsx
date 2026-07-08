"use client";

import { Bell, Target, MessageCircle, Sparkles } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import listStyles from '@/components/ui/ListPage.module.css';
import styles from './Notifications.module.css';

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
        <div className={`container ${listStyles.page}`}>
            <header className={listStyles.header}>
                <h1 className={listStyles.headerTitle}>Notificaciones</h1>
            </header>

            {notifications.length > 0 ? (
                <div className={listStyles.list}>
                    {notifications.map((notif) => {
                        const Icon = iconMap[notif.type];
                        const iconClass = notif.type === 'match' ? styles.iconMatch
                            : notif.type === 'message' ? styles.iconMessage
                            : styles.iconSystem;
                        return (
                            <div key={notif.id} className={`${listStyles.item} ${!notif.read ? styles.itemUnread : ''}`}>
                                {!notif.read && <span className={styles.unreadDot} />}
                                <div className={`${styles.iconWrap} ${iconClass}`}>
                                    <Icon size={16} />
                                </div>
                                <div className={listStyles.content}>
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
