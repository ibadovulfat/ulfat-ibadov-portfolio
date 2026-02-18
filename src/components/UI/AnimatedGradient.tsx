import React from 'react';

const AnimatedGradient: React.FC = () => {
    return (
        <div className="animated-gradient-bg absolute inset-0 -z-20 overflow-hidden">
            <div className="gradient-layer-1" />
            <div className="gradient-layer-2" />
            <div className="gradient-layer-3" />
        </div>
    );
};

export default AnimatedGradient;
