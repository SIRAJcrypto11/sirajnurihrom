import { motion } from 'framer-motion';
import { Terminal, AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { audio } from '../utils/audio';

export const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#050510] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glitch Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-DEFAULT/30 blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-electric/30 blur-[150px] animate-pulse" />
            </div>

            <motion.div
                className="max-w-2xl w-full relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Glitch Header */}
                <div className="flex flex-col items-center text-center space-y-6">
                    <motion.div
                        animate={{
                            x: [0, -2, 2, -1, 0],
                            filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(-90deg)", "hue-rotate(0deg)"]
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <AlertTriangle size={80} className="text-primary-DEFAULT" />
                    </motion.div>

                    <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter">
                        404
                    </h1>

                    <div className="space-y-2">
                        <p className="text-2xl font-mono font-bold text-primary-light uppercase tracking-widest">
                            CRITICAL_SYSTEM_ERROR
                        </p>
                        <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">
                            Module_Address: [Null_Pointer_Exception]
                        </p>
                    </div>

                    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 font-mono text-left space-y-3">
                        <p className="text-primary-DEFAULT/80 text-xs tracking-tight">
                            &gt; ACCESSING MODULE_REGISTRY... FAIL
                        </p>
                        <p className="text-primary-DEFAULT/80 text-xs tracking-tight">
                            &gt; SEARCHING FOR CACHED_ROUTE... NOT_FOUND
                        </p>
                        <p className="text-red-500/80 text-xs tracking-tight animate-pulse">
                            &gt; FATAL_ERROR: THE REQUESTED COORDINATE DOES NOT EXIST IN THIS SIMULATION.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-8">
                        <Button
                            asChild
                            href="/"
                            onClick={() => audio.playClick()}
                            className="bg-white text-black hover:bg-neutral-200"
                        >
                            <ArrowLeft size={18} /> Re-Initialize Core
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => window.location.reload()}
                            className="border-white/10"
                        >
                            <RefreshCw size={18} /> Retry Sequence
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Matrix Coding Decorative Elements */}
            <div className="absolute right-10 bottom-10 font-mono text-[10px] text-white/10 hidden md:block">
                CORE_VERSION: 10.0.1<br />
                ENVIRONMENT: PRODUCTION<br />
                STATUS: GLITCH_MODE
            </div>
        </div>
    );
};
