
import React, { useRef, useEffect } from 'react';
import { Shield, Lock, Code, Server, Database, Network } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
};

const PenetrationTestingScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reduce particle count on mobile for better performance
      const particleCount = isMobile 
        ? Math.min(40, Math.floor(window.innerWidth * window.innerHeight / 15000))
        : Math.min(100, Math.floor(window.innerWidth * window.innerHeight / 10000));
      
      particles.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + (isMobile ? 1 : 1.5),
          speedX: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
          speedY: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
          opacity: Math.random() * 0.5 + (isMobile ? 0.05 : 0.1)
        });
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(155, 135, 245, 0.3)';  // Reduced opacity for better text readability
      ctx.strokeStyle = 'rgba(155, 135, 245, 0.4)'; // Reduced opacity for better text readability
      ctx.lineWidth = 0.5;
      
      particles.current.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        ctx.globalAlpha = particle.opacity * 0.8;  // Further reduced overall opacity
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // On mobile, reduce connection distance for better performance
        const connectionDistance = isMobile ? 60 : 100;
        
        for (let j = index + 1; j < particles.current.length; j++) {
          const dx = particles.current[j].x - particle.x;
          const dy = particles.current[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.globalAlpha = (1 - distance / connectionDistance) * (isMobile ? 0.05 : 0.1);  // Reduced opacity
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
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [isMobile]);
  
  // Only apply parallax effect on non-mobile devices
  useEffect(() => {
    if (!iconsRef.current || isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const icons = iconsRef.current?.children;
      if (!icons) return;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const centerX = windowWidth / 2;
      const centerY = windowHeight / 2;
      
      const moveX = (mouseX - centerX) / centerX;
      const moveY = (mouseY - centerY) / centerY;
      
      for (let i = 0; i < icons.length; i++) {
        const icon = icons[i] as HTMLElement;
        const depth = parseFloat(icon.getAttribute('data-depth') || '0');
        const translateX = moveX * depth * 50;
        const translateY = moveY * depth * 50;
        
        icon.style.transform = `translate(${translateX}px, ${translateY}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return (
    <div className="penetration-testing-scene relative h-full w-full pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-[-1] h-full w-full"
      />
      
      {/* Only render icons on non-mobile devices with proper positioning */}
      {!isMobile && (
        <div 
          ref={iconsRef}
          className="absolute inset-0 z-[-1] flex items-center justify-center"
        >
          <div data-depth="1.2" className="absolute transition-transform duration-200 ease-out" style={{ left: '25%', top: '30%' }}>
            <Shield className="h-12 w-12 text-primary/40" />
          </div>
          <div data-depth="0.8" className="absolute transition-transform duration-200 ease-out" style={{ right: '30%', top: '25%' }}>
            <Lock className="h-10 w-10 text-primary/50" />
          </div>
          <div data-depth="1.5" className="absolute transition-transform duration-200 ease-out" style={{ left: '20%', bottom: '35%' }}>
            <Code className="h-14 w-14 text-primary/30" />
          </div>
          <div data-depth="1.0" className="absolute transition-transform duration-200 ease-out" style={{ right: '20%', bottom: '30%' }}>
            <Server className="h-12 w-12 text-primary/40" />
          </div>
          <div data-depth="0.6" className="absolute transition-transform duration-200 ease-out" style={{ left: '40%', top: '20%' }}>
            <Database className="h-8 w-8 text-primary/50" />
          </div>
          <div data-depth="1.3" className="absolute transition-transform duration-200 ease-out" style={{ right: '35%', bottom: '20%' }}>
            <Network className="h-10 w-10 text-primary/40" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PenetrationTestingScene;
