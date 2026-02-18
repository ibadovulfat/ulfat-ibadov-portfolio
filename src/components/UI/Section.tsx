
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id?: string;
  className?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
}

const Section: React.FC<SectionProps> = ({
  children,
  id,
  className,
  fullWidth = false,
  fullHeight = false,
  ...props
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        "section-padding relative overflow-hidden",
        fullWidth ? "w-full" : "max-w-7xl mx-auto",
        fullHeight ? "min-h-screen" : "",
        isVisible && "animate-fade-in",
        className
      )}
      {...props}
    >
      <div className={cn(isVisible ? "animate-slide-up" : "opacity-0")}>
        {children}
      </div>
    </section>
  );
};

export default Section;
