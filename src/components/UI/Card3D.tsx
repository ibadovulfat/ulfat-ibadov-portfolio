import React, { useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Card3DProps {
    children: React.ReactNode;
    className?: string;
    maxTilt?: number;
}

const Card3D: React.FC<Card3DProps> = ({
    children,
    className = '',
    maxTilt = 12
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
    const isMobile = useIsMobile();

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile || !cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        const rotateX = ((centerY - y) / centerY) * maxTilt;

        setRotation({ x: rotateX, y: rotateY });

        // Calculate glow position (percentage)
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;
        setGlowPosition({ x: glowX, y: glowY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setGlowPosition({ x: 50, y: 50 });
    };

    return (
        <div
            ref={cardRef}
            className={`card-3d-container ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: isMobile
                    ? 'none'
                    : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`,
                transition: 'transform 0.15s ease-out'
            }}
        >
            <div className="relative w-full h-full">
                {children}
                {!isMobile && (
                    <div
                        className="absolute inset-0 pointer-events-none rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Card3D;
