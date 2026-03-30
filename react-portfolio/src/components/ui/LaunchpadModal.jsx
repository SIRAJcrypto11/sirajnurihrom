import { motion, AnimatePresence } from 'framer-motion';
import { ecosystemCategories } from '../../data/ecosystem';
import { X, ExternalLink } from 'lucide-react';
import { Card } from './Card';
import { useEffect } from 'react';

export const LaunchpadModal = ({ isOpen, onClose }) => {

    // Lock body scroll and sync with Lenis when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.lenis?.stop();
        } else {
            document.body.style.overflow = 'auto';
            window.lenis?.start();
        }
        return () => {
            document.body.style.overflow = 'auto';
            window.lenis?.start();
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[5000] flex flex-col pointer-events-auto"
                    initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
                    exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Dark Overlay Tint */}
                    <div className="absolute inset-0 bg-neutral-900/80" onClick={onClose} />

                    {/* Content Container (Scrollable) */}
                    <div 
                        className="relative z-10 w-full h-full overflow-y-auto px-6 py-12 md:py-24 custom-scrollbar"
                        data-lenis-prevent
                    >
                        <div className="container mx-auto max-w-7xl">

                            {/* Header & Close Button */}
                            <div className="flex justify-between items-end mb-16">
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-2">SNISHOP <span className="text-primary-DEFAULT">OS</span></h2>
                                    <p className="text-neutral-400 text-lg md:text-xl font-medium">The comprehensive suite of enterprise, AI, and digital services.</p>
                                </motion.div>

                                <motion.button
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    onClick={onClose}
                                    aria-label="Close Launchpad"
                                    className="p-4 bg-white/10 hover:bg-white/20 hover:text-white text-neutral-300 rounded-full transition-all duration-300 backdrop-blur-md"
                                >
                                    <X size={32} />
                                </motion.button>
                            </div>

                            {/* Categorized Ecosystem Grid */}
                            <div className="space-y-20 pb-32">
                                {ecosystemCategories.map((cat, catIdx) => (
                                    <motion.div
                                        key={cat.category}
                                        initial={{ y: 40, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 + (catIdx * 0.1) }}
                                    >
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                                                {cat.icon}
                                            </div>
                                            <h3 className="text-3xl font-bold text-white tracking-tight">{cat.category}</h3>
                                            <div className="h-px bg-white/10 flex-grow ml-4" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {cat.apps.map((app, appIdx) => (
                                                <motion.a
                                                    href={app.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    key={app.name}
                                                    className="group block"
                                                    whileHover={{ y: -5, scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Card className="h-full bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-primary-DEFAULT/50 transition-all duration-300 relative overflow-hidden group">
                                                        {/* Hover Glow */}
                                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-DEFAULT/0 to-accent-electric/0 group-hover:from-primary-DEFAULT/10 group-hover:to-accent-electric/10 transition-colors duration-500 z-0" />

                                                        {/* Project Showcase Image */}
                                                        {app.image && (
                                                            <div className="relative w-full h-40 overflow-hidden bg-neutral-900 border-b border-white/5">
                                                                <img src={app.image} alt={app.name} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                                            </div>
                                                        )}

                                                        <div className="relative z-10 p-6">
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div className="w-12 h-12 rounded-2xl bg-neutral-800/80 border border-white/5 flex items-center justify-center shadow-lg group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(0,196,255,0.3)] transition-all">
                                                                    <div className="text-white group-hover:text-accent-electric transition-colors">
                                                                        {app.logo}
                                                                    </div>
                                                                </div>
                                                                <ExternalLink size={18} className="text-neutral-500 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                                                            </div>
                                                            <h4 className="text-xl font-bold text-white mb-2">{app.name}</h4>
                                                            <p className="text-neutral-400 text-sm leading-relaxed">
                                                                {app.desc}
                                                            </p>
                                                        </div>
                                                    </Card>
                                                </motion.a>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
