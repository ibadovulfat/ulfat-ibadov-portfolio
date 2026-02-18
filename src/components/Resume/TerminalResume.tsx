import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Copy, CheckCircle, Minimize2, Maximize2 } from 'lucide-react';
import AttackMap from './AttackMap';

interface TerminalResumeProps {
    team: 'red' | 'blue';
    onBack: () => void;
}

const TerminalResume: React.FC<TerminalResumeProps> = ({ team, onBack }) => {
    const [isTyping, setIsTyping] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [isConnecting, setIsConnecting] = useState(true);
    const [connectionLogs, setConnectionLogs] = useState<string[]>([]);
    const [commandValue, setCommandValue] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [displayedContent, setDisplayedContent] = useState('');
    const [copiedLink, setCopiedLink] = useState<string | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const theme = {
        primary: '#ef4444',
        secondary: '#dc2626',
        accent: '#f87171',
        text: '#10b981',
        prompt: 'root@ulfat.ibadov',
        promptColor: '#ef4444',
        bg: 'from-red-950/20 to-black',
        glow: 'rgba(239, 68, 68, 0.3)',
        matrixColor: '#ff0000'
    };

    // SSH Connection Simulation
    useEffect(() => {
        const logs = [
            'Establishing SSH connection to 10.0.0.1...',
            'Exchanging diffie-hellman-group-exchange-sha256 keys...',
            'SSH-2.0-OpenSSH_9.2p1 Debian-2+deb12u2',
            'Authenticating as root...',
            'Public key accepted. Interactive session started.',
            'Last login: ' + new Date().toUTCString(),
            'Welcome to Ulfat Ibadov\'s private repository.',
            '------------------------------------------------',
            '[!] Unauthorized access is strictly prohibited.'
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < logs.length) {
                setConnectionLogs(prev => [...prev, logs[i]]);
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => setIsConnecting(false), 500);
            }
        }, 400);

        return () => clearInterval(interval);
    }, []);

    const profileContent = `
--[ LINKS

▐ LinkedIn ▪ https://www.linkedin.com/in/ibadovulfat/
▐ GitHub   ▪ https://github.com/ibadovulfat

--[ SUMMARY

I work like a real adversary - mapping attack surface across web & internal networks, 
fingerprinting systems and probing the logic, trust, and boundaries defenders assume are safe.
Flaws become footholds: parameters, sessions, protocols, misconfigs, and escalation paths.
Once inside, I move quietly - evading controls, pivoting, chaining access, and validating 
what's exploitable. My approach mirrors persistent threat behavior: identify weakness, 
escalate impact, and expose risks scanners never see.

--[ FOCUS

  • Penetration Tester
  • Red Team Operations

--[ SKILLS

▐ red_team
    ▪ adversary_ops (ATT&CK mapping, threat emulation, enc C2, beacon timing)
    ▪ evasion (EDR evasion, custom loaders, process injection, AMSI awareness, parent spoofing)
    ▪ post_exploitation (LOLBins, C2 chaining, lateral movement, AD manipulation)

▐ exploitation
    ▪ malware_ops (in-memory execution, runtime patching, execution context manipulation)
    ▪ vuln_research (CWE/CAPEC, CVSSv3 modelling)
    ▪ custom_exploits (logic chains, memory corruption, priv-esc vectors)
    ▪ reverse_engineering (PE/ELF, shellcode crafting, Ghidra/IDA workflows)

▐ web_pentest
    ▪ recon (subdomain enum, JS endpoint extraction, tech fingerprinting)
    ▪ enumeration (auth flows, parameters, access control mapping)
    ▪ fuzzing (state-based fuzzing, input mutation, logic discovery)
    ▪ vulnerability_analysis (session/auth flaws, IDOR, SSRF, deserialization)
    ▪ exploitation (advanced XSS/SSTI, SQLi bypasses, desync vectors, LFI→RCE chains)

▐ network_pentest
    ▪ recon (host discovery, mapping, service profiling)
    ▪ enumeration (protocol inspection, auth probing, share/ACL analysis)
    ▪ attack_surface (misconfig hunting, network segmentation testing)
    ▪ exploitation (credential abuse, relay paths, auth weaknesses)
    ▪ post_access (pivoting, tunneling, traffic redirection)

▐ offensive_tooling
    ▪ C2 frameworks (Metasploit, Cobalt Strike, Sliver, Covenant, Mythic, Havoc)
    ▪ post-exploitation (Impacket/Rubeus; Mimikatz; LinPEAS/pspy; lateral pivots, credential extraction)
    ▪ web_tooling (BurpSuite, smuggling analyzers, FFUF, JS deobfuscation)
    ▪ recon/intel (Subfinder, Amass, Nuclei, Katana, OSINT automation)

▐ programming
    ▪ scripting (Python, Bash, PS)
    ▪ webstack (HTML, CSS, JS, Tailwind, React)
`;

    // Typing animation
    useEffect(() => {
        if (!isTyping) return;

        let index = 0;
        const interval = setInterval(() => {
            if (index < profileContent.length) {
                setDisplayedContent(profileContent.slice(0, index + 1));
                index++;

                if (terminalRef.current) {
                    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
                }
            } else {
                setIsTyping(false);
                clearInterval(interval);
            }
        }, 5);

        return () => clearInterval(interval);
    }, [isTyping, profileContent]);

    const handleCommandSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = commandValue.trim().toLowerCase();

        const historyEntry = {
            cmd: commandValue,
            output: [] as string[]
        };

        if (cmd === 'cat profile' || cmd === 'cat profile.txt') {
            setHasStarted(true);
            setIsTyping(true);
            setCommandHistory([...commandHistory, `cat Profile`]);
        } else if (cmd === 'help') {
            setCommandHistory([...commandHistory, 'help', 'Available commands: cat Profile, whoami, ls -la, sudo su, clear, help']);
        } else if (cmd === 'whoami') {
            setCommandHistory([...commandHistory, 'whoami', 'Ulfat Ibadov - Penetration Testing & Offensive Security Expert']);
        } else if (cmd === 'ls -la' || cmd === 'ls') {
            setCommandHistory([...commandHistory, 'ls -la', 'total 42', 'drwxr-xr-x  2 root root  4096 Feb 15 15:52 .', 'drwxr-xr-x  3 root root  4096 Feb 15 15:52 ..', '-rw-r--r--  1 root root  2048 Feb 15 15:52 profile.txt', '-rwx------  1 root root   512 Feb 15 15:52 secret_exploits.sh', '-rw-------  1 root root   128 Feb 15 15:52 .bash_history']);
        } else if (cmd === 'sudo su' || cmd === 'sudo') {
            setCommandHistory([...commandHistory, commandValue, 'Access Denied: Only Ulfat can have root privileges.', 'Nice try hacker :))']);
        } else if (cmd === 'clear') {
            setCommandHistory([]);
            setHasStarted(false);
            setDisplayedContent('');
        } else if (cmd !== '') {
            setCommandHistory([...commandHistory, commandValue, `${commandValue}: command not found. Nice try hacker :))`, "Type 'help' for available commands."]);
        }

        setCommandValue('');
    };

    const copyLink = (link: string) => {
        navigator.clipboard.writeText(link);
        setCopiedLink(link);
        setTimeout(() => setCopiedLink(null), 2000);
    };

    const skipTyping = () => {
        setDisplayedContent(profileContent);
        setIsTyping(false);
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <div
            className={`fixed inset-0 bg-black flex items-center justify-center overflow-hidden cursor-text`}
            onClick={focusInput}
        >
            <AttackMap opacity={0.3} />

            <div
                className={`relative z-10 ${isFullscreen ? 'w-full h-full translate-x-0' : 'w-full max-w-6xl h-[90vh] mx-4'} rounded-lg overflow-hidden transition-all duration-300`}
                style={{
                    boxShadow: isFullscreen ? 'none' : `0 0 40px ${theme.glow}, 0 0 80px ${theme.glow}`,
                    border: isFullscreen ? 'none' : `2px solid ${theme.primary}`
                }}
            >
                <div
                    className="flex items-center justify-between px-4 py-3 border-b relative z-30"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        borderColor: theme.primary
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent clicking header from focusing input
                >
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onBack(); }}
                            className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group shadow-md hover:scale-110 duration-200 cursor-pointer"
                            title="Close Terminal"
                        >
                            <span className="opacity-0 group-hover:opacity-100 text-[10px] text-white font-bold">×</span>
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsFullscreen(!isFullscreen); }}
                            className="w-5 h-5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group shadow-md hover:scale-110 duration-200 cursor-pointer"
                            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                        >
                            <span className="opacity-0 group-hover:opacity-100 text-[10px] text-white font-bold">−</span>
                        </button>
                        <button
                            className="w-5 h-5 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group shadow-md hover:scale-110 duration-200 cursor-not-allowed"
                        >
                            <span className="opacity-0 group-hover:opacity-100 text-[10px] text-white font-bold">+</span>
                        </button>
                        <span className="ml-4 text-sm font-mono" style={{ color: theme.text }}>
                            {theme.prompt}:~/profile
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {isTyping && (
                            <button
                                onClick={skipTyping}
                                className="text-xs px-2 py-1 rounded font-mono hover:bg-white/10 transition-colors"
                                style={{ color: theme.primary }}
                            >
                                [Skip]
                            </button>
                        )}
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsFullscreen(!isFullscreen); }}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                            style={{ color: theme.text }}
                        >
                            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                <div
                    ref={terminalRef}
                    className="p-6 h-full overflow-y-auto font-mono text-sm bg-black/90 relative pb-24"
                    style={{ color: theme.text }}
                >
                    <div className="scanlines-overlay" />

                    {/* SSH Connection Simulation */}
                    {isConnecting ? (
                        <div className="space-y-1">
                            {connectionLogs.map((log, i) => (
                                <div key={i} className="animate-fade-in">{log}</div>
                            ))}
                            <div className="inline-block w-2 h-4 bg-green-500 animate-pulse mt-2" />
                        </div>
                    ) : (
                        <>
                            {/* Initial Hint */}
                            {!hasStarted && !isTyping && commandHistory.length === 0 && (
                                <div className="mb-4 opacity-70 italic text-xs">
                                    [!] Type 'cat Profile' to view the full profile content or 'help' for commands.
                                </div>
                            )}

                            {/* Previous Commands */}
                            {commandHistory.map((item, i) => {
                                // If the item starts with root@, it's a command prompt, otherwise it's output
                                const isPrompt = i % 2 === 0; // Simplified for this logic
                                // Actually let's just trace commandHistory as strings and format based on flow
                                return (
                                    <div key={i} className="mb-1">
                                        {item.includes('cat Profile') || item === 'whoami' || item === 'ls -la' || item === 'ls' || item === 'help' || item === 'sudo su' || item === 'sudo' ? (
                                            <div className="mt-4">
                                                <div className="flex gap-2">
                                                    <span style={{ color: theme.promptColor }}>┌──[${theme.prompt}] - [~/profile]</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span style={{ color: theme.promptColor }}>└─$</span>
                                                    <span>{item}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="pl-4 opacity-80">{item}</div>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Content display */}
                            {hasStarted && (
                                <pre className="whitespace-pre-wrap mt-4">
                                    {displayedContent}
                                    {isTyping && <span className="terminal-cursor inline-block w-2 h-4 ml-1" style={{ backgroundColor: theme.text }} />}
                                </pre>
                            )}

                            {/* Current Command Line */}
                            {!isTyping && (
                                <div className="mt-4">
                                    <div className="flex gap-2">
                                        <span style={{ color: theme.promptColor }}>┌──[${theme.prompt}] - [~/profile]</span>
                                    </div>
                                    <form onSubmit={handleCommandSubmit} className="flex gap-2 items-center">
                                        <span style={{ color: theme.promptColor }}>└─$</span>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            autoFocus
                                            value={commandValue}
                                            onChange={(e) => setCommandValue(e.target.value)}
                                            className="bg-transparent border-none outline-none flex-1 font-mono"
                                            style={{ color: theme.text }}
                                            spellCheck={false}
                                            autoComplete="off"
                                        />
                                    </form>
                                </div>
                            )}

                            {/* Links */}
                            {!isTyping && hasStarted && (
                                <div className="mt-8 space-y-3 border-t border-white/10 pt-4 relative z-20">
                                    {[
                                        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ibadovulfat/', icon: ExternalLink },
                                        { label: 'GitHub', url: 'https://github.com/ibadovulfat', icon: ExternalLink }
                                    ].map((link) => (
                                        <div
                                            key={link.label}
                                            className="flex items-center justify-between group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-md p-3 transition-all cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(link.url, '_blank');
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <link.icon className="h-4 w-4" style={{ color: theme.primary }} />
                                                <span className="font-bold text-base" style={{ color: theme.text }}>{link.label}</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        copyLink(link.url);
                                                    }}
                                                    className="p-2 rounded hover:bg-white/10 transition-colors"
                                                    style={{ color: theme.accent }}
                                                    title="Copy URL"
                                                >
                                                    {copiedLink === link.url ? (
                                                        <CheckCircle className="h-4 w-4" />
                                                    ) : (
                                                        <Copy className="h-4 w-4" />
                                                    )}
                                                </button>
                                                <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="absolute inset-0 pointer-events-none opacity-30" style={{ boxShadow: `inset 0 0 100px ${theme.glow}` }} />
            </div>

            <style>{`
        .scanlines-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(255, 255, 255, 0.02) 50%);
          background-size: 100% 4px;
          animation: scanlines 8s linear infinite;
          pointer-events: none;
          z-index: 10;
        }
        @keyframes scanlines { 0% { transform: translateY(0); } 100% { transform: translateY(4px); } }
        .terminal-cursor { animation: blink 1s infinite; }
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        .overflow-y-auto::-webkit-scrollbar { width: 8px; }
        .overflow-y-auto::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.5); }
        .overflow-y-auto::-webkit-scrollbar-thumb { background: ${theme.primary}; border-radius: 4px; }
      `}</style>
        </div>
    );
};

export default TerminalResume;
