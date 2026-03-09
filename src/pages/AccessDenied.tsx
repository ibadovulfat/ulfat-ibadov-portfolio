
import React, { useEffect, useState } from "react";
import { ShieldAlert, Terminal, Lock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/UI/button";
import { Link } from "react-router-dom";

const AccessDenied = () => {
    const [text, setText] = useState("");
    const fullText = "ACCESS DENIED // PERMISSION REJECTED // SECURITY PROTOCOL ENGAGED";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-black text-red-600 dark:text-red-500 font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Matrix/Grid Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-20"
                style={{
                    backgroundImage: "linear-gradient(rgba(255, 0, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 0, 0.2) 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                }}>
            </div>

            <div className="z-10 max-w-2xl w-full border border-red-500/30 dark:border-red-900/50 bg-white/90 dark:bg-black/90 p-8 rounded-lg shadow-[0_0_50px_rgba(220,38,38,0.1)] dark:shadow-[0_0_50px_rgba(220,38,38,0.2)] relative">
                {/* Animated Corner Borders */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-red-500 dark:border-red-600"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-red-500 dark:border-red-600"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-red-500 dark:border-red-600"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-red-500 dark:border-red-600"></div>

                <div className="flex flex-col items-center text-center space-y-6 relative">
                    <div className="relative">
                        <div className="absolute inset-0 animate-ping opacity-20 rounded-full bg-red-600"></div>
                        <ShieldAlert className="w-20 h-20 text-red-600 animate-pulse" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter glitch-text text-red-600 dark:text-white">
                        403 FORBIDDEN
                    </h1>

                    <div className="w-full h-px bg-red-500/30 dark:bg-red-900/50 my-4"></div>

                    <div className="space-y-4 font-mono text-sm md:text-base">
                        <p className="typing-effect min-h-[1.5rem] text-red-600 dark:text-red-400">
                            {text}<span className="animate-pulse">_</span>
                        </p>

                        <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded border border-red-200 dark:border-red-900/30 text-left space-y-2">
                            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                <Terminal size={16} />
                                <span>System.Security.Exception: Unauthorized Access Attempt</span>
                            </div>
                            <div className="flex items-center gap-2 text-red-500 dark:text-red-500/70">
                                <Lock size={16} />
                                <span>Target: /upload/ directory</span>
                            </div>
                            <div className="flex items-center gap-2 text-red-500 dark:text-red-500/70">
                                <AlertTriangle size={16} />
                                <span>Action: Request Logged & Terminated</span>
                            </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-500 max-w-md mx-auto">
                            Nice try. The requested resource is protected by advanced security protocols.
                            Your IP address has been noted by the system administrator.
                        </p>
                    </div>

                    <div className="pt-8">
                        <Link to="/">
                            <Button variant="outline" className="border-red-500 dark:border-red-600 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-700 dark:hover:text-red-400 font-mono transition-all duration-300">
                                &lt; RETURN_TO_BASE /&gt;
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessDenied;
