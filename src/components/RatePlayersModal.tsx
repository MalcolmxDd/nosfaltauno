"use client";

import { useState } from 'react';
import { Star, Trophy, X, ThumbsUp } from 'lucide-react';
import styles from './RatePlayersModal.module.css';

interface Player {
    id: string;
    name: string;
    avatar: string;
}

interface RatePlayersModalProps {
    isOpen: boolean;
    onClose: () => void;
    players: Player[];
}

export default function RatePlayersModal({ isOpen, onClose, players }: RatePlayersModalProps) {
    const [step, setStep] = useState<'mvp' | 'ratings' | 'success'>('mvp');
    const [selectedMvp, setSelectedMvp] = useState<string | null>(null);
    const [ratings, setRatings] = useState<Record<string, { skill: number; fairPlay: number }>>({});

    if (!isOpen) return null;

    const handleRate = (playerId: string, type: 'skill' | 'fairPlay', value: number) => {
        setRatings(prev => ({
            ...prev,
            [playerId]: {
                ...prev[playerId],
                [type]: value
            }
        }));
    };

    const handleSubmit = () => {
        setStep('success');
        setTimeout(() => {
            onClose();
            setStep('mvp');
        }, 2000);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button onClick={onClose} className={styles.closeBtn} aria-label="Cerrar">
                    <X size={18} />
                </button>

                {step === 'mvp' && (
                    <>
                        <h2 className={styles.mvpTitle}>¡Partido Finalizado!</h2>
                        <p className={styles.mvpSub}>¿Quién fue el Jugador del Partido (MVP)?</p>

                        <div className={styles.mvpGrid}>
                            {players.map(player => (
                                <div
                                    key={player.id}
                                    onClick={() => setSelectedMvp(player.id)}
                                    className={`${styles.mvpCard} ${
                                        selectedMvp && selectedMvp !== player.id ? styles.mvpCardDimmed : ''
                                    } ${selectedMvp === player.id ? styles.mvpCardSelected : ''}`}
                                >
                                    <div className={styles.mvpAvatarWrap}>
                                        <img src={player.avatar} alt={player.name} />
                                        {selectedMvp === player.id && (
                                            <div className={styles.mvpCrown}>
                                                <Trophy size={24} color="#fbbf24" fill="#fbbf24" />
                                            </div>
                                        )}
                                    </div>
                                    <span className={styles.mvpName}>{player.name}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            className={styles.nextBtn}
                            disabled={!selectedMvp}
                            onClick={() => setStep('ratings')}
                        >
                            Siguiente
                        </button>
                    </>
                )}

                {step === 'ratings' && (
                    <>
                        <h2 className={styles.ratingsTitle}>Calificar Compañeros</h2>

                        <div className={styles.ratingsList}>
                            {players.filter(p => p.id !== selectedMvp).slice(0, 3).map(player => (
                                <div key={player.id} className={styles.ratingCard}>
                                    <div className={styles.ratingPlayer}>
                                        <img src={player.avatar} alt={player.name} className={styles.ratingAvatar} />
                                        <span className={styles.ratingName}>{player.name}</span>
                                    </div>

                                    <div>
                                        <div className={styles.ratingRow}>
                                            <span className={styles.ratingLabel}>Habilidad</span>
                                            <div className={styles.stars}>
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <button
                                                        key={star}
                                                        onClick={() => handleRate(player.id, 'skill', star)}
                                                        className={`${styles.starBtn} ${
                                                            star <= (ratings[player.id]?.skill || 0) ? styles.starActive : ''
                                                        }`}
                                                        aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
                                                    >
                                                        <Star
                                                            size={20}
                                                            fill={star <= (ratings[player.id]?.skill || 0) ? "var(--accent)" : "transparent"}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.ratingRow}>
                                            <span className={styles.ratingLabel}>Fair Play</span>
                                            <div className={styles.stars}>
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <button
                                                        key={star}
                                                        onClick={() => handleRate(player.id, 'fairPlay', star)}
                                                        className={`${styles.starBtn} ${
                                                            star <= (ratings[player.id]?.fairPlay || 0) ? styles.starMagenta : ''
                                                        }`}
                                                        aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
                                                    >
                                                        <Star
                                                            size={20}
                                                            fill={star <= (ratings[player.id]?.fairPlay || 0) ? "var(--magenta)" : "transparent"}
                                                            color={star <= (ratings[player.id]?.fairPlay || 0) ? "var(--magenta)" : undefined}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className={styles.submitBtn} onClick={handleSubmit}>
                            Enviar Calificaciones
                        </button>
                    </>
                )}

                {step === 'success' && (
                    <div className={styles.successWrap}>
                        <div className={styles.successIcon}>
                            <ThumbsUp size={40} />
                        </div>
                        <h2 className={styles.successTitle}>¡Gracias!</h2>
                        <p className={styles.successSub}>
                            Tus calificaciones han sido guardadas.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
