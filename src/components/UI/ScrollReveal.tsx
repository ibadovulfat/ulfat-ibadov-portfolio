import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
    children: React.ReactNode;
    variant?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn';
    delay?: number;
    duration?: number;
    className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    variant = 'fadeIn',
    delay = 0,
    duration = 600,
    className = ''
}) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '-50px'
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    const getVariantClasses = () => {
        const baseClasses = 'transition-all';
        const variants = {
            fadeIn: isVisible ? 'opacity-100' : 'opacity-0',
            slideUp: isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            slideLeft: isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
            slideRight: isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8',
            scaleIn: isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        };

        return `${baseClasses} ${variants[variant]}`;
    };

    return (
        <div
            ref={elementRef}
            className={`${getVariantClasses()} ${className}`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
