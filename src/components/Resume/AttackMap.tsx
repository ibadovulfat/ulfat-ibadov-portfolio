import React, { useEffect, useState } from 'react';

interface Attack {
    id: number;
    from: [number, number]; // [x, y] percentage
    to: [number, number];
    color: string;
}

const AttackMap: React.FC<{ opacity?: number }> = ({ opacity = 0.2 }) => {
    const [attacks, setAttacks] = useState<Attack[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newAttack: Attack = {
                id: Date.now(),
                from: [Math.random() * 100, Math.random() * 100],
                to: [Math.random() * 100, Math.random() * 100],
                color: Math.random() > 0.5 ? '#ef4444' : '#10b981' // red or green
            };

            setAttacks(prev => [...prev.slice(-10), newAttack]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden bg-black" style={{ opacity }}>
            {/* World Map SVG (Simplified) */}
            <svg
                viewBox="0 0 100 50"
                className="w-full h-full opacity-20"
                preserveAspectRatio="xMidYMid slice"
            >
                <path
                    d="M10,10 L20,10 L25,15 L30,12 L35,18 L40,15 L50,20 L60,15 L70,18 L80,10 L90,12 L90,30 L80,35 L70,32 L60,38 L50,35 L40,40 L30,38 L20,42 L10,35 Z"
                    fill="none"
                    stroke="#333"
                    strokeWidth="0.2"
                />
                {/* Simplified continents dots */}
                {[...Array(200)].map((_, i) => (
                    <circle
                        key={i}
                        cx={Math.random() * 100}
                        cy={Math.random() * 50}
                        r="0.1"
                        fill="#444"
                    />
                ))}

                {/* Attacks */}
                {attacks.map(attack => (
                    <g key={attack.id}>
                        <circle cx={attack.from[0]} cy={attack.from[1] / 2} r="0.4" fill={attack.color}>
                            <animate attributeName="opacity" values="0;1;0" dur="2s" fill="freeze" />
                        </circle>
                        <circle cx={attack.to[0]} cy={attack.to[1] / 2} r="0.4" fill={attack.color}>
                            <animate attributeName="opacity" values="0;1;0" dur="2s" fill="freeze" />
                        </circle>
                        <line
                            x1={attack.from[0]}
                            y1={attack.from[1] / 2}
                            x2={attack.to[0]}
                            y2={attack.to[1] / 2}
                            stroke={attack.color}
                            strokeWidth="0.1"
                            strokeDasharray="1, 1"
                        >
                            <animate attributeName="stroke-dashoffset" from="2" to="0" dur="2s" infinite />
                            <animate attributeName="opacity" values="0;0.5;0" dur="2s" fill="freeze" />
                        </line>
                    </g>
                ))}
            </svg>

            {/* Glitch Overlay */}
            <div className="absolute inset-0 scanlines pointer-events-none opacity-10" />

            <style>{`
        .scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(255, 255, 255, 0.05) 50%
          );
          background-size: 100% 4px;
        }
      `}</style>
        </div>
    );
};

export default AttackMap;
