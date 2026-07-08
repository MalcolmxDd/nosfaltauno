import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { MOCK_USERS } from '@/data/mocks';
import EmptyState from '@/components/ui/EmptyState';
import listStyles from '@/components/ui/ListPage.module.css';
import styles from './Messages.module.css';

export default function MessagesPage() {
    const hasUsers = MOCK_USERS.length > 0;

    return (
        <div className={`container ${listStyles.page}`}>
            <header className={listStyles.header}>
                <h1 className={listStyles.headerTitle}>Mensajes</h1>
            </header>

            {hasUsers ? (
                <div className={listStyles.list}>
                    {MOCK_USERS.map((user) => (
                        <Link key={user.id} href={`/messages/${user.id}`} className={listStyles.item}>
                            <div className={styles.avatarWrap}>
                                <img src={user.avatar} alt={user.name} className={styles.avatar} />
                                <div className={styles.onlineDot} />
                            </div>
                            <div className={listStyles.content}>
                                <div className={listStyles.topRow}>
                                    <span className={listStyles.name}>{user.name}</span>
                                    <span className={listStyles.time}>12:30</span>
                                </div>
                                <p className={listStyles.preview}>¿Te falta uno para el partido de hoy?</p>
                            </div>
                        </Link>
                    ))}

                    <Link href="/messages/team-1" className={listStyles.item}>
                        <div className={styles.teamAvatar}>F5</div>
                        <div className={listStyles.content}>
                            <div className={listStyles.topRow}>
                                <span className={listStyles.name}>Fútbol 5 - Jueves</span>
                                <span className={listStyles.time}>Ayer</span>
                            </div>
                            <p className={listStyles.preview}>Juan: ¡Yo llevo la pelota!</p>
                        </div>
                    </Link>
                </div>
            ) : (
                <EmptyState
                    icon={MessageCircle}
                    title="Aún no tienes conversaciones"
                    message="Cuando empieces a unirte a partidos, verás tus chats aquí."
                />
            )}
        </div>
    );
}
