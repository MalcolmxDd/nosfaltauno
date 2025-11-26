"use client";

import Link from 'next/link';
import { useState } from 'react';
import { MOCK_MATCHES, MOCK_USERS } from '@/data/mocks';
import { Building2, Droplet, Car, Goal, Check, Clock, Send } from 'lucide-react';

type Tab = 'info' | 'chat';

interface MatchDetailsClientProps {
    matchId: string;
}

export default function MatchDetailsClient({ matchId }: MatchDetailsClientProps) {
    const [activeTab, setActiveTab] = useState<Tab>('info');
    const [message, setMessage] = useState('');
    const match = MOCK_MATCHES.find((m) => m.id.toString() === matchId);

    if (!match) {
        return (
            <div className="container" style={{ paddingTop: '2rem' }}>
                <header style={{ padding: '1rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Partido no encontrado</h1>
                </header>
                <p style={{ color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
                    No pudimos encontrar el partido que estás buscando.
                </p>
            </div>
        );
    }

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            // Mock: enviar mensaje
            setMessage('');
        }
    };

    return (
        <div className="container" style={{ paddingBottom: '6rem' }}>
            <header style={{ padding: '1rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/feed" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                    ⬅
                </Link>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Detalles del Partido</h1>
            </header>

            {/* Imagen */}
            <div style={{ marginBottom: '1.5rem' }}>
                <img
                    src={match.fieldInfo.image}
                    alt="Cancha"
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius)' }}
                />
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                <button
                    onClick={() => setActiveTab('info')}
                    style={{
                        padding: '0.75rem 1rem',
                        border: 'none',
                        borderBottom: `2px solid ${activeTab === 'info' ? 'hsl(var(--primary))' : 'transparent'}`,
                        backgroundColor: 'transparent',
                        color: activeTab === 'info' ? 'hsl(var(--primary))' : 'var(--muted-foreground)',
                        fontWeight: activeTab === 'info' ? '600' : '400',
                        cursor: 'pointer',
                    }}
                >
                    Información
                </button>
                <button
                    onClick={() => setActiveTab('chat')}
                    style={{
                        padding: '0.75rem 1rem',
                        border: 'none',
                        borderBottom: `2px solid ${activeTab === 'chat' ? 'hsl(var(--primary))' : 'transparent'}`,
                        backgroundColor: 'transparent',
                        color: activeTab === 'chat' ? 'hsl(var(--primary))' : 'var(--muted-foreground)',
                        fontWeight: activeTab === 'chat' ? '600' : '400',
                        cursor: 'pointer',
                    }}
                >
                    Chat ({match.confirmedPlayers.length})
                </button>
            </div>

            {activeTab === 'info' && (
                <>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{match.title}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted-foreground)', marginBottom: '1rem' }}>
                            <img src={match.host.avatar} alt={match.host.name} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                            <span style={{ fontSize: '0.875rem' }}>Organizado por <Link href={`/user/${match.host.id}`} style={{ color: 'hsl(var(--primary))' }}>{match.host.name}</Link></span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ backgroundColor: 'hsl(var(--card))', padding: '1rem', borderRadius: 'var(--radius)' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Fecha</p>
                                <p style={{ fontWeight: '600' }}>{match.date}</p>
                            </div>
                            <div style={{ backgroundColor: 'hsl(var(--card))', padding: '1rem', borderRadius: 'var(--radius)' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Precio</p>
                                <p style={{ fontWeight: '600', color: 'hsl(var(--secondary))' }}>{match.price}</p>
                            </div>
                            <div style={{ backgroundColor: 'hsl(var(--card))', padding: '1rem', borderRadius: 'var(--radius)' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Ubicación</p>
                                <p style={{ fontWeight: '600' }}>{match.location}</p>
                            </div>
                            <div style={{ backgroundColor: 'hsl(var(--card))', padding: '1rem', borderRadius: 'var(--radius)' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Nivel</p>
                                <p style={{ fontWeight: '600' }}>{match.level}</p>
                            </div>
                        </div>

                        {/* Field Info */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Información de la Cancha</h3>
                            <div style={{ backgroundColor: 'hsl(var(--card))', padding: '1rem', borderRadius: 'var(--radius)' }}>
                                <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{match.fieldInfo.name}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <Building2 size={14} /> {match.fieldInfo.type}
                                    </span>
                                    {match.fieldInfo.hasChangingRooms && (
                                        <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <Droplet size={14} /> Camarines
                                        </span>
                                    )}
                                    {match.fieldInfo.hasParking && (
                                        <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <Car size={14} /> Estacionamiento
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Players */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                                    Jugadores ({match.confirmedPlayers.length + match.pendingPlayers.length}/{match.playersTotal})
                                </h3>
                                {match.needsGoalkeeper && (
                                    <span
                                        style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '2rem',
                                            backgroundColor: 'hsl(var(--destructive) / 0.1)',
                                            color: 'hsl(var(--destructive))',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                        }}
                                    >
                                        <Goal size={14} style={{ display: 'inline', marginRight: '0.25rem' }} /> Busca arquero
                                    </span>
                                )}
                            </div>

                            {match.confirmedPlayers.length > 0 && (
                                <div style={{ marginBottom: '1rem' }}>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>Confirmados ({match.confirmedPlayers.length})</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {match.confirmedPlayers.map((player) => (
                                            <Link
                                                key={player.id}
                                                href={`/user/${player.id}`}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                    padding: '0.75rem',
                                                    backgroundColor: 'hsl(var(--card))',
                                                    borderRadius: 'var(--radius)',
                                                }}
                                            >
                                                <img src={player.avatar} alt={player.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>{player.name}</p>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{player.position}</p>
                                                </div>
                                                <span
                                                    style={{
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '2rem',
                                                        backgroundColor: 'hsl(var(--primary) / 0.1)',
                                                        color: 'hsl(var(--primary))',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    <Check size={14} />
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {match.pendingPlayers.length > 0 && (
                                <div>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>En espera ({match.pendingPlayers.length})</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {match.pendingPlayers.map((player) => (
                                            <Link
                                                key={player.id}
                                                href={`/user/${player.id}`}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                    padding: '0.75rem',
                                                    backgroundColor: 'hsl(var(--card))',
                                                    borderRadius: 'var(--radius)',
                                                }}
                                            >
                                                <img src={player.avatar} alt={player.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>{player.name}</p>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{player.position}</p>
                                                </div>
                                                <span
                                                    style={{
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '2rem',
                                                        backgroundColor: 'hsl(var(--secondary) / 0.1)',
                                                        color: 'hsl(var(--secondary))',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    <Clock size={14} />
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'chat' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 20rem)' }}>
                    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
                            <div style={{ backgroundColor: 'hsl(var(--card))', padding: '0.75rem', borderRadius: '1rem 1rem 1rem 0' }}>
                                <p style={{ fontSize: '0.9rem' }}>¡Hola! ¿Alguien más se suma?</p>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginLeft: '0.5rem' }}>12:30</span>
                        </div>

                        <div style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
                            <div style={{ backgroundColor: 'hsl(var(--primary))', color: 'white', padding: '0.75rem', borderRadius: '1rem 1rem 0 1rem' }}>
                                <p style={{ fontSize: '0.9rem' }}>Yo voy, ¿a qué hora nos encontramos?</p>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', display: 'block', textAlign: 'right', marginRight: '0.5rem' }}>12:32</span>
                        </div>
                    </div>

                    <form onSubmit={handleSendMessage} style={{ padding: '1rem', borderTop: '1px solid var(--border)', backgroundColor: 'hsl(var(--background))', display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            style={{
                                flex: 1,
                                height: '3rem',
                                padding: '0 1rem',
                                borderRadius: '1.5rem',
                                border: '1px solid var(--border)',
                                backgroundColor: 'hsl(var(--input))',
                                color: 'var(--foreground)',
                                outline: 'none',
                            }}
                        />
                        <button type="submit" className="btn btn-primary" style={{ width: '3rem', height: '3rem', borderRadius: '50%', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Enviar mensaje">
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            {/* Action Button */}
            {!match.isJoined && (
                <div style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1rem',
                    backgroundColor: 'hsl(var(--background))',
                    borderTop: '1px solid var(--border)'
                }}>
                    <button className="btn btn-primary" style={{ width: '100%' }}>
                        Unirse al Partido
                    </button>
                </div>
            )}
        </div>
    );
}

