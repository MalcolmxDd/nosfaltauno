"use client";

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_MATCHES, MOCK_USERS, MOCK_TEAMS } from '@/data/mocks';
import { Search as SearchIcon, Star } from 'lucide-react';

type SearchType = 'all' | 'matches' | 'players' | 'teams';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState<SearchType>('all');

    const filteredMatches = MOCK_MATCHES.filter(m =>
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.location.toLowerCase().includes(query.toLowerCase())
    );

    const filteredPlayers = MOCK_USERS.filter(u =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.position.toLowerCase().includes(query.toLowerCase())
    );

    const filteredTeams = MOCK_TEAMS.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="container">
            <header style={{ padding: '1rem 0', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Buscar</h1>
                <input
                    type="text"
                    placeholder="Buscar partidos, jugadores, equipos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        width: '100%',
                        height: '3rem',
                        padding: '0 1rem',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--input)',
                        color: 'var(--foreground)',
                        fontSize: '0.9rem',
                        outline: 'none',
                    }}
                />
            </header>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '1rem' }}>
                {(['all', 'matches', 'players', 'teams'] as SearchType[]).map((type) => (
                    <button
                        key={type}
                        onClick={() => setSearchType(type)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            backgroundColor: searchType === type ? 'hsl(var(--primary))' : 'hsl(var(--card))',
                            color: searchType === type ? 'white' : 'var(--foreground)',
                            border: 'none',
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                        }}
                    >
                        {type === 'all' ? 'Todo' : type === 'matches' ? 'Partidos' : type === 'players' ? 'Jugadores' : 'Equipos'}
                    </button>
                ))}
            </div>

            {/* Results */}
            {!query ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted-foreground)' }}>
                    <SearchIcon size={48} style={{ marginBottom: '1rem', color: 'var(--muted-foreground)' }} />
                    <p>Escribe algo para buscar</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Matches */}
                    {(searchType === 'all' || searchType === 'matches') && (
                        <div>
                            <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                                Partidos ({filteredMatches.length})
                            </h2>
                            {filteredMatches.length === 0 ? (
                                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>No se encontraron partidos</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {filteredMatches.map((match) => (
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
                                            <h3 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{match.title}</h3>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                                                {match.location} • {match.date}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Players */}
                    {(searchType === 'all' || searchType === 'players') && (
                        <div>
                            <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                                Jugadores ({filteredPlayers.length})
                            </h2>
                            {filteredPlayers.length === 0 ? (
                                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>No se encontraron jugadores</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {filteredPlayers.map((player) => (
                                        <Link
                                            key={player.id}
                                            href={`/user/${player.id}`}
                                            style={{
                                                backgroundColor: 'hsl(var(--card))',
                                                padding: '1rem',
                                                borderRadius: 'var(--radius)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                            }}
                                        >
                                            <img
                                                src={player.avatar}
                                                alt={player.name}
                                                style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                                            />
                                            <div>
                                                <h3 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{player.name}</h3>
                                                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    {player.position} • <Star size={14} fill="currentColor" /> {player.skillLevel}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Teams */}
                    {(searchType === 'all' || searchType === 'teams') && (
                        <div>
                            <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                                Equipos ({filteredTeams.length})
                            </h2>
                            {filteredTeams.length === 0 ? (
                                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>No se encontraron equipos</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {filteredTeams.map((team) => (
                                        <Link
                                            key={team.id}
                                            href={`/teams/${team.id}`}
                                            style={{
                                                backgroundColor: 'hsl(var(--card))',
                                                padding: '1rem',
                                                borderRadius: 'var(--radius)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'hsl(var(--primary))',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '1.5rem',
                                                }}
                                            >
                                                {team.logo}
                                            </div>
                                            <div>
                                                <h3 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{team.name}</h3>
                                                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                                                    {team.members.length} miembros
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

