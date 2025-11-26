"use client";

import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    isOpen,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    variant = 'danger',
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!isOpen) return null;

    const getColors = () => {
        switch (variant) {
            case 'danger':
                return {
                    icon: 'hsl(var(--destructive))',
                    button: 'hsl(var(--destructive))',
                };
            case 'warning':
                return {
                    icon: 'hsl(38, 92%, 50%)',
                    button: 'hsl(38, 92%, 50%)',
                };
            default:
                return {
                    icon: 'hsl(var(--primary))',
                    button: 'hsl(var(--primary))',
                };
        }
    };

    const colors = getColors();

    return (
        <>
            {/* Backdrop */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 9997,
                    animation: 'fadeIn 0.2s ease-out',
                }}
                onClick={onCancel}
            />
            {/* Dialog */}
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'hsl(var(--card))',
                    borderRadius: 'var(--radius)',
                    padding: '1.5rem',
                    maxWidth: '400px',
                    width: 'calc(100% - 2rem)',
                    zIndex: 9998,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                    animation: 'slideUp 0.3s ease-out',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                    <AlertTriangle size={24} color={colors.icon} style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                    <div style={{ flex: 1 }}>
                        <h2
                            style={{
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem',
                            }}
                        >
                            {title}
                        </h2>
                        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', margin: 0 }}>
                            {message}
                        </p>
                    </div>
                    <button
                        onClick={onCancel}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--muted-foreground)',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            opacity: 0.7,
                        }}
                        aria-label="Cerrar"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onCancel}
                        className="btn btn-ghost"
                        style={{ minWidth: '100px' }}
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="btn"
                        style={{
                            backgroundColor: colors.button,
                            color: 'white',
                            minWidth: '100px',
                        }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </>
    );
}

// Add CSS animations
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        @keyframes slideUp {
            from {
                transform: translate(-50%, -40%);
                opacity: 0;
            }
            to {
                transform: translate(-50%, -50%);
                opacity: 1;
            }
        }
    `;
    if (!document.head.querySelector('style[data-dialog]')) {
        style.setAttribute('data-dialog', 'true');
        document.head.appendChild(style);
    }
}

