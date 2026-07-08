"use client";

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import styles from './ForgotPassword.module.css';

const ACCENT = '#FF6B1A';
const GOLD = '#FFD700';

export default function ForgotPasswordPage() {
    const { success, error } = useToast();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ email?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sent, setSent] = useState(false);

    const validate = () => {
        const newErrors: { email?: string } = {};
        if (!email) {
            newErrors.email = 'El email es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Ingresa un email válido.';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            error("Por favor, corrige los errores.");
        }
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSent(true);
            success("Correo de restablecimiento enviado. (mock)");
        }, 1500);
    };

    return (
        <main className={styles.page}>
            <div className={styles.glowTop} />
            <div className={styles.glowBottom} />

            <div className={styles.particles}>
                <svg className={styles.particle} width="20" height="20" viewBox="0 0 20 20">
                    <polygon points="10,2 18,7 18,15 10,18 2,15 2,7" fill="none" stroke={ACCENT} strokeWidth="1" />
                </svg>
                <svg className={styles.particle} width="12" height="12" viewBox="0 0 12 12">
                    <circle cx="6" cy="6" r="4" fill="none" stroke={GOLD} strokeWidth="1" />
                </svg>
                <svg className={styles.particle} width="16" height="16" viewBox="0 0 16 16">
                    <rect x="2" y="2" width="12" height="12" rx="3" fill="none" stroke={ACCENT} strokeWidth="1" />
                </svg>
                <svg className={styles.particle} width="10" height="10" viewBox="0 0 10 10">
                    <polygon points="5,1 9,4 9,8 5,9 1,8 1,4" fill="none" stroke={GOLD} strokeWidth="1" />
                </svg>
            </div>

            <div className={styles.gridOverlay} />

            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={`${styles.headerTitle} ${styles.headerTitleGrad}`}>
                        ¿Olvidaste tu contraseña?
                    </h1>
                    <p className={styles.headerDesc}>No te preocupes, te ayudamos</p>
                    <p className={styles.headerSub}>
                        Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
                    </p>
                </div>

                {sent ? (
                    <div className={styles.successMsg}>
                        <div className={styles.successIcon}>
                            <CheckCircle2 size={24} />
                        </div>
                        <p className={styles.successText}>Correo enviado</p>
                        <p className={styles.successSub}>
                            Si existe una cuenta con {email}, recibirás un enlace para restablecer tu contraseña.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.form} noValidate>
                        <div className={styles.field}>
                            <label htmlFor="email" className={styles.label}>
                                <Mail size={13} className={styles.labelIcon} />
                                Email
                            </label>
                            <div className={`${styles.inputWrap} ${errors.email ? styles.inputWrapError : ''}`}>
                                <div className={styles.inputIcon}><Mail size={16} /></div>
                                <input
                                    type="email" id="email" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ejemplo@correo.com"
                                    className={styles.input}
                                />
                            </div>
                            {errors.email && (
                                <span className={styles.error}><AlertCircle size={11} /> {errors.email}</span>
                            )}
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                            <Send size={18} />
                            {isSubmitting ? 'Enviando...' : 'Enviar enlace'}
                        </button>
                    </form>
                )}

                <Link href="/login" className={styles.submitBtnGhost}>
                    <ArrowLeft size={18} />
                    Volver al inicio de sesión
                </Link>

                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        ¿Recordaste tu contraseña?{' '}
                        <Link href="/login" className={styles.footerLink}>Inicia sesión</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
