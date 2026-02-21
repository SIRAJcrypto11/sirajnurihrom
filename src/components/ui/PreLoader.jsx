import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const PreLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 2000; // 2 seconds
        const intervalTime = 20; // 20ms update interval
        const steps = duration / intervalTime;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const newProgress = Math.min((currentStep / steps) * 100, 100);

            // Custom easing for the counter (starts fast, slows down at the end)
            const easeOutCubic = 1 - Math.pow(1 - newProgress / 100, 3);
            setProgress(Math.floor(easeOutCubic * 100));

            if (currentStep >= steps) {
                clearInterval(interval);
                setTimeout(onComplete, 500); // Wait a half second at 100% before firing completion
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-bg-dark flex flex-col items-center justify-center pointer-events-none"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // "Antigravity" snappy snap-up slide
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm px-6">
                <div className="flex justify-between items-end mb-4 overflow-hidden">
                    <motion.span
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white font-mono text-sm tracking-widest uppercase"
                    >
                        Initializing
                    </motion.span>
                    <motion.span
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white font-black text-6xl md:text-8xl tracking-tighter"
                    >
                        {progress}%
                    </motion.span>
                </div>

                {/* Thin sleek loading bar */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="h-[1px] w-full bg-white/20 origin-left relative"
                >
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-white"
                        style={{ width: `${progress}%` }}
                    />
                </motion.div>
            </div>

            {/* Minimalist Watermark at the bottom */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 font-bold tracking-widest text-xs uppercase"
            >
                Siraj Nur Ihrom Ecosystem
            </motion.div>
        </motion.div>
    );
};
