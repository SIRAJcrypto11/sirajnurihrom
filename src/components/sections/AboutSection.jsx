import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Card } from '../ui/Card';

export const AboutSection = () => {
    // Terminal Typing Effect State
    const [terminalText, setTerminalText] = useState('');
    const fullText = '> initialize --stack\n[OK] React & Next.js\n[OK] TailwindCSS\n[OK] Framer Motion\n[OK] Node.js Ecosystem\n> await signal..._';
    const techCardRef = useRef(null);
    const isTechCardInView = useInView(techCardRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isTechCardInView) {
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex <= fullText.length) {
                    setTerminalText(fullText.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 30); // Typing speed
            return () => clearInterval(interval);
        }
    }, [isTechCardInView]);
    return (
        <section id="about" className="py-24 bg-neutral-900 overflow-hidden relative border-t border-white/5">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-16"
                >
                    <span className="text-primary-DEFAULT font-mono font-bold tracking-widest uppercase text-sm mb-4 block">System Architecture</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white">The Engine Room<span className="text-primary-DEFAULT">.</span></h2>
                </motion.div>

                {/* BENTO BOX GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[240px]">

                    {/* Bio Card - Large spanning */}
                    <motion.div
                        className="md:col-span-2 lg:col-span-2 row-span-1 lg:row-span-2"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full p-8 md:p-10 flex flex-col justify-between bg-bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/10">
                            <div className="space-y-6">
                                <div className="w-12 h-12 rounded-full bg-primary-DEFAULT/10 flex items-center justify-center text-primary-DEFAULT">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight">Architecting Scale.</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    I am an entrepreneur and technical leader with over 7 years of experience engineering digital platforms, fintech services, and scaling startups. Since 2018, I have been building SNISHOP.ID into a massive integrated SaaS and digital distribution ecosystem.
                                </p>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Location/Timezone Card */}
                    <motion.div
                        className="md:col-span-1 lg:col-span-1 row-span-1"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full p-8 relative overflow-hidden bg-[#0A0A0A] text-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-white/5 hover:border-primary-DEFAULT/30">
                            {/* Animated Radar/Globe Background */}
                            <div className="absolute inset-0 opacity-30 flex items-center justify-center pointer-events-none">
                                <div className="w-[200%] h-[200%] border border-primary-DEFAULT/20 rounded-full absolute animate-[spin_10s_linear_infinite]" />
                                <div className="w-[150%] h-[150%] border border-primary-DEFAULT/10 rounded-full absolute animate-[spin_15s_linear_infinite_reverse]" />
                                <div className="w-full h-full absolute flex items-center justify-center">
                                    <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-primary-DEFAULT/30 origin-left animate-[spin_4s_linear_infinite]" />
                                </div>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#0A0A0A_70%)]" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex items-center justify-between">
                                    <svg className="w-8 h-8 text-primary-DEFAULT group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-DEFAULT animate-ping" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-DEFAULT" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs font-mono text-primary-DEFAULT mb-2 tracking-widest uppercase">Base Coordinates</div>
                                    <div className="text-2xl font-black tracking-tight">Bengkulu, ID</div>
                                    <div className="text-neutral-400 font-mono text-xs mt-2 relative inline-flex items-center bg-white/5 px-2 py-1 rounded">
                                        <div className="w-2 h-2 rounded-full bg-accent-electric mr-2 animate-pulse" />
                                        <span>UTC+07:00 (WIB)</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Tech Stack Summary Card */}
                    <motion.div
                        ref={techCardRef}
                        className="md:col-span-1 lg:col-span-1 row-span-1"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full p-6 lg:p-8 bg-[#0A0A0A] text-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between border border-white/5 hover:border-accent-electric/30 group">
                            <div className="w-full h-32 bg-black/50 rounded-lg p-3 font-mono text-xs overflow-hidden border border-white/5 relative">
                                <div className="absolute top-0 left-0 w-full h-6 bg-white/5 border-b border-white/5 flex items-center px-2 gap-1.5">
                                    <div className="w-2h-2 rounded-full bg-red-500/50" />
                                    <div className="w-2h-2 rounded-full bg-yellow-500/50" />
                                    <div className="w-2h-2 rounded-full bg-green-500/50" />
                                    <span className="ml-2 text-[10px] text-neutral-500">core_module.sh</span>
                                </div>
                                <div className="mt-6 text-accent-electric whitespace-pre-wrap leading-relaxed">
                                    {terminalText}
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="text-xs font-mono text-accent-electric mb-1 tracking-widest uppercase">Primary Arsenal</div>
                                <div className="text-xl lg:text-2xl font-black tracking-tight group-hover:text-accent-electric transition-colors">React & Next.js</div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Status/Availability Card */}
                    <motion.div
                        className="md:col-span-2 lg:col-span-2 row-span-1"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full p-8 border border-primary-DEFAULT/20 bg-primary-DEFAULT/5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
                            {/* Animated Pulse Ring */}
                            <div className="absolute top-8 right-8 flex items-center justify-center">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-DEFAULT opacity-20"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary-DEFAULT"></span>
                            </div>

                            <div className="flex flex-col h-full justify-between max-w-sm">
                                <h3 className="text-2xl font-bold mb-2 text-white">Available for Enterprise Contracts.</h3>
                                <p className="text-text-secondary mb-6">Open to discuss software architecture, SaaS development, and technical co-founder opportunities.</p>
                                <a href="#contact" className="inline-flex w-max items-center justify-center px-6 py-2.5 bg-primary-DEFAULT text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors cursor-none group">
                                    Initiate Comm <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </a>
                            </div>
                        </Card>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
