"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Globe, Users, Lock, User, Trash2 } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';
import styles from './Settings.module.css';

const visibilityOptions = [
    { id: 'public' as const, icon: Globe, label: 'Público', desc: 'Todos pueden ver tu perfil' },
    { id: 'friends' as const, icon: Users, label: 'Solo amigos', desc: 'Solo tus amigos pueden ver tu perfil' },
    { id: 'private' as const, icon: Lock, label: 'Privado', desc: 'Solo tú puedes ver tu perfil' },
];

export default function SettingsPage() {
    const { success } = useToast();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [searchRadius, setSearchRadius] = useState(10);
    const [profileVisibility, setProfileVisibility] = useState<'public' | 'friends' | 'private'>('public');

    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Configuración</h1>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Notificaciones</h2>
                <div className={styles.card}>
                    <div className={styles.row}>
                        <div>
                            <p className={styles.rowLabel}>Notificaciones push</p>
                            <p className={styles.rowDesc}>Recibe alertas de partidos cerca y mensajes</p>
                        </div>
                        <button
                            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                            className={`${styles.toggle} ${notificationsEnabled ? styles.toggleOn : styles.toggleOff}`}
                            aria-label="Toggle notifications"
                        >
                            <span className={`${styles.toggleKnob} ${notificationsEnabled ? styles.toggleKnobOn : styles.toggleKnobOff}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Búsqueda</h2>
                <div className={styles.card}>
                    <div className={styles.sliderRow}>
                        <div className={styles.sliderHeader}>
                            <span className={styles.sliderLabel}>Radio de búsqueda</span>
                            <span className={styles.sliderValue}>{searchRadius} km</span>
                        </div>
                        <input
                            type="range"
                            min={1}
                            max={50}
                            value={searchRadius}
                            onChange={(e) => setSearchRadius(Number(e.target.value))}
                            className={styles.slider}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Privacidad</h2>
                <div className={styles.card}>
                    <div className={styles.privacyGroup}>
                        {visibilityOptions.map((opt) => {
                            const Icon = opt.icon;
                            const isActive = profileVisibility === opt.id;
                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => setProfileVisibility(opt.id)}
                                    className={`${styles.privacyOption} ${isActive ? styles.privacyOptionActive : ''}`}
                                >
                                    <span className={styles.privacyIcon}>
                                        <Icon size={16} />
                                    </span>
                                    <span className={styles.privacyText}>
                                        <strong>{opt.label}</strong> — {opt.desc}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Cuenta</h2>
                <div className={styles.accountGroup}>
                    <Link href="/profile/edit" className={styles.accountBtn}>
                        <User size={18} />
                        Editar Perfil
                    </Link>
                    <button
                        className={`${styles.accountBtn} ${styles.accountBtnDanger}`}
                        onClick={() => {
                            if (confirm('¿Estás seguro de que quieres eliminar tu cuenta?')) {
                                success('Cuenta eliminada. (mock)');
                            }
                        }}
                    >
                        <Trash2 size={18} />
                        Eliminar Cuenta
                    </button>
                </div>
            </div>

            <div className={styles.footer}>
                <p className={styles.footerVersion}>Nos Falta Uno v1.0.0</p>
                <p>© 2024</p>
            </div>
        </div>
    );
}
