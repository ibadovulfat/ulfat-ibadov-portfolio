import React, { useState } from 'react';
import Section from '@/components/UI/Section';
import ParallaxEffect from '@/components/UI/ParallaxEffect';
import ScrollReveal from '@/components/UI/ScrollReveal';
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
import { Terminal, Target, Code, Activity, Shield, Binary, Trophy, Rss, Cpu, ShieldOff, Radio, Skull } from 'lucide-react';

interface ShowcaseSection {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    component: React.ComponentType;
}

const showcaseSections: ShowcaseSection[] = [
    {
        id: 'terminal',
        title: 'Advanced Terminal',
        description: 'APT-level attack scenarios with expert techniques',
        icon: Skull,
        component: AdvancedLiveTerminal
    },
    {
        id: 'attack-chain',
        title: 'Attack Chain Visualizer',
        description: 'MITRE ATT&CK kill chain with interactive technique exploration',
        icon: Target,
        component: AttackChainVisualizer
    },
    {
        id: 'exploits',
        title: 'Exploit Showcase',
        description: 'Real-world exploit code snippets with detailed explanations',
        icon: Code,
        component: ExploitShowcase
    },
    {
        id: 'packets',
        title: 'Network Packet Flow',
        description: 'Animated visualization of network attacks and traffic patterns',
        icon: Activity,
        component: PacketFlowAnimation
    },
    {
        id: 'cve',
        title: 'CVE Timeline',
        description: 'Interactive timeline of critical vulnerabilities and exploits',
        icon: Shield,
        component: CVETimeline
    },
    {
        id: 'binary',
        title: 'Binary Exploitation',
        description: 'Step-by-step stack buffer overflow visualization',
        icon: Binary,
        component: BinaryExploitViz
    },

    {
        id: 'threat-intel',
        title: 'Threat Intelligence Feed',
        description: 'Live threat intelligence updates and security advisories',
        icon: Rss,
        component: ThreatIntelFeed
    },
    {
        id: 'kernel-exploit',
        title: 'Kernel Exploitation',
        description: 'Advanced kernel UAF exploitation with SMEP bypass and privilege escalation',
        icon: Cpu,
        component: KernelExploitSim
    },
    {
        id: 'edr-evasion',
        title: 'EDR Evasion Lab',
        description: 'Advanced EDR bypass techniques including direct syscalls and Heaven\'s Gate',
        icon: ShieldOff,
        component: EDREvasionLab
    },
    {
        id: 'c2-builder',
        title: 'C2 Protocol Builder',
        description: 'Design custom Command & Control protocols with encryption and obfuscation',
        icon: Radio,
        component: C2ProtocolBuilder
    }
];

const RedTeamShowcase: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('terminal');

    const ActiveComponent = showcaseSections.find(s => s.id === activeSection)?.component || AdvancedLiveTerminal;

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

            {/* Hero Section */}
            <Section fullHeight className="flex items-center justify-center">
                <div className="max-w-4xl mx-auto text-center">
                    <ParallaxEffect speed={0.1} direction="up">
                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-red-500/20 text-red-500 inline-block mb-4">
                            Interactive Demonstrations
                        </span>
                        <h1 className="section-heading mb-6">
                            Red Team Showcase
                        </h1>
                        <p className="section-subheading max-w-2xl mx-auto">
                            Explore interactive demonstrations of offensive security techniques, exploits, and attack methodologies.
                        </p>
                    </ParallaxEffect>
                </div>
            </Section>

            {/* Navigation */}
            <Section className="py-12 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-40">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {showcaseSections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeSection === section.id
                                        ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                                        : 'bg-secondary/50 border border-border/50 text-secondary-foreground hover:bg-secondary hover:border-border'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {section.title}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </Section>

            {/* Active Section */}
            <Section className="py-16">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal variant="fadeIn">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold mb-2">
                                {showcaseSections.find(s => s.id === activeSection)?.title}
                            </h2>
                            <p className="text-muted-foreground">
                                {showcaseSections.find(s => s.id === activeSection)?.description}
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal variant="slideUp" delay={100}>
                        <div className="mt-8">
                            <ActiveComponent />
                        </div>
                    </ScrollReveal>
                </div>
            </Section>
        </>
    );
};

export default RedTeamShowcase;
