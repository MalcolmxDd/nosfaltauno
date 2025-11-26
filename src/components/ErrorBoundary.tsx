"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div
                    style={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'hsl(var(--card))',
                            borderRadius: 'var(--radius)',
                            padding: '2rem',
                            maxWidth: '500px',
                            width: '100%',
                            border: '1px solid var(--border)',
                        }}
                    >
                        <AlertTriangle
                            size={64}
                            color="hsl(var(--destructive))"
                            style={{ marginBottom: '1rem' }}
                        />
                        <h1
                            style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem',
                            }}
                        >
                            Algo salió mal
                        </h1>
                        <p
                            style={{
                                color: 'var(--muted-foreground)',
                                marginBottom: '1.5rem',
                            }}
                        >
                            {this.state.error?.message ||
                                'Ocurrió un error inesperado. Por favor, intenta nuevamente.'}
                        </p>
                        <div
                            style={{
                                display: 'flex',
                                gap: '0.75rem',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            <button
                                onClick={this.handleReset}
                                className="btn btn-primary"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                }}
                            >
                                <RefreshCw size={18} />
                                Intentar de nuevo
                            </button>
                            <Link
                                href="/feed"
                                className="btn btn-ghost"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                }}
                            >
                                <Home size={18} />
                                Ir al inicio
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

