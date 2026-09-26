import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Radar, Lock, Activity } from 'lucide-react';

const useCountUp = (target: number, duration = 1400, start = false) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!start) return;
        let raf = 0;
        const t0 = performance.now();
        const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * target));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, duration, start]);
    return value;
};

const useUTCClock = () => {
    const [now, setNow] = useState<string>('--:--:--');
    useEffect(() => {
        const fmt = () =>
            new Date().toISOString().slice(11, 19);
        setNow(fmt());
        const id = setInterval(() => setNow(fmt()), 1000);
        return () => clearInterval(id);
    }, []);
    return now;
};

const AnimatedWord: React.FC<{ text: string; className?: string; delayBase?: number }> = ({
    text,
    className = '',
    delayBase = 0,
}) => (
    <span className={`rt-word ${className}`}>
        <span style={{ animationDelay: `${delayBase}ms`, whiteSpace: 'nowrap' }}>{text}</span>
    </span>
);

interface Props {
    moduleCount: number;
    moduleNames: string[];
}

const RedTeamHero: React.FC<Props> = ({ moduleCount, moduleNames }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const modules = useCountUp(moduleCount, 1400, mounted);
    const coverage = useCountUp(100, 1600, mounted);
    const clock = useUTCClock();

    const blips = useRef(
        Array.from({ length: 5 }, () => ({
            angle: Math.random() * Math.PI * 2,
            radius: 30 + Math.random() * 80,
            delay: Math.random() * 2,
        }))
    ).current;

    return (
        <div className="relative w-full max-w-7xl mx-auto">
            {/* Telemetry bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-10 md:mb-16 pb-4 border-b border-border/60 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" style={{ animation: 'rt-blip 2s infinite' }} />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    Status: Operational
                </div>
                <div className="hidden sm:flex items-center gap-6">
                    <span>Node: RT-01</span>
                    <span className="tabular-nums">{clock} UTC</span>
                </div>
            </div>

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-10 items-center">
                {/* Left - editorial */}
                <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-6 md:mb-8 font-mono text-xs tracking-[0.28em] uppercase text-red-500">
                        <span className="h-px w-10 bg-red-500/70" />
                        Offensive Security Lab
                    </div>

                    <h1 className="font-display font-bold tracking-tight leading-[0.9] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
                        <AnimatedWord text="Red Team" className="block" />
                        <AnimatedWord text="Showcase" className="block rt-outline-text" delayBase={360} />
                    </h1>

                    <p
                        className="mt-8 max-w-md text-base md:text-lg text-muted-foreground leading-relaxed transition-all duration-700"
                        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(16px)', transitionDelay: '700ms' }}
                    >
                        A hands-on collection of interactive demonstrations - adversary emulation,
                        attack-chain analysis and defensive research, built to be explored live.
                    </p>

                    {/* Stats */}
                    <div
                        className="mt-12 grid grid-cols-3 max-w-lg divide-x divide-border transition-all duration-700"
                        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(16px)', transitionDelay: '850ms' }}
                    >
                        <div className="pr-4">
                            <div className="font-display font-bold text-3xl md:text-4xl tabular-nums">{modules}</div>
                            <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Modules</div>
                        </div>
                        <div className="px-4">
                            <div className="font-display font-bold text-3xl md:text-4xl tabular-nums">{coverage}<span className="text-red-500">%</span></div>
                            <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Hands-on</div>
                        </div>
                        <div className="pl-4">
                            <div className="font-display font-bold text-3xl md:text-4xl">Live</div>
                            <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Environment</div>
                        </div>
                    </div>

                    <div
                        className="mt-14 inline-flex items-center gap-2 text-muted-foreground font-mono text-[11px] uppercase tracking-[0.2em] transition-opacity duration-700"
                        style={{ opacity: mounted ? 1 : 0, transitionDelay: '1000ms' }}
                    >
                        <ArrowDown className="h-4 w-4 animate-bounce" />
                        Scroll to explore
                    </div>
                </div>

                {/* Right - radar visual */}
                <div className="relative hidden lg:flex items-center justify-center min-w-0">
                    <div
                        className="relative aspect-square w-full max-w-[420px] transition-all duration-1000"
                        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'scale(1)' : 'scale(0.9)' }}
                    >
                        {/* corner frame */}
                        <div className="absolute -inset-2 pointer-events-none">
                            {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((c, i) => (
                                <span key={i} className={`absolute h-6 w-6 border-red-500/50 ${c}`} />
                            ))}
                        </div>

                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            <defs>
                                <radialGradient id="rt-sweep-grad" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="rgb(239,68,68)" stopOpacity="0.35" />
                                    <stop offset="100%" stopColor="rgb(239,68,68)" stopOpacity="0" />
                                </radialGradient>
                            </defs>

                            {/* rings */}
                            {[30, 55, 80, 95].map((r) => (
                                <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.8" />
                            ))}
                            {/* crosshair */}
                            <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.8" />
                            <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.8" />
                            <line x1="30" y1="30" x2="170" y2="170" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.8" />
                            <line x1="170" y1="30" x2="30" y2="170" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.8" />

                            {/* rotating sweep */}
                            <g className="rt-radar-sweep">
                                <path d="M100 100 L100 5 A95 95 0 0 1 180 55 Z" fill="url(#rt-sweep-grad)" />
                                <line x1="100" y1="100" x2="100" y2="5" stroke="rgb(239,68,68)" strokeOpacity="0.7" strokeWidth="1" />
                            </g>

                            {/* center */}
                            <circle cx="100" cy="100" r="2.5" fill="rgb(239,68,68)" />

                            {/* blips */}
                            {blips.map((b, i) => {
                                const x = 100 + Math.cos(b.angle) * b.radius;
                                const y = 100 + Math.sin(b.angle) * b.radius;
                                return (
                                    <g key={i}>
                                        <circle cx={x} cy={y} r="2.2" fill="rgb(239,68,68)" className="rt-blip" style={{ animationDelay: `${b.delay}s` }} />
                                        <circle cx={x} cy={y} r="2.2" fill="none" stroke="rgb(239,68,68)" strokeWidth="0.6" strokeOpacity="0.4" />
                                    </g>
                                );
                            })}
                        </svg>

                        {/* readouts */}
                        <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/70 leading-relaxed">
                            <div className="flex items-center gap-1.5"><Radar className="h-3 w-3 text-red-500" /> Attack Surface</div>
                        </div>
                        <div className="absolute bottom-3 right-3 text-right font-mono text-[9px] uppercase tracking-wider text-muted-foreground/70 leading-relaxed">
                            <div className="flex items-center justify-end gap-1.5">Contacts: {blips.length} <Activity className="h-3 w-3 text-green-500" /></div>
                            <div className="flex items-center justify-end gap-1.5">Secure Channel <Lock className="h-3 w-3" /></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Marquee */}
            <div className="mt-16 md:mt-24 border-y border-border/60 overflow-hidden relative h-14">
                <div className="rt-marquee absolute inset-y-0 left-0 flex items-center whitespace-nowrap gap-8 w-max font-mono text-sm text-muted-foreground/50 uppercase tracking-widest">
                    {[...moduleNames, ...moduleNames].map((s, i) => (
                        <span key={i} className="flex items-center gap-8">
                            <span className="text-red-500/50">✦</span>
                            {s}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RedTeamHero;
