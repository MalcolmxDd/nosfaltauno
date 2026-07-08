"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';
import styles from './MatchDetail.module.css';

interface ChatMessage { text: string; time: string; sent: boolean; }

const initialMessages: ChatMessage[] = [
    { text: '¡Hola! ¿Alguien más se suma?', time: '12:30', sent: false },
    { text: 'Yo voy, ¿a qué hora nos encontramos?', time: '12:32', sent: true },
];

export default function MatchChat() {
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
    const [input, setInput] = useState('');

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        const now = new Date();
        const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        setMessages(prev => [...prev, { text: input.trim(), time, sent: true }]);
        setInput('');
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatMessages}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`${styles.chatBubble} ${msg.sent ? styles.chatBubbleSent : styles.chatBubbleReceived}`}>
                        <div className={`${styles.bubble} ${msg.sent ? styles.bubbleSent : styles.bubbleReceived}`}>
                            <p>{msg.text}</p>
                        </div>
                        <span className={`${styles.bubbleTime} ${msg.sent ? styles.bubbleTimeSent : styles.bubbleTimeReceived}`}>
                            {msg.time}
                        </span>
                    </div>
                ))}
            </div>

            <form onSubmit={sendMessage} className={styles.chatInput}>
                <input
                    type="text" placeholder="Escribe un mensaje..."
                    value={input} onChange={(e) => setInput(e.target.value)}
                    className={styles.chatField}
                />
                <button type="submit" className={styles.chatSendBtn} aria-label="Enviar mensaje">
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
