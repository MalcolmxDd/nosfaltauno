"use client";

import Link from 'next/link';
import { useState } from 'react';
import { MOCK_USERS, MOCK_REVIEWS } from '@/data/mocks';
import { Trophy, Star } from 'lucide-react';

interface UserProfileClientProps {
    userId: string;
}

export default function UserProfileClient({ userId }: UserProfileClientProps) {
    const user = MOCK_USERS.find(u => u.id === userId) || MOCK_USERS[0];
    const currentUser = MOCK_USERS[0]; // Mock logged in user
    const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);
    const userReviews = MOCK_REVIEWS.filter(r => r.toUser.id === user.id);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
                <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginBottom: '1rem',
                    border: '4px solid hsl(var(--primary))'
                }}>
                    <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{user.name}</h1>
                <p style={{ color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
                    {user.position} • <Star size={14} fill="currentColor" /> {user.skillLevel}
                </p>
            </div>

            {/* Follow button */}
            {user.id !== currentUser.id && (
                <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={handleFollow}
                        className={isFollowing ? 'btn btn-ghost' : 'btn btn-primary'}
                        style={{ flex: 1 }}
                    >
                        {isFollowing ? 'Siguiendo' : 'Seguir'}
                    </button>
                    <Link href={`/messages/${user.id}`} className="btn btn-ghost" style={{ flex: 1 }}>
                        Mensaje
                    </Link>
                </div>
            )}

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ backgroundColor: 'hsl(var(--card))', padding: '1rem', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'hsl(var(--primary))' }}>{user.matchesPlayed}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Partidos</p>
                </div>
                <div style={{ backgroundColor: 'hsl(var(--card))', padding: '1rem', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'hsl(var(--secondary))' }}>{user.followersCount}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Seguidores</p>
                </div>
                <div style={{ backgroundColor: 'hsl(var(--card))', padding: '1rem', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'hsl(var(--accent))' }}>{user.attendanceRate}%</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Asistencia</p>
                </div>
            </div>

            {/* Badges */}
            {user.badges && user.badges.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Logros</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {user.badges.map((badge, idx) => (
                            <span
                                key={idx}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '2rem',
                                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                                    color: 'hsl(var(--primary))',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                }}
                            >
                                <Trophy size={14} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }} /> {badge}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Bio */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Sobre mí</h2>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: '1.6' }}>
                    {user.bio}
                </p>
            </div>

            {/* Preferences */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Preferencias</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Zonas</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {user.preferredZones.map((zone, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '2rem',
                                        backgroundColor: 'hsl(var(--card))',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {zone}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Horarios</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {user.preferredTimes.map((time, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '2rem',
                                        backgroundColor: 'hsl(var(--card))',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {time}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            {userReviews.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Reseñas ({userReviews.length})</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {userReviews.map((review) => (
                            <div
                                key={review.id}
                                style={{
                                    backgroundColor: 'hsl(var(--card))',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius)',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <img
                                        src={review.fromUser.avatar}
                                        alt={review.fromUser.name}
                                        style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: '600', fontSize: '0.875rem' }}>{review.fromUser.name}</p>
                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill={i < review.rating ? 'hsl(var(--primary))' : 'transparent'} color={i < review.rating ? 'hsl(var(--primary))' : 'var(--muted-foreground)'} />
                                            ))}
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{review.date}</span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

