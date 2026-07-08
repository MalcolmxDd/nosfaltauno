import Link from 'next/link';
import { Building2, Droplet, Car, Goal, Check, Clock } from 'lucide-react';
import PlayerListItem from '@/components/ui/PlayerListItem';
import styles from './MatchDetail.module.css';

interface MatchPlayer { id: string; name: string; avatar: string; position: string; }
interface FieldInfo { name: string; type: string; hasChangingRooms: boolean; hasParking: boolean; image: string; }
interface MatchInfoProps {
    title: string; location: string; date: string; price: string; level: string;
    host: { id: string; name: string; avatar: string }; fieldInfo: FieldInfo;
    confirmedPlayers: MatchPlayer[]; pendingPlayers: MatchPlayer[];
    playersTotal: number; needsGoalkeeper: boolean; matchId: string;
}

export default function MatchInfo({
    title, location, date, price, level, host, fieldInfo,
    confirmedPlayers, pendingPlayers, playersTotal, needsGoalkeeper, matchId,
}: MatchInfoProps) {
    return (
        <div>
            <h2 className={styles.infoTitle}>{title}</h2>
            <div className={styles.hostRow}>
                <img src={host.avatar} alt={host.name} className={styles.hostAvatar} />
                <span className={styles.hostText}>
                    Organizado por <Link href={`/user/${host.id}`} className={styles.hostLink}>{host.name}</Link>
                </span>
            </div>

            <div className={styles.statsGrid}>
                {[
                    { label: 'Fecha', value: date },
                    { label: 'Precio', value: price },
                    { label: 'Ubicación', value: location },
                    { label: 'Nivel', value: level },
                ].map((s) => (
                    <div key={s.label} className={styles.statCard}>
                        <p className={styles.statLabel}>{s.label}</p>
                        <p className={styles.statValue}>{s.value}</p>
                    </div>
                ))}
            </div>

            <div className={styles.fieldCard}>
                <span className={styles.fieldName}>
                    <Link href={`/venue/${matchId}`}>{fieldInfo.name}</Link>
                </span>
                <div className={styles.fieldChips}>
                    <span className={styles.fieldChip}><Building2 size={14} /> {fieldInfo.type}</span>
                    {fieldInfo.hasChangingRooms && <span className={styles.fieldChip}><Droplet size={14} /> Camarines</span>}
                    {fieldInfo.hasParking && <span className={styles.fieldChip}><Car size={14} /> Estacionamiento</span>}
                </div>
            </div>

            <div className={styles.playerSection}>
                <div className={styles.playerHeader}>
                    <h3 className={styles.sectionTitle}>
                        Jugadores ({confirmedPlayers.length + pendingPlayers.length}/{playersTotal})
                    </h3>
                    {needsGoalkeeper && (
                        <span className={styles.goalkeeperBadge}><Goal size={14} /> Busca arquero</span>
                    )}
                </div>

                {confirmedPlayers.length > 0 && (
                    <div>
                        <p className={styles.playerSub}>Confirmados ({confirmedPlayers.length})</p>
                        <div className={styles.playerList}>
                            {confirmedPlayers.map((player) => (
                                <PlayerListItem
                                    key={player.id} player={player} href={`/user/${player.id}`}
                                    badge={<span className={styles.confirmedBadge}><Check size={14} /></span>}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {pendingPlayers.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                        <p className={styles.playerSub}>En espera ({pendingPlayers.length})</p>
                        <div className={styles.playerList}>
                            {pendingPlayers.map((player) => (
                                <PlayerListItem
                                    key={player.id} player={player} href={`/user/${player.id}`}
                                    badge={<span className={styles.pendingBadge}><Clock size={14} /></span>}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
