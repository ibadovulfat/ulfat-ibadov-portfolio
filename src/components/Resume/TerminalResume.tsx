import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Copy, CheckCircle, Minimize2, Maximize2, TerminalSquare } from 'lucide-react';
import AttackMap from './AttackMap';

interface TerminalResumeProps {
    team: 'red' | 'blue';
    onBack: () => void;
}

const linkify = (text: string) => {
    const parts = text.split(/(https?:\/\/[^\s]+)/g);
    return parts.map((part, i) =>
        /^https?:\/\//.test(part) ? (
            <a
                key={i}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="underline decoration-dotted underline-offset-2 hover:opacity-80 transition-opacity"
                style={{ color: '#60a5fa' }}
            >
                {part}
            </a>
        ) : (
            <React.Fragment key={i}>{part}</React.Fragment>
        )
    );
};

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
        text: '#d4d4d8',
        muted: '#71717a',
        green: '#22c55e',
        blue: '#60a5fa',
        cyan: '#22d3ee',
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

▐ LinkedIn  ▪ https://www.linkedin.com/in/ibadovulfat/
▐ GitHub    ▪ https://github.com/ibadovulfat
▐ ShadowLab ▪ https://shadowlab.about.surf

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
            className={`fixed inset-0 flex items-center justify-center overflow-hidden cursor-text ${isFullscreen ? 'z-[9999] bg-black' : 'z-50 bg-black/90'}`}
            onClick={focusInput}
        >
            <AttackMap opacity={0.3} />

            <div
                className={`relative ${isFullscreen ? 'fixed inset-0 w-full h-full m-0 rounded-none z-[10000]' : 'z-10 w-[calc(100%-2rem)] md:w-full md:max-w-6xl h-[90vh] mx-4'} flex flex-col rounded-xl overflow-hidden transition-all duration-300`}
                style={{
                    backgroundColor: '#0b0b0e',
                    boxShadow: isFullscreen ? 'none' : '0 30px 90px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)',
                    border: isFullscreen ? 'none' : '1px solid rgba(255,255,255,0.08)'
                }}
            >
                {/* Fixed Top Bar */}
                <div
                    className="flex-none flex items-center justify-between px-3 md:px-4 py-3 border-b relative z-[60]"
                    style={{
                        backgroundColor: '#161619',
                        borderColor: 'rgba(255,255,255,0.07)'
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent clicking header from focusing input
                >
                    <div className="flex items-center gap-1.5 md:gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onBack(); }}
                            className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group shadow-md hover:scale-110 duration-200 cursor-pointer"
                            title="Close Terminal"
                        >
                            <span className="opacity-0 group-hover:opacity-100 text-[8px] md:text-[10px] text-white font-bold pointer-events-none">×</span>
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onBack(); }}
                            className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group shadow-md hover:scale-110 duration-200 cursor-pointer"
                            title="Minimize Terminal"
                        >
                            <span className="opacity-0 group-hover:opacity-100 text-[8px] md:text-[10px] text-white font-bold pointer-events-none">−</span>
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsFullscreen(!isFullscreen); }}
                            className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group shadow-md hover:scale-110 duration-200 cursor-pointer"
                            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                        >
                            <span className="opacity-0 group-hover:opacity-100 text-[8px] md:text-[10px] text-white font-bold pointer-events-none">+</span>
                        </button>
                    </div>

                    {/* Centered title */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
                        <TerminalSquare className="h-3.5 w-3.5" style={{ color: theme.muted }} />
                        <span className="text-xs md:text-sm font-mono truncate max-w-[160px] md:max-w-full" style={{ color: theme.muted }}>
                            {theme.prompt} - ~/profile - zsh
                        </span>
                    </div>

                    <div className="flex items-center gap-1 md:gap-2">
                        {isTyping && (
                            <button
                                onClick={skipTyping}
                                className="text-[10px] md:text-xs px-2 py-1 flex-none rounded font-mono hover:bg-white/10 transition-colors cursor-pointer"
                                style={{ color: theme.primary }}
                            >
                                [Skip]
                            </button>
                        )}
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsFullscreen(!isFullscreen); }}
                            className="p-1 md:p-2 hover:bg-white/10 rounded transition-colors flex items-center justify-center cursor-pointer"
                            style={{ color: theme.text }}
                            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                        >
                            {isFullscreen ? <Minimize2 className="h-3 w-3 md:h-4 md:w-4 pointer-events-none" /> : <Maximize2 className="h-3 w-3 md:h-4 md:w-4 pointer-events-none" />}
                        </button>
                    </div>
                </div>

                <div
                    ref={terminalRef}
                    className="px-5 md:px-7 py-6 flex-1 min-h-0 overflow-y-auto font-mono text-[13px] leading-relaxed bg-transparent relative pb-10"
                    style={{ color: theme.text }}
                >
                    <div className="scanlines-overlay" />

                    {/* SSH Connection Simulation */}
                    {isConnecting ? (
                        <div className="space-y-1">
                            {connectionLogs.map((log, i) => {
                                const line = log ?? '';
                                let color = theme.muted;
                                if (line.startsWith('Welcome')) color = theme.green;
                                else if (line.startsWith('[!]')) color = theme.primary;
                                else if (line.startsWith('Public key') || line.startsWith('Authenticating')) color = theme.text;
                                return <div key={i} className="animate-fade-in" style={{ color }}>{line}</div>;
                            })}
                            <span className="inline-block w-2 h-4 align-middle animate-pulse mt-2" style={{ backgroundColor: theme.green }} />
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
                                                <div className="flex gap-0">
                                                    <span style={{ color: theme.muted }}>┌──[</span>
                                                    <span style={{ color: theme.green }}>{theme.prompt}</span>
                                                    <span style={{ color: theme.muted }}>]─[</span>
                                                    <span style={{ color: theme.blue }}>~/profile</span>
                                                    <span style={{ color: theme.muted }}>]</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span style={{ color: theme.primary }}>└─$</span>
                                                    <span style={{ color: theme.text }}>{item}</span>
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
                                    {linkify(displayedContent)}
                                    {isTyping && <span className="terminal-cursor inline-block w-2 h-4 ml-1" style={{ backgroundColor: theme.text }} />}
                                </pre>
                            )}

                            {/* Current Command Line */}
                            {!isTyping && (
                                <div className="mt-4">
                                    <div className="flex gap-0">
                                        <span style={{ color: theme.muted }}>┌──[</span>
                                        <span style={{ color: theme.green }}>{theme.prompt}</span>
                                        <span style={{ color: theme.muted }}>]─[</span>
                                        <span style={{ color: theme.blue }}>~/profile</span>
                                        <span style={{ color: theme.muted }}>]</span>
                                    </div>
                                    <form onSubmit={handleCommandSubmit} className="flex gap-2 items-center">
                                        <span style={{ color: theme.primary }}>└─$</span>
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

                        </>
                    )}
                </div>

                {/* Status bar */}
                <div
                    className="flex-none flex items-center text-[11px] font-mono select-none"
                    style={{ backgroundColor: '#161619', borderTop: '1px solid rgba(255,255,255,0.07)' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <span className="px-3 py-1.5 font-semibold text-white" style={{ backgroundColor: theme.primary }}>
                        {isConnecting ? 'CONNECTING' : 'ONLINE'}
                    </span>
                    <span className="px-3 py-1.5" style={{ color: theme.muted }}>~/profile</span>
                    <span className="flex-1" />
                    <span className="px-3 py-1.5 hidden sm:inline" style={{ color: theme.muted }}>UTF-8</span>
                    <span className="px-3 py-1.5 hidden sm:inline" style={{ color: theme.muted }}>zsh</span>
                    <span className="px-3 py-1.5" style={{ color: theme.green }}>● secure</span>
                </div>

                <div className="absolute inset-x-0 top-0 h-40 pointer-events-none" style={{ background: 'radial-gradient(60% 100% at 50% 0%, rgba(239,68,68,0.06), transparent 70%)' }} />
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
        .overflow-y-auto::-webkit-scrollbar-track { background: transparent; }
        .overflow-y-auto::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.22); }
      `}</style>
        </div>
    );
};

export default TerminalResume;
