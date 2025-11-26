"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_MATCHES } from '@/data/mocks';
import { X, Heart, Target, Goal, MapPin } from 'lucide-react';

export default function DiscoverPage() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const matches = MOCK_MATCHES.filter(m => !m.isJoined);

    const currentMatch = matches[currentIndex];

    const handleSwipe = (direction: 'left' | 'right') => {
        if (direction === 'right' && currentMatch) {
            // Mock: "Me interesa" - redirigir al detalle
            router.push(`/match/${currentMatch.id}`);
        } else {
            // "No me interesa" - siguiente
            if (currentIndex < matches.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        }
    };

    if (!currentMatch) {
        return (
            <div className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <Target size={64} style={{ marginBottom: '1rem', color: 'var(--muted-foreground)' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    No hay más partidos
                </h2>
                <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>
                    Has visto todos los partidos disponibles. Vuelve más tarde o crea uno nuevo.
                </p>
                <button
                    onClick={() => router.push('/feed')}
                    className="btn btn-primary"
                >
                    Ver Feed Completo
                </button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '70vh', justifyContent: 'center' }}>
            <div
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    backgroundColor: 'hsl(var(--card))',
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    position: 'relative',
                }}
            >
                {/* Imagen de cancha */}
                <div
                    style={{
                        width: '100%',
                        height: '300px',
                        backgroundImage: `url(${currentMatch.fieldInfo.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            backgroundColor: 'hsl(var(--primary))',
                            color: 'white',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                        }}
                    >
                        {currentMatch.price}
                    </div>
                </div>

                {/* Info */}
                <div style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {currentMatch.title}
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={14} /> {currentMatch.location} • {currentMatch.distance}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ backgroundColor: 'hsl(var(--background))', padding: '0.75rem', borderRadius: 'var(--radius)' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Fecha</p>
                            <p style={{ fontWeight: '600', fontSize: '0.875rem' }}>{currentMatch.date}</p>
                        </div>
                        <div style={{ backgroundColor: 'hsl(var(--background))', padding: '0.75rem', borderRadius: 'var(--radius)' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Nivel</p>
                            <p style={{ fontWeight: '600', fontSize: '0.875rem' }}>{currentMatch.level}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <img
                            src={currentMatch.host.avatar}
                            alt={currentMatch.host.name}
                            style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                        />
                        <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                            Organizado por {currentMatch.host.name}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'hsl(var(--primary))' }}>
                            Faltan {currentMatch.playersNeeded} jugadores
                        </span>
                        {currentMatch.needsGoalkeeper && (
                            <span
                                style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '2rem',
                                    backgroundColor: 'hsl(var(--destructive) / 0.1)',
                                    color: 'hsl(var(--destructive))',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                }}
                            >
                                <Goal size={14} style={{ display: 'inline', marginRight: '0.25rem' }} /> Busca arquero
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Botones de acción */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', width: '100%', maxWidth: '400px' }}>
                <button
                    onClick={() => handleSwipe('left')}
                    style={{
                        flex: 1,
                        height: '3.5rem',
                        borderRadius: '50%',
                        backgroundColor: 'hsl(var(--card))',
                        border: '2px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <X size={28} color="hsl(var(--destructive))" />
                </button>
                <button
                    onClick={() => handleSwipe('right')}
                    style={{
                        flex: 1,
                        height: '3.5rem',
                        borderRadius: '50%',
                        backgroundColor: 'hsl(var(--primary))',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <Heart size={28} color="white" />
                </button>
            </div>

            <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--muted-foreground)', textAlign: 'center' }}>
                {currentIndex + 1} de {matches.length}
            </p>
        </div>
    );
}

