"use client";

import { User, Shirt } from 'lucide-react';
import styles from './MatchDetail.module.css';

interface Player { id: string; name: string; avatar?: string; position?: string; }

interface LineupBuilderProps { players: Player[]; }

export default function LineupBuilder({ players }: LineupBuilderProps) {
    const positions = [
        { id: 'gk', label: 'POR', x: 50, y: 85, player: players[0] || null },
        { id: 'def', label: 'DEF', x: 50, y: 60, player: players[1] || null },
        { id: 'mid_l', label: 'MED', x: 20, y: 40, player: players[2] || null },
        { id: 'mid_r', label: 'MED', x: 80, y: 40, player: players[3] || null },
        { id: 'fwd', label: 'DEL', x: 50, y: 15, player: players[4] || null },
    ];

    return (
        <div className={styles.lineupSection}>
            <h3 className={styles.lineupTitle}>
                <Shirt size={18} className={styles.lineupTitleIcon} />
                Alineación
            </h3>

            <div className={styles.fieldContainer}>
                <div className={`${styles.fieldLine} ${styles.centerCircle}`} />
                <div className={`${styles.fieldLine} ${styles.centerLine}`} />
                <div className={`${styles.fieldLine} ${styles.penaltyTop}`} />
                <div className={`${styles.fieldLine} ${styles.penaltyBottom}`} />

                {positions.map((pos) => (
                    <div
                        key={pos.id}
                        className={styles.playerDot}
                        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    >
                        <div className={`${styles.playerCircle} ${!pos.player ? styles.playerCircleEmpty : ''}`}>
                            {pos.player?.avatar ? (
                                <img src={pos.player.avatar} alt={pos.player.name} />
                            ) : (
                                <User size={20} />
                            )}
                        </div>
                        <span className={styles.playerLabel}>
                            {pos.player ? pos.player.name.split(' ')[0] : pos.label}
                        </span>
                    </div>
                ))}
            </div>

            <p className={styles.lineupHint}>
                Arrastra los jugadores para cambiar la formación (Próximamente)
            </p>
        </div>
    );
}
