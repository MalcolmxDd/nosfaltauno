"use client";

import Link from 'next/link';
import { MOCK_TEAMS, MOCK_USERS } from '@/data/mocks';
import { Circle, Trophy } from 'lucide-react';

export default function TeamsPage() {
    return (
        <div className="container">
            <header style={{ padding: '1rem 0', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Equipos</h1>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>
                    Encuentra o crea equipos para jugar regularmente
                </p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {MOCK_TEAMS.map((team) => (
                    <Link
                        key={team.id}
                        href={`/teams/${team.id}`}
                        style={{
                            backgroundColor: 'hsl(var(--card))',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <div
                            style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                backgroundColor: 'hsl(var(--primary))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {team.logo === 'football' ? (
                                <Circle size={32} color="white" fill="white" />
                            ) : (
                                <Trophy size={32} color="white" />
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                <h3 style={{ fontWeight: '600', fontSize: '1.1rem' }}>{team.name}</h3>
                                {team.isMember && (
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
                                        Miembro
                                    </span>
                                )}
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
                                {team.description}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', marginLeft: '-0.5rem' }}>
                                    {team.members.slice(0, 3).map((member, idx) => (
                                        <img
                                            key={member.id}
                                            src={member.avatar}
                                            alt={member.name}
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                border: '2px solid hsl(var(--card))',
                                                marginLeft: idx > 0 ? '-0.5rem' : '0',
                                            }}
                                        />
                                    ))}
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                                    {team.members.length} miembros • {team.matchesPlayed} partidos
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => {
                    // Mock: crear equipo
                    alert('Función de crear equipo (mock)');
                }}
            >
                + Crear Equipo
            </button>
        </div>
    );
}

