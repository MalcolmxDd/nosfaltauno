"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_USERS } from '@/data/mocks';
import { Send, ArrowLeft } from 'lucide-react';
import styles from './ChatClient.module.css';

interface ChatMessage {
    text: string;
    time: string;
    sent: boolean;
}

interface ChatClientProps {
    userId: string;
}

export default function ChatClient({ userId }: ChatClientProps) {
    const router = useRouter();
    const user = MOCK_USERS.find(u => u.id === userId) || MOCK_USERS[0];
    const [messages, setMessages] = useState<ChatMessage[]>([
        { text: 'Hola, ¿te falta uno para el partido?', time: '12:30', sent: false },
        { text: '¡Sí! Justo se nos bajó el arquero. ¿Te sumas?', time: '12:32', sent: true },
        { text: 'Dale, ahí estaré. ¿A qué hora es?', time: '12:33', sent: false },
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (!input.trim()) return;
        const now = new Date();
        const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        setMessages(prev => [...prev, { text: input.trim(), time, sent: true }]);
        setInput('');
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <button onClick={() => router.back()} className={styles.backBtn} aria-label="Volver">
                    <ArrowLeft size={20} />
                </button>
                <img src={user.avatar} alt={user.name} className={styles.avatar} />
                <div className={styles.userInfo}>
                    <h1 className={styles.userName}>{user.name}</h1>
                    <p className={styles.userStatus}>En línea</p>
                </div>
            </header>

            <div className={styles.messages}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`${styles.messageRow} ${msg.sent ? styles.messageRowSent : styles.messageRowReceived}`}>
                        <div className={`${styles.bubble} ${msg.sent ? styles.bubbleSent : styles.bubbleReceived}`}>
                            <p className={styles.bubbleText}>{msg.text}</p>
                        </div>
                        <span className={`${styles.timestamp} ${msg.sent ? styles.timestampSent : styles.timestampReceived}`}>
                            {msg.time}
                        </span>
                    </div>
                ))}
            </div>

            <div className={styles.inputBar}>
                <div className={styles.inputRow}>
                    <div className={styles.inputWrap}>
                        <input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            className={styles.chatInput}
                        />
                    </div>
                    <button onClick={sendMessage} className={styles.sendBtn} aria-label="Enviar mensaje">
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
