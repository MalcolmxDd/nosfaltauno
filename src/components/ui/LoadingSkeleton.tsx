interface LoadingSkeletonProps {
    variant?: 'card' | 'list' | 'text';
    lines?: number;
}

export default function LoadingSkeleton({ variant = 'text', lines = 3 }: LoadingSkeletonProps) {
    const shimmerStyle: React.CSSProperties = {
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        animation: 'shimmer 1.5s ease-in-out infinite',
        backgroundImage: 'linear-gradient(90deg, var(--bg-card) 25%, var(--bg-elevated) 50%, var(--bg-card) 75%)',
        backgroundSize: '200% 100%',
    };

    if (variant === 'card') {
        return (
            <div className="bg-card rounded-md p-4">
                <div style={{ ...shimmerStyle, height: '1rem', width: '60%', marginBottom: '1rem' }} />
                <div style={{ ...shimmerStyle, height: '0.75rem', width: '40%', marginBottom: '0.75rem' }} />
                <div style={{ ...shimmerStyle, height: '2.5rem', marginTop: '1rem' }} />
            </div>
        );
    }

    if (variant === 'list') {
        return (
            <div className="flex flex-col gap-3">
                {Array.from({ length: lines }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-3">
                        <div style={{ ...shimmerStyle, width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0 }} />
                        <div className="flex-1">
                            <div style={{ ...shimmerStyle, height: '0.875rem', width: '50%', marginBottom: '0.5rem' }} />
                            <div style={{ ...shimmerStyle, height: '0.75rem', width: '30%' }} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 p-4">
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        ...shimmerStyle,
                        height: '0.875rem',
                        width: `${50 + Math.random() * 40}%`,
                    }}
                />
            ))}
        </div>
    );
}
