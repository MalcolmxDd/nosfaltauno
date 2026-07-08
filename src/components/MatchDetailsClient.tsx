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
            {/* Image — hero banner con overlay */}
            <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-card)',
                overflow: 'hidden',
                marginBottom: '1.5rem',
                boxShadow: 'var(--shadow-elevated)'
            }}>
                <img
                    src={match.fieldInfo.image}
                    alt="Cancha"
                    style={{
                        width: '100%',
                        height: '220px',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60%',
                    background: 'linear-gradient(transparent, rgba(10,10,15,0.85))',
                    pointerEvents: 'none'
                }} />
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

            {/* Action Buttons — glassmorphic bottom bar */}
            {!isJoined && (
                <div style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    background: 'rgba(10,10,15,0.8)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    zIndex: 40
                }}>
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
                <div style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    gap: '1rem',
                    background: 'rgba(10,10,15,0.8)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    zIndex: 40
                }}>
                    <button
                        className="btn btn-primary w-full"
                        style={{ backgroundColor: 'var(--magenta)' }}
                        onClick={() => setIsRateModalOpen(true)}
                    >
                        Finalizar y Calificar
                    </button>
                </div>
            )}
        </div>
    );
}
