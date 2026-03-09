import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/hooks/use-theme';

type Particle = {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
};

const CyberNetwork: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const animationFrameId = useRef<number>(0);
    const mouse = useRef({ x: -1000, y: -1000, active: false });
    const isMobile = useIsMobile();
    const { theme } = useTheme();

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        // Handle High-DPI displays (Retina)
        const dpr = window.devicePixelRatio || 1;

        const resizeCanvas = () => {
            // Set actual size in memory (scaled to account for extra pixel density).
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            // Normalize coordinate system to use css pixels.
            ctx.scale(dpr, dpr);

            // Set display size.
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            // Determine colors based on active theme
            const isDark = theme === 'dark';

            // Calculate particle amount based on screen size to maintain performance
            const particleCount = isMobile
                ? Math.min(40, Math.floor((window.innerWidth * window.innerHeight) / 15000))
                : Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 9000));

            particles.current = [];

            for (let i = 0; i < particleCount; i++) {
                particles.current.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: Math.random() * (isMobile ? 1.5 : 2.5) + 0.5,
                    speedX: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.6),
                    speedY: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.6),
                    opacity: Math.random() * 0.5 + 0.3,
                });
            }
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Mouse interaction functionality
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY, active: true };
        };

        const handleMouseOut = () => {
            mouse.current = { x: -1000, y: -1000, active: false };
        };

        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseout', handleMouseOut);
        }

        const animate = () => {
            if (!ctx || !canvas) return;

            // Clear canvas on each frame
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // Determine current theme colors
            const isDark = theme === 'dark';
            // For Dark theme: White/Light Grey. For Light theme: Dark Grey/Black
            const particleColor = isDark ? '255, 255, 255' : '15, 23, 42';
            const lineColor = isDark ? '255, 255, 255' : '15, 23, 42';
            const highlightColor = isDark ? '220, 38, 38' : '220, 38, 38'; // Red accent on interaction

            particles.current.forEach((particle, index) => {
                // Move particles
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around edges
                if (particle.x < 0) particle.x = window.innerWidth;
                if (particle.x > window.innerWidth) particle.x = 0;
                if (particle.y < 0) particle.y = window.innerHeight;
                if (particle.y > window.innerHeight) particle.y = 0;

                // Interaction with mouse (Repel effect + Connection)
                let dxMouse = particle.x - mouse.current.x;
                let dyMouse = particle.y - mouse.current.y;
                let distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                let maxMouseDist = 150;

                let nodeColor = particleColor;
                let pOpacity = particle.opacity;

                if (mouse.current.active && distanceMouse < maxMouseDist && !isMobile) {
                    // Push particles slightly away
                    const forceDirectionX = dxMouse / distanceMouse;
                    const forceDirectionY = dyMouse / distanceMouse;
                    const force = (maxMouseDist - distanceMouse) / maxMouseDist;

                    particle.x += forceDirectionX * force * 1.5;
                    particle.y += forceDirectionY * force * 1.5;

                    nodeColor = highlightColor;
                    pOpacity = 0.8; // Brighten up when interacted

                    // Connect to mouse
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${highlightColor}, ${(1 - distanceMouse / maxMouseDist) * 0.4})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(mouse.current.x, mouse.current.y);
                    ctx.stroke();
                }

                // Draw the particle
                ctx.fillStyle = `rgba(${nodeColor}, ${pOpacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // Connections between particles
                const connectionDistance = isMobile ? 70 : 120;

                for (let j = index + 1; j < particles.current.length; j++) {
                    const dx = particles.current[j].x - particle.x;
                    const dy = particles.current[j].y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const lineOpacity = (1 - distance / connectionDistance) * 0.3;

                        // If one of the connected lines is near the mouse, make it red too
                        const isNearMouse = distanceMouse < maxMouseDist ||
                            Math.sqrt(Math.pow(particles.current[j].x - mouse.current.x, 2) + Math.pow(particles.current[j].y - mouse.current.y, 2)) < maxMouseDist;

                        ctx.strokeStyle = `rgba(${isNearMouse && mouse.current.active ? highlightColor : lineColor}, ${lineOpacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(particles.current[j].x, particles.current[j].y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (!isMobile) {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseout', handleMouseOut);
            }
            cancelAnimationFrame(animationFrameId.current);
        };
    }, [isMobile, theme]);

    return (
        <div className="absolute inset-0 z-[-10] w-full h-full pointer-events-auto">
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
            />
        </div>
    );
};

export default CyberNetwork;
