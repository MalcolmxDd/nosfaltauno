"use client";

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_USERS, MOCK_TEAMS } from '@/data/mocks';
import { getAllMatches } from '@/data/store';
import { Search as SearchIcon, Users } from 'lucide-react';
import ChipButton from '@/components/ui/ChipButton';
import PlayerListItem from '@/components/ui/PlayerListItem';
import styles from './Search.module.css';

type SearchType = 'all' | 'matches' | 'players' | 'teams';

const searchTypes: { key: SearchType; label: string }[] = [
    { key: 'all', label: 'Todo' },
    { key: 'matches', label: 'Partidos' },
    { key: 'players', label: 'Jugadores' },
    { key: 'teams', label: 'Equipos' },
];

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState<SearchType>('all');

    const filteredMatches = getAllMatches().filter((m: any) =>
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
        <div className={`container ${styles.page}`}>
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>Buscar</h1>
                <div className={styles.inputWrap}>
                    <div className={styles.inputIcon}><SearchIcon size={16} /></div>
                    <input
                        type="text"
                        placeholder="Buscar partidos, jugadores, equipos..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={styles.input}
                    />
                </div>
            </header>

            <div className={styles.filters}>
                {searchTypes.map(({ key, label }) => (
                    <ChipButton
                        key={key}
                        label={label}
                        selected={searchType === key}
                        onClick={() => setSearchType(key)}
                    />
                ))}
            </div>

            {!query ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                        <SearchIcon size={24} />
                    </div>
                    <p className={styles.emptyText}>Escribe algo para buscar</p>
                </div>
            ) : (
                <div className={styles.results}>
                    {(searchType === 'all' || searchType === 'matches') && (
                        <div>
                            <h2 className={styles.sectionTitle}>Partidos ({filteredMatches.length})</h2>
                            {filteredMatches.length === 0 ? (
                                <p className={styles.noResults}>No se encontraron partidos</p>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {filteredMatches.map((match) => (
                                        <Link key={match.id} href={`/match/${match.id}`} className={styles.matchCard}>
                                            <h3 className={styles.matchCardTitle}>{match.title}</h3>
                                            <p className={styles.matchCardMeta}>{match.location} • {match.date}</p>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {(searchType === 'all' || searchType === 'players') && (
                        <div>
                            <h2 className={styles.sectionTitle}>Jugadores ({filteredPlayers.length})</h2>
                            {filteredPlayers.length === 0 ? (
                                <p className={styles.noResults}>No se encontraron jugadores</p>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {filteredPlayers.map((player) => (
                                        <PlayerListItem
                                            key={player.id}
                                            player={player}
                                            href={`/user/${player.id}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {(searchType === 'all' || searchType === 'teams') && (
                        <div>
                            <h2 className={styles.sectionTitle}>Equipos ({filteredTeams.length})</h2>
                            {filteredTeams.length === 0 ? (
                                <p className={styles.noResults}>No se encontraron equipos</p>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {filteredTeams.map((team) => (
                                        <Link key={team.id} href={`/teams/${team.id}`} className={styles.teamCard}>
                                            <div className={styles.teamLogo}>{team.logo}</div>
                                            <div className={styles.teamInfo}>
                                                <h3 className={styles.teamName}>{team.name}</h3>
                                                <p className={styles.teamMembers}>{team.members.length} miembros</p>
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
