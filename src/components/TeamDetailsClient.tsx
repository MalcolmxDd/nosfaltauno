"use client";

import Link from 'next/link';
import { useState } from 'react';
import { MOCK_TEAMS, MOCK_USERS, MOCK_MATCHES } from '@/data/mocks';
import { Circle, Trophy, Users, Calendar, MapPin } from 'lucide-react';

interface TeamDetailsClientProps {
    teamId: string;
}

export default function TeamDetailsClient({ teamId }: TeamDetailsClientProps) {
    const team = MOCK_TEAMS.find((t) => t.id === teamId);
    const [isMember, setIsMember] = useState(team?.isMember || false);
    const teamMatches = MOCK_MATCHES.filter((match) => 
        team?.members.some((member) => match.confirmedPlayers.some((p) => p.id === member.id))
    );

    if (!team) {
        return (
            <div className="container" style={{ paddingTop: '2rem' }}>
                <header style={{ padding: '1rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/teams" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                        ⬅
                    </Link>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Equipo no encontrado</h1>
                </header>
                <p style={{ color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
                    No pudimos encontrar el equipo que estás buscando.
                </p>
            </div>
        );
    }

    const handleJoinTeam = () => {
        setIsMember(!isMember);
    };

    return (
        <div className="container" style={{ paddingBottom: '6rem' }}>
            <header style={{ padding: '1rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/teams" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                    ⬅
                </Link>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Detalles del Equipo</h1>
            </header>

            {/* Team Header */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
                <div
                    style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        backgroundColor: 'hsl(var(--primary))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                    }}
                >
                    {team.logo === 'football' ? (
                        <Circle size={64} color="white" fill="white" />
                    ) : (
                        <Trophy size={64} color="white" />
                    )}
                </div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{team.name}</h1>
                <p style={{ color: 'var(--muted-foreground)', textAlign: 'center', marginBottom: '1rem' }}>
                    {team.description}
                </p>
                {isMember && (
                    <span
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            backgroundColor: 'hsl(var(--primary) / 0.1)',
                            color: 'hsl(var(--primary))',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                        }}
                    >
                        Miembro
                    </span>
                )}
            </div>

            {/* Action Button */}
            <div style={{ marginBottom: '2rem' }}>
                <button
                    onClick={handleJoinTeam}
                    className={isMember ? 'btn btn-ghost' : 'btn btn-primary'}
                    style={{ width: '100%' }}
                >
                    {isMember ? 'Dejar el Equipo' : 'Unirse al Equipo'}
                </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ backgroundColor: 'hsl(var(--card))', padding: '1rem', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'hsl(var(--primary))' }}>{team.members.length}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Miembros</p>
                </div>
                <div style={{ backgroundColor: 'hsl(var(--card))', padding: '1rem', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'hsl(var(--secondary))' }}>{team.matchesPlayed}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Partidos</p>
                </div>
            </div>

            {/* Members */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={18} /> Miembros ({team.members.length})
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {team.members.map((member) => (
                        <Link
                            key={member.id}
                            href={`/user/${member.id}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.75rem',
                                backgroundColor: 'hsl(var(--card))',
                                borderRadius: 'var(--radius)',
                            }}
                        >
                            <img
                                src={member.avatar}
                                alt={member.name}
                                style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                            />
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>{member.name}</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{member.position}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Matches */}
            {teamMatches.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={18} /> Partidos Recientes
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {teamMatches.slice(0, 5).map((match) => (
                            <Link
                                key={match.id}
                                href={`/match/${match.id}`}
                                style={{
                                    backgroundColor: 'hsl(var(--card))',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius)',
                                }}
                            >
                                <h3 style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{match.title}</h3>
                                <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <MapPin size={12} /> {match.location}
                                </p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{match.date}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

