import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Rocket, Mail, ChevronDown, CheckCircle2, BarChart3, Database, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { audio } from '../../utils/audio';
import { IdentityCompiler } from '../ui/IdentityCompiler';

export const HeroSection = () => {
    const [isCompilerOpen, setIsCompilerOpen] = useState(false);
    const [text, setText] = useState('');
    const fullText = "Building The Agent-First Era";

    // Parallax Scroll Hooks
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 800], [0, 300]);
    const yImage = useTransform(scrollY, [0, 800], [0, 150]);
    const yBg = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacityFade = useTransform(scrollY, [0, 500], [1, 0]);

    // Typing effect for subtitle
    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, current + 1));
            current++;
            if (current >= fullText.length) clearInterval(interval);
        }, 60);
        return () => clearInterval(interval);
    }, []);

    // Cinematic Typography Stagger
    const nameChars = "Siraj Nur Ihrom".split('');
    const containerVariant = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
    };
    const charVariant = {
        hidden: { opacity: 0, y: 50, rotateX: -90 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
    };

    return (
        <section id="home" className="min-h-screen relative flex items-center justify-center bg-gradient-dark overflow-hidden pt-20">
            {/* Parallax Background Grid */}
            <motion.div style={{ y: yBg }} className="absolute inset-0 bg-hero-grid opacity-30 origin-top" />

            {/* Aurora Glow Effects */}
            <motion.div
                animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] left-[15%] w-[40vw] h-[400px] rounded-full bg-primary-DEFAULT/15 blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{ y: [0, -40, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                className="absolute top-[50%] right-[10%] w-[30vw] h-[300px] rounded-full bg-accent-electric/15 blur-[100px] pointer-events-none"
            />

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10 min-h-[80vh]">

                {/* Left Column: Text Content */}
                <motion.div
                    style={{ y: yText, opacity: opacityFade }}
                    className="text-white space-y-8 text-center md:text-left pt-20 md:pt-0 will-change-transform"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase shadow-[0_0_15px_rgba(0,196,255,0.1)]"
                    >
                        <Rocket className="w-4 h-4 text-accent-electric animate-pulse" />
                        <span className="text-neutral-300">Experience Liftoff</span>
                    </motion.div>

                    {/* Cinematic Stagger Text (The "Google Antigravity" typography feel) */}
                    <motion.h1
                        variants={containerVariant}
                        initial="hidden"
                        animate="visible"
                        className="text-[clamp(2.5rem,12vw,5.5rem)] font-black leading-[1.05] tracking-tighter perspective-1000"
                    >
                        <span className="inline-block whitespace-nowrap">
                            {nameChars.slice(0, 5).map((char, index) => (
                                <motion.span key={index} variants={charVariant} className="inline-block">
                                    <span className="bg-gradient-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_5s_linear_infinite]">
                                        {char}
                                    </span>
                                </motion.span>
                            ))}
                        </span>
                        {' '}
                        <span className="inline-block whitespace-nowrap">
                            {nameChars.slice(6, 9).map((char, index) => (
                                <motion.span key={index + 6} variants={charVariant} className="inline-block">
                                    <span className="bg-gradient-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_5s_linear_infinite]">
                                        {char}
                                    </span>
                                </motion.span>
                            ))}
                        </span>
                        {' '}
                        <span className="inline-block whitespace-nowrap">
                            {nameChars.slice(10).map((char, index) => (
                                <motion.span key={index + 10} variants={charVariant} className="inline-block">
                                    <span className="bg-gradient-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_5s_linear_infinite]">
                                        {char}
                                    </span>
                                </motion.span>
                            ))}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="font-mono text-xl md:text-2xl text-neutral-300 h-8 font-bold"
                    >
                        {text}<span className="animate-pulse text-accent-electric">_</span>
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-xl mx-auto md:mx-0 font-medium"
                    >
                        Synchronized enterprise control across your ecosystem. Scaling state-of-the-art platforms and intelligent architectures for the next generation.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4"
                    >
                        <Button asChild href="#experience" className="py-4 px-8 text-lg rounded-full shadow-[0_0_20px_rgba(10,102,194,0.4)] hover:shadow-[0_0_40px_rgba(0,196,255,0.6)] hover:-translate-y-1 transition-all duration-300 group">
                            <span className="flex items-center gap-2">Initialize Core <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                        </Button>
                        <Button onClick={() => setIsCompilerOpen(true)} variant="secondary" className="py-4 px-8 text-lg rounded-full border-white/10 hover:border-primary-DEFAULT group">
                            <span className="flex items-center gap-2">Compile Identity <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" /></span>
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Identity Compiler Modal */}
                <IdentityCompiler isOpen={isCompilerOpen} onClose={() => setIsCompilerOpen(false)} />

                {/* Right Column: Code-Driven Motion Graphic & Profile Overlay */}
                <motion.div
                    style={{ y: yImage, opacity: opacityFade }}
                    className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center mt-12 md:mt-0 perspective-1000"
                >
                    {/* Orbiting Decorators behind the Avatar */}
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-[1px] border-primary-DEFAULT/20 rounded-full scale-[0.8] z-0" />
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-[1px] border-dashed border-accent-electric/30 rounded-full scale-[1.1] z-0" />

                    {/* Rotating Energy Ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[20%] rounded-full opacity-60 mix-blend-screen z-10"
                        style={{
                            background: 'conic-gradient(from 0deg, transparent, rgba(0, 196, 255, 0.4), transparent)'
                        }}
                    />

                    {/* Center Avatar Core */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 1, type: "spring" }}
                        className="absolute z-20 w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full p-2 bg-neutral-900 shadow-[0_0_100px_rgba(0,196,255,0.3)] border border-primary-DEFAULT/30"
                    >
                        <img
                            src="https://media.licdn.com/dms/image/v2/D5603AQEFX3sObQ3iMQ/profile-displayphoto-scale_200_200/B56Znh8dq1HUAg-/0/1760432351546?e=2147483647&v=beta&t=EtOGHSk5r9skjswkxdD783UFdGX8TuY8E9FC4bx-9Gw"
                            alt="Siraj Nur Ihrom"
                            className="w-full h-full object-cover rounded-full border border-neutral-800"
                        />
                    </motion.div>

                    {/* Floating UI Widget: Metrics (Orbiting Top Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1, y: [-10, 15, -10] }}
                        transition={{ opacity: { delay: 1, duration: 1 }, scale: { delay: 1, duration: 1 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
                        className="absolute md:-left-4 top-1/4 z-30 w-48 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary-DEFAULT/20 flex items-center justify-center border border-primary-DEFAULT/30">
                                <BarChart3 className="w-5 h-5 text-primary-light" />
                            </div>
                            <div>
                                <span className="block text-white font-black text-xl">99.9%</span>
                                <span className="block text-[10px] tracking-wider text-primary-light font-bold">SYSTEM UPTIME</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating UI Widget: Automation Log (Orbiting Bottom Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1, y: [15, -10, 15] }}
                        transition={{ opacity: { delay: 1.2, duration: 1 }, scale: { delay: 1.2, duration: 1 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
                        className="absolute right-0 md:-right-8 bottom-1/4 z-30 w-56 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 mb-3 border-b border-white/10 pb-2 tracking-widest">
                            <span>core-engine.exe</span>
                            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-accent-electric">SYNCING</motion.span>
                        </div>
                        <div className="relative h-[65px] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
                            <motion.div
                                animate={{ y: [0, -48] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="space-y-2 text-[10px] font-mono text-neutral-300"
                            >
                                <p className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-500" /> Auth verified.</p>
                                <p className="flex items-center gap-1.5"><Database className="w-3 h-3 text-accent-electric" /> Connecting DB...</p>
                                <p className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-500" /> Nodes mapped.</p>
                                <p className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-500" /> System online.</p>
                                <p className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-500" /> Auth verified.</p>
                                <p className="flex items-center gap-1.5"><Database className="w-3 h-3 text-accent-electric" /> Connecting DB...</p>
                            </motion.div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>

            {/* Scroll Indicator Arrow */}
            <motion.div
                style={{ opacity: opacityFade }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-500 animate-bounce"
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
};
