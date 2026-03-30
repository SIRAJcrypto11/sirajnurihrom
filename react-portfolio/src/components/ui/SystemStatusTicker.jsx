import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Terminal, Cpu, Zap, Activity } from 'lucide-react';

export const SystemStatusTicker = () => {
    const [stats, setStats] = useState({
        synapseLoad: 12,
        uptime: 99.998,
        latency: 24,
        id: 'SINGULARITY_V10'
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                synapseLoad: Math.floor(Math.random() * (18 - 8) + 8),
                latency: Math.floor(Math.random() * (30 - 20) + 20)
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 w-full bg-[#050510]/80 backdrop-blur-md border-t border-white/5 z-[900] px-4 py-1.5 hidden md:block overflow-hidden">
            <div className="max-w-[2000px] mx-auto flex items-center justify-between pointer-events-none">

                {/* Left Side: System Meta */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Activity size={12} className="text-primary-DEFAULT animate-pulse" />
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">System_Status: </span>
                        <span className="text-[10px] font-mono text-green-500 font-bold tracking-widest">OPERATIONAL</span>
                    </div>
                    <div className="h-3 w-px bg-white/10" />
                    <div className="flex items-center gap-2">
                        <Cpu size={12} className="text-neutral-500" />
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">AI_Synapse_Load: </span>
                        <span className="text-[10px] font-mono text-white font-bold">{stats.synapseLoad}%</span>
                    </div>
                </div>

                {/* Center: Live Ticker (Simulated) */}
                <div className="flex-1 px-20">
                    <div className="w-full overflow-hidden relative">
                        <motion.div
                            className="whitespace-nowrap flex gap-10"
                            animate={{ x: [0, -1000] }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex gap-10">
                                    <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.2em]">Deployment: Vercel_Production_Stable</span>
                                    <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.2em]">Core: Siraj_Engine_V10.0.1</span>
                                    <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.2em]">Knowledge_Vault: 20k_Context_Tokens</span>
                                    <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.2em]">Security: End_To_End_Encrypted</span>
                                    <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.2em]">Latency: {stats.latency}ms</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Right Side: Environment Meta */}
                <div className="flex items-center gap-6 border-l border-white/10 pl-6">
                    <div className="flex items-center gap-2">
                        <Zap size={10} className="text-accent-electric" />
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Uptime: </span>
                        <span className="text-[10px] font-mono text-white font-bold">{stats.uptime}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Terminal size={10} className="text-neutral-500" />
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">ID: </span>
                        <span className="text-[10px] font-mono text-primary-light font-bold">{stats.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Loc: </span>
                        <span className="text-[10px] font-mono text-white font-bold">GMT+7</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
