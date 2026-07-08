"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import PageHeader from '@/components/ui/PageHeader';
import styles from './CreateTeam.module.css';
import { Shield, Users, Trophy, Dumbbell, CalendarDays, UserPlus, AlertCircle } from 'lucide-react';

const LEVELS = ['Principiante', 'Intermedio', 'Avanzado'];
const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function CreateTeamPage() {
    const router = useRouter();
    const { success } = useToast();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('');
    const [playDays, setPlayDays] = useState<string[]>([]);
    const [maxMembers, setMaxMembers] = useState(10);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const toggleDay = (day: string) => {
        setPlayDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
    };

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!name.trim()) errs.name = 'El nombre es obligatorio';
        if (!description.trim()) errs.description = 'La descripción es obligatoria';
        if (!level) errs.level = 'Selecciona un nivel';
        if (playDays.length === 0) errs.days = 'Selecciona al menos un día';
        if (maxMembers < 2 || maxMembers > 30) errs.maxMembers = 'Mínimo 2, máximo 30';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setTimeout(() => {
            success(`¡Equipo "${name}" creado con éxito!`);
            setLoading(false);
            router.push('/teams');
        }, 700);
    };

    return (
        <div className="container">
            <PageHeader title="Crear Equipo" backTo="/teams" />

            <div className={styles.formCard}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>
                            <Shield size={14} className={styles.labelIcon} />
                            Nombre del equipo
                        </label>
                        <div className={styles.inputWrap}>
                            <div className={styles.inputIcon}>
                                <Shield size={16} />
                            </div>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className={styles.input}
                                placeholder="Ej: Los Invencibles"
                            />
                        </div>
                        {errors.name && (
                            <span className={styles.error}>
                                <AlertCircle size={12} /> {errors.name}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            <Users size={14} className={styles.labelIcon} />
                            Descripción
                        </label>
                        <div className={styles.inputWrap}>
                            <div className={styles.inputIcon} style={{ alignSelf: 'flex-start', paddingTop: '0.85rem' }}>
                                <Users size={16} />
                            </div>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className={styles.textarea}
                                rows={3}
                                placeholder="Describe tu equipo, horarios, estilo de juego..."
                            />
                        </div>
                        {errors.description && (
                            <span className={styles.error}>
                                <AlertCircle size={12} /> {errors.description}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            <Trophy size={14} className={styles.labelIcon} />
                            Nivel
                        </label>
                        <div className={styles.chipGroup}>
                            {LEVELS.map(l => (
                                <button
                                    key={l}
                                    type="button"
                                    onClick={() => setLevel(l)}
                                    className={`${styles.chip} ${level === l ? styles.chipActive : ''}`}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>
                        {errors.level && (
                            <span className={styles.error}>
                                <AlertCircle size={12} /> {errors.level}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            <CalendarDays size={14} className={styles.labelIcon} />
                            Días de juego
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                            {DAYS.map(d => (
                                <button
                                    key={d}
                                    type="button"
                                    onClick={() => toggleDay(d)}
                                    className={`${styles.dayChip} ${playDays.includes(d) ? styles.dayChipActive : ''}`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                        {errors.days && (
                            <span className={styles.error}>
                                <AlertCircle size={12} /> {errors.days}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            <UserPlus size={14} className={styles.labelIcon} />
                            Cupo máximo
                        </label>
                        <div className={styles.rangeWrap}>
                            <input
                                type="range"
                                min={2}
                                max={30}
                                value={maxMembers}
                                onChange={e => setMaxMembers(Number(e.target.value))}
                                className={styles.rangeInput}
                            />
                            <span className={styles.rangeValue}>{maxMembers}</span>
                        </div>
                        {errors.maxMembers && (
                            <span className={styles.error}>
                                <AlertCircle size={12} /> {errors.maxMembers}
                            </span>
                        )}
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        <Shield size={18} />
                        {loading ? 'Creando...' : 'Crear Equipo'}
                    </button>
                </form>
            </div>
        </div>
    );
}
