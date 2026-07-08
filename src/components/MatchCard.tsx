"use client";

import { MapPin, Calendar, Goal } from "lucide-react";

export default function MatchCard({ match }: { match: { id: string; title: string; location: string; date: string; price: string; playersNeeded: number; playersTotal: number; level: string; distance: string; host: { name: string; avatar: string }; confirmedPlayers?: { id: string; avatar: string; name: string }[]; fieldInfo?: { image: string; name: string }; needsGoalkeeper?: boolean } }) {
    const fillPercent = match.playersTotal > 0
        ? Math.round(((match.playersTotal - match.playersNeeded) / match.playersTotal) * 100)
        : 0;

    return (
        <a
            href={`/match/${match.id}`}
            style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
        >
            <article
                style={{
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-card)',
                    background: 'var(--bg-card)',
                    transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-accent)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 26, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-card)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'none';
                }}
            >
                {/* Image Header */}
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img
                        src={match.fieldInfo?.image || 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80'}
                        alt={match.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                    />
                    {/* Gradient overlay */}
                    <div
                        style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(180deg, transparent 30%, hsl(222 47% 11% / 0.85) 100%)',
                        }}
                    />

                    {/* Price ribbon */}
                    <span
                        style={{
                            position: 'absolute', top: '12px', right: '0',
                            fontSize: 'var(--text-xs)', fontWeight: 700,
                            padding: '6px 16px 6px 16px',
                            borderRadius: '9999px 0 0 9999px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            color: '#fff',
                            ...(match.price === 'Gratis'
                                ? { background: 'var(--grad-cta)' }
                                : { background: 'var(--grad-gold)' }),
                        }}
                    >
                        {match.price}
                    </span>

                    {/* Field name chip */}
                    {match.fieldInfo?.name && (
                        <span
                            style={{
                                position: 'absolute', top: '12px', left: '12px',
                                fontSize: 'var(--text-xs)', fontWeight: 500,
                                padding: '4px 12px',
                                borderRadius: '9999px',
                                background: 'rgba(255, 255, 255, 0.15)',
                                color: '#fff',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(4px)',
                            }}
                        >
                            {match.fieldInfo.name}
                        </span>
                    )}

                    {/* Overlaid title + location */}
                    <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px' }}>
                        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: '#fff', marginBottom: '4px', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                            {match.title}
                        </h3>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'hsl(0 0% 100% / 0.8)', display: 'flex', alignItems: 'center', gap: '6px', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                            <MapPin size={14} />
                            <span>{match.location}</span>
                            <span style={{ color: 'hsl(0 0% 100% / 0.4)' }}>•</span>
                            <span>{match.distance}</span>
                        </p>
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: '16px' }}>
                    {/* Date & Level */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px',                            background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '10px 10px' }}>
                            <Calendar size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                            <div>
                                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Fecha</span>
                                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, lineHeight: 1.3, margin: 0 }}>{match.date}</p>
                            </div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px',                            background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '10px 10px' }}>
                            <Goal size={16} style={{ color: 'var(--magenta)', flexShrink: 0 }} />
                            <div>
                                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Nivel</span>
                                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, lineHeight: 1.3, margin: 0 }}>{match.level}</p>
                            </div>
                        </div>
                    </div>

                    {/* Players progress bar */}
                    <div style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Jugadores</span>
                            <span style={{
                                fontSize: 'var(--text-xs)', fontWeight: 600,
                                color: fillPercent >= 80 ? 'var(--accent)' : (fillPercent >= 50 ? 'var(--gold)' : 'var(--error)')
                            }}>
                                {match.playersTotal - match.playersNeeded}/{match.playersTotal}
                            </span>
                        </div>
                        <div style={{ height: '6px', borderRadius: '3px', background: 'var(--bg-elevated)', overflow: 'hidden' }}>
                            <div
                                style={{
                                    height: '100%', borderRadius: '3px',
                                    width: `${fillPercent}%`,
                                    background: 'linear-gradient(90deg, var(--accent), #FF8C42)',
                                    transition: 'width 0.5s',
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--accent)' }}>
                                Faltan {match.playersNeeded}
                            </span>
                            {match.needsGoalkeeper && (
                                <span
                                    style={{
                                        fontSize: '10px', fontWeight: 600,
                                        padding: '2px 8px', borderRadius: '9999px',
                                        background: 'rgba(255, 107, 26, 0.15)',
                                        color: 'var(--accent)',
                                        border: '1px solid var(--border-accent)',
                                    }}
                                >
                                    Busca arquero
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Host + confirmed players */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px', borderTop: '1px solid var(--border-subtle)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img
                                src={match.host.avatar}
                                alt={match.host.name}
                                style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{match.host.name}</span>
                        </div>
                        {match.confirmedPlayers && match.confirmedPlayers.length > 0 && (
                            <div style={{ display: 'flex' }}>
                                {match.confirmedPlayers.slice(0, 4).map((p, i) => (
                                    <img
                                        key={p.id}
                                        src={p.avatar}
                                        alt={p.name}
                                        style={{
                                            width: '24px', height: '24px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '2px solid var(--bg-card)',
                                            marginLeft: i > 0 ? '-8px' : '0',
                                            position: 'relative',
                                            zIndex: 4 - i,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </a>
    );
}
