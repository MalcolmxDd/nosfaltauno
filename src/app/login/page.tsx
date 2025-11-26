"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import Logo from '@/components/Logo';
import SocialButton from '@/components/SocialButton';

export default function LoginPage() {
    const router = useRouter();
    const { success, error } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};

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

        // Mock de login: en el futuro aquí irá la llamada al backend
        setTimeout(() => {
            setIsSubmitting(false);
            success("¡Bienvenido de nuevo!");
            setTimeout(() => {
                router.push('/feed');
            }, 500);
        }, 500);
    };

    const handleSocialLogin = (provider: 'google' | 'facebook' | 'apple') => {
        // Mock: en el futuro aquí irá la integración con OAuth
        success(`Iniciando sesión con ${provider}... (mock)`);
    };

    return (
        <main style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 100%)',
            padding: '2rem 1rem'
        }}>
            <div style={{ 
                maxWidth: '420px', 
                width: '100%', 
                margin: '0 auto',
                backgroundColor: 'hsl(var(--card))',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                border: '1px solid var(--border)'
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <Logo style={{ width: '100px', height: '100px' }} />
                </div>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Bienvenido
                    </h1>
                    <p style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem' }}>
                        Ingresa para encontrar tu próximo partido
                    </p>
                </div>

                {/* Social Login Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <SocialButton provider="google" onClick={() => handleSocialLogin('google')} />
                    <SocialButton provider="facebook" onClick={() => handleSocialLogin('facebook')} />
                    <SocialButton provider="apple" onClick={() => handleSocialLogin('apple')} />
                </div>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
                    <span style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>o</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} noValidate>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--foreground)' }}>Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ejemplo@correo.com"
                            style={{
                                height: '3rem',
                                padding: '0 1rem',
                                borderRadius: 'var(--radius)',
                                border: `2px solid ${errors.email ? 'hsl(var(--destructive))' : 'var(--border)'}`,
                                backgroundColor: 'var(--input)',
                                color: 'var(--foreground)',
                                outline: 'none',
                                fontSize: '0.95rem',
                                transition: 'border-color 0.2s',
                            }}
                            onFocus={(e) => {
                                if (!errors.email) e.currentTarget.style.borderColor = 'hsl(var(--primary))';
                            }}
                            onBlur={(e) => {
                                if (!errors.email) e.currentTarget.style.borderColor = 'var(--border)';
                            }}
                        />
                        {errors.email && (
                            <span style={{ fontSize: '0.75rem', color: 'hsl(var(--destructive))', marginTop: '0.25rem' }}>{errors.email}</span>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--foreground)' }}>Contraseña</label>
                            <Link href="/forgot-password" style={{ fontSize: '0.75rem', color: 'hsl(var(--primary))', textDecoration: 'none' }}>
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{
                                height: '3rem',
                                padding: '0 1rem',
                                borderRadius: 'var(--radius)',
                                border: `2px solid ${errors.password ? 'hsl(var(--destructive))' : 'var(--border)'}`,
                                backgroundColor: 'var(--input)',
                                color: 'var(--foreground)',
                                outline: 'none',
                                fontSize: '0.95rem',
                                transition: 'border-color 0.2s',
                            }}
                            onFocus={(e) => {
                                if (!errors.password) e.currentTarget.style.borderColor = 'hsl(var(--primary))';
                            }}
                            onBlur={(e) => {
                                if (!errors.password) e.currentTarget.style.borderColor = 'var(--border)';
                            }}
                        />
                        {errors.password && (
                            <span style={{ fontSize: '0.75rem', color: 'hsl(var(--destructive))', marginTop: '0.25rem' }}>{errors.password}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                        style={{ 
                            marginTop: '0.5rem', 
                            height: '3.25rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            opacity: isSubmitting ? 0.8 : 1,
                            transition: 'all 0.2s',
                        }}
                    >
                        {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>

                {/* Sign Up Link */}
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                        ¿No tienes cuenta?{' '}
                        <Link href="/register" style={{ color: 'hsl(var(--primary))', fontWeight: '600', textDecoration: 'none' }}>
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
