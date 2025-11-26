import Link from 'next/link';
import { MOCK_USERS } from '@/data/mocks';

export default function MessagesPage() {
    const hasUsers = MOCK_USERS.length > 0;

    return (
        <div className="container">
            <header style={{ padding: '1rem 0', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Mensajes</h1>
            </header>

            {hasUsers ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {MOCK_USERS.map((user) => (
                        <Link key={user.id} href={`/messages/${user.id}`} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem',
                            backgroundColor: 'hsl(var(--card))',
                            borderRadius: 'var(--radius)',
                            transition: 'background-color 0.2s'
                        }}>
                            <div style={{ position: 'relative' }}>
                                <img src={user.avatar} alt={user.name} style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: 'hsl(var(--primary))',
                                    borderRadius: '50%',
                                    border: '2px solid hsl(var(--card))'
                                }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <h3 style={{ fontWeight: '600' }}>{user.name}</h3>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>12:30</span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    ¿Te falta uno para el partido de hoy?
                                </p>
                            </div>
                        </Link>
                    ))}

                    {/* Team Chat Mock */}
                    <Link href="/messages/team-1" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        backgroundColor: 'hsl(var(--card))',
                        borderRadius: 'var(--radius)'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: 'hsl(var(--secondary))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold'
                        }}>
                            F5
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                <h3 style={{ fontWeight: '600' }}>Fútbol 5 - Jueves</h3>
                                <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Ayer</span>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                                Juan: ¡Yo llevo la pelota!
                            </p>
                        </div>
                    </Link>
                </div>
            ) : (
                <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--muted-foreground)' }}>
                    <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Aún no tienes conversaciones.</p>
                    <p style={{ fontSize: '0.9rem' }}>Cuando empieces a unirte a partidos, verás tus chats aquí.</p>
                </div>
            )}
        </div>
    );
}
