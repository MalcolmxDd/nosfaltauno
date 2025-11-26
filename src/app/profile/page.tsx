"use client";

import Link from 'next/link';
import { useState } from 'react';
import { MOCK_USERS, MOCK_REVIEWS, MOCK_PAST_MATCHES } from '@/data/mocks';
import { Trophy, Calendar, Users, Settings, Star } from 'lucide-react';

type Tab = 'partidos' | 'equipos' | 'amigos';

export default function ProfilePage() {
    const user = MOCK_USERS[0]; // Mock logged in user
    const [activeTab, setActiveTab] = useState<Tab>('partidos');
    const myReviews = MOCK_REVIEWS.filter(r => r.toUser.id === user.id);

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

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ backgroundColor: 'hsl(var(--card))', padding: '1rem', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'hsl(var(--primary))' }}>{user.matchesPlayed}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Partidos</p>
                </div>
                <div style={{ backgroundColor: 'hsl(var(--card))', padding: '1rem', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'hsl(var(--secondary))' }}>{user.matchesHosted}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Organizados</p>
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

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                {(['partidos', 'equipos', 'amigos'] as Tab[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '0.75rem 1rem',
                            border: 'none',
                            borderBottom: `2px solid ${activeTab === tab ? 'hsl(var(--primary))' : 'transparent'}`,
                            backgroundColor: 'transparent',
                            color: activeTab === tab ? 'hsl(var(--primary))' : 'var(--muted-foreground)',
                            fontWeight: activeTab === tab ? '600' : '400',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'partidos' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Historial reciente</h3>
                    {MOCK_PAST_MATCHES.map((match) => (
                        <div
                            key={match.id}
                            style={{
                                backgroundColor: 'hsl(var(--card))',
                                padding: '1rem',
                                borderRadius: 'var(--radius)',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h4 style={{ fontWeight: '600' }}>{match.title}</h4>
                                <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{match.date}</span>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>
                                {match.location} • {match.myRole}
                            </p>
                            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'hsl(var(--primary))' }}>
                                {match.result}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'equipos' && (
                <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--muted-foreground)' }}>
                    <p>No estás en ningún equipo aún.</p>
                    <Link href="/teams" style={{ color: 'hsl(var(--primary))', marginTop: '0.5rem', display: 'inline-block' }}>
                        Explorar equipos
                    </Link>
                </div>
            )}

            {activeTab === 'amigos' && (
                <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--muted-foreground)' }}>
                    <p>Tus amigos aparecerán aquí.</p>
                </div>
            )}

            {/* Reviews */}
            {myReviews.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Reseñas</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {myReviews.map((review) => (
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

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                <Link href="/my-matches" className="btn btn-ghost" style={{ justifyContent: 'flex-start', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={18} /> Mis Partidos
                </Link>
                <Link href="/teams" className="btn btn-ghost" style={{ justifyContent: 'flex-start', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={18} /> Equipos
                </Link>
                <Link href="/settings" className="btn btn-ghost" style={{ justifyContent: 'flex-start', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Settings size={18} /> Configuración
                </Link>
                <Link href="/" className="btn btn-ghost" style={{ justifyContent: 'flex-start', color: 'hsl(var(--destructive))', border: '1px solid var(--border)' }}>
                    Cerrar Sesión
                </Link>
            </div>
        </div>
    );
}
