"use client";

import { useState } from 'react';
import { getMatchById } from '@/data/store';
import { UserCheck } from 'lucide-react';
import TabBar from '@/components/ui/TabBar';
import MatchInfo from './MatchInfo';
import MatchChat from './MatchChat';
import LineupBuilder from './LineupBuilder';
import RatePlayersModal from './RatePlayersModal';
import { useToast } from '@/contexts/ToastContext';

type Tab = 'info' | 'chat' | 'lineup';

interface MatchDetailsClientProps {
    matchId: string;
}

export default function MatchDetailsClient({ matchId }: MatchDetailsClientProps) {
    const { success } = useToast();
    const [activeTab, setActiveTab] = useState<Tab>('info');
    const [isRateModalOpen, setIsRateModalOpen] = useState(false);
    const match = getMatchById(matchId);
    const [isJoined, setIsJoined] = useState(() => {
        return match?.isJoined ?? false;
    });

    if (!match) {
        return (
            <div className="container pt-8">
                <h1 className="text-xl font-bold">Partido no encontrado</h1>
                <p className="text-sm text-muted mt-2">No pudimos encontrar el partido que estás buscando.</p>
            </div>
        );
    }

    return (
        <div className="container pb-24">
            {/* Image */}
            <div className="mb-6">
                <img
                    src={match.fieldInfo.image}
                    alt="Cancha"
                    className="w-full rounded-md"
                    style={{ height: '200px', objectFit: 'cover' }}
                />
            </div>

            {/* Tabs */}
            <TabBar
                tabs={[
                    { id: 'info', label: 'Información' },
                    { id: 'chat', label: 'Chat', count: match.confirmedPlayers.length },
                    { id: 'lineup', label: 'Alineación' },
                ]}
                activeTab={activeTab}
                onChange={(id) => setActiveTab(id as Tab)}
            />

            {/* Tab Content */}
            {activeTab === 'info' && (
                <MatchInfo
                    title={match.title}
                    location={match.location}
                    date={match.date}
                    price={match.price}
                    level={match.level}
                    host={match.host}
                    fieldInfo={match.fieldInfo}
                    confirmedPlayers={match.confirmedPlayers}
                    pendingPlayers={match.pendingPlayers}
                    playersTotal={match.playersTotal}
                    needsGoalkeeper={match.needsGoalkeeper}
                    matchId={matchId}
                />
            )}

            {activeTab === 'chat' && <MatchChat />}

            {activeTab === 'lineup' && (
                <div className="mb-8">
                    <LineupBuilder players={match.confirmedPlayers} />
                </div>
            )}

            {/* Rate Players Modal */}
            <RatePlayersModal
                isOpen={isRateModalOpen}
                onClose={() => setIsRateModalOpen(false)}
                players={match.confirmedPlayers}
            />

            {/* Action Buttons */}
            {!isJoined && (
                <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center p-4 bg-background border-t">
                    <button
                        className="btn btn-primary w-full"
                        onClick={() => {
                            setIsJoined(true);
                            success('¡Te has unido al partido!');
                        }}
                    >
                        <UserCheck size={18} style={{ marginRight: '0.5rem' }} /> Unirse al Partido
                    </button>
                </div>
            )}

            {isJoined && match.status === 'past' && (
                <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center p-4 bg-background border-t" style={{ gap: '1rem' }}>
                    <button
                        className="btn btn-primary w-full"
                        style={{ backgroundColor: 'hsl(var(--secondary))' }}
                        onClick={() => setIsRateModalOpen(true)}
                    >
                        Finalizar y Calificar
                    </button>
                </div>
            )}
        </div>
    );
}
