import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Technique {
    id: string;
    name: string;
    description: string;
    examples: string[];
}

interface Stage {
    name: string;
    color: string;
    techniques: Technique[];
}

const attackChain: Stage[] = [
    {
        name: "Reconnaissance",
        color: "#3b82f6",
        techniques: [
            {
                id: "T1595",
                name: "Active Scanning",
                description: "Port scanning, vulnerability scanning, network mapping",
                examples: ["Nmap", "Masscan", "Nuclei"]
            },
            {
                id: "T1592",
                name: "Gather Victim Host Information",
                description: "Collect information about target systems and infrastructure",
                examples: ["Shodan", "Censys", "OSINT tools"]
            }
        ]
    },
    {
        name: "Initial Access",
        color: "#ef4444",
        techniques: [
            {
                id: "T1566",
                name: "Phishing",
                description: "Spearphishing emails with malicious attachments or links",
                examples: ["Gophish", "Social engineering", "Credential harvesting"]
            },
            {
                id: "T1190",
                name: "Exploit Public-Facing Application",
                description: "Exploit vulnerabilities in web applications and services",
                examples: ["SQL injection", "RCE exploits", "Deserialization"]
            }
        ]
    },
    {
        name: "Execution",
        color: "#f59e0b",
        techniques: [
            {
                id: "T1059",
                name: "Command and Scripting Interpreter",
                description: "Execute commands via PowerShell, Bash, Python",
                examples: ["PowerShell", "Bash scripts", "Python payloads"]
            },
            {
                id: "T1203",
                name: "Exploitation for Client Execution",
                description: "Exploit software vulnerabilities for code execution",
                examples: ["Browser exploits", "Office macros", "PDF exploits"]
            }
        ]
    },
    {
        name: "Persistence",
        color: "#8b5cf6",
        techniques: [
            {
                id: "T1547",
                name: "Boot or Logon Autostart Execution",
                description: "Configure system to execute malware at startup",
                examples: ["Registry Run Keys", "Startup folder", "Scheduled tasks"]
            },
            {
                id: "T1136",
                name: "Create Account",
                description: "Create local or domain accounts for persistence",
                examples: ["Local admin accounts", "Domain accounts", "Service accounts"]
            }
        ]
    },
    {
        name: "Privilege Escalation",
        color: "#ec4899",
        techniques: [
            {
                id: "T1068",
                name: "Exploitation for Privilege Escalation",
                description: "Exploit vulnerabilities to gain elevated privileges",
                examples: ["Kernel exploits", "UAC bypass", "Token manipulation"]
            },
            {
                id: "T1134",
                name: "Access Token Manipulation",
                description: "Manipulate access tokens to escalate privileges",
                examples: ["Token impersonation", "Token theft", "SeDebugPrivilege"]
            }
        ]
    },
    {
        name: "Defense Evasion",
        color: "#10b981",
        techniques: [
            {
                id: "T1055",
                name: "Process Injection",
                description: "Inject code into legitimate processes",
                examples: ["DLL injection", "Process hollowing", "APC injection"]
            },
            {
                id: "T1027",
                name: "Obfuscated Files or Information",
                description: "Obfuscate malicious code to evade detection",
                examples: ["Code obfuscation", "Encryption", "Packing"]
            }
        ]
    },
    {
        name: "Credential Access",
        color: "#06b6d4",
        techniques: [
            {
                id: "T1003",
                name: "OS Credential Dumping",
                description: "Dump credentials from operating system",
                examples: ["Mimikatz", "LSASS dumping", "SAM database"]
            },
            {
                id: "T1110",
                name: "Brute Force",
                description: "Attempt to guess credentials through brute force",
                examples: ["Password spraying", "Credential stuffing", "Hydra"]
            }
        ]
    },
    {
        name: "Lateral Movement",
        color: "#f97316",
        techniques: [
            {
                id: "T1021",
                name: "Remote Services",
                description: "Use remote services to move laterally",
                examples: ["RDP", "SMB", "WinRM", "SSH"]
            },
            {
                id: "T1550",
                name: "Use Alternate Authentication Material",
                description: "Use stolen credentials for lateral movement",
                examples: ["Pass-the-hash", "Pass-the-ticket", "Token theft"]
            }
        ]
    },
    {
        name: "Exfiltration",
        color: "#a855f7",
        techniques: [
            {
                id: "T1041",
                name: "Exfiltration Over C2 Channel",
                description: "Exfiltrate data over command and control channel",
                examples: ["HTTPS", "DNS tunneling", "Custom protocols"]
            },
            {
                id: "T1567",
                name: "Exfiltration Over Web Service",
                description: "Exfiltrate data to external web services",
                examples: ["Cloud storage", "Pastebin", "GitHub"]
            }
        ]
    }
];

const AttackChainVisualizer: React.FC = () => {
    const [selectedStage, setSelectedStage] = useState<number | null>(null);
    const [activeStage, setActiveStage] = useState(0);

    return (
        <div className="w-full max-w-7xl mx-auto space-y-8">
            {/* Attack Chain Flow */}
            <div className="relative">
                <div className="flex items-center justify-between overflow-x-auto pb-4">
                    {attackChain.map((stage, index) => (
                        <React.Fragment key={index}>
                            <ScrollReveal variant="scaleIn" delay={index * 100}>
                                <button
                                    onClick={() => setSelectedStage(index)}
                                    className={`flex-shrink-0 group relative transition-all duration-300 ${selectedStage === index ? 'scale-110' : 'hover:scale-105'
                                        }`}
                                    style={{
                                        filter: index <= activeStage ? 'none' : 'grayscale(80%) opacity(0.5)'
                                    }}
                                >
                                    {/* Stage Node */}
                                    <div
                                        className="w-32 h-32 rounded-lg border-2 flex flex-col items-center justify-center p-3 transition-all duration-300 relative overflow-hidden"
                                        style={{
                                            borderColor: stage.color,
                                            backgroundColor: `${stage.color}15`,
                                            boxShadow: selectedStage === index ? `0 0 30px ${stage.color}50` : 'none'
                                        }}
                                    >
                                        {/* Glow effect */}
                                        {index <= activeStage && (
                                            <div
                                                className="absolute inset-0 opacity-20 animate-pulse"
                                                style={{ backgroundColor: stage.color }}
                                            />
                                        )}

                                        <div className="relative z-10 text-center">
                                            <div
                                                className="text-2xl font-bold mb-1"
                                                style={{ color: stage.color }}
                                            >
                                                {index + 1}
                                            </div>
                                            <div className="text-xs font-medium text-foreground">
                                                {stage.name}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {stage.techniques.length} techniques
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </ScrollReveal>

                            {/* Arrow */}
                            {index < attackChain.length - 1 && (
                                <div className="flex-shrink-0 px-2">
                                    <ChevronRight
                                        className="h-6 w-6 text-muted-foreground"
                                        style={{
                                            color: index < activeStage ? attackChain[index].color : undefined
                                        }}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Progress Animation Controls */}
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={() => setActiveStage(Math.max(0, activeStage - 1))}
                        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-secondary/80 transition-colors"
                        disabled={activeStage === 0}
                    >
                        Previous Stage
                    </button>
                    <button
                        onClick={() => setActiveStage(Math.min(attackChain.length - 1, activeStage + 1))}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                        disabled={activeStage === attackChain.length - 1}
                    >
                        Next Stage
                    </button>
                    <button
                        onClick={() => setActiveStage(0)}
                        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-secondary/80 transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Stage Details */}
            {selectedStage !== null && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-background border border-border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        {/* Header */}
                        <div
                            className="sticky top-0 flex items-center justify-between p-6 border-b border-border"
                            style={{ backgroundColor: `${attackChain[selectedStage].color}15` }}
                        >
                            <div>
                                <h3
                                    className="text-2xl font-bold"
                                    style={{ color: attackChain[selectedStage].color }}
                                >
                                    {attackChain[selectedStage].name}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    MITRE ATT&CK Techniques
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedStage(null)}
                                className="p-2 hover:bg-secondary rounded-md transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Techniques */}
                        <div className="p-6 space-y-4">
                            {attackChain[selectedStage].techniques.map((technique, index) => (
                                <div
                                    key={index}
                                    className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-semibold text-lg">{technique.name}</h4>
                                        <span
                                            className="text-xs px-2 py-1 rounded-full font-mono"
                                            style={{
                                                backgroundColor: `${attackChain[selectedStage].color}20`,
                                                color: attackChain[selectedStage].color
                                            }}
                                        >
                                            {technique.id}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        {technique.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {technique.examples.map((example, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md"
                                            >
                                                {example}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttackChainVisualizer;
