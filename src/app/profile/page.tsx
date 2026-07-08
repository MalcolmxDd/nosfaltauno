"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_USERS, MOCK_REVIEWS, MOCK_PAST_MATCHES } from '@/data/mocks';
import { Trophy, Calendar, Users, Settings, Star, LogOut, Medal, Edit3 } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';
import TabBar from '@/components/ui/TabBar';
import EmptyState from '@/components/ui/EmptyState';
import styles from './Profile.module.css';

type Tab = 'partidos' | 'equipos' | 'amigos';

export default function ProfilePage() {
    const router = useRouter();
    const { success } = useToast();
    const user = MOCK_USERS[0];
    const [activeTab, setActiveTab] = useState<Tab>('partidos');
    const myReviews = MOCK_REVIEWS.filter(r => r.toUser.id === user.id);

    const tabs = [
        { id: 'partidos' as Tab, label: 'Partidos' },
        { id: 'equipos' as Tab, label: 'Equipos' },
        { id: 'amigos' as Tab, label: 'Amigos' },
    ];

    return (
        <div className="container">
            {/* Cover Banner */}
            <div className={styles.bannerWrap}>
                <div className={styles.bannerInner}>
                    <img
                        src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80"
                        alt=""
                        className={styles.bannerBg}
                    />
                    <div className={styles.bannerOverlay} />
                    <div className={styles.bannerPattern} />
                    <Link href="/profile/edit" className={styles.editBtn} aria-label="Editar perfil">
                        <Edit3 size={16} />
                    </Link>
                </div>
                <div className={styles.avatarWrap}>
                    <img src={user.avatar} alt={user.name} className={styles.avatar} />
                </div>
            </div>

            {/* Profile Info */}
            <div className={styles.profileInfo}>
                <h1 className={styles.profileName}>{user.name}</h1>
                <p className={styles.profileMeta}>
                    {user.position}
                    <span className="text-muted">•</span>
                    <Star size={14} className={styles.starIcon} fill="currentColor" />
                    {user.skillLevel}
                </p>
            </div>

            {/* Premium Stats */}
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

            {/* Badges / Achievements */}
            {user.badges && user.badges.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <Medal size={18} className={styles.sectionTitleIcon} />
                        Logros
                    </h2>
                    <div className={styles.badgeGrid}>
                        {user.badges.map((badge, idx) => (
                            <span key={idx} className={styles.badge}>
                                <Trophy size={14} className={styles.badgeIcon} />
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Bio */}
            {user.bio && (
                <div className={styles.bioSection}>
                    <p className={styles.bioText}>{user.bio}</p>
                </div>
            )}

            {/* Tabs */}
            <TabBar tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as Tab)} />

            {/* Tab Content */}
            {activeTab === 'partidos' && (
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Historial reciente</h3>
                    <div className="flex flex-col gap-3">
                        {MOCK_PAST_MATCHES.length > 0 ? MOCK_PAST_MATCHES.map((match) => (
                            <div key={match.id} className={styles.matchCard}>
                                <div className={styles.matchCardHeader}>
                                    <h4 className={styles.matchTitle}>{match.title}</h4>
                                    <span className={styles.matchDate}>{match.date}</span>
                                </div>
                                <p className={styles.matchMeta}>{match.location} • {match.myRole}</p>
                                <p className={styles.matchResult}>{match.result}</p>
                            </div>
                        )) : (
                            <p className="text-sm text-muted">No tienes partidos en tu historial aún.</p>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'equipos' && (
                <div className={styles.section}>
                    <EmptyState
                        icon={Users}
                        title="Sin equipos"
                        message="No estás en ningún equipo aún."
                        action={{ label: 'Explorar equipos', onClick: () => router.push('/teams') }}
                    />
                </div>
            )}

            {activeTab === 'amigos' && (
                <div className={styles.section}>
                    <div className="text-center p-8 text-muted">
                        <p>Tus amigos aparecerán aquí.</p>
                    </div>
                </div>
            )}

            {/* Reviews */}
            {myReviews.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <Star size={18} className={styles.sectionTitleIcon} />
                        Reseñas
                    </h2>
                    <div className="flex flex-col gap-3">
                        {myReviews.map((review) => (
                            <div key={review.id} className={styles.reviewCard}>
                                <div className={styles.reviewHeader}>
                                    <img src={review.fromUser.avatar} alt={review.fromUser.name} className={styles.reviewAvatar} />
                                    <div className={styles.reviewUser}>
                                        <p className={styles.reviewName}>{review.fromUser.name}</p>
                                        <div className={styles.reviewStars}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
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

            {/* Actions */}
            <div className={styles.actions}>
                <Link href="/my-matches" className="btn btn-ghost action-btn">
                    <Calendar size={18} /> Mis Partidos
                </Link>
                <Link href="/teams" className="btn btn-ghost action-btn">
                    <Users size={18} /> Equipos
                </Link>
                <Link href="/profile/edit" className="btn btn-ghost action-btn">
                    <Settings size={18} /> Editar Perfil
                </Link>
                <button
                    onClick={() => {
                        if (confirm('¿Cerrar sesión?')) {
                            success('Sesión cerrada.');
                            router.push('/');
                        }
                    }}
                    className="btn btn-ghost action-btn"
                    style={{ color: 'hsl(var(--destructive))' }}
                >
                    <LogOut size={18} /> Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
