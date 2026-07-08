"use client";

import { useState } from 'react';
import { Star, Trophy, X, ThumbsUp } from 'lucide-react';

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
        // Mock API call
        setStep('success');
        setTimeout(() => {
            onClose();
            setStep('mvp'); // Reset for next time
        }, 2000);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'hsl(var(--background))',
                width: '100%',
                maxWidth: '500px',
                borderRadius: 'var(--radius)',
                padding: '1.5rem',
                position: 'relative',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--muted-foreground)'
                    }}
                >
                    <X size={24} />
                </button>

                {step === 'mvp' && (
                    <>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem' }}>
                            ¡Partido Finalizado!
                        </h2>
                        <p style={{ textAlign: 'center', color: 'var(--muted-foreground)', marginBottom: '2rem' }}>
                            ¿Quién fue el Jugador del Partido (MVP)?
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                            {players.map(player => (
                                <div
                                    key={player.id}
                                    onClick={() => setSelectedMvp(player.id)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        opacity: selectedMvp && selectedMvp !== player.id ? 0.5 : 1,
                                        transform: selectedMvp === player.id ? 'scale(1.1)' : 'scale(1)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        border: selectedMvp === player.id ? '3px solid hsl(var(--primary))' : 'none',
                                        overflow: 'hidden',
                                        marginBottom: '0.5rem',
                                        position: 'relative'
                                    }}>
                                        <img src={player.avatar} alt={player.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        {selectedMvp === player.id && (
                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                backgroundColor: 'rgba(0,0,0,0.3)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Trophy size={24} color="#fbbf24" fill="#fbbf24" />
                                            </div>
                                        )}
                                    </div>
                                    <span style={{ fontSize: '0.8rem', textAlign: 'center', fontWeight: selectedMvp === player.id ? 'bold' : 'normal' }}>
                                        {player.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            disabled={!selectedMvp}
                            onClick={() => setStep('ratings')}
                        >
                            Siguiente
                        </button>
                    </>
                )}

                {step === 'ratings' && (
                    <>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                            Calificar Compañeros
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                            {players.filter(p => p.id !== selectedMvp).slice(0, 3).map(player => ( // Show only a few for demo
                                <div key={player.id} style={{ backgroundColor: 'hsl(var(--card))', padding: '1rem', borderRadius: 'var(--radius)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <img src={player.avatar} alt={player.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                        <span style={{ fontWeight: '600' }}>{player.name}</span>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Habilidad</span>
                                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <Star
                                                        key={star}
                                                        size={20}
                                                        fill={star <= (ratings[player.id]?.skill || 0) ? "hsl(var(--primary))" : "transparent"}
                                                        color={star <= (ratings[player.id]?.skill || 0) ? "hsl(var(--primary))" : "var(--muted-foreground)"}
                                                        onClick={() => handleRate(player.id, 'skill', star)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Fair Play</span>
                                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <Star
                                                        key={star}
                                                        size={20}
                                                        fill={star <= (ratings[player.id]?.fairPlay || 0) ? "hsl(var(--secondary))" : "transparent"}
                                                        color={star <= (ratings[player.id]?.fairPlay || 0) ? "hsl(var(--secondary))" : "var(--muted-foreground)"}
                                                        onClick={() => handleRate(player.id, 'fairPlay', star)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            onClick={handleSubmit}
                        >
                            Enviar Calificaciones
                        </button>
                    </>
                )}

                {step === 'success' && (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: 'hsl(var(--primary) / 0.1)',
                            color: 'hsl(var(--primary))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem auto'
                        }}>
                            <ThumbsUp size={40} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            ¡Gracias!
                        </h2>
                        <p style={{ color: 'var(--muted-foreground)' }}>
                            Tus calificaciones han sido guardadas.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
