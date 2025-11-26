"use client";

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: number;
    color?: string;
    fullScreen?: boolean;
    message?: string;
}

export default function LoadingSpinner({ 
    size = 32, 
    color = 'hsl(var(--primary))',
    fullScreen = false,
    message 
}: LoadingSpinnerProps) {
    const spinner = (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '1rem',
            ...(fullScreen ? {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'hsl(var(--background) / 0.9)',
                backdropFilter: 'blur(4px)',
                zIndex: 9998,
            } : {
                padding: '2rem',
            })
        }}>
            <Loader2 size={size} color={color} style={{ animation: 'spin 1s linear infinite' }} />
            {message && (
                <p style={{ 
                    color: 'var(--muted-foreground)', 
                    fontSize: '0.875rem',
                    margin: 0 
                }}>
                    {message}
                </p>
            )}
        </div>
    );

    return spinner;
}

// Add CSS animation
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    `;
    if (!document.head.querySelector('style[data-spinner]')) {
        style.setAttribute('data-spinner', 'true');
        document.head.appendChild(style);
    }
}

