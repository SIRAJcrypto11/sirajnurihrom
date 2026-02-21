import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Terminal, Download, X, Cpu, Database, ShieldCheck, FileText } from 'lucide-react';
import { audio } from '../../utils/audio';

export const IdentityCompiler = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState('initializing'); // initializing, compiling, ready
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);
    const logsEndRef = useRef(null);

    const compilationLogs = [
        "Handshaking with Siraj_Core_V10...",
        "Accessing Knowledge_Vault (20k tokens)...",
        "Indexing Architecture_Deltas...",
        "Mapping 20+ Ecosystem app nodes...",
        "Synthesizing Programming_Philosophy...",
        "Compressing Identity_Heuristics...",
        "Compiling Siraj_Nur_Ihrom_Identity.pdf",
        "Optimization complete. Payload ready."
    ];

    useEffect(() => {
        if (isOpen) {
            audio.playRise();
            setLogs([]);
            setProgress(0);
            setStatus('compiling');

            let currentLog = 0;
            const logInterval = setInterval(() => {
                if (currentLog < compilationLogs.length) {
                    setLogs(prev => [...prev, compilationLogs[currentLog]]);
                    currentLog++;
                    setProgress(Math.min((currentLog / compilationLogs.length) * 100, 100));
                    audio.playTick();
                } else {
                    setStatus('ready');
                    clearInterval(logInterval);
                }
            }, 600);

            return () => clearInterval(logInterval);
        }
    }, [isOpen]);

    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    const handleDownload = () => {
        audio.playClick();

        // Trigger real PDF download
        const link = document.createElement('a');
        link.href = '/Siraj_Nur_Ihrom_Resume.pdf'; // Path pointing to public/Siraj_Nur_Ihrom_Resume.pdf
        link.download = 'Siraj_Nur_Ihrom_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[6000] flex items-center justify-center p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="absolute inset-0 bg-[#050510]/95 backdrop-blur-2xl" onClick={onClose} />

                    <motion.div
                        className="relative w-full max-w-2xl bg-black/80 border border-primary-DEFAULT/50 rounded-2xl shadow-[0_0_100px_rgba(0,196,255,0.2)] overflow-hidden"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                    >
                        {/* Terminal Header */}
                        <div className="bg-primary-DEFAULT/10 border-b border-primary-DEFAULT/30 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Terminal size={18} className="text-primary-DEFAULT" />
                                <span className="text-sm font-mono font-bold text-white tracking-widest uppercase">Identity_Compiler_V10</span>
                            </div>
                            <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Terminal Content */}
                        <div className="p-8 font-mono">
                            <div className="flex flex-col gap-2 h-64 overflow-y-auto layout-scrollbar mb-8">
                                {logs.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-primary-light text-sm flex gap-3"
                                    >
                                        <span className="text-neutral-600">[{Math.floor(Date.now() / 1000000) + i}]</span>
                                        <span>{log}</span>
                                    </motion.div>
                                ))}
                                <div ref={logsEndRef} />
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-2">
                                        <Cpu size={14} className="text-accent-electric animate-pulse" />
                                        <span className="text-xs text-neutral-400 uppercase tracking-widest">Compiling_Resources</span>
                                    </div>
                                    <span className="text-sm text-primary-DEFAULT font-bold">{Math.floor(progress)}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-primary"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer / Actions */}
                        <div className="p-6 bg-white/5 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 opacity-50">
                                    <Database size={14} className="text-neutral-400" />
                                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Vault_Access</span>
                                </div>
                                <div className="flex items-center gap-2 opacity-100">
                                    <ShieldCheck size={14} className="text-green-500" />
                                    <span className="text-[10px] text-green-500 uppercase tracking-widest font-bold">Encrypted</span>
                                </div>
                            </div>

                            <button
                                disabled={status !== 'ready'}
                                onClick={handleDownload}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-glow"
                            >
                                <Download size={18} />
                                {status === 'ready' ? 'Download Identity_Deltas' : 'Compiling...'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
