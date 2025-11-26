"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Circle } from 'lucide-react';

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
            // Mock: guardar preferencias y redirigir al feed
            setTimeout(() => {
                router.push('/feed');
            }, 500);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <main className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ 
                        width: '100%', 
                        height: '4px', 
                        backgroundColor: 'hsl(var(--card))', 
                        borderRadius: '2px',
                        marginBottom: '1rem'
                    }}>
                        <div style={{ 
                            width: `${(step / 3) * 100}%`, 
                            height: '100%', 
                            backgroundColor: 'hsl(var(--primary))', 
                            borderRadius: '2px',
                            transition: 'width 0.3s'
                        }} />
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {step === 1 && 'Cuéntanos sobre ti'}
                        {step === 2 && '¿Dónde y cuándo juegas?'}
                        {step === 3 && '¡Listo para empezar!'}
                    </h1>
                    <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                        Paso {step} de 3
                    </p>
                </div>
            </div>

            {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
                            Posición favorita
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            {(['Portero', 'Defensa', 'Mediocampista', 'Delantero'] as Position[]).map((pos) => (
                                <button
                                    key={pos}
                                    type="button"
                                    onClick={() => setPosition(pos)}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: 'var(--radius)',
                                        border: `2px solid ${position === pos ? 'hsl(var(--primary))' : 'var(--border)'}`,
                                        backgroundColor: position === pos ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--card))',
                                        color: position === pos ? 'hsl(var(--primary))' : 'var(--foreground)',
                                        fontWeight: position === pos ? '600' : '400',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {pos}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
                            Pie hábil
                        </label>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {(['Derecho', 'Izquierdo', 'Ambos'] as const).map((foot) => (
                                <button
                                    key={foot}
                                    type="button"
                                    onClick={() => setPreferredFoot(foot)}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius)',
                                        border: `2px solid ${preferredFoot === foot ? 'hsl(var(--primary))' : 'var(--border)'}`,
                                        backgroundColor: preferredFoot === foot ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--card))',
                                        color: preferredFoot === foot ? 'hsl(var(--primary))' : 'var(--foreground)',
                                        fontWeight: preferredFoot === foot ? '600' : '400',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {foot}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
                            Nivel de juego
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {(['Principiante', 'Intermedio', 'Avanzado'] as Level[]).map((lev) => (
                                <button
                                    key={lev}
                                    type="button"
                                    onClick={() => setLevel(lev)}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: 'var(--radius)',
                                        border: `2px solid ${level === lev ? 'hsl(var(--primary))' : 'var(--border)'}`,
                                        backgroundColor: level === lev ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--card))',
                                        color: level === lev ? 'hsl(var(--primary))' : 'var(--foreground)',
                                        fontWeight: level === lev ? '600' : '400',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                    }}
                                >
                                    {lev}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
                            ¿Con qué frecuencia juegas?
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {(['1 vez/semana', '2-3 veces/semana', 'Todos los días', 'Ocasional'] as Frequency[]).map((freq) => (
                                <button
                                    key={freq}
                                    type="button"
                                    onClick={() => setFrequency(freq)}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: 'var(--radius)',
                                        border: `2px solid ${frequency === freq ? 'hsl(var(--primary))' : 'var(--border)'}`,
                                        backgroundColor: frequency === freq ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--card))',
                                        color: frequency === freq ? 'hsl(var(--primary))' : 'var(--foreground)',
                                        fontWeight: frequency === freq ? '600' : '400',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                    }}
                                >
                                    {freq}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
                            Zonas donde juegas (puedes elegir varias)
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {availableZones.map((zone) => (
                                <button
                                    key={zone}
                                    type="button"
                                    onClick={() => handleZoneToggle(zone)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '2rem',
                                        border: `2px solid ${zones.includes(zone) ? 'hsl(var(--primary))' : 'var(--border)'}`,
                                        backgroundColor: zones.includes(zone) ? 'hsl(var(--primary))' : 'hsl(var(--card))',
                                        color: zones.includes(zone) ? 'white' : 'var(--foreground)',
                                        fontSize: '0.875rem',
                                        fontWeight: zones.includes(zone) ? '600' : '400',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {zone}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
                            Horarios preferidos (puedes elegir varios)
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {availableTimes.map((time) => (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => handleTimeToggle(time)}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius)',
                                        border: `2px solid ${preferredTimes.includes(time) ? 'hsl(var(--primary))' : 'var(--border)'}`,
                                        backgroundColor: preferredTimes.includes(time) ? 'hsl(var(--primary))' : 'hsl(var(--card))',
                                        color: preferredTimes.includes(time) ? 'white' : 'var(--foreground)',
                                        fontSize: '0.875rem',
                                        fontWeight: preferredTimes.includes(time) ? '600' : '400',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <Circle size={64} style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        ¡Todo listo!
                    </h2>
                    <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>
                        Ya puedes empezar a encontrar y crear pichangas cerca de ti.
                    </p>
                </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                {step > 1 && (
                    <button
                        type="button"
                        onClick={handleBack}
                        className="btn btn-ghost"
                        style={{ flex: 1 }}
                    >
                        Atrás
                    </button>
                )}
                <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
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

