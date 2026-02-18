import React from 'react';
import { Helmet } from 'react-helmet';
import TerminalResume from '@/components/Resume/TerminalResume';
import { useNavigate } from 'react-router-dom';

const TerminalResumePage: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/resume');
    };

    return (
        <>
            <Helmet>
                <title>Interactive Terminal Resume - Ulfat Ibadov</title>
                <meta name="description" content="Advanced terminal-style interactive resume. Type 'cat Profile' to explore offensive security expertise." />
            </Helmet>

            <TerminalResume team="red" onBack={handleBack} />
        </>
    );
};

export default TerminalResumePage;
