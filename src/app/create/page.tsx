"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import { saveUserMatch } from "@/data/store";
import styles from './Create.module.css';
import {
    Swords,
    MapPin,
    Calendar,
    Clock,
    Users,
    DollarSign,
    Image,
    Trophy,
    Shield,
    AlertCircle
} from 'lucide-react';

type LevelOption = "Recreativo" | "Intermedio" | "Competitivo";

export default function CreateMatchPage() {
    const router = useRouter();
    const { success, error } = useToast();

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [players, setPlayers] = useState("");
    const [price, setPrice] = useState("");
    const [level, setLevel] = useState<LevelOption>("Intermedio");
    const [imageUrl, setImageUrl] = useState("");

    const [errors, setErrors] = useState<{
        title?: string;
        location?: string;
        date?: string;
        time?: string;
        players?: string;
    }>({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!title.trim()) newErrors.title = "El título es obligatorio.";
        if (!location.trim()) newErrors.location = "La ubicación es obligatoria.";

        if (!date) {
            newErrors.date = "La fecha es obligatoria.";
        } else {
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                newErrors.date = "La fecha debe ser futura.";
            }
        }

        if (!time) {
            newErrors.time = "La hora es obligatoria.";
        } else if (date) {
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate.getTime() === today.getTime()) {
                const [hours, minutes] = time.split(':').map(Number);
                const selectedDateTime = new Date();
                selectedDateTime.setHours(hours, minutes, 0, 0);
                if (selectedDateTime < new Date()) {
                    newErrors.time = "La hora debe ser futura si la fecha es hoy.";
                }
            }
        }

        const playersNumber = Number(players);
        if (!players) {
            newErrors.players = "Indica la cantidad de jugadores.";
        } else if (Number.isNaN(playersNumber) || playersNumber <= 0) {
            newErrors.players = "Ingresa un número de jugadores válido.";
        } else if (playersNumber < 4) {
            newErrors.players = "Mínimo 4 jugadores.";
        } else if (playersNumber > 22) {
            newErrors.players = "Máximo 22 jugadores.";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            error("Por favor, corrige los errores en el formulario.");
        }
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        setTimeout(() => {
            saveUserMatch({
                title: title.trim(),
                location: location.trim(),
                date,
                time,
                players: Number(players),
                price: price.trim() || 'Gratis',
                level,
                imageUrl: imageUrl.trim() || undefined,
            });

            setIsSubmitting(false);
            success("¡Partido creado exitosamente!");

            setTimeout(() => {
                router.push("/feed");
            }, 1000);
        }, 700);
    };

    if (isSubmitting) {
        return <LoadingSpinner fullScreen message="Publicando partido..." />;
    }

    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <div className={styles.headerIcon}>
                    <Swords size={24} />
                </div>
                <h1 className={styles.title}>Crear Partido</h1>
                <p className={styles.subtitle}>Completa los datos para publicar tu encuentro</p>
            </div>

            <div className={styles.formCard}>
                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                    {/* Información básica */}
                    <div className={styles.sectionDivider}>
                        <span className={styles.sectionLine} />
                        <span className={styles.sectionLabel}>Información básica</span>
                        <span className={styles.sectionLine} />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="title" className={styles.label}>
                            <Swords size={14} className={styles.labelIcon} />
                            Título del Partido
                        </label>
                        <div className={`${styles.inputWrap} ${errors.title ? styles.inputWrapError : ''}`}>
                            <div className={styles.inputIcon}>
                                <Swords size={16} />
                            </div>
                            <input
                                id="title"
                                placeholder="Ej: Fútbol 5 Amistoso"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        {errors.title && (
                            <span className={styles.error}>
                                <AlertCircle size={12} /> {errors.title}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="location" className={styles.label}>
                            <MapPin size={14} className={styles.labelIcon} />
                            Ubicación
                        </label>
                        <div className={`${styles.inputWrap} ${errors.location ? styles.inputWrapError : ''}`}>
                            <div className={styles.inputIcon}>
                                <MapPin size={16} />
                            </div>
                            <input
                                id="location"
                                placeholder="Buscar cancha o dirección..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        {errors.location && (
                            <span className={styles.error}>
                                <AlertCircle size={12} /> {errors.location}
                            </span>
                        )}
                    </div>

                    {/* Fecha y Hora */}
                    <div className={styles.sectionDivider}>
                        <span className={styles.sectionLine} />
                        <span className={styles.sectionLabel}>Fecha y hora</span>
                        <span className={styles.sectionLine} />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label htmlFor="date" className={styles.label}>
                                <Calendar size={14} className={styles.labelIcon} />
                                Fecha
                            </label>
                            <div className={`${styles.inputWrap} ${errors.date ? styles.inputWrapError : ''}`}>
                                <div className={styles.inputIcon}>
                                    <Calendar size={16} />
                                </div>
                                <input
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            {errors.date && (
                                <span className={styles.error}>
                                    <AlertCircle size={12} /> {errors.date}
                                </span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="time" className={styles.label}>
                                <Clock size={14} className={styles.labelIcon} />
                                Hora
                            </label>
                            <div className={`${styles.inputWrap} ${errors.time ? styles.inputWrapError : ''}`}>
                                <div className={styles.inputIcon}>
                                    <Clock size={16} />
                                </div>
                                <input
                                    type="time"
                                    id="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            {errors.time && (
                                <span className={styles.error}>
                                    <AlertCircle size={12} /> {errors.time}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Detalles del partido */}
                    <div className={styles.sectionDivider}>
                        <span className={styles.sectionLine} />
                        <span className={styles.sectionLabel}>Detalles</span>
                        <span className={styles.sectionLine} />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label htmlFor="players" className={styles.label}>
                                <Users size={14} className={styles.labelIcon} />
                                Jugadores Totales
                            </label>
                            <div className={`${styles.inputWrap} ${errors.players ? styles.inputWrapError : ''}`}>
                                <div className={styles.inputIcon}>
                                    <Users size={16} />
                                </div>
                                <input
                                    id="players"
                                    placeholder="10"
                                    type="number"
                                    value={players}
                                    onChange={(e) => setPlayers(e.target.value)}
                                    min={1}
                                    className={styles.input}
                                />
                            </div>
                            {errors.players && (
                                <span className={styles.error}>
                                    <AlertCircle size={12} /> {errors.players}
                                </span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="price" className={styles.label}>
                                <DollarSign size={14} className={styles.labelIcon} />
                                Precio por Persona
                            </label>
                            <div className={styles.inputWrap}>
                                <div className={styles.inputIcon}>
                                    <DollarSign size={16} />
                                </div>
                                <input
                                    id="price"
                                    placeholder="$2.000"
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            <Trophy size={14} className={styles.labelIcon} />
                            Nivel
                        </label>
                        <div className={styles.chipGroup}>
                            {(["Recreativo", "Intermedio", "Competitivo"] as LevelOption[]).map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setLevel(option)}
                                    className={`${styles.chip} ${level === option ? styles.chipActive : ''}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Imagen de la cancha */}
                    <div className={styles.sectionDivider}>
                        <span className={styles.sectionLine} />
                        <span className={styles.sectionLabel}>Imagen</span>
                        <span className={styles.sectionLine} />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            <Image size={14} className={styles.labelIcon} />
                            URL de imagen de la cancha
                        </label>
                        <div className={styles.imageSection}>
                            <div className={styles.inputWrap}>
                                <div className={styles.inputIcon}>
                                    <Image size={16} />
                                </div>
                                <input
                                    placeholder="https://ejemplo.com/cancha.jpg"
                                    type="url"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.imagePreview}>
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="Vista previa"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            (e.currentTarget.nextElementSibling as HTMLElement)?.style.removeProperty('display');
                                        }}
                                    />
                                ) : null}
                                <div className={styles.imagePlaceholder} style={{ display: imageUrl ? 'none' : 'flex' }}>
                                    <Image size={24} className={styles.imagePlaceholderIcon} />
                                    <span>La imagen se previsualizará aquí</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                        <Shield size={18} />
                        {isSubmitting ? "Publicando..." : "Publicar Partido"}
                    </button>
                </form>
            </div>
        </div>
    );
}
