"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllMatches } from '@/data/store';
import { X, Heart, Target, MapPin, Goal } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import styles from './Discover.module.css';

export default function DiscoverPage() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const matches = getAllMatches();

    const currentMatch = matches[currentIndex];

    const handleSwipe = (direction: 'left' | 'right') => {
        if (direction === 'right' && currentMatch) {
            router.push(`/match/${currentMatch.id}`);
        } else {
            if (currentIndex < matches.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        }
    };

    if (!currentMatch) {
        return (
            <EmptyState
                icon={Target}
                title="No hay más partidos"
                message="Has visto todos los partidos disponibles. Vuelve más tarde o crea uno nuevo."
                action={{
                    label: 'Ver Feed Completo',
                    onClick: () => router.push('/feed')
                }}
            />
        );
    }

    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.card}>
                <div className={styles.imageWrap}>
                    <img src={currentMatch.fieldInfo.image} alt={currentMatch.title} className={styles.image} />
                    <div className={styles.imageOverlay} />
                    <span className={styles.priceBadge}>{currentMatch.price}</span>
                </div>

                <div className={styles.body}>
                    <h2 className={styles.title}>{currentMatch.title}</h2>
                    <p className={styles.location}>
                        <MapPin size={14} /> {currentMatch.location} • {currentMatch.distance}
                    </p>

                    <div className={styles.grid}>
                        <div className={styles.gridItem}>
                            <p className={styles.gridLabel}>Fecha</p>
                            <p className={styles.gridValue}>{currentMatch.date}</p>
                        </div>
                        <div className={styles.gridItem}>
                            <p className={styles.gridLabel}>Nivel</p>
                            <p className={styles.gridValue}>{currentMatch.level}</p>
                        </div>
                    </div>

                    <div className={styles.hostRow}>
                        <img src={currentMatch.host.avatar} alt={currentMatch.host.name} className={styles.hostAvatar} />
                        <span className={styles.hostName}>Organizado por {currentMatch.host.name}</span>
                    </div>

                    <div className={styles.playersRow}>
                        <span className={styles.playersNeeded}>Faltan {currentMatch.playersNeeded} jugadores</span>
                        {currentMatch.needsGoalkeeper && (
                            <span className={styles.goalkeeperBadge}>
                                <Goal size={14} /> Busca arquero
                            </span>
                        )}
                    </div>
                    <div className={styles.progressWrap}>
                        <div className={styles.progressBg}>
                            <div
                                className={styles.progressBar}
                                style={{ width: `${Math.round(((currentMatch.playersTotal - currentMatch.playersNeeded) / currentMatch.playersTotal) * 100)}%` }}
                            />
                        </div>
                        <span className={styles.progressLabel}>
                            {currentMatch.playersTotal - currentMatch.playersNeeded}/{currentMatch.playersTotal}
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <button onClick={() => handleSwipe('left')} className={styles.skipBtn} aria-label="No me interesa">
                    <X size={28} color="var(--error)" />
                </button>
                <button onClick={() => handleSwipe('right')} className={styles.likeBtn} aria-label="Me interesa">
                    <Heart size={28} color="white" />
                </button>
            </div>

            <p className={styles.counter}>{currentIndex + 1} de {matches.length}</p>
        </div>
    );
}
