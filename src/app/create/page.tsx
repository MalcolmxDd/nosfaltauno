"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import LoadingSpinner from "@/components/LoadingSpinner";

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
            // Validar que la fecha sea futura
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
            // Validar que si la fecha es hoy, la hora sea futura
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

        // Mock de creación de partido: en el futuro aquí irá la llamada al backend
        setTimeout(() => {
            setIsSubmitting(false);
            success("¡Partido creado exitosamente! (mock)");

            // Redirigimos al feed después de un pequeño delay
            setTimeout(() => {
                router.push("/feed");
            }, 1000);
        }, 700);
    };

    if (isSubmitting) {
        return <LoadingSpinner fullScreen message="Publicando partido..." />;
    }

    return (
        <div className="container" style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>

            {/* HEADER */}
            <header style={{ marginBottom: "2rem", textAlign: "center" }}>
                <h1 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                    Crear Partido
                </h1>
                <p style={{ fontSize: "0.9rem", color: "var(--muted-foreground)" }}>
                    Organiza tu propio encuentro deportivo.
                </p>
            </header>

            {/* FORM CONTAINER */}
            <div
                style={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "2rem",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                    noValidate
                >
                    {/* INPUT REUSABLE */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                        <label htmlFor="title" style={{ fontSize: "0.85rem", fontWeight: "600" }}>
                            Título del Partido
                        </label>
                        <input
                            id="title"
                            placeholder="Ej: Fútbol 5 Amistoso"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{
                                width: "100%",
                                height: "3rem",
                                padding: "0 1rem",
                                borderRadius: "0.5rem",
                                border: `1px solid ${errors.title ? "hsl(var(--destructive))" : "var(--border)"}`,
                                backgroundColor: "var(--input)",
                                color: "var(--foreground)",
                                fontSize: "0.9rem",
                                outline: "none",
                                boxSizing: "border-box",
                            }}
                        />
                        {errors.title && (
                            <span style={{ fontSize: "0.75rem", color: "hsl(var(--destructive))" }}>
                                {errors.title}
                            </span>
                        )}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                        <label htmlFor="location" style={{ fontSize: "0.85rem", fontWeight: "600" }}>
                            Ubicación
                        </label>
                        <input
                            id="location"
                            placeholder="Buscar cancha o dirección..."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={{
                                width: "100%",
                                height: "3rem",
                                padding: "0 1rem",
                                borderRadius: "0.5rem",
                                border: `1px solid ${errors.location ? "hsl(var(--destructive))" : "var(--border)"}`,
                                backgroundColor: "var(--input)",
                                color: "var(--foreground)",
                                fontSize: "0.9rem",
                                outline: "none",
                                boxSizing: "border-box",
                            }}
                        />
                        {errors.location && (
                            <span style={{ fontSize: "0.75rem", color: "hsl(var(--destructive))" }}>
                                {errors.location}
                            </span>
                        )}
                    </div>

                    {/* FECHA / HORA */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                            <label htmlFor="date" style={{ fontSize: "0.85rem", fontWeight: "600" }}>
                                Fecha
                            </label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                style={{
                                    width: "100%",
                                    height: "3rem",
                                    padding: "0 1rem",
                                    borderRadius: "0.5rem",
                                    border: `1px solid ${errors.date ? "hsl(var(--destructive))" : "var(--border)"}`,
                                    backgroundColor: "var(--input)",
                                    color: "var(--foreground)",
                                    fontSize: "0.9rem",
                                    outline: "none",
                                    boxSizing: "border-box",
                                }}
                            />
                            {errors.date && (
                                <span style={{ fontSize: "0.75rem", color: "hsl(var(--destructive))" }}>
                                    {errors.date}
                                </span>
                            )}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                            <label htmlFor="time" style={{ fontSize: "0.85rem", fontWeight: "600" }}>
                                Hora
                            </label>
                            <input
                                type="time"
                                id="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                style={{
                                    width: "100%",
                                    height: "3rem",
                                    padding: "0 1rem",
                                    borderRadius: "0.5rem",
                                    border: `1px solid ${errors.time ? "hsl(var(--destructive))" : "var(--border)"}`,
                                    backgroundColor: "var(--input)",
                                    color: "var(--foreground)",
                                    fontSize: "0.9rem",
                                    outline: "none",
                                    boxSizing: "border-box",
                                }}
                            />
                            {errors.time && (
                                <span style={{ fontSize: "0.75rem", color: "hsl(var(--destructive))" }}>
                                    {errors.time}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* JUGADORES / PRECIO */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                            <label htmlFor="players" style={{ fontSize: "0.85rem", fontWeight: "600" }}>
                                Jugadores Totales
                            </label>
                            <input
                                id="players"
                                placeholder="10"
                                type="number"
                                value={players}
                                onChange={(e) => setPlayers(e.target.value)}
                                min={1}
                                style={{
                                    width: "100%",
                                    height: "3rem",
                                    padding: "0 1rem",
                                    borderRadius: "0.5rem",
                                    border: `1px solid ${errors.players ? "hsl(var(--destructive))" : "var(--border)"}`,
                                    backgroundColor: "var(--input)",
                                    color: "var(--foreground)",
                                    fontSize: "0.9rem",
                                    outline: "none",
                                    boxSizing: "border-box",
                                }}
                            />
                            {errors.players && (
                                <span style={{ fontSize: "0.75rem", color: "hsl(var(--destructive))" }}>
                                    {errors.players}
                                </span>
                            )}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                            <label htmlFor="price" style={{ fontSize: "0.85rem", fontWeight: "600" }}>
                                Precio por Persona
                            </label>
                            <input
                                id="price"
                                placeholder="$2.000"
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                style={{
                                    width: "100%",
                                    height: "3rem",
                                    padding: "0 1rem",
                                    borderRadius: "0.5rem",
                                    border: "1px solid var(--border)",
                                    backgroundColor: "var(--input)",
                                    color: "var(--foreground)",
                                    fontSize: "0.9rem",
                                    outline: "none",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>
                    </div>

                    {/* NIVEL */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Nivel</label>

                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            {(["Recreativo", "Intermedio", "Competitivo"] as LevelOption[]).map((option) => {
                                const isActive = level === option;
                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setLevel(option)}
                                        style={{
                                            flex: 1,
                                            padding: "0.75rem 0",
                                            borderRadius: "0.5rem",
                                            border: isActive ? "1px solid hsl(var(--primary))" : "1px solid var(--border)",
                                            backgroundColor: isActive ? "hsl(var(--primary))" : "hsl(var(--card))",
                                            color: isActive ? "white" : "var(--foreground)",
                                            fontSize: "0.85rem",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                            transition: "all .2s",
                                        }}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* BOTÓN PRINCIPAL */}
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                        style={{
                            marginTop: "1rem",
                            width: "100%",
                            opacity: isSubmitting ? 0.85 : 1,
                        }}
                    >
                        {isSubmitting ? "Publicando..." : "Publicar Partido"}
                    </button>

                </form>
            </div>
        </div>
    );
}
