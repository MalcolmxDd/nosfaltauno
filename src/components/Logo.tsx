export default function Logo({ className, style }: { className?: string, style?: React.CSSProperties }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className={className}
            style={style}
            width="150"
            height="150"
        >
            <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#15803d', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="ballGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#f3f4f6', stopOpacity: 1 }} />
                </linearGradient>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="0" dy="4" result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Shield Background with depth */}
            <path
                d="M100 15 L175 50 V95 C175 150 100 195 100 195 C100 195 25 150 25 95 V50 L100 15 Z"
                fill="url(#shieldGrad)"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="3"
                filter="url(#shadow)"
            />
            
            {/* Inner shield highlight */}
            <path
                d="M100 20 L165 50 V90 C165 140 100 185 100 185 C100 185 35 140 35 90 V50 L100 20 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1"
            />

            {/* Soccer Ball - More detailed and professional */}
            <g transform="translate(100, 100)">
                {/* Ball base */}
                <circle
                    cx="0"
                    cy="0"
                    r="38"
                    fill="url(#ballGrad)"
                    stroke="#1e293b"
                    strokeWidth="2.5"
                    filter="url(#shadow)"
                />
                
                {/* Hexagon pattern - top */}
                <path
                    d="M0 -30 L13 -20 L13 -5 L0 5 L-13 -5 L-13 -20 Z"
                    fill="#1e293b"
                    stroke="none"
                />
                
                {/* Pentagon pattern - center left */}
                <path
                    d="M-25 0 L-15 -12 L-5 -8 L-5 8 L-15 12 Z"
                    fill="#1e293b"
                    stroke="none"
                />
                
                {/* Pentagon pattern - center right */}
                <path
                    d="M25 0 L15 -12 L5 -8 L5 8 L15 12 Z"
                    fill="#1e293b"
                    stroke="none"
                />
                
                {/* Hexagon pattern - bottom */}
                <path
                    d="M0 30 L13 20 L13 5 L0 -5 L-13 5 L-13 20 Z"
                    fill="#1e293b"
                    stroke="none"
                />
                
                {/* Connecting lines */}
                <line x1="0" y1="-30" x2="-15" y2="-12" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="-30" x2="15" y2="-12" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                <line x1="-15" y1="-12" x2="-25" y2="0" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                <line x1="15" y1="-12" x2="25" y2="0" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                <line x1="-25" y1="0" x2="-15" y2="12" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                <line x1="25" y1="0" x2="15" y2="12" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                <line x1="-15" y1="12" x2="0" y2="30" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                <line x1="15" y1="12" x2="0" y2="30" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                
                {/* Highlight on ball */}
                <ellipse
                    cx="-8"
                    cy="-10"
                    rx="12"
                    ry="8"
                    fill="rgba(255, 255, 255, 0.4)"
                    opacity="0.6"
                />
            </g>

            {/* Text "NF1" with better styling */}
            <text
                x="100"
                y="170"
                textAnchor="middle"
                fill="white"
                fontSize="28"
                fontWeight="800"
                fontFamily="system-ui, -apple-system, sans-serif"
                letterSpacing="2"
                style={{ 
                    textShadow: '0px 2px 8px rgba(0,0,0,0.4)',
                    filter: 'url(#glow)'
                }}
            >
                NF1
            </text>
        </svg>
    );
}
