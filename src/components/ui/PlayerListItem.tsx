import Link from 'next/link';
import styles from './PlayerListItem.module.css';

interface Player {
    id: string;
    name: string;
    avatar: string;
    position: string;
}

interface PlayerListItemProps {
    player: Player;
    href?: string;
    badge?: React.ReactNode;
}

export default function PlayerListItem({ player, href, badge }: PlayerListItemProps) {
    const content = (
        <div className={styles.item}>
            <img src={player.avatar} alt={player.name} className={styles.avatar} />
            <div className={styles.info}>
                <p className={styles.name}>{player.name}</p>
                <p className={styles.position}>{player.position}</p>
            </div>
            {badge && <div className={styles.badge}>{badge}</div>}
        </div>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
}
