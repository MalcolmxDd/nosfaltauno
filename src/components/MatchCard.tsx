import Link from 'next/link';
import { MapPin, Calendar, Goal, UserRound } from "lucide-react";

interface MatchProps {
    id: string;
    title: string;
    location: string;
    date: string;
    price: string;
    playersNeeded: number;
    playersTotal: number;
    level: string;
    distance: string;
    host: {
        name: string;
        avatar: string;
    };
}

export default function MatchCard({ match }: { match: MatchProps }) {
    return (
        <div
            className="animate-fade-in"
            style={{
                backgroundColor: 'hsl(var(--card))',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                marginBottom: '1rem',
                border: '1px solid var(--border)',
                boxShadow:
                    '0 4px 10px rgba(0, 0, 0, 0.08)',
            }}
        >
            <div style={{ padding: '1rem' }}>
                
                {/* Título + Ubicación */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.75rem',
                    }}
                >
                    <div>
                        <h3
                            style={{
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                lineHeight: 1.3,
                                marginBottom: '0.35rem',
                                color: 'hsl(var(--foreground))',
                            }}
                        >
                            {match.title}
                        </h3>

                        <p
                            style={{
                                fontSize: '0.85rem',
                                color: 'var(--muted-foreground)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                            }}
                        >
                            <MapPin size={16} strokeWidth={2} />
                            <span>{match.location}</span>
                            <span style={{ opacity: 0.7 }}>•</span>
                            <span>{match.distance}</span>
                        </p>
                    </div>

                    <span
                        style={{
                            backgroundColor: 'hsl(var(--secondary))',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '0.25rem 0.55rem',
                            borderRadius: '0.75rem',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {match.price}
                    </span>
                </div>

                {/* Fecha + Nivel */}
                <div
                    style={{
                        display: 'flex',
                        gap: '0.6rem',
                        marginBottom: '1.1rem',
                    }}
                >
                    {/* Fecha */}
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.55rem 0.6rem',
                            backgroundColor: 'hsl(var(--background))',
                            borderRadius: '0.5rem',
                        }}
                    >
                        <Calendar size={18} strokeWidth={2} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span
                                style={{
                                    fontSize: '0.70rem',
                                    opacity: 0.7,
                                }}
                            >
                                Fecha
                            </span>
                            <span
                                style={{
                                    fontSize: '0.88rem',
                                    fontWeight: 500,
                                }}
                            >
                                {match.date}
                            </span>
                        </div>
                    </div>

                    {/* Nivel */}
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.55rem 0.6rem',
                            backgroundColor: 'hsl(var(--background))',
                            borderRadius: '0.5rem',
                        }}
                    >
                        <Goal size={18} strokeWidth={2} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span
                                style={{
                                    fontSize: '0.70rem',
                                    opacity: 0.7,
                                }}
                            >
                                Nivel
                            </span>
                            <span
                                style={{
                                    fontSize: '0.88rem',
                                    fontWeight: 500,
                                }}
                            >
                                {match.level}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Host + Cupos */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '0.5rem',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.55rem',
                        }}
                    >
                        {match.host.avatar ? (
                            <img
                                src={match.host.avatar}
                                alt={match.host.name}
                                style={{
                                    width: '26px',
                                    height: '26px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                }}
                            />
                        ) : (
                            <UserRound size={22} opacity={0.8} />
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span
                                style={{
                                    fontSize: '0.70rem',
                                    opacity: 0.65,
                                }}
                            >
                                Organizado por
                            </span>
                            <span
                                style={{
                                    fontSize: '0.80rem',
                                    fontWeight: 500,
                                }}
                            >
                                {match.host.name}
                            </span>
                        </div>
                    </div>

                    <div
                        style={{
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            color: 'hsl(var(--primary))',
                        }}
                    >
                        Faltan {match.playersNeeded}
                    </div>
                </div>
            </div>

            {/* Botón */}
            <Link
                href={`/match/${match.id}`}
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.85rem',
                    textAlign: 'center',
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    transition: 'opacity 0.2s',
                }}
            >
                Ver detalles
            </Link>
        </div>
    );
}
