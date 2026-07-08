"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import { MOCK_USERS } from '@/data/mocks';
import PageHeader from '@/components/ui/PageHeader';
import styles from './EditProfile.module.css';
import { User, Camera, Dumbbell, Footprints, MapPin, MessageSquareText, Save } from 'lucide-react';

const POSITIONS = ['Arquero', 'Defensa', 'Mediocampista', 'Delantero'];
const FOOT_OPTIONS = ['Derecho', 'Izquierdo', 'Ambos'];
const ZONES = ['Hualqui', 'Concepción', 'San Pedro', 'Chiguayante', 'Talcahuano'];

export default function EditProfilePage() {
    const router = useRouter();
    const { success } = useToast();
    const user = MOCK_USERS[0];

    const [name, setName] = useState(user.name);
    const [position, setPosition] = useState(user.position);
    const [bio, setBio] = useState(user.bio);
    const [preferredFoot, setPreferredFoot] = useState(user.preferredFoot);
    const [zones, setZones] = useState<string[]>(user.preferredZones);
    const [loading, setLoading] = useState(false);

    const toggleZone = (zone: string) => {
        setZones(prev => prev.includes(zone) ? prev.filter(z => z !== zone) : [...prev, zone]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            success('Perfil actualizado correctamente.');
            setLoading(false);
            router.push('/profile');
        }, 600);
    };

    return (
        <div className="container">
            <PageHeader title="Editar Perfil" backTo='/profile' />

            <div className={styles.avatarSection}>
                <div className={styles.avatarWrap}>
                    <img src={user.avatar} alt={user.name} />
                    <div className={styles.avatarOverlay}>
                        <Camera size={24} color="white" />
                    </div>
                </div>
                <button
                    type="button"
                    className={styles.changePhotoBtn}
                    onClick={() => success('Cambiar foto (mock)')}
                >
                    Cambiar foto
                </button>
            </div>

            <div className={styles.formCard}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>
                            <User size={14} className={styles.labelIcon} />
                            Nombre
                        </label>
                        <div className={styles.inputWrap}>
                            <div className={styles.inputIcon}>
                                <User size={16} />
                            </div>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            <Dumbbell size={14} className={styles.labelIcon} />
                            Posición
                        </label>
                        <div className={styles.chipGroup}>
                            {POSITIONS.map(p => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPosition(p)}
                                    className={`${styles.chip} ${position === p ? styles.chipActive : ''}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            <Footprints size={14} className={styles.labelIcon} />
                            Pierna hábil
                        </label>
                        <div className={styles.chipGroup}>
                            {FOOT_OPTIONS.map(f => (
                                <button
                                    key={f}
                                    type="button"
                                    onClick={() => setPreferredFoot(f)}
                                    className={`${styles.chip} ${preferredFoot === f ? styles.chipActive : ''}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            <MapPin size={14} className={styles.labelIcon} />
                            Zonas de juego
                        </label>
                        <div className={styles.chipGroup}>
                            {ZONES.map(z => (
                                <button
                                    key={z}
                                    type="button"
                                    onClick={() => toggleZone(z)}
                                    className={`${styles.chip} ${zones.includes(z) ? styles.chipActive : ''}`}
                                >
                                    {z}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            <MessageSquareText size={14} className={styles.labelIcon} />
                            Biografía
                        </label>
                        <div className={styles.inputWrap}>
                            <div className={styles.inputIcon} style={{ alignSelf: 'flex-start', paddingTop: '0.85rem' }}>
                                <MessageSquareText size={16} />
                            </div>
                            <textarea
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                className={styles.textarea}
                                rows={4}
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        <Save size={18} />
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </form>
            </div>
        </div>
    );
}
