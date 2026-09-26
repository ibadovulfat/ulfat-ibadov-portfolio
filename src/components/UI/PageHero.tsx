import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

interface PageHeroProps {
    eyebrow: string;
    title: React.ReactNode;
    subtitle: string;
    /** optional short meta tags shown under the subtitle, e.g. ["10 modules", "hands-on"] */
    meta?: string[];
    /** show the scroll cue (default true) */
    scrollCue?: boolean;
    /** optional actions (buttons) rendered under the subtitle */
    children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, subtitle, meta, scrollCue = true, children }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <section className="relative min-h-[88vh] flex items-center overflow-hidden">
            {/* backdrop */}
            <div className="pointer-events-none absolute inset-0 rt-grid-bg opacity-50" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(55%_60%_at_50%_0%,rgba(239,68,68,0.10),transparent_70%)]" />

            <div className="relative w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 text-center">
                <div
                    className="flex items-center justify-center gap-3 mb-7 font-mono text-xs tracking-[0.28em] uppercase text-red-500 transition-all duration-700"
                    style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(12px)' }}
                >
                    <span className="h-px w-8 bg-red-500/60" />
                    {eyebrow}
                    <span className="h-px w-8 bg-red-500/60" />
                </div>

                <h1
                    className="font-display font-bold tracking-tight leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-700"
                    style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(18px)', transitionDelay: '80ms' }}
                >
                    {title}
                </h1>

                <p
                    className="mt-7 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed transition-all duration-700"
                    style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(18px)', transitionDelay: '180ms' }}
                >
                    {subtitle}
                </p>

                {children && (
                    <div
                        className="mt-9 flex flex-wrap items-center justify-center gap-4 transition-all duration-700"
                        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(18px)', transitionDelay: '260ms' }}
                    >
                        {children}
                    </div>
                )}

                {meta && meta.length > 0 && (
                    <div
                        className="mt-9 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-all duration-700"
                        style={{ opacity: mounted ? 1 : 0, transitionDelay: '280ms' }}
                    >
                        {meta.map((m, i) => (
                            <React.Fragment key={m}>
                                {i > 0 && <span className="h-1 w-1 rounded-full bg-red-500/60" />}
                                <span className="px-3 py-1 rounded-full border border-border bg-muted/40">{m}</span>
                            </React.Fragment>
                        ))}
                    </div>
                )}

                {scrollCue && (
                    <div
                        className="mt-14 flex items-center justify-center gap-2 text-muted-foreground font-mono text-[11px] uppercase tracking-[0.2em] transition-opacity duration-700"
                        style={{ opacity: mounted ? 1 : 0, transitionDelay: '380ms' }}
                    >
                        <ArrowDown className="h-4 w-4 animate-bounce" />
                        Scroll
                    </div>
                )}
            </div>
        </section>
    );
};

export default PageHero;
