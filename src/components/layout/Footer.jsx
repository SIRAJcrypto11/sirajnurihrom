import { ExternalLink } from 'lucide-react';

export const Footer = () => {
    return (
        <div
            className="relative h-screen"
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className="fixed bottom-0 w-full h-screen flex flex-col justify-end">
                <footer className="bg-white text-neutral-900 pt-24 pb-8 overflow-hidden relative z-10 border-t border-neutral-100 w-full">
                    <div className="container mx-auto px-6">

                        {/* Top Section: "Experience Liftoff" / Links (Antigravity Style) */}
                        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-8 mb-32">
                            <div className="col-span-2 md:col-span-5 lg:col-span-6">
                                <h3 className="text-3xl md:text-5xl font-medium tracking-tight">Experience liftoff<span className="text-primary-DEFAULT">.</span></h3>
                                <p className="text-neutral-500 mt-4 max-w-sm">Empowering MSMEs and individuals with cutting-edge digital infrastructure and scalable operating systems.</p>
                            </div>

                            <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col gap-4">
                                <span className="font-bold text-black uppercase tracking-wider text-xs mb-2">Platform</span>
                                <a href="http://erp.snishop.com/" target="_blank" rel="noreferrer" className="text-sm font-medium text-neutral-500 hover:text-primary-DEFAULT transition-colors">SNISHOP ERP</a>
                                <a href="https://budgyai.vercel.app/" target="_blank" rel="noreferrer" className="text-sm font-medium text-neutral-500 hover:text-primary-DEFAULT transition-colors">Budgy AI</a>
                                <a href="https://cotrade.snishop.com" target="_blank" rel="noreferrer" className="text-sm font-medium text-neutral-500 hover:text-primary-DEFAULT transition-colors">CoTrade</a>
                                <a href="#projects" className="text-sm font-medium text-neutral-500 hover:text-primary-DEFAULT transition-colors">All Products &rarr;</a>
                            </div>

                            <div className="col-span-1 md:col-span-3 lg:col-span-2 flex flex-col gap-4">
                                <span className="font-bold text-black uppercase tracking-wider text-xs mb-2">Company</span>
                                <a href="#about" className="text-sm font-medium text-neutral-500 hover:text-primary-DEFAULT transition-colors">About</a>
                                <a href="#experience" className="text-sm font-medium text-neutral-500 hover:text-primary-DEFAULT transition-colors">Ecosystem Timeline</a>
                                <a href="#skills" className="text-sm font-medium text-neutral-500 hover:text-primary-DEFAULT transition-colors">Tech Architecture</a>
                                <a href="#contact" className="text-sm font-medium text-neutral-500 hover:text-primary-DEFAULT transition-colors">Enterprise Contact</a>
                            </div>

                            <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col gap-4">
                                <span className="font-bold text-black uppercase tracking-wider text-xs mb-2">Developers</span>
                                <a href="https://github.com/SIRAJcrypto11" target="_blank" rel="noreferrer" className="text-sm font-medium text-neutral-500 hover:text-black transition-colors flex items-center justify-between group">
                                    GitHub <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                                <a href="https://snishop.com" target="_blank" rel="noreferrer" className="text-sm font-medium text-neutral-500 hover:text-black transition-colors flex items-center justify-between group">
                                    SNISHOP.ID <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                                <a href="#" className="text-sm font-medium text-neutral-500 hover:text-black transition-colors">System Status</a>
                            </div>
                        </div>

                        {/* Massive Typography Section (The Antigravity Signature) */}
                        <div className="w-full relative flex justify-center items-center mb-16 select-none">
                            <h1
                                className="font-black text-black tracking-tighter"
                                // Using clamp to ensure the typography forcefully scales with the viewport to stay edge-to-edge
                                style={{ fontSize: 'clamp(2rem, 12vw, 25rem)', lineHeight: 0.8 }}
                            >
                                SirajNurIhrom
                            </h1>
                        </div>

                        {/* Bottom Legal Bar */}
                        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-200/60 gap-4">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-lg tracking-tight">SNISHOP</span>
                            </div>
                            <div className="flex gap-6">
                                <span className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 cursor-pointer transition-colors">&copy; {new Date().getFullYear()} Siraj Nur Ihrom</span>
                                <a href="https://snishop.com" target="_blank" rel="noreferrer" className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors">Main Platform</a>
                                <a href="#home" className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors">Back to Top</a>
                            </div>
                        </div>

                    </div>
                </footer>
            </div>
        </div>
    );
};
