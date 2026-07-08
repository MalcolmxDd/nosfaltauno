"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MOCK_PAST_MATCHES } from '@/data/mocks';
import { getAllMatches } from '@/data/store';
import { useState } from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';
import TabBar from '@/components/ui/TabBar';
import EmptyState from '@/components/ui/EmptyState';
import styles from './MyMatches.module.css';

type Tab = 'upcoming' | 'past';

export default function MyMatchesPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>('upcoming');
    const upcomingMatches = getAllMatches().filter((m: any) => m.isJoined);
    const pastMatches = MOCK_PAST_MATCHES;

    return (
        <div className={`container ${styles.page}`}>
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>Mis Partidos</h1>
            </header>

            <TabBar
                tabs={[
                    { id: 'upcoming', label: 'Próximos', count: upcomingMatches.length },
                    { id: 'past', label: 'Historial', count: pastMatches.length },
                ]}
                activeTab={activeTab}
                onChange={(id) => setActiveTab(id as Tab)}
            />

            {activeTab === 'upcoming' && (
                <div className={styles.list}>
                    {upcomingMatches.length === 0 ? (
                        <EmptyState
                            icon={Calendar}
                            title="No tienes partidos próximos"
                            message="Explora partidos disponibles y únete a uno."
                            action={{ label: 'Explorar partidos', onClick: () => router.push('/feed') }}
                        />
                    ) : (
                        upcomingMatches.map((match) => {
                            const pct = (match.confirmedPlayers.length / match.playersTotal) * 100;
                            const barClass = pct >= 80 ? styles.barFillGreen : pct >= 50 ? styles.barFillGold : styles.barFillRed;
                            return (
                                <Link key={match.id} href={`/match/${match.id}`} className={styles.card}>
                                    <div className={styles.cardTop}>
                                        <h3 className={styles.cardTitle}>{match.title}</h3>
                                        <span className={`${styles.badge} ${styles.badgeUpcoming}`}>Confirmado</span>
                                    </div>
                                    <div className={styles.cardMeta}>
                                        <span className={styles.cardMetaIcon}>
                                            <MapPin size={13} /> {match.location}
                                        </span>
                                        <span className={styles.cardMetaIcon}>
                                            <Calendar size={13} /> {match.date}
                                        </span>
                                    </div>
                                    <div className={styles.cardFooter}>
                                        <div className={styles.playersBar}>
                                            <Users size={14} />
                                            <div className={styles.barTrack}>
                                                <div className={`${styles.barFill} ${barClass}`} style={{ width: `${pct}%` }} />
                                            </div>
                                            <span className={styles.playersText}>
                                                {match.confirmedPlayers.length}/{match.playersTotal}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            )}

            {activeTab === 'past' && (
                <div className={styles.list}>
                    {pastMatches.length === 0 ? (
                        <EmptyState
                            icon={Calendar}
                            title="No tienes historial aún"
                            message="Tus partidos pasados aparecerán aquí."
                        />
                    ) : (
                        pastMatches.map((match) => (
                            <div key={match.id} className={styles.card}>
                                <div className={styles.cardTop}>
                                    <h3 className={styles.cardTitle}>{match.title}</h3>
                                    <span className={`${styles.badge} ${styles.badgePast}`}>{match.date}</span>
                                </div>
                                <div className={styles.cardMeta}>
                                    <span className={styles.cardMetaIcon}>
                                        <MapPin size={13} /> {match.location}
                                    </span>
                                    <span className={styles.cardMetaIcon}>
                                        • {match.myRole}
                                    </span>
                                </div>
                                <div className={styles.cardFooter}>
                                    <span className={styles.result}>{match.result}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
