
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ParallaxEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  style?: React.CSSProperties;
}

const ParallaxEffect: React.FC<ParallaxEffectProps> = ({
  children,
  speed = 0.1,
  className,
  direction = "up",
  style,
  ...props
}) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setOffset(0); // Reset offset on mobile
      return;
    }

    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const windowHeight = window.innerHeight;
      
      // Calculate offset based on element position relative to viewport
      const newOffset = (windowHeight - elementTop) * speed;
      setOffset(newOffset);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Calculate initial position
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, isMobile]);

  const getTransform = () => {
    switch (direction) {
      case "up":
        return `translateY(${-offset}px)`;
      case "down":
        return `translateY(${offset}px)`;
      case "left":
        return `translateX(${-offset}px)`;
      case "right":
        return `translateX(${offset}px)`;
      default:
        return `translateY(${-offset}px)`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn("parallax-layer", className)}
      style={{
        ...style,
        transform: !isMobile ? getTransform() : "none",
        transition: "transform 0.1s ease-out",
        willChange: "transform",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ParallaxEffect;
