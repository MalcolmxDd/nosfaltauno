import Link from 'next/link';
import { MOCK_USERS } from '@/data/mocks';

export function generateStaticParams() {
    return MOCK_USERS.map((user) => ({
        id: user.id,
    }));
}

export default function ChatPage({ params }: { params: { id: string } }) {
    const user = MOCK_USERS.find(u => u.id === params.id) || MOCK_USERS[0];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 11rem)' }}>
            <header style={{
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                borderBottom: '1px solid var(--border)',
                backgroundColor: 'hsl(var(--background))'
            }}>
              
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={user.avatar} alt={user.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                    <div>
                        <h1 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{user.name}</h1>
                        <p style={{ fontSize: '0.75rem', color: 'hsl(var(--primary))' }}>En línea</p>
                    </div>
                </div>
            </header>

            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
                    <div style={{ backgroundColor: 'hsl(var(--card))', padding: '0.75rem', borderRadius: '1rem 1rem 1rem 0' }}>
                        <p style={{ fontSize: '0.9rem' }}>Hola, ¿te falta uno para el partido?</p>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginLeft: '0.5rem' }}>12:30</span>
                </div>

                <div style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
                    <div style={{ backgroundColor: 'hsl(var(--primary))', color: 'white', padding: '0.75rem', borderRadius: '1rem 1rem 0 1rem' }}>
                        <p style={{ fontSize: '0.9rem' }}>¡Sí! Justo se nos bajó el arquero. ¿Te sumas?</p>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', display: 'block', textAlign: 'right', marginRight: '0.5rem' }}>12:32</span>
                </div>

                <div style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
                    <div style={{ backgroundColor: 'hsl(var(--card))', padding: '0.75rem', borderRadius: '1rem 1rem 1rem 0' }}>
                        <p style={{ fontSize: '0.9rem' }}>Dale, ahí estaré. ¿A qué hora es?</p>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginLeft: '0.5rem' }}>12:33</span>
                </div>
            </div>

            <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', backgroundColor: 'hsl(var(--background))' }}>
                <form style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        placeholder="Escribe un mensaje..."
                        style={{
                            flex: 1,
                            height: '3rem',
                            padding: '0 1rem',
                            borderRadius: '1.5rem',
                            border: '1px solid var(--border)',
                            backgroundColor: 'hsl(var(--input))',
                            color: 'var(--foreground)',
                            outline: 'none'
                        }}
                    />
                    <button
                        type="button"
                        className="btn btn-primary"
                        aria-label="Enviar mensaje"
                        style={{ width: '3rem', height: '3rem', borderRadius: '50%', padding: 0 }}
                    >
                        ➤
                    </button>
                </form>
            </div>
        </div>
    );
}
