import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Shape {
  x: number;
  y: number;
  size: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  speedX: number;
  speedY: number;
  type: 'cube' | 'octahedron' | 'icosahedron';
}

const FloatingShapes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<Shape[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize shapes - fewer on mobile
    const shapeCount = isMobile ? 3 : 6;
    shapesRef.current = Array.from({ length: shapeCount }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: isMobile ? 60 + Math.random() * 40 : 80 + Math.random() * 60,
      rotationX: Math.random() * 360,
      rotationY: Math.random() * 360,
      rotationZ: Math.random() * 360,
      speedX: (Math.random() - 0.5) * 0.02,
      speedY: (Math.random() - 0.5) * 0.02,
      type: ['cube', 'octahedron', 'icosahedron'][i % 3] as Shape['type']
    }));

    // Mouse tracking for parallax (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      };
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapesRef.current.map((shape, index) => (
        <div
          key={index}
          className="floating-shape absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            animationDelay: `${index * -2}s`,
            '--mouse-x': mouseRef.current.x,
            '--mouse-y': mouseRef.current.y,
          } as React.CSSProperties}
        >
          {shape.type === 'cube' && <WireframeCube />}
          {shape.type === 'octahedron' && <WireframeOctahedron />}
          {shape.type === 'icosahedron' && <WireframeIcosahedron />}
        </div>
      ))}
    </div>
  );
};

const WireframeCube: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="cubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(155, 135, 245, 0.7)" />
        <stop offset="100%" stopColor="rgba(59, 130, 246, 0.6)" />
      </linearGradient>
    </defs>
    {/* Front face */}
    <path d="M 25 35 L 75 35 L 75 85 L 25 85 Z" fill="none" stroke="url(#cubeGradient)" strokeWidth="1.5" />
    {/* Back face */}
    <path d="M 35 25 L 85 25 L 85 75 L 35 75 Z" fill="none" stroke="url(#cubeGradient)" strokeWidth="1.5" opacity="0.8" />
    {/* Connecting lines */}
    <line x1="25" y1="35" x2="35" y2="25" stroke="url(#cubeGradient)" strokeWidth="1.5" opacity="0.7" />
    <line x1="75" y1="35" x2="85" y2="25" stroke="url(#cubeGradient)" strokeWidth="1.5" opacity="0.7" />
    <line x1="75" y1="85" x2="85" y2="75" stroke="url(#cubeGradient)" strokeWidth="1.5" opacity="0.7" />
    <line x1="25" y1="85" x2="35" y2="75" stroke="url(#cubeGradient)" strokeWidth="1.5" opacity="0.7" />
  </svg>
);

const WireframeOctahedron: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="octaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(139, 92, 246, 0.7)" />
        <stop offset="100%" stopColor="rgba(59, 130, 246, 0.6)" />
      </linearGradient>
    </defs>
    {/* Top pyramid */}
    <path d="M 50 15 L 75 50 L 50 50 Z" fill="none" stroke="url(#octaGradient)" strokeWidth="1.5" />
    <path d="M 50 15 L 25 50 L 50 50 Z" fill="none" stroke="url(#octaGradient)" strokeWidth="1.5" />
    <path d="M 50 15 L 75 50 L 25 50 Z" fill="none" stroke="url(#octaGradient)" strokeWidth="1.5" opacity="0.8" />
    {/* Bottom pyramid */}
    <path d="M 50 85 L 75 50 L 50 50 Z" fill="none" stroke="url(#octaGradient)" strokeWidth="1.5" />
    <path d="M 50 85 L 25 50 L 50 50 Z" fill="none" stroke="url(#octaGradient)" strokeWidth="1.5" />
    <path d="M 50 85 L 75 50 L 25 50 Z" fill="none" stroke="url(#octaGradient)" strokeWidth="1.5" opacity="0.8" />
    {/* Middle square */}
    <path d="M 25 50 L 75 50" stroke="url(#octaGradient)" strokeWidth="1.5" />
  </svg>
);

const WireframeIcosahedron: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="icosaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(16, 185, 129, 0.7)" />
        <stop offset="100%" stopColor="rgba(59, 130, 246, 0.6)" />
      </linearGradient>
    </defs>
    {/* Simplified icosahedron wireframe */}
    <polygon points="50,10 30,35 70,35" fill="none" stroke="url(#icosaGradient)" strokeWidth="1.5" />
    <polygon points="30,35 15,60 50,50" fill="none" stroke="url(#icosaGradient)" strokeWidth="1.5" />
    <polygon points="70,35 85,60 50,50" fill="none" stroke="url(#icosaGradient)" strokeWidth="1.5" />
    <polygon points="15,60 30,85 50,75" fill="none" stroke="url(#icosaGradient)" strokeWidth="1.5" />
    <polygon points="85,60 70,85 50,75" fill="none" stroke="url(#icosaGradient)" strokeWidth="1.5" />
    <polygon points="30,85 50,90 70,85" fill="none" stroke="url(#icosaGradient)" strokeWidth="1.5" />
    <line x1="50" y1="10" x2="50" y2="50" stroke="url(#icosaGradient)" strokeWidth="1.5" opacity="0.7" />
    <line x1="50" y1="50" x2="50" y2="75" stroke="url(#icosaGradient)" strokeWidth="1.5" opacity="0.7" />
  </svg>
);

export default FloatingShapes;
