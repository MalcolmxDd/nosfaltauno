import Link from 'next/link';
import { Circle, MessageCircle, Bell } from 'lucide-react';

export default function NotificationsPage() {
    const notifications = [
        {
            id: 1,
            type: 'match',
            title: '¡Partido Confirmado!',
            message: 'Te has unido a "Fútbol 5 - Canchas del Sur".',
            time: 'Hace 5 min',
            read: false,
        },
        {
            id: 2,
            type: 'message',
            title: 'Nuevo Mensaje',
            message: 'Juan Pérez te envió un mensaje.',
            time: 'Hace 1 hora',
            read: true,
        },
        {
            id: 3,
            type: 'system',
            title: 'Bienvenido',
            message: 'Gracias por unirte a Nos Falta Uno.',
            time: 'Ayer',
            read: true,
        }
    ];

    const hasNotifications = notifications.length > 0;

    return (
        <div className="container">
            <header style={{ padding: '1rem 0', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Notificaciones</h1>
            </header>

            {hasNotifications ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {notifications.map((notif) => (
                        <div key={notif.id} style={{
                            padding: '1rem',
                            backgroundColor: notif.read ? 'transparent' : 'hsl(var(--card))',
                            borderRadius: 'var(--radius)',
                            border: notif.read ? '1px solid var(--border)' : 'none',
                            position: 'relative'
                        }}>
                            {!notif.read && (
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: 'hsl(var(--primary))',
                                    borderRadius: '50%'
                                }} />
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                {notif.type === 'match' && <Circle size={20} />}
                                {notif.type === 'message' && <MessageCircle size={20} />}
                                {notif.type === 'system' && <Bell size={20} />}
                                <h3 style={{ fontWeight: '600', fontSize: '1rem' }}>{notif.title}</h3>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
                                {notif.message}
                            </p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                                {notif.time}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--muted-foreground)' }}>
                    <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>No tienes notificaciones por ahora.</p>
                    <p style={{ fontSize: '0.9rem' }}>Te avisaremos cuando haya actividad en tus partidos o mensajes.</p>
                </div>
            )}
        </div>
    );
}
