"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

interface ToastContextType {
    toasts: Toast[];
    showToast: (message: string, type?: ToastType, duration?: number) => void;
    removeToast: (id: string) => void;
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback(
        (message: string, type: ToastType = 'info', duration: number = 3000) => {
            const id = Math.random().toString(36).substring(2, 9);
            const newToast: Toast = { id, message, type, duration };

            setToasts((prev) => [...prev, newToast]);

            if (duration > 0) {
                setTimeout(() => {
                    removeToast(id);
                }, duration);
            }
        },
        [removeToast]
    );

    const success = useCallback((message: string, duration?: number) => {
        showToast(message, 'success', duration);
    }, [showToast]);

    const error = useCallback((message: string, duration?: number) => {
        showToast(message, 'error', duration);
    }, [showToast]);

    const info = useCallback((message: string, duration?: number) => {
        showToast(message, 'info', duration);
    }, [showToast]);

    const warning = useCallback((message: string, duration?: number) => {
        showToast(message, 'warning', duration);
    }, [showToast]);

    return (
        <ToastContext.Provider value={{ toasts, showToast, removeToast, success, error, info, warning }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
    if (toasts.length === 0) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: '5rem',
                right: '1rem',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                maxWidth: '400px',
                width: 'calc(100% - 2rem)',
            }}
        >
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
            ))}
        </div>
    );
}

function ToastItem({ toast, removeToast }: { toast: Toast; removeToast: (id: string) => void }) {
    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <CheckCircle size={20} />;
            case 'error':
                return <XCircle size={20} />;
            case 'warning':
                return <AlertCircle size={20} />;
            default:
                return <Info size={20} />;
        }
    };

    const getColors = () => {
        switch (toast.type) {
            case 'success':
                return {
                    bg: 'hsl(var(--primary))',
                    border: 'hsl(var(--primary))',
                    icon: 'white',
                };
            case 'error':
                return {
                    bg: 'hsl(var(--destructive))',
                    border: 'hsl(var(--destructive))',
                    icon: 'white',
                };
            case 'warning':
                return {
                    bg: 'hsl(38, 92%, 50%)',
                    border: 'hsl(38, 92%, 50%)',
                    icon: 'white',
                };
            default:
                return {
                    bg: 'hsl(var(--card))',
                    border: 'var(--border)',
                    icon: 'hsl(var(--primary))',
                };
        }
    };

    const colors = getColors();

    return (
        <div
            style={{
                backgroundColor: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: 'var(--radius)',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                animation: 'slideInRight 0.3s ease-out',
            }}
        >
            <div style={{ color: colors.icon, display: 'flex', alignItems: 'center' }}>{getIcon()}</div>
            <p style={{ flex: 1, color: toast.type === 'info' ? 'var(--foreground)' : 'white', fontSize: '0.875rem', margin: 0 }}>
                {toast.message}
            </p>
            <button
                onClick={() => removeToast(toast.id)}
                style={{
                    background: 'none',
                    border: 'none',
                    color: toast.type === 'info' ? 'var(--muted-foreground)' : 'white',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    opacity: 0.7,
                }}
                aria-label="Cerrar notificación"
            >
                <X size={16} />
            </button>
        </div>
    );
}

// Add CSS animation
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

