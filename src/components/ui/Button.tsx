"use client";

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    type?: 'button' | 'submit';
    fullWidth?: boolean;
    ariaLabel?: string;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled = false,
    loading = false,
    className = '',
    type = 'button',
    fullWidth = false,
    ariaLabel,
}: ButtonProps) {
    const baseClass = `btn btn-${variant} btn-${size} ${fullWidth ? 'w-full' : ''} ${className}`;

    return (
        <button
            type={type}
            className={baseClass}
            onClick={onClick}
            disabled={disabled || loading}
            aria-label={ariaLabel}
            aria-busy={loading}
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <span className="loading-spinner" />
                    {children}
                </span>
            ) : children}
        </button>
    );
}
