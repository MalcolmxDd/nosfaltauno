export default function Logo({ className, style }: { className?: string, style?: React.CSSProperties }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className={className}
            style={style}
            width="150"
            height="150"
        >
            <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00e676" />
                    <stop offset="100%" stopColor="#00c853" />
                </linearGradient>
            </defs>
            <path
                d="M32 4 L56 16 L56 30 Q56 48 32 60 Q8 48 8 30 L8 16 Z"
                fill="url(#logoGrad)"
                stroke="#0d0d0d"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <text
                x="32" y="37"
                textAnchor="middle"
                fontFamily="Arial Black, Impact, sans-serif"
                fontSize="18"
                fontWeight="900"
                fill="#0d0d0d"
                letterSpacing="1"
            >
                NF1
            </text>
            <circle cx="32" cy="46" r="8" fill="#0d0d0d" />
            <text
                x="32" y="49"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="6"
                fontWeight="bold"
                fill="url(#logoGrad)"
                letterSpacing="1"
            >
                10
            </text>
        </svg>
    );
}
