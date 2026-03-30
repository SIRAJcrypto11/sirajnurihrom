import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X, ArrowRight, Zap, Briefcase, Sparkles, Layers, MessageSquare, Home, User, Mail, Star } from 'lucide-react';
import { ecosystemCategories } from '../../data/ecosystem.jsx';
import { audio } from '../../utils/audio';

export const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef(null);

    // Flatten ecosystem apps for search
    const allApps = ecosystemCategories.flatMap(cat => cat.apps.map(app => ({ ...app, type: 'app', category: cat.category })));

    // Navigation items
    const navigationItems = [
        { name: 'Home', href: '#home', icon: <Home size={16} /> },
        { name: 'About', href: '#about', icon: <User size={16} /> },
        { name: 'Projects', href: '#projects', icon: <Layers size={16} /> },
        { name: 'Skills', href: '#skills', icon: <Star size={16} /> },
        { name: 'Contact', href: '#contact', icon: <Mail size={16} /> },
    ];

    // Filtered results
    const filteredItems = [
        ...navigationItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).map(item => ({ ...item, type: 'nav' })),
        ...allApps.filter(app => app.name.toLowerCase().includes(search.toLowerCase()) || app.desc.toLowerCase().includes(search.toLowerCase())).map(app => ({ ...app, type: 'app' }))
    ];

    const handleOpen = useCallback(() => {
        setIsOpen(true);
        audio.playRise();
        setSearch('');
        setActiveIndex(0);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        audio.playClick();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                isOpen ? handleClose() : handleOpen();
            }
            if (e.key === 'Escape') handleClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleOpen, handleClose]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSelect = (item) => {
        audio.playClick();
        if (item.type === 'nav') {
            const element = document.querySelector(item.href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (item.type === 'app') {
            window.open(item.url, '_blank', 'noopener,noreferrer');
        }
        handleClose();
    };

    const handleNavigate = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(prev => (prev + 1) % filteredItems.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
        } else if (e.key === 'Enter') {
            if (filteredItems[activeIndex]) {
                handleSelect(filteredItems[activeIndex]);
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[7000] flex items-start justify-center pt-[15vh] px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={handleClose} />

                    <motion.div
                        className="relative w-full max-w-2xl bg-[#0a0a0f]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-complex"
                        initial={{ scale: 0.95, y: -20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: -20, opacity: 0 }}
                    >
                        {/* Search Input Area */}
                        <div className="flex items-center gap-4 px-6 py-5 border-b border-white/5 bg-white/5">
                            <Search className="text-primary-DEFAULT" size={20} />
                            <input
                                ref={inputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleNavigate}
                                placeholder="Type a command or search for an app..."
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder-neutral-500 font-medium text-lg"
                            />
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded-lg">
                                <span className="text-[10px] font-bold text-neutral-400">ESC</span>
                            </div>
                        </div>

                        {/* Results Area */}
                        <div className="max-h-[60vh] overflow-y-auto p-2 layout-scrollbar">
                            {filteredItems.length > 0 ? (
                                <div className="space-y-1">
                                    {filteredItems.map((item, index) => (
                                        <div
                                            key={item.name}
                                            onMouseEnter={() => { setActiveIndex(index); audio.playTick(); }}
                                            onClick={() => handleSelect(item)}
                                            className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 ${activeIndex === index ? 'bg-primary-DEFAULT/20 border border-primary-DEFAULT/30 translate-x-1' : 'bg-transparent border border-transparent hover:bg-white/5'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2.5 rounded-lg ${activeIndex === index ? 'bg-primary-DEFAULT text-white' : 'bg-white/5 text-neutral-400'}`}>
                                                    {item.type === 'nav' ? item.icon : (item.logo || <Zap size={16} />)}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`font-bold transition-colors ${activeIndex === index ? 'text-white' : 'text-neutral-200'}`}>{item.name}</span>
                                                        {item.type === 'app' && (
                                                            <span className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-neutral-500 uppercase tracking-tighter">{item.category}</span>
                                                        )}
                                                    </div>
                                                    {item.desc && (
                                                        <span className="text-xs text-neutral-500 block truncate max-w-md">{item.desc}</span>
                                                    )}
                                                </div>
                                            </div>
                                            {activeIndex === index && (
                                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-primary-light font-mono text-[10px] font-bold">
                                                    <span>OPEN</span>
                                                    <ArrowRight size={12} />
                                                </motion.div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                                    <div className="p-4 bg-white/5 rounded-full">
                                        <MessageSquare size={32} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white font-bold tracking-wide uppercase text-sm">No results found for "{search}"</p>
                                        <p className="text-xs text-neutral-500">Ask the AI Assistant instead?</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Tips */}
                        <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↑↓</span>
                                    <span>Navigate</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">ENTER</span>
                                    <span>Select</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Command size={10} />
                                <span className="uppercase tracking-widest">Singularity_Control_Center</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
