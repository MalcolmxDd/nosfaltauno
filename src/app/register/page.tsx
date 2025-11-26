"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import Logo from '@/components/Logo';
import SocialButton from '@/components/SocialButton';

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

        if (!name.trim()) {
            newErrors.name = 'El nombre es obligatorio.';
        }

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

        // Mock de registro: en el futuro aquí irá la llamada al backend
        setTimeout(() => {
            setIsSubmitting(false);
            success("¡Cuenta creada exitosamente!");
            setTimeout(() => {
                router.push('/onboarding');
            }, 500);
        }, 600);
    };

    const handleSocialRegister = (provider: 'google' | 'facebook' | 'apple') => {
        // Mock: en el futuro aquí irá la integración con OAuth
        success(`Registrándote con ${provider}... (mock)`);
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
                        Crear Cuenta
                    </h1>
                    <p style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem' }}>
                        Únete a la comunidad de fútbol más grande
                    </p>
                </div>

                {/* Social Register Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <SocialButton provider="google" onClick={() => handleSocialRegister('google')} />
                    <SocialButton provider="facebook" onClick={() => handleSocialRegister('facebook')} />
                    <SocialButton provider="apple" onClick={() => handleSocialRegister('apple')} />
                </div>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
                    <span style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>o</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} noValidate>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="name" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--foreground)' }}>Nombre Completo</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Juan Pérez"
                            style={{
                                height: '3rem',
                                padding: '0 1rem',
                                borderRadius: 'var(--radius)',
                                border: `2px solid ${errors.name ? 'hsl(var(--destructive))' : 'var(--border)'}`,
                                backgroundColor: 'var(--input)',
                                color: 'var(--foreground)',
                                outline: 'none',
                                fontSize: '0.95rem',
                                transition: 'border-color 0.2s',
                            }}
                            onFocus={(e) => {
                                if (!errors.name) e.currentTarget.style.borderColor = 'hsl(var(--primary))';
                            }}
                            onBlur={(e) => {
                                if (!errors.name) e.currentTarget.style.borderColor = 'var(--border)';
                            }}
                        />
                        {errors.name && (
                            <span style={{ fontSize: '0.75rem', color: 'hsl(var(--destructive))', marginTop: '0.25rem' }}>{errors.name}</span>
                        )}
                    </div>

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
                        <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--foreground)' }}>Contraseña</label>
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
                        {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </button>
                </form>

                {/* Terms */}
                <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--muted-foreground)', textAlign: 'center', lineHeight: '1.5' }}>
                    Al registrarte, aceptas nuestros{' '}
                    <Link href="/terms" style={{ color: 'hsl(var(--primary))', textDecoration: 'none' }}>Términos de Servicio</Link>
                    {' '}y{' '}
                    <Link href="/privacy" style={{ color: 'hsl(var(--primary))', textDecoration: 'none' }}>Política de Privacidad</Link>
                </p>

                {/* Login Link */}
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" style={{ color: 'hsl(var(--primary))', fontWeight: '600', textDecoration: 'none' }}>
                            Ingresa aquí
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
