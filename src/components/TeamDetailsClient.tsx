"use client";

import Link from 'next/link';
import { useState } from 'react';
import { MOCK_TEAMS } from '@/data/mocks';
import { getAllMatches } from '@/data/store';
import StatsGrid from '@/components/ui/StatsGrid';
import PlayerListItem from '@/components/ui/PlayerListItem';
import styles from '@/app/teams/TeamDetails.module.css';
import { ArrowLeft, UserPlus, LogOut } from 'lucide-react';

interface TeamDetailsClientProps {
    teamId: string;
}

export default function TeamDetailsClient({ teamId }: TeamDetailsClientProps) {
    const [isMember, setIsMember] = useState(false);
    const team = MOCK_TEAMS.find(t => t.id === teamId);

    if (!team) {
        return (
            <div className={`container ${styles.notFound}`}>
                <Link href="/teams" className={styles.backLink}>
                    <ArrowLeft size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.25rem' }} />
                    Volver
                </Link>
                <h1 className={styles.notFoundTitle}>Equipo no encontrado</h1>
                <p className={styles.notFoundDesc}>No pudimos encontrar el equipo que estás buscando.</p>
            </div>
        );
    }

    const teamMatches = getAllMatches().filter((m: any) => m.id === teamId || m.title.toLowerCase().includes(team.name.toLowerCase()));

    return (
        <div className={`container ${styles.page}`}>
            <div className="pt-4">
                <Link href="/teams" className={styles.backLink}>
                    <ArrowLeft size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.25rem' }} />
                    Volver
                </Link>
                <h1 className={styles.teamName}>{team.name}</h1>
                <p className={styles.teamDesc}>{team.description}</p>

                <div className={styles.actions}>
                    <button
                        onClick={() => setIsMember(!isMember)}
                        className={isMember ? styles.leaveBtn : styles.joinBtn}
                    >
                        {isMember ? <><LogOut size={16} /> Dejar</> : <><UserPlus size={16} /> Unirse</>}
                    </button>
                </div>
            </div>

            {/* Stats */}
            <StatsGrid
                columns={2}
                stats={[
                    { label: 'Miembros', value: team.members.length },
                    { label: 'Partidos', value: teamMatches.length },
                ]}
            />

            {/* Members */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Miembros ({team.members.length})</h2>
                <div className={styles.membersList}>
                    {team.members.map((member) => (
                        <PlayerListItem
                            key={member.id}
                            player={member}
                            href={`/user/${member.id}`}
                        />
                    ))}
                </div>
            </div>

            {/* Recent Matches */}
            {teamMatches.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Partidos Recientes</h2>
                    <div className={styles.matchesList}>
                        {teamMatches.map((match) => (
                            <Link
                                key={match.id}
                                href={`/match/${match.id}`}
                                className={styles.matchCard}
                            >
                                <h3 className={styles.matchTitle}>{match.title}</h3>
                                <p className={styles.matchMeta}>{match.location} • {match.date}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
