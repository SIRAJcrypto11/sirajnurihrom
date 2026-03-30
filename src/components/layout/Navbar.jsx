import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../ui/Button';
import { ecosystemCategories } from '../../data/ecosystem';
import { audio } from '../../utils/audio';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    // SaaS Anti-Mainstream Scroll Progress Bar
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const navLinks = [
        {
            name: 'Home',
            href: '#home',
            subItems: [
                { name: 'Core Initialization', href: '#home', desc: 'Return to the system core.' },
                { name: 'System Metrics', href: '#home', desc: 'Live operational data.' }
            ]
        },
        {
            name: 'About',
            href: '#about',
            subItems: [
                { name: 'Architecture', href: '#about', desc: 'The blueprint of my journey.' },
                { name: 'Modules', href: '#about', desc: 'Core components of my expertise.' }
            ]
        },
        { name: 'Experience', href: '#experience' },
        {
            name: 'Projects',
            href: '#projects',
            subItems: [
                { name: 'Ecosystem', href: '#projects', desc: 'The interconnected suite of apps.' },
                { name: 'Customer Showcase', href: '#customer-showcase', desc: 'Premium client solutions and case studies.' },
                { name: 'Prototypes', href: '#projects', desc: 'Experimental builds and R&D.' }
            ]
        },
        {
            name: 'Skills',
            href: '#skills',
            subItems: [
                { name: 'Tech Stack', href: '#skills', desc: 'Languages, frameworks, and tools.' },
                { name: 'Proficiency', href: '#skills', desc: 'Skill level heuristics and data.' }
            ]
        },
        { name: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollTo = (e, href) => {
        e.preventDefault();
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className={cn(
            'fixed top-0 w-full z-[1000] transition-colors duration-300',
            (isScrolled || isMegaMenuOpen || activeDropdown) ? 'bg-[#050510]/95 backdrop-blur-2xl shadow-light border-b border-primary-DEFAULT/10' : 'bg-transparent'
        )}>
            {/* Global Scroll Progress Indicator */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary origin-left z-50"
                style={{ scaleX }}
            />

            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <a
                    href="#home"
                    onClick={(e) => handleScrollTo(e, '#home')}
                    className="text-2xl font-black bg-gradient-primary bg-clip-text text-transparent group"
                >
                    <span className="group-hover:text-primary-DEFAULT transition-colors">Siraj Nur Ihrom</span>
                </a>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-8 relative">
                    {navLinks.map((link) => (
                        <li
                            key={link.name}
                            className="h-full flex items-center relative"
                            onMouseEnter={() => {
                                if (link.name !== 'Experience' && link.subItems) {
                                    setActiveDropdown(link.name);
                                    setIsMegaMenuOpen(false);
                                }
                            }}
                            onMouseLeave={() => {
                                if (link.name !== 'Experience') {
                                    setActiveDropdown(null);
                                }
                            }}
                        >
                            {link.name === 'Experience' ? (
                                <button
                                    onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                                    aria-label="Toggle Ecosystem Mega Menu"
                                    className={cn(
                                        'flex items-center gap-1.5 font-bold transition-all duration-300 text-sm tracking-wide uppercase py-4',
                                        (isScrolled || isMegaMenuOpen || activeDropdown) ? 'text-text-primary hover:text-primary-DEFAULT' : 'text-neutral-300 hover:text-white',
                                        isMegaMenuOpen && 'text-primary-DEFAULT'
                                    )}
                                >
                                    Ecosystem
                                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isMegaMenuOpen && "rotate-180")} />
                                </button>
                            ) : link.subItems ? (
                                <>
                                    <button
                                        onClick={(e) => {
                                            audio.playClick();
                                            handleScrollTo(e, link.href);
                                            setActiveDropdown(null);
                                        }}
                                        onMouseEnter={() => {
                                            audio.playTick();
                                            if (link.name !== 'Experience' && link.subItems) {
                                                setActiveDropdown(link.name);
                                                setIsMegaMenuOpen(false);
                                            }
                                        }}
                                        aria-label={`Toggle ${link.name} dropdown`}
                                        className={cn(
                                            'flex items-center gap-1.5 font-bold transition-all duration-300 text-sm tracking-wide uppercase py-4',
                                            (isScrolled || isMegaMenuOpen || activeDropdown) ? 'text-text-primary hover:text-primary-DEFAULT' : 'text-neutral-300 hover:text-white',
                                            activeDropdown === link.name && 'text-primary-DEFAULT'
                                        )}
                                    >
                                        {link.name}
                                        <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeDropdown === link.name && "rotate-180")} />
                                    </button>

                                    {/* Standard Glassmorphic Dropdown */}
                                    <AnimatePresence>
                                        {activeDropdown === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } }}
                                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                className="absolute top-14 left-1/2 -translate-x-1/2 w-72 bg-[#050510]/98 backdrop-blur-2xl border border-primary-DEFAULT/20 rounded-2xl p-3 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.9)] z-50 text-left"
                                            >
                                                <div className="flex flex-col gap-1">
                                                    {link.subItems.map((subItem, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={subItem.href}
                                                            onClick={(e) => { setActiveDropdown(null); handleScrollTo(e, subItem.href); }}
                                                            className="group flex flex-col p-3 rounded-xl hover:bg-white/5 transition-colors"
                                                        >
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-white font-bold text-sm group-hover:text-primary-light transition-colors">{subItem.name}</span>
                                                                <ChevronRight className="w-3 h-3 text-primary-DEFAULT opacity-0 -ml-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                            </div>
                                                            <span className="text-neutral-500 text-xs">{subItem.desc}</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </>
                            ) : (
                                <a
                                    href={link.href}
                                    onClick={(e) => { setIsMegaMenuOpen(false); handleScrollTo(e, link.href); }}
                                    className={cn(
                                        'font-bold transition-all duration-300 text-sm tracking-wide uppercase py-4',
                                        (isScrolled || isMegaMenuOpen || activeDropdown) ? 'text-text-primary hover:text-primary-DEFAULT' : 'text-neutral-300 hover:text-white'
                                    )}
                                >
                                    {link.name}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-primary-DEFAULT p-2 rounded-xl bg-primary-DEFAULT/10 border border-primary-DEFAULT/20"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Mobile Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* FULL WIDTH MEGA MENU (Antigravity Style) */}
            <AnimatePresence>
                {isMegaMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 w-full bg-[#050510]/98 backdrop-blur-3xl border-b border-primary-DEFAULT/20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] z-40 overflow-hidden"
                    >
                        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row gap-16">

                            {/* Left Side: Overview/Hero */}
                            <div className="w-full md:w-1/3 flex flex-col justify-center">
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight tracking-tight">
                                    Built for scale<br />in the agent-first era
                                </h3>
                                <p className="text-neutral-400 text-base mb-8 leading-relaxed pr-8">
                                    Explore how the SNISHOP ecosystem empowers enterprise distribution, automation, and intelligent resource planning.
                                </p>
                                <a
                                    href="#projects"
                                    onClick={(e) => { setIsMegaMenuOpen(false); handleScrollTo(e, '#projects'); }}
                                    className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold py-2.5 px-6 rounded-full w-max hover:bg-neutral-200 transition-colors shadow-md group"
                                >
                                    See overview
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            {/* Right Side: Grid of Links */}
                            <div className="w-full md:w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                {ecosystemCategories.map((cat, idx) => (
                                    <div key={idx} className="space-y-4">
                                        <div className="flex items-center gap-2 text-primary-DEFAULT mb-2">
                                            <div className="w-5 h-5 flex items-center justify-center opacity-80">{cat.icon}</div>
                                            <span className="text-xs font-bold uppercase tracking-wider">{cat.category}</span>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            {cat.apps.map((app, appIdx) => (
                                                <a
                                                    key={appIdx}
                                                    href={app.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="group flex items-center gap-3 text-neutral-300 hover:text-white transition-colors py-1"
                                                >
                                                    <div className="w-5 h-5 flex items-center justify-center text-neutral-500 group-hover:text-primary-DEFAULT transition-colors">
                                                        {app.logo}
                                                    </div>
                                                    <span className="text-sm font-semibold">{app.name}</span>
                                                    <ChevronRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:translate-x-1 text-primary-DEFAULT transition-all" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        className="absolute top-full left-0 w-full bg-bg-card border-b border-primary-DEFAULT/10 shadow-medium md:hidden overflow-hidden"
                    >
                        <ul className="flex flex-col py-6 px-6 gap-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleScrollTo(e, link.href)}
                                        className="block text-xl font-black text-text-primary hover:text-primary-DEFAULT transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
