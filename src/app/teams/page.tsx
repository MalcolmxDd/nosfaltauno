"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MOCK_TEAMS } from '@/data/mocks';
import { Circle, Trophy, ChevronRight } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import styles from './Teams.module.css';

export default function TeamsPage() {
    const router = useRouter();
    return (
        <div className="container">
            <header className={styles.header}>
                <h1>Equipos</h1>
                <p>Encuentra o crea equipos para jugar regularmente</p>
            </header>

            <div className={styles.grid}>
                {MOCK_TEAMS.map((team) => (
                    <Link
                        key={team.id}
                        href={`/teams/${team.id}`}
                        className={styles.teamCard}
                    >
                        <div className={styles.teamLogo}>
                            {team.logo === 'football' ? (
                                <Circle size={28} />
                            ) : (
                                <Trophy size={28} />
                            )}
                        </div>
                        <div className={styles.teamInfo}>
                            <div className={styles.teamNameRow}>
                                <span className={styles.teamName}>{team.name}</span>
                                {team.isMember && (
                                    <span className={styles.memberBadge}>Miembro</span>
                                )}
                            </div>
                            <p className={styles.teamDesc}>{team.description}</p>
                            <div className={styles.metaRow}>
                                <div className={styles.memberAvatars}>
                                    {team.members.slice(0, 3).map((member, idx) => (
                                        <img
                                            key={member.id}
                                            src={member.avatar}
                                            alt={member.name}
                                            style={{ zIndex: 3 - idx }}
                                            className={styles.memberAvatar}
                                        />
                                    ))}
                                </div>
                                <span className={styles.metaText}>
                                    {team.members.length} miembros • {team.matchesPlayed} partidos
                                </span>
                            </div>
                        </div>
                        <ChevronRight className={styles.teamIcon} />
                    </Link>
                ))}
                {MOCK_TEAMS.length === 0 && (
                    <EmptyState
                        icon={Trophy}
                        title="Sin equipos"
                        message="No hay equipos disponibles aún."
                        action={{ label: 'Crear primer equipo', onClick: () => router.push('/teams/create') }}
                    />
                )}
            </div>

            <button
                className={styles.createBtn}
                onClick={() => router.push('/teams/create')}
            >
                + Crear Equipo
            </button>
        </div>
    );
}
