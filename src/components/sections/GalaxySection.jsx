import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ecosystemCategories } from '../../data/ecosystem.jsx';
import { Sparkles, ArrowUpRight, Zap, Target } from 'lucide-react';
import { audio } from '../../utils/audio';

export const GalaxySection = () => {
    const [hoveredApp, setHoveredApp] = useState(null);

    // Calculate positions for apps in orbits with responsive scaling
    const orbits = useMemo(() => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const radiusMultiplier = isMobile ? 0.6 : 1; // Shrink orbits for mobile

        return ecosystemCategories.map((cat, catIdx) => {
            const radius = (120 + catIdx * 80) * radiusMultiplier;
            const speed = 20 + catIdx * 10;
            return {
                ...cat,
                radius,
                speed,
                apps: cat.apps.map((app, appIdx) => {
                    const angle = (appIdx / cat.apps.length) * Math.PI * 2;
                    return { ...app, angle };
                })
            };
        });
    }, []);

    return (
        <section className="py-32 bg-[#050510] relative overflow-hidden flex flex-col items-center gpu-accelerated">
            {/* Background Grid & Glow */}
            <div className="absolute inset-0 bg-hero-grid opacity-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-DEFAULT/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-primary-light font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Orbital Architecture</span>
                    <h2 className="text-[clamp(2rem,8vw,4.5rem)] md:text-5xl lg:text-7xl font-black text-white leading-tight">
                        Ecosystem <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-DEFAULT to-accent-electric">Gravity.</span>
                    </h2>
                    <p className="text-neutral-500 mt-6 max-w-2xl mx-auto text-lg">
                        Visualize the interconnected power of 20+ specialized modules orbiting the SNISHOP core. Scaling across every dimension of digital utility.
                    </p>
                </motion.div>

                {/* The Galaxy Map - Optimized with GPU hooks */}
                <div className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center gpu-accelerated force-3d">
                    {/* CENTER CORE */}
                    <motion.div
                        animate={{
                            boxShadow: ["0 0 20px rgba(0,196,255,0.2)", "0 0 60px rgba(0,196,255,0.4)", "0 0 20px rgba(0,196,255,0.2)"]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="relative z-50 w-24 h-24 md:w-32 md:h-32 rounded-full bg-black border-2 border-primary-DEFAULT/50 flex items-center justify-center shadow-2xl gpu-accelerated"
                    >
                        <div className="absolute inset-2 rounded-full border border-primary-light/20 animate-spin-slow" />
                        <img
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e711957c86e922f92ad49f/a236b74f4_Logosnishopbirupanjang.png"
                            className="h-6 md:h-10 w-auto object-contain relative z-10"
                            alt="SNISHOP"
                        />
                        <div className="absolute -bottom-8 whitespace-nowrap text-[10px] font-mono text-primary-light font-bold tracking-widest opacity-60">
                            CORE_STABILITY: OPTIMAL
                        </div>
                    </motion.div>

                    {/* ORBITS */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {orbits.map((orbit, i) => (
                            <motion.div
                                key={orbit.category}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 1 }}
                                className="absolute border border-white/5 rounded-full"
                                style={{
                                    width: orbit.radius * 2,
                                    height: orbit.radius * 2,
                                }}
                            />
                        ))}
                    </div>

                    {/* APP NODES - CSS Optimize */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {orbits.map((orbit) => (
                            <motion.div
                                key={`${orbit.category}-apps`}
                                animate={{ rotate: 360 }}
                                transition={{ duration: orbit.speed, repeat: Infinity, ease: "linear" }}
                                className="absolute force-3d"
                                style={{ width: orbit.radius * 2, height: orbit.radius * 2 }}
                            >
                                {orbit.apps.map((app) => (
                                    <div
                                        key={app.name}
                                        className="absolute group"
                                        style={{
                                            left: '50%',
                                            top: '50%',
                                            transform: `translate(-50%, -50%) rotate(${app.angle}rad) translate(${orbit.radius}px) rotate(-${app.angle}rad)`,
                                        }}
                                    >
                                        <motion.div
                                            onMouseEnter={() => { setHoveredApp(app); audio.playTick(); }}
                                            onMouseLeave={() => setHoveredApp(null)}
                                            onClick={() => window.open(app.url, '_blank')}
                                            animate={hoveredApp?.name === app.name ? { scale: 1.5, zIndex: 100 } : { scale: 1 }}
                                            className="relative cursor-pointer gpu-accelerated"
                                        >
                                            {/* Line to core on hover */}
                                            <AnimatePresence>
                                                {hoveredApp?.name === app.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scaleX: 0 }}
                                                        animate={{ opacity: 1, scaleX: 1 }}
                                                        exit={{ opacity: 0, scaleX: 0 }}
                                                        className="absolute top-1/2 right-1/2 w-[200px] h-[1px] bg-gradient-to-r from-primary-DEFAULT to-transparent origin-right -z-10"
                                                        style={{ transform: `rotate(${app.angle}rad)` }}
                                                    />
                                                )}
                                            </AnimatePresence>

                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#0a0a15] border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-primary-light group-hover:border-primary-DEFAULT transition-all shadow-lg overflow-hidden relative">
                                                <div className="absolute inset-0 bg-primary-DEFAULT/0 group-hover:bg-primary-DEFAULT/10 transition-colors" />
                                                <span className="relative z-10 pointer-events-none">
                                                    {app.logo || <Zap size={14} />}
                                                </span>
                                            </div>

                                            {/* Tooltip / Label */}
                                            <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${hoveredApp?.name === app.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                                                <div className="bg-black/90 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-black text-white">{app.name}</span>
                                                        <ArrowUpRight size={10} className="text-primary-light" />
                                                    </div>
                                                    <p className="text-[8px] text-neutral-500 font-mono tracking-tighter uppercase">{orbit.category}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Legend / Status */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                >
                    {orbits.map((orbit) => (
                        <div key={orbit.category} className="text-center group">
                            <div className="text-[10px] font-mono font-bold text-neutral-500 tracking-widest uppercase mb-2 group-hover:text-primary-light transition-colors">
                                {orbit.category.split(' ')[0]} Orbit
                            </div>
                            <div className="text-2xl font-black text-white">{orbit.apps.length}</div>
                            <div className="text-[9px] text-neutral-600 font-bold tracking-tighter">SYNCHRONIZED_NODES</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Interaction Guide */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/20 font-mono text-[9px] tracking-[0.4em] uppercase">
                <Target size={12} className="animate-pulse" />
                Select Node To Interoperability
            </div>
        </section>
    );
};
