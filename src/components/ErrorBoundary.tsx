"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import styles from './ErrorBoundary.module.css';

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
                <div className={styles.wrapper}>
                    <div className={styles.card}>
                        <AlertTriangle size={56} className={styles.icon} />
                        <h1 className={styles.title}>Algo salió mal</h1>
                        <p className={styles.message}>
                            {this.state.error?.message ||
                                'Ocurrió un error inesperado. Por favor, intenta nuevamente.'}
                        </p>
                        <div className={styles.actions}>
                            <button onClick={this.handleReset} className="btn btn-primary">
                                <RefreshCw size={18} /> Intentar de nuevo
                            </button>
                            <Link href="/feed" className="btn btn-ghost">
                                <Home size={18} /> Ir al inicio
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

