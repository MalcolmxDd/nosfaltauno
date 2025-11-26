"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Globe, Users, Lock } from 'lucide-react';

export default function SettingsPage() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [searchRadius, setSearchRadius] = useState(10);
    const [profileVisibility, setProfileVisibility] = useState<'public' | 'friends' | 'private'>('public');

    return (
        <div className="container">
            <header style={{ padding: '1rem 0', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Configuración</h1>
            </header>

            {/* Notifications */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Notificaciones</h2>
                <div
                    style={{
                        backgroundColor: 'hsl(var(--card))',
                        padding: '1rem',
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Notificaciones push</p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                            Recibe alertas de partidos cerca y mensajes
                        </p>
                    </div>
                    <button
                        onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                        style={{
                            width: '48px',
                            height: '28px',
                            borderRadius: '14px',
                            backgroundColor: notificationsEnabled ? 'hsl(var(--primary))' : 'var(--border)',
                            border: 'none',
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                    >
                        <div
                            style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                position: 'absolute',
                                top: '2px',
                                left: notificationsEnabled ? '22px' : '2px',
                                transition: 'left 0.2s',
                            }}
                        />
                    </button>
                </div>
            </div>

            {/* Search Settings */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Búsqueda</h2>
                <div
                    style={{
                        backgroundColor: 'hsl(var(--card))',
                        padding: '1rem',
                        borderRadius: 'var(--radius)',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <p style={{ fontWeight: '600' }}>Radio de búsqueda</p>
                        <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{searchRadius} km</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={searchRadius}
                        onChange={(e) => setSearchRadius(Number(e.target.value))}
                        style={{ width: '100%' }}
                    />
                </div>
            </div>

            {/* Privacy */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Privacidad</h2>
                <div
                    style={{
                        backgroundColor: 'hsl(var(--card))',
                        padding: '1rem',
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                    }}
                >
                    {(['public', 'friends', 'private'] as const).map((visibility) => (
                        <button
                            key={visibility}
                            onClick={() => setProfileVisibility(visibility)}
                            style={{
                                padding: '0.75rem',
                                borderRadius: 'var(--radius)',
                                border: `2px solid ${profileVisibility === visibility ? 'hsl(var(--primary))' : 'transparent'}`,
                                backgroundColor: profileVisibility === visibility ? 'hsl(var(--primary) / 0.1)' : 'transparent',
                                color: profileVisibility === visibility ? 'hsl(var(--primary))' : 'var(--foreground)',
                                fontWeight: profileVisibility === visibility ? '600' : '400',
                                cursor: 'pointer',
                                textAlign: 'left',
                            }}
                        >
                            {visibility === 'public' && (
                                <>
                                    <Globe size={18} style={{ marginRight: '0.5rem' }} /> Público - Todos pueden ver tu perfil
                                </>
                            )}
                            {visibility === 'friends' && (
                                <>
                                    <Users size={18} style={{ marginRight: '0.5rem' }} /> Solo amigos - Solo tus amigos pueden ver tu perfil
                                </>
                            )}
                            {visibility === 'private' && (
                                <>
                                    <Lock size={18} style={{ marginRight: '0.5rem' }} /> Privado - Solo tú puedes ver tu perfil
                                </>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Account Actions */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Cuenta</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Link
                        href="/profile"
                        className="btn btn-ghost"
                        style={{ justifyContent: 'flex-start', border: '1px solid var(--border)' }}
                    >
                        Editar Perfil
                    </Link>
                    <button
                        className="btn btn-ghost"
                        style={{ justifyContent: 'flex-start', border: '1px solid var(--border)', color: 'hsl(var(--destructive))' }}
                        onClick={() => {
                            if (confirm('¿Estás seguro de que quieres eliminar tu cuenta?')) {
                                alert('Función de eliminar cuenta (mock)');
                            }
                        }}
                    >
                        Eliminar Cuenta
                    </button>
                </div>
            </div>

            {/* App Info */}
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                <p>Nos Falta Uno v1.0.0</p>
                <p style={{ marginTop: '0.5rem' }}>© 2024</p>
            </div>
        </div>
    );
}

