"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircleCheck, Dumbbell, Footprints, MapPin, Clock } from 'lucide-react';
import styles from './Onboarding.module.css';

type Position = 'Portero' | 'Defensa' | 'Mediocampista' | 'Delantero';
type Level = 'Principiante' | 'Intermedio' | 'Avanzado';
type Frequency = '1 vez/semana' | '2-3 veces/semana' | 'Todos los días' | 'Ocasional';

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [position, setPosition] = useState<Position | ''>('');
    const [preferredFoot, setPreferredFoot] = useState<'Derecho' | 'Izquierdo' | 'Ambos'>('Derecho');
    const [level, setLevel] = useState<Level | ''>('');
    const [frequency, setFrequency] = useState<Frequency | ''>('');
    const [zones, setZones] = useState<string[]>([]);
    const [preferredTimes, setPreferredTimes] = useState<string[]>([]);

    const availableZones = ['Hualqui', 'Concepción', 'San Pedro', 'Talcahuano', 'Chiguayante'];
    const availableTimes = ['Mañana', 'Tarde', 'Noche'];

    const handleZoneToggle = (zone: string) => {
        setZones(prev => prev.includes(zone) ? prev.filter(z => z !== zone) : [...prev, zone]);
    };

    const handleTimeToggle = (time: string) => {
        setPreferredTimes(prev => prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]);
    };

    const handleNext = () => {
        if (step === 1 && (!position || !preferredFoot || !level)) return;
        if (step === 2 && (!frequency || zones.length === 0 || preferredTimes.length === 0)) return;
        if (step < 3) {
            setStep(step + 1);
        } else {
            setTimeout(() => router.push('/feed'), 500);
        }
    };

    return (
        <main className={styles.page}>
            {/* Progress */}
            <div className={styles.progressSection}>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${(step / 3) * 100}%` }} />
                </div>
                <h1 className={styles.stepTitle}>
                    {step === 1 && 'Cuéntanos sobre ti'}
                    {step === 2 && '¿Dónde y cuándo juegas?'}
                    {step === 3 && '¡Listo para empezar!'}
                </h1>
                <p className={styles.stepSubtitle}>Paso {step} de 3</p>
            </div>

            {step === 1 && (
                <div className={styles.content}>
                    <div className={styles.field}>
                        <label className={styles.label}>
                            <Dumbbell size={14} className={styles.labelIcon} />
                            Posición favorita
                        </label>
                        <div className={styles.grid2}>
                            {(['Portero', 'Defensa', 'Mediocampista', 'Delantero'] as Position[]).map((pos) => (
                                <button key={pos} type="button" onClick={() => setPosition(pos)}
                                    className={`${styles.option} ${position === pos ? styles.optionSelected : ''}`}>
                                    {pos}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            <Footprints size={14} className={styles.labelIcon} />
                            Pie hábil
                        </label>
                        <div className={styles.row3}>
                            {(['Derecho', 'Izquierdo', 'Ambos'] as const).map((foot) => (
                                <button key={foot} type="button" onClick={() => setPreferredFoot(foot)}
                                    className={`${styles.option} ${preferredFoot === foot ? styles.optionSelected : ''}`}>
                                    {foot}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Nivel de juego</label>
                        <div className="flex flex-col gap-3">
                            {(['Principiante', 'Intermedio', 'Avanzado'] as Level[]).map((lev) => (
                                <button key={lev} type="button" onClick={() => setLevel(lev)}
                                    className={`${styles.optionRow} ${level === lev ? styles.optionRowSelected : ''}`}>
                                    {lev}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className={styles.content}>
                    <div className={styles.field}>
                        <label className={styles.label}>
                            <Clock size={14} className={styles.labelIcon} />
                            ¿Con qué frecuencia juegas?
                        </label>
                        <div className="flex flex-col gap-3">
                            {(['1 vez/semana', '2-3 veces/semana', 'Todos los días', 'Ocasional'] as Frequency[]).map((freq) => (
                                <button key={freq} type="button" onClick={() => setFrequency(freq)}
                                    className={`${styles.optionRow} ${frequency === freq ? styles.optionRowSelected : ''}`}>
                                    {freq}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            <MapPin size={14} className={styles.labelIcon} />
                            Zonas donde juegas
                        </label>
                        <div className={styles.pillGroup}>
                            {availableZones.map((zone) => (
                                <button key={zone} type="button" onClick={() => handleZoneToggle(zone)}
                                    className={`${styles.pill} ${zones.includes(zone) ? styles.pillSelected : ''}`}>
                                    {zone}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            Horarios preferidos
                        </label>
                        <div className={styles.row3}>
                            {availableTimes.map((time) => (
                                <button key={time} type="button" onClick={() => handleTimeToggle(time)}
                                    className={`${styles.option} ${preferredTimes.includes(time) ? styles.optionSelected : ''}`}>
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className={styles.completeSection}>
                    <div className={styles.completeIcon}>
                        <CircleCheck size={64} />
                    </div>
                    <h2 className={styles.completeTitle}>¡Todo listo!</h2>
                    <p className={styles.completeDesc}>
                        Ya puedes empezar a encontrar y crear pichangas cerca de ti.
                    </p>
                </div>
            )}

            <div className={styles.actions}>
                {step > 1 && (
                    <button type="button" onClick={() => setStep(step - 1)} className={styles.backBtn}>
                        Atrás
                    </button>
                )}
                <button
                    type="button" onClick={handleNext} className={styles.nextBtn}
                    disabled={
                        (step === 1 && (!position || !preferredFoot || !level)) ||
                        (step === 2 && (!frequency || zones.length === 0 || preferredTimes.length === 0))
                    }
                >
                    {step === 3 ? 'Comenzar' : 'Siguiente'}
                </button>
            </div>
        </main>
    );
}
