import React, { useState } from 'react';
import { Shield, AlertTriangle, Info } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface CVE {
    id: string;
    title: string;
    date: string;
    cvss: number;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    description: string;
    affected: string;
    impact: string[];
}

const cveData: CVE[] = [
    {
        id: "CVE-2024-1234",
        title: "Apache HTTP Server Remote Code Execution",
        date: "2024-01-15",
        cvss: 9.8,
        severity: "Critical",
        description: "A critical vulnerability in Apache HTTP Server allows remote attackers to execute arbitrary code",
        affected: "Apache HTTP Server 2.4.x < 2.4.58",
        impact: ["Remote Code Execution", "Full System Compromise", "Data Breach"]
    },
    {
        id: "CVE-2023-5678",
        title: "WordPress SQL Injection",
        date: "2023-12-10",
        cvss: 8.1,
        severity: "High",
        description: "SQL injection vulnerability in WordPress plugin allows authentication bypass",
        affected: "WordPress Plugin XYZ < 3.2.1",
        impact: ["Authentication Bypass", "Database Access", "Privilege Escalation"]
    },
    {
        id: "CVE-2023-9876",
        title: "OpenSSH Authentication Bypass",
        date: "2023-11-05",
        cvss: 7.5,
        severity: "High",
        description: "Authentication bypass vulnerability in OpenSSH server",
        affected: "OpenSSH < 9.5p1",
        impact: ["Unauthorized Access", "Authentication Bypass"]
    },
    {
        id: "CVE-2023-4567",
        title: "Nginx Path Traversal",
        date: "2023-10-20",
        cvss: 6.5,
        severity: "Medium",
        description: "Path traversal vulnerability allows reading arbitrary files",
        affected: "Nginx < 1.25.3",
        impact: ["Information Disclosure", "File Access"]
    },
    {
        id: "CVE-2023-3456",
        title: "MySQL Privilege Escalation",
        date: "2023-09-15",
        cvss: 8.8,
        severity: "High",
        description: "Privilege escalation vulnerability in MySQL server",
        affected: "MySQL < 8.0.35",
        impact: ["Privilege Escalation", "Database Compromise"]
    },
    {
        id: "CVE-2023-2345",
        title: "Redis Remote Code Execution",
        date: "2023-08-01",
        cvss: 9.1,
        severity: "Critical",
        description: "Critical RCE vulnerability in Redis server",
        affected: "Redis < 7.2.0",
        impact: ["Remote Code Execution", "Data Exfiltration"]
    },
    {
        id: "CVE-2023-1234",
        title: "Docker Container Escape",
        date: "2023-07-10",
        cvss: 8.6,
        severity: "High",
        description: "Container escape vulnerability in Docker runtime",
        affected: "Docker < 24.0.5",
        impact: ["Container Escape", "Host Compromise"]
    },
    {
        id: "CVE-2023-0123",
        title: "Kubernetes API Server DoS",
        date: "2023-06-05",
        cvss: 5.3,
        severity: "Medium",
        description: "Denial of service vulnerability in Kubernetes API server",
        affected: "Kubernetes < 1.27.3",
        impact: ["Denial of Service", "Service Disruption"]
    }
];

const severityConfig = {
    Critical: { color: "#dc2626", icon: Shield, bg: "#dc262620" },
    High: { color: "#ea580c", icon: AlertTriangle, bg: "#ea580c20" },
    Medium: { color: "#f59e0b", icon: AlertTriangle, bg: "#f59e0b20" },
    Low: { color: "#10b981", icon: Info, bg: "#10b98120" }
};

const CVETimeline: React.FC = () => {
    const [selectedSeverity, setSelectedSeverity] = useState<string>("All");
    const [selectedCVE, setSelectedCVE] = useState<CVE | null>(null);

    const filteredCVEs = selectedSeverity === "All"
        ? cveData
        : cveData.filter(cve => cve.severity === selectedSeverity);

    const getCVSSColor = (cvss: number) => {
        if (cvss >= 9.0) return "#dc2626";
        if (cvss >= 7.0) return "#ea580c";
        if (cvss >= 4.0) return "#f59e0b";
        return "#10b981";
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            {/* Severity Filter */}
            <div className="flex gap-2 flex-wrap">
                {["All", "Critical", "High", "Medium", "Low"].map((severity) => (
                    <button
                        key={severity}
                        onClick={() => setSelectedSeverity(severity)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedSeverity === severity
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            }`}
                    >
                        {severity}
                    </button>
                ))}
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

                {/* CVE Cards */}
                <div className="space-y-6">
                    {filteredCVEs.map((cve, index) => {
                        const config = severityConfig[cve.severity];
                        const Icon = config.icon;

                        return (
                            <ScrollReveal key={cve.id} variant="slideLeft" delay={index * 50}>
                                <div className="relative pl-20">
                                    {/* Timeline Dot */}
                                    <div
                                        className="absolute left-6 top-6 w-5 h-5 rounded-full border-4 border-background"
                                        style={{ backgroundColor: config.color }}
                                    ></div>

                                    {/* CVE Card */}
                                    <div
                                        className="border rounded-lg overflow-hidden hover:border-primary/50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedCVE(cve)}
                                        style={{ borderColor: `${config.color}40` }}
                                    >
                                        {/* Header */}
                                        <div
                                            className="p-4 border-b border-border"
                                            style={{ backgroundColor: config.bg }}
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Icon className="h-4 w-4" style={{ color: config.color }} />
                                                        <span
                                                            className="font-mono text-sm font-bold"
                                                            style={{ color: config.color }}
                                                        >
                                                            {cve.id}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(cve.date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-bold text-lg">{cve.title}</h3>
                                                </div>

                                                {/* CVSS Score */}
                                                <div className="flex flex-col items-center">
                                                    <div
                                                        className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl border-4"
                                                        style={{
                                                            backgroundColor: `${getCVSSColor(cve.cvss)}20`,
                                                            borderColor: getCVSSColor(cve.cvss),
                                                            color: getCVSSColor(cve.cvss)
                                                        }}
                                                    >
                                                        {cve.cvss}
                                                    </div>
                                                    <span className="text-xs text-muted-foreground mt-1">CVSS</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 space-y-3">
                                            <p className="text-sm text-muted-foreground">{cve.description}</p>

                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="font-semibold">Affected:</span>
                                                <code className="px-2 py-1 bg-secondary rounded text-secondary-foreground">
                                                    {cve.affected}
                                                </code>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {cve.impact.map((impact, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs px-2 py-1 rounded-full"
                                                        style={{
                                                            backgroundColor: `${config.color}15`,
                                                            color: config.color
                                                        }}
                                                    >
                                                        {impact}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>

            {/* CVE Detail Modal */}
            {selectedCVE && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedCVE(null)}
                >
                    <div
                        className="bg-background border border-border rounded-lg max-w-2xl w-full p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedCVE.id}</h2>
                                <p className="text-muted-foreground">{selectedCVE.title}</p>
                            </div>
                            <button
                                onClick={() => setSelectedCVE(null)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Description</h3>
                                <p className="text-sm text-muted-foreground">{selectedCVE.description}</p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Affected Systems</h3>
                                <code className="text-sm bg-secondary px-3 py-2 rounded block">
                                    {selectedCVE.affected}
                                </code>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Impact</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    {selectedCVE.impact.map((impact, i) => (
                                        <li key={i} className="text-sm text-muted-foreground">{impact}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CVETimeline;
