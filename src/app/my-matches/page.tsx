"use client";

import Link from 'next/link';
import { MOCK_MATCHES, MOCK_PAST_MATCHES } from '@/data/mocks';
import { useState } from 'react';
import { Calendar, FileText, MapPin } from 'lucide-react';

type Tab = 'upcoming' | 'past';

export default function MyMatchesPage() {
    const [activeTab, setActiveTab] = useState<Tab>('upcoming');
    const upcomingMatches = MOCK_MATCHES.filter(m => m.isJoined);
    const pastMatches = MOCK_PAST_MATCHES;

    return (
        <div className="container">
            <header style={{ padding: '1rem 0', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Mis Partidos</h1>
            </header>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                <button
                    onClick={() => setActiveTab('upcoming')}
                    style={{
                        padding: '0.75rem 1rem',
                        border: 'none',
                        borderBottom: `2px solid ${activeTab === 'upcoming' ? 'hsl(var(--primary))' : 'transparent'}`,
                        backgroundColor: 'transparent',
                        color: activeTab === 'upcoming' ? 'hsl(var(--primary))' : 'var(--muted-foreground)',
                        fontWeight: activeTab === 'upcoming' ? '600' : '400',
                        cursor: 'pointer',
                    }}
                >
                    Próximos ({upcomingMatches.length})
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    style={{
                        padding: '0.75rem 1rem',
                        border: 'none',
                        borderBottom: `2px solid ${activeTab === 'past' ? 'hsl(var(--primary))' : 'transparent'}`,
                        backgroundColor: 'transparent',
                        color: activeTab === 'past' ? 'hsl(var(--primary))' : 'var(--muted-foreground)',
                        fontWeight: activeTab === 'past' ? '600' : '400',
                        cursor: 'pointer',
                    }}
                >
                    Historial ({pastMatches.length})
                </button>
            </div>

            {/* Upcoming Matches */}
            {activeTab === 'upcoming' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {upcomingMatches.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted-foreground)' }}>
                            <Calendar size={48} style={{ marginBottom: '1rem', color: 'var(--muted-foreground)' }} />
                            <p>No tienes partidos próximos.</p>
                            <Link href="/feed" style={{ color: 'hsl(var(--primary))', marginTop: '0.5rem', display: 'inline-block' }}>
                                Explorar partidos
                            </Link>
                        </div>
                    ) : (
                        upcomingMatches.map((match) => (
                            <Link
                                key={match.id}
                                href={`/match/${match.id}`}
                                style={{
                                    backgroundColor: 'hsl(var(--card))',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius)',
                                    display: 'block',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontWeight: '600', fontSize: '1.1rem' }}>{match.title}</h3>
                                    <span
                                        style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '2rem',
                                            backgroundColor: 'hsl(var(--primary) / 0.1)',
                                            color: 'hsl(var(--primary))',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Confirmado
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <MapPin size={14} /> {match.location} • {match.date}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                                        {match.confirmedPlayers.length}/{match.playersTotal} jugadores
                                    </span>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}

            {/* Past Matches */}
            {activeTab === 'past' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {pastMatches.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted-foreground)' }}>
                            <FileText size={48} style={{ marginBottom: '1rem', color: 'var(--muted-foreground)' }} />
                            <p>No tienes partidos en tu historial aún.</p>
                        </div>
                    ) : (
                        pastMatches.map((match) => (
                            <div
                                key={match.id}
                                style={{
                                    backgroundColor: 'hsl(var(--card))',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius)',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontWeight: '600', fontSize: '1.1rem' }}>{match.title}</h3>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{match.date}</span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <MapPin size={14} /> {match.location} • {match.myRole}
                                </p>
                                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'hsl(var(--primary))' }}>
                                    {match.result}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

