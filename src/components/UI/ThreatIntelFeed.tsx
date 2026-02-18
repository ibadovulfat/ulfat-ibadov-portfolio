import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, TrendingUp, Activity } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ThreatItem {
    id: string;
    type: 'malware' | 'exploit' | 'vulnerability' | 'ioc';
    severity: 'critical' | 'high' | 'medium' | 'info';
    title: string;
    description: string;
    timestamp: Date;
    source: string;
}

const threatTemplates: Omit<ThreatItem, 'id' | 'timestamp'>[] = [
    {
        type: 'vulnerability',
        severity: 'critical',
        title: 'Zero-day RCE in Apache Struts',
        description: 'Critical remote code execution vulnerability discovered in Apache Struts 2.x',
        source: 'NVD'
    },
    {
        type: 'malware',
        severity: 'high',
        title: 'New ransomware campaign targeting healthcare',
        description: 'LockBit 3.0 variant observed targeting healthcare organizations',
        source: 'CISA'
    },
    {
        type: 'exploit',
        severity: 'high',
        title: 'Metasploit module for CVE-2024-1234',
        description: 'Public exploit code released for recent Apache vulnerability',
        source: 'Exploit-DB'
    },
    {
        type: 'ioc',
        severity: 'medium',
        title: 'Malicious IP addresses identified',
        description: 'C2 infrastructure for Cobalt Strike beacons: 185.220.101.x',
        source: 'AlienVault OTX'
    },
    {
        type: 'vulnerability',
        severity: 'high',
        title: 'SQL injection in WordPress plugin',
        description: 'Unauthenticated SQL injection in popular WP plugin (50k+ installs)',
        source: 'WPScan'
    },
    {
        type: 'malware',
        severity: 'critical',
        title: 'APT group deploying new backdoor',
        description: 'APT29 observed using novel backdoor in supply chain attacks',
        source: 'Mandiant'
    },
    {
        type: 'exploit',
        severity: 'medium',
        title: 'PoC exploit for Windows privilege escalation',
        description: 'Proof-of-concept code for CVE-2024-5678 published on GitHub',
        source: 'GitHub'
    },
    {
        type: 'ioc',
        severity: 'high',
        title: 'Phishing campaign impersonating Microsoft',
        description: 'Credential harvesting campaign targeting Office 365 users',
        source: 'PhishTank'
    }
];

const severityConfig = {
    critical: { color: '#dc2626', icon: Shield, label: 'CRITICAL' },
    high: { color: '#ea580c', icon: AlertTriangle, label: 'HIGH' },
    medium: { color: '#f59e0b', icon: TrendingUp, label: 'MEDIUM' },
    info: { color: '#10b981', icon: Activity, label: 'INFO' }
};

const typeIcons = {
    malware: '🦠',
    exploit: '💥',
    vulnerability: '🔓',
    ioc: '🎯'
};

const ThreatIntelFeed: React.FC = () => {
    const [threats, setThreats] = useState<ThreatItem[]>([]);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        if (!isLive) return;

        const interval = setInterval(() => {
            const randomTemplate = threatTemplates[Math.floor(Math.random() * threatTemplates.length)];
            const newThreat: ThreatItem = {
                ...randomTemplate,
                id: Date.now().toString() + Math.random(),
                timestamp: new Date()
            };

            setThreats(prev => [newThreat, ...prev].slice(0, 20)); // Keep last 20
        }, 3000);

        return () => clearInterval(interval);
    }, [isLive]);

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Threat Intelligence Feed</h2>
                    <p className="text-sm text-muted-foreground">Real-time security threats and vulnerabilities</p>
                </div>
                <button
                    onClick={() => setIsLive(!isLive)}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${isLive
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                >
                    {isLive ? '⏸ Pause Feed' : '▶ Start Feed'}
                </button>
            </div>

            {/* Live Indicator */}
            {isLive && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span>Live updates enabled</span>
                </div>
            )}

            {/* Threat Feed */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {threats.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Start the feed to see threat intelligence updates</p>
                    </div>
                )}

                {threats.map((threat, index) => {
                    const config = severityConfig[threat.severity];
                    const Icon = config.icon;

                    return (
                        <div
                            key={threat.id}
                            className="border border-border rounded-lg p-4 hover:border-primary/50 transition-all animate-in slide-in-from-top-2 duration-300"
                            style={{
                                borderLeftWidth: '4px',
                                borderLeftColor: config.color
                            }}
                        >
                            <div className="flex items-start gap-3">
                                {/* Icon */}
                                <div className="text-2xl">{typeIcons[threat.type]}</div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="font-semibold text-sm">{threat.title}</h3>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span
                                                className="text-xs px-2 py-1 rounded-full font-medium"
                                                style={{
                                                    backgroundColor: `${config.color}20`,
                                                    color: config.color
                                                }}
                                            >
                                                {config.label}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-2">
                                        {threat.description}
                                    </p>

                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Icon className="h-3 w-3" />
                                            {threat.source}
                                        </span>
                                        <span>•</span>
                                        <span>{formatTime(threat.timestamp)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ThreatIntelFeed;
