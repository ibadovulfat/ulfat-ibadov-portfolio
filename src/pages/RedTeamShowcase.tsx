import React, { useState } from 'react';
import Section from '@/components/UI/Section';
import ScrollReveal from '@/components/UI/ScrollReveal';
import RedTeamHero from '@/components/UI/RedTeamHero';
import AdvancedLiveTerminal from '@/components/Advanced/AdvancedLiveTerminal';
import AttackChainVisualizer from '@/components/UI/AttackChainVisualizer';
import ExploitShowcase from '@/components/UI/ExploitShowcase';
import PacketFlowAnimation from '@/components/UI/PacketFlowAnimation';
import CVETimeline from '@/components/UI/CVETimeline';
import BinaryExploitViz from '@/components/UI/BinaryExploitViz';

import ThreatIntelFeed from '@/components/UI/ThreatIntelFeed';
import KernelExploitSim from '@/components/Advanced/KernelExploitSim';
import EDREvasionLab from '@/components/Advanced/EDREvasionLab';
import C2ProtocolBuilder from '@/components/Advanced/C2ProtocolBuilder';
import { Helmet } from 'react-helmet';
import { Target, Code, Activity, Shield, Binary, Rss, Cpu, ShieldOff, Radio, Skull } from 'lucide-react';

interface ShowcaseSection {
    id: string;
    title: string;
    description: string;
    tag: string;
    icon: React.ElementType;
    component: React.ComponentType;
}

const showcaseSections: ShowcaseSection[] = [
    {
        id: 'terminal',
        tag: 'Adversary Emulation',
        title: 'Advanced Terminal',
        description: 'APT-level attack scenarios with expert techniques',
        icon: Skull,
        component: AdvancedLiveTerminal
    },
    {
        id: 'attack-chain',
        tag: 'MITRE ATT&CK',
        title: 'Attack Chain Visualizer',
        description: 'MITRE ATT&CK kill chain with interactive technique exploration',
        icon: Target,
        component: AttackChainVisualizer
    },
    {
        id: 'exploits',
        tag: 'Exploitation',
        title: 'Exploit Showcase',
        description: 'Real-world exploit code snippets with detailed explanations',
        icon: Code,
        component: ExploitShowcase
    },
    {
        id: 'packets',
        tag: 'Network Analysis',
        title: 'Network Packet Flow',
        description: 'Animated visualization of network attacks and traffic patterns',
        icon: Activity,
        component: PacketFlowAnimation
    },
    {
        id: 'cve',
        tag: 'Vulnerability Research',
        title: 'CVE Timeline',
        description: 'Interactive timeline of critical vulnerabilities and exploits',
        icon: Shield,
        component: CVETimeline
    },
    {
        id: 'binary',
        tag: 'Memory Corruption',
        title: 'Binary Exploitation',
        description: 'Step-by-step stack buffer overflow visualization',
        icon: Binary,
        component: BinaryExploitViz
    },

    {
        id: 'threat-intel',
        tag: 'Threat Intelligence',
        title: 'Threat Intelligence Feed',
        description: 'Live threat intelligence updates and security advisories',
        icon: Rss,
        component: ThreatIntelFeed
    },
    {
        id: 'kernel-exploit',
        tag: 'Privilege Escalation',
        title: 'Kernel Exploitation',
        description: 'Advanced kernel UAF exploitation with SMEP bypass and privilege escalation',
        icon: Cpu,
        component: KernelExploitSim
    },
    {
        id: 'edr-evasion',
        tag: 'Defense Evasion',
        title: 'EDR Evasion Lab',
        description: 'Advanced EDR bypass techniques including direct syscalls and Heaven\'s Gate',
        icon: ShieldOff,
        component: EDREvasionLab
    },
    {
        id: 'c2-builder',
        tag: 'Command & Control',
        title: 'C2 Protocol Builder',
        description: 'Design custom Command & Control protocols with encryption and obfuscation',
        icon: Radio,
        component: C2ProtocolBuilder
    }
];

const pad2 = (n: number) => String(n + 1).padStart(2, '0');

const RedTeamShowcase: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('terminal');

    const activeIndex = Math.max(0, showcaseSections.findIndex(s => s.id === activeSection));
    const active = showcaseSections[activeIndex];
    const ActiveComponent = active?.component || AdvancedLiveTerminal;

    return (
        <>
            <Helmet>
                <title>Red Team Showcase | Ulfat Ibadov - Interactive Security Demonstrations</title>
                <meta name="description" content="Interactive red team and penetration testing demonstrations including live terminal sessions, exploit showcases, and attack chain visualizations." />
                <meta property="og:title" content="Red Team Showcase | Ulfat Ibadov" />
                <meta property="og:description" content="Interactive security demonstrations and red team methodologies." />
                <meta property="og:image" content="https://about.surf/upload/profile.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content="https://about.surf/upload/profile.jpg" />
            </Helmet>

            <div className="relative bg-background text-foreground -mt-16 pt-16">
                {/* subtle grid + glow backdrop */}
                <div className="pointer-events-none absolute inset-0 rt-grid-bg opacity-60" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(239,68,68,0.18),transparent_70%)]" />

                {/* Hero Section */}
                <Section fullHeight className="flex items-center justify-center relative">
                    <RedTeamHero
                        moduleCount={showcaseSections.length}
                        moduleNames={showcaseSections.map((s) => s.title)}
                    />
                </Section>

                {/* Navigation */}
                <div className="sticky top-16 z-40 border-y border-border bg-background/90 backdrop-blur-xl">
                    <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-4">
                        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
                            {showcaseSections.map((section, index) => {
                                const Icon = section.icon;
                                const isActive = activeSection === section.id;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${isActive
                                            ? 'bg-primary text-primary-foreground border-primary shadow-lg'
                                            : 'bg-muted/40 border-border text-muted-foreground hover:text-foreground hover:border-foreground/25 hover:bg-muted/70'
                                            }`}
                                    >
                                        <span className={`font-mono text-[10px] ${isActive ? 'text-red-500' : 'text-muted-foreground group-hover:text-red-400'}`}>{pad2(index)}</span>
                                        <Icon className="h-4 w-4" />
                                        {section.title}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Active Section */}
                <Section className="py-16 md:py-24 relative">
                    <div className="max-w-7xl mx-auto">
                        <ScrollReveal variant="fadeIn">
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 pb-8 border-b border-border">
                                <div className="flex items-start gap-5 md:gap-8">
                                    <span className="font-display font-bold text-5xl md:text-7xl leading-none rt-outline-text">
                                        {pad2(activeIndex)}
                                    </span>
                                    <div>
                                        <div className="flex items-center gap-2 mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-red-400">
                                            {active?.icon && React.createElement(active.icon, { className: 'h-3.5 w-3.5' })}
                                            {active?.tag}
                                        </div>
                                        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-tight">
                                            {active?.title}
                                        </h2>
                                    </div>
                                </div>
                                <p className="max-w-sm text-sm md:text-base text-muted-foreground leading-relaxed md:text-right">
                                    {active?.description}
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal key={activeSection} variant="slideUp" delay={100}>
                            <div className="rounded-2xl border border-white/10 bg-[#0a0a0b] p-4 md:p-8 shadow-2xl dark:bg-black/40">
                                <ActiveComponent />
                            </div>
                        </ScrollReveal>
                    </div>
                </Section>
            </div>
        </>
    );
};

export default RedTeamShowcase;
