"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import Logo from '@/components/Logo';
import SocialButton from '@/components/SocialButton';
import styles from '../login/Login.module.css';
import { User, Mail, Lock, UserPlus, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const { success, error } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: { name?: string; email?: string; password?: string } = {};
        if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
        if (!email) {
            newErrors.email = 'El email es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Ingresa un email válido.';
        }
        if (!password) {
            newErrors.password = 'La contraseña es obligatoria.';
        } else if (password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
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
            setIsSubmitting(false);
            success("¡Cuenta creada exitosamente!");
            setTimeout(() => router.push('/onboarding'), 500);
        }, 600);
    };

    const handleSocialRegister = (provider: 'google' | 'facebook' | 'apple') => {
        success(`Registrándote con ${provider}... (mock)`);
    };

    return (
        <main className={styles.page}>
            <div className={styles.glowTop} />
            <div className={styles.glowBottom} />

            <div className={styles.particles}>
                <svg className={styles.particle} width="20" height="20" viewBox="0 0 20 20">
                    <polygon points="10,2 18,7 18,15 10,18 2,15 2,7" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
                </svg>
                <svg className={styles.particle} width="12" height="12" viewBox="0 0 12 12">
                    <circle cx="6" cy="6" r="4" fill="none" stroke="hsl(var(--gold))" strokeWidth="1" />
                </svg>
                <svg className={styles.particle} width="16" height="16" viewBox="0 0 16 16">
                    <rect x="2" y="2" width="12" height="12" rx="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
                </svg>
                <svg className={styles.particle} width="10" height="10" viewBox="0 0 10 10">
                    <polygon points="5,1 9,4 9,8 5,9 1,8 1,4" fill="none" stroke="hsl(var(--gold))" strokeWidth="1" />
                </svg>
            </div>

            <div className={styles.gridOverlay} />

            <div className={styles.card}>
                <div className={styles.logoWrap}>
                    <div className={styles.logoRing}>
                        <div className={styles.logoRingGlow} />
                        <Logo style={{ width: '75px', height: '75px' }} />
                    </div>
                </div>

                <div className={styles.header}>
                    <h1 className={`${styles.headerTitle} ${styles.headerTitleGrad}`}>Crear Cuenta</h1>
                    <p className={styles.headerDesc}>Únete a la comunidad de fútbol más grande</p>
                </div>

                <div className={styles.socialRow}>
                    <SocialButton provider="google" onClick={() => handleSocialRegister('google')} />
                    <SocialButton provider="facebook" onClick={() => handleSocialRegister('facebook')} />
                    <SocialButton provider="apple" onClick={() => handleSocialRegister('apple')} />
                </div>

                <div className={styles.divider}>
                    <span className={styles.dividerLine} />
                    <span className={styles.dividerText}>o</span>
                    <span className={styles.dividerLine} />
                </div>

                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                    <div className={styles.field}>
                        <label htmlFor="name" className={styles.label}>
                            <User size={13} className={styles.labelIcon} />
                            Nombre Completo
                        </label>
                        <div className={`${styles.inputWrap} ${errors.name ? styles.inputWrapError : ''}`}>
                            <div className={styles.inputIcon}><User size={16} /></div>
                            <input
                                type="text" id="name" value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Juan Pérez"
                                className={styles.input}
                            />
                        </div>
                        {errors.name && (
                            <span className={styles.error}><AlertCircle size={11} /> {errors.name}</span>
                        )}
                    </div>

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

                    <div className={styles.field}>
                        <label htmlFor="password" className={styles.label}>
                            <Lock size={13} className={styles.labelIcon} />
                            Contraseña
                        </label>
                        <div className={`${styles.inputWrap} ${errors.password ? styles.inputWrapError : ''}`}>
                            <div className={styles.inputIcon}><Lock size={16} /></div>
                            <input
                                type="password" id="password" value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className={styles.input}
                            />
                        </div>
                        {errors.password && (
                            <span className={styles.error}><AlertCircle size={11} /> {errors.password}</span>
                        )}
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <span className={styles.spinner} />
                        ) : (
                            <UserPlus size={18} />
                        )}
                        {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </button>
                </form>

                <p className={styles.terms}>
                    Al registrarte, aceptas nuestros{' '}
                    <Link href="/terms" className={styles.termsLink}>Términos de Servicio</Link>
                    {' '}y{' '}
                    <Link href="/privacy" className={styles.termsLink}>Política de Privacidad</Link>
                </p>

                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" className={styles.footerLink}>Ingresa aquí</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
