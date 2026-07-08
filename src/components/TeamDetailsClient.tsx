"use client";

import Link from 'next/link';
import { useState } from 'react';
import { MOCK_TEAMS } from '@/data/mocks';
import { getAllMatches } from '@/data/store';
import StatsGrid from '@/components/ui/StatsGrid';
import PlayerListItem from '@/components/ui/PlayerListItem';

interface TeamDetailsClientProps {
    teamId: string;
}

export default function TeamDetailsClient({ teamId }: TeamDetailsClientProps) {
    const [isMember, setIsMember] = useState(false);
    const team = MOCK_TEAMS.find(t => t.id === teamId);

    if (!team) {
        return (
            <div className="container pt-4">
                <Link href="/teams" style={{ color: 'hsl(var(--primary))', fontSize: '0.875rem', display: 'block', marginBottom: '1rem' }}>
                    ⬅ Volver
                </Link>
                <h1 className="text-xl font-bold">Equipo no encontrado</h1>
                <p className="text-sm text-muted mt-2">No pudimos encontrar el equipo que estás buscando.</p>
            </div>
        );
    }

    const teamMatches = getAllMatches().filter((m: any) => m.id === teamId || m.title.toLowerCase().includes(team.name.toLowerCase()));

    return (
        <div className="container">
            <div className="pt-4 mb-4">
                <Link href="/teams" style={{ color: 'hsl(var(--primary))', fontSize: '0.875rem', display: 'block', marginBottom: '1rem' }}>
                    ⬅ Volver
                </Link>
                <h1 className="text-2xl font-bold mb-1">{team.name}</h1>
                <p className="text-sm text-muted">{team.description}</p>
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={() => setIsMember(!isMember)}
                        className={`btn ${isMember ? 'btn-ghost' : 'btn-primary'}`}
                        style={{ minWidth: '120px' }}
                    >
                        {isMember ? 'Dejar el Equipo' : 'Unirse al Equipo'}
                    </button>
                </div>
            </div>

            {/* Stats */}
            <StatsGrid
                columns={2}
                stats={[
                    { label: 'Miembros', value: team.members.length },
                    { label: 'Partidos', value: teamMatches.length },
                ]}
            />

            {/* Members */}
            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Miembros ({team.members.length})</h2>
                <div className="flex flex-col gap-2">
                    {team.members.map((member) => (
                        <PlayerListItem
                            key={member.id}
                            player={member}
                            href={`/user/${member.id}`}
                        />
                    ))}
                </div>
            </div>

            {/* Recent Matches */}
            {teamMatches.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4">Partidos Recientes</h2>
                    <div className="flex flex-col gap-3">
                        {teamMatches.map((match) => (
                            <Link
                                key={match.id}
                                href={`/match/${match.id}`}
                                className="bg-card rounded-md p-4 block"
                            >
                                <h3 className="font-semibold mb-1">{match.title}</h3>
                                <p className="text-sm text-muted">{match.location} • {match.date}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
