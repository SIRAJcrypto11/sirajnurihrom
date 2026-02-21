import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audio } from '../../utils/audio';

const SEQUENCES = {
    SIRAJ: 'siraj',
    SNISHOP: 'snishop',
    MATRIX: 'matrix'
};

export const EasterEggHandler = () => {
    const [activeEgg, setActiveEgg] = useState(null);
    const [buffer, setBuffer] = useState('');

    useEffect(() => {
        const handleKeyDown = (e) => {
            const char = e.key.toLowerCase();
            if (!/^[a-z]$/.test(char)) return;

            const newBuffer = (buffer + char).slice(-10);
            setBuffer(newBuffer);

            Object.entries(SEQUENCES).forEach(([key, seq]) => {
                if (newBuffer.endsWith(seq)) {
                    triggerEgg(key);
                }
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [buffer]);

    const triggerEgg = (type) => {
        audio.playRise();
        setActiveEgg(type);
        setBuffer('');

        // Auto-clear egg after 5 seconds
        setTimeout(() => {
            setActiveEgg(null);
        }, 5000);
    };

    return (
        <AnimatePresence>
            {activeEgg && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 bg-primary-DEFAULT/5 backdrop-glitch mix-blend-overlay" />

                    {/* Matrix Coding Style Overlay */}
                    <div className="absolute inset-0 grid grid-cols-12 opacity-20">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: '-100%' }}
                                animate={{ y: '100%' }}
                                transition={{
                                    duration: Math.random() * 2 + 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: Math.random() * 2
                                }}
                                className="flex flex-col text-[10px] font-mono text-primary-light break-all leading-none"
                            >
                                {Array.from({ length: 50 }).map((_, j) => (
                                    <span key={j}>{Math.random() > 0.5 ? '1' : '0'}</span>
                                ))}
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        className="relative z-10 text-center"
                    >
                        <div className="p-8 bg-black/80 backdrop-blur-2xl border border-primary-DEFAULT/30 rounded-3xl shadow-[0_0_100px_rgba(0,196,255,0.2)]">
                            <h2 className="text-4xl font-black text-white tracking-tighter mb-2">SYSTEM_ACCESS: GRANTED</h2>
                            <p className="text-primary-light font-mono text-xs tracking-widest uppercase">Secret Sequence Detected: {activeEgg}</p>
                            <div className="mt-4 flex gap-1 justify-center">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [1, 0.2, 1] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                                        className="w-1.5 h-1.5 rounded-full bg-primary-DEFAULT"
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
