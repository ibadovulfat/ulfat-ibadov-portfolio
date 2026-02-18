import React, { useState } from 'react';
import { Skull, Shield } from 'lucide-react';
import MatrixRain from './MatrixRain';

interface TeamSelectionProps {
    onTeamSelect: (team: 'red' | 'blue') => void;
}

const teams = [
    {
        id: 'red' as const,
        name: 'RED TEAM',
        subtitle: 'OFFENSIVE',
        icon: Skull,
        color: '#ef4444',
        gradient: 'from-red-500/20 to-red-900/20',
        glowColor: 'rgba(239, 68, 68, 0.5)',
        description: 'Attack. Exploit. Penetrate.'
    },
    {
        id: 'blue' as const,
        name: 'BLUE TEAM',
        subtitle: 'DEFENSIVE',
        icon: Shield,
        color: '#3b82f6',
        gradient: 'from-blue-500/20 to-blue-900/20',
        glowColor: 'rgba(59, 130, 246, 0.5)',
        description: 'Defend. Detect. Respond.'
    }
];

const TeamSelection: React.FC<TeamSelectionProps> = ({ onTeamSelect }) => {
    const [hoveredTeam, setHoveredTeam] = useState<'red' | 'blue' | null>(null);

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
            {/* Matrix Rain Background */}
            <MatrixRain opacity={0.1} color="#00ff00" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl px-4">
                {/* Title */}
                <div className="text-center mb-16">
                    <h1
                        className="text-6xl md:text-8xl font-bold mb-4 glitch-text"
                        data-text="SELECT YOUR ALLEGIANCE"
                    >
                        SELECT YOUR ALLEGIANCE
                    </h1>
                    <p className="text-xl text-green-500 font-mono">
                        ┌──[root@ulfat.ibadov] - [~/profile]
                        <br />
                        └─$ choose_team --interactive
                    </p>
                </div>

                {/* Team Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {teams.map((team) => {
                        const Icon = team.icon;
                        const isHovered = hoveredTeam === team.id;

                        return (
                            <button
                                key={team.id}
                                onClick={() => onTeamSelect(team.id)}
                                onMouseEnter={() => setHoveredTeam(team.id)}
                                onMouseLeave={() => setHoveredTeam(null)}
                                onFocus={() => setHoveredTeam(team.id)}
                                onBlur={() => setHoveredTeam(null)}
                                aria-label={`Select ${team.name}`}
                                className={`relative group bg-gradient-to-br ${team.gradient} border-2 rounded-lg p-8 md:p-12 transition-all duration-300 transform hover:scale-105 w-full text-left`}
                                style={{
                                    borderColor: isHovered ? team.color : 'rgba(255, 255, 255, 0.1)',
                                    boxShadow: isHovered ? `0 0 40px ${team.glowColor}, 0 0 80px ${team.glowColor}` : 'none'
                                }}
                            >
                                {/* Holographic effect */}
                                <div
                                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
                                    style={{
                                        background: `linear-gradient(45deg, transparent, ${team.glowColor}, transparent)`,
                                        animation: isHovered ? 'holographic 2s linear infinite' : 'none'
                                    }}
                                />

                                {/* Content */}
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Icon */}
                                    <div className="flex justify-center mb-6">
                                        <div
                                            className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300"
                                            style={{
                                                backgroundColor: isHovered ? `${team.color}20` : 'transparent',
                                                boxShadow: isHovered ? `0 0 30px ${team.glowColor}` : 'none'
                                            }}
                                        >
                                            <Icon
                                                className="w-12 h-12 transition-all duration-300"
                                                style={{
                                                    color: team.color,
                                                    filter: isHovered ? `drop-shadow(0 0 10px ${team.color})` : 'none'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Team Name */}
                                    <h2
                                        className={`text-4xl font-bold mb-2 transition-all duration-300 ${isHovered ? 'glitch-text-hover' : ''}`}
                                        style={{ color: team.color }}
                                        data-text={team.name}
                                    >
                                        {team.name}
                                    </h2>

                                    {/* Subtitle */}
                                    <p className="text-xl text-gray-400 mb-4 font-mono">
                                        {team.subtitle}
                                    </p>

                                    {/* Description */}
                                    <p
                                        className="text-sm font-mono transition-all duration-300"
                                        style={{ color: isHovered ? team.color : '#666' }}
                                    >
                                        {team.description}
                                    </p>

                                    {/* Scanlines */}
                                    <div className="absolute inset-0 pointer-events-none opacity-10 rounded-lg overflow-hidden">
                                        <div className="scanlines w-full h-full" />
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="text-center mt-12">
                    <p className="text-gray-500 font-mono text-sm">
                        [!] Warning: Your choice will determine the interface theme
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeamSelection;
