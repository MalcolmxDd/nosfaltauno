"use client";

import Link from 'next/link';
import { useState } from 'react';
import { MOCK_USERS, MOCK_REVIEWS } from '@/data/mocks';
import { Star, MessageCircle } from 'lucide-react';
import styles from './UserProfile.module.css';

interface UserProfileClientProps { userId: string; }

export default function UserProfileClient({ userId }: UserProfileClientProps) {
    const [isFollowing, setIsFollowing] = useState(false);
    const user = MOCK_USERS.find(u => u.id === userId) || MOCK_USERS[0];
    const userReviews = MOCK_REVIEWS.filter(r => r.toUser.id === userId);

    return (
        <div className={`container ${styles.page}`}>
            {/* Cover Banner */}
            <div className={styles.bannerWrap}>
                <div className={styles.bannerInner}>
                    <img
                        src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80"
                        alt=""
                        className={styles.bannerBg}
                    />
                    <div className={styles.bannerOverlay} />
                </div>
                <div className={styles.avatarWrap}>
                    <img src={user.avatar} alt={user.name} className={styles.avatar} />
                </div>
            </div>

            {/* Info */}
            <div className={styles.profileInfo}>
                <h1 className={styles.profileName}>{user.name}</h1>
                <p className={styles.profileMeta}>
                    {user.position}
                    <span className="text-muted">•</span>
                    <Star size={14} className={styles.starIcon} fill="currentColor" />
                    {user.skillLevel}
                </p>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
                <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`${styles.followBtn} ${isFollowing ? styles.followBtnGhost : styles.followBtnPrimary}`}
                >
                    {isFollowing ? 'Siguiendo' : 'Seguir'}
                </button>
                <Link href={`/messages/${userId}`} className={styles.messageBtn}>
                    <MessageCircle size={16} /> Mensaje
                </Link>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>{user.matchesPlayed}</div>
                    <div className={styles.statLabel}>Partidos</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>{user.matchesHosted}</div>
                    <div className={styles.statLabel}>Organizados</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>{user.attendanceRate}%</div>
                    <div className={styles.statLabel}>Asistencia</div>
                </div>
            </div>

            {/* Badges */}
            {user.badges && user.badges.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Logros</h2>
                    <div className={styles.badgeGrid}>
                        {user.badges.map((badge, idx) => (
                            <span key={idx} className={styles.badge}>{badge}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Bio */}
            {user.bio && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Sobre mí</h2>
                    <div className={styles.bioCard}>
                        <p className={styles.bioText}>{user.bio}</p>
                    </div>
                </div>
            )}

            {/* Preferences */}
            <div className={styles.prefSection}>
                <h2 className={styles.sectionTitle}>Preferencias</h2>
                {user.preferredZones && user.preferredZones.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                        <p className={styles.prefLabel}>Zonas</p>
                        <div className={styles.pillGroup}>
                            {user.preferredZones.map((zone: string) => (
                                <span key={zone} className={styles.pill}>{zone}</span>
                            ))}
                        </div>
                    </div>
                )}
                {user.preferredTimes && user.preferredTimes.length > 0 && (
                    <div>
                        <p className={styles.prefLabel}>Horarios</p>
                        <div className={styles.pillGroup}>
                            {user.preferredTimes.map((time: string) => (
                                <span key={time} className={styles.pill}>{time}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Reviews */}
            {userReviews.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Reseñas ({userReviews.length})</h2>
                    <div>
                        {userReviews.map((review) => (
                            <div key={review.id} className={styles.reviewCard}>
                                <div className={styles.reviewHeader}>
                                    <img src={review.fromUser.avatar} alt={review.fromUser.name} className={styles.reviewAvatar} />
                                    <div className={styles.reviewUser}>
                                        <p className={styles.reviewName}>{review.fromUser.name}</p>
                                        <div className={styles.reviewStars}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14}
                                                    fill={i < review.rating ? 'hsl(var(--gold))' : 'transparent'}
                                                    color={i < review.rating ? 'hsl(var(--gold))' : 'hsl(var(--muted-foreground))'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <span className={styles.reviewDate}>{review.date}</span>
                                </div>
                                <p className={styles.reviewComment}>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
