import { motion } from 'framer-motion';
import { Mail, Phone, ExternalLink, Terminal } from 'lucide-react';
import { FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

export const ContactSection = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'system', text: 'Initializing secure communication channel...' },
        { id: 2, sender: 'system', text: 'Connection established. Handshake complete.' },
        { id: 3, sender: 'system', text: 'Type your message below to transmit directly to my mainframe.' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const terminalEndRef = useRef(null);

    const scrollToBottom = () => {
        terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMsg = { id: Date.now(), sender: 'user', text: inputValue };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate system response processing
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [
                ...prev,
                { id: Date.now() + 1, sender: 'system', text: `Message encrypted and routed. I will respond to your query shortly.` }
            ]);
        }, 1500);
    };

    return (
        <section id="contact" className="py-24 bg-gradient-dark text-white relative overflow-hidden">
            {/* Aurora Background for Contact */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-DEFAULT/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-electric/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Get In Touch</h2>
                    <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
                        Establish a direct connection to the network core.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Traditional Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-3xl font-bold mb-4">Ready to Start a Project?</h3>
                            <p className="text-neutral-300 text-lg leading-relaxed">
                                I'm always excited to work on new projects. Whether you're looking to build a platform, need consultation, or want to discuss enterprise architecture, I'd love to hear from you.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors">
                                <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center shrink-0 shadow-glow">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Email Protocol</h4>
                                    <a href="mailto:sirajnurihrom11@gmail.com" className="text-primary-light hover:text-accent-electric transition-colors">
                                        sirajnurihrom11@gmail.com <ExternalLink className="inline w-3 h-3 ml-1" />
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors">
                                <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center shrink-0 shadow-glow">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Voice Uplink</h4>
                                    <p className="text-neutral-300">+62 851-8515-1356</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <motion.a
                                whileHover={{ y: -5, scale: 1.1 }}
                                href="https://linkedin.com/in/sirajnurihrom"
                                target="_blank"
                                rel="noreferrer"
                                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-DEFAULT transition-colors border border-white/10 cursor-pointer"
                            >
                                <FaLinkedinIn size={20} />
                            </motion.a>
                            <motion.a
                                whileHover={{ y: -5, scale: 1.1 }}
                                href="https://instagram.com/sirajnurihrom"
                                target="_blank"
                                rel="noreferrer"
                                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-DEFAULT transition-colors border border-white/10 cursor-pointer"
                            >
                                <FaInstagram size={20} />
                            </motion.a>
                            <motion.a
                                whileHover={{ y: -5, scale: 1.1 }}
                                href="https://github.com/SIRAJcrypto11"
                                target="_blank"
                                rel="noreferrer"
                                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-DEFAULT transition-colors border border-white/10 cursor-pointer"
                            >
                                <FaGithub size={20} />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right Column: Terminal Chat Interface */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#050510]/80 border border-primary-DEFAULT/20 rounded-xl overflow-hidden backdrop-blur-2xl shadow-[0_0_50px_-15px_rgba(0,196,255,0.2)] flex flex-col h-[500px]"
                    >
                        {/* Terminal Header */}
                        <div className="bg-black/80 px-4 py-3 border-b border-primary-DEFAULT/20 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Terminal size={16} className="text-primary-DEFAULT" />
                                <span className="text-xs font-mono font-bold text-neutral-400">siraj_engine_v7.exe</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div className="flex-1 p-6 overflow-y-auto font-mono text-sm layout-scrollbar flex flex-col gap-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] uppercase font-bold tracking-widest ${msg.sender === 'user' ? 'text-accent-electric' : 'text-primary-DEFAULT'}`}>
                                            {msg.sender === 'user' ? 'Guest_Client' : 'System_Core'}
                                        </span>
                                    </div>
                                    <div className={`px-4 py-3 rounded-lg max-w-[85%] ${msg.sender === 'user'
                                            ? 'bg-accent-electric/10 border border-accent-electric/20 text-white'
                                            : 'bg-primary-DEFAULT/10 border border-primary-DEFAULT/20 text-primary-light'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex items-start">
                                    <div className="bg-primary-DEFAULT/10 border border-primary-DEFAULT/20 px-4 py-3 rounded-lg flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-primary-DEFAULT rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-primary-DEFAULT rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                        <span className="w-1.5 h-1.5 bg-primary-DEFAULT rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={terminalEndRef} />
                        </div>

                        {/* Terminal Input */}
                        <form onSubmit={handleSendMessage} className="bg-black/60 p-4 border-t border-primary-DEFAULT/20 flex gap-4">
                            <span className="text-primary-DEFAULT font-mono pt-2.5">{'>'}</span>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Enter command or message..."
                                    className="w-full bg-transparent border-none text-white font-mono placeholder-neutral-600 focus:outline-none focus:ring-0 py-2.5"
                                    autoComplete="off"
                                />
                                <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-primary-DEFAULT/50 to-transparent" />
                            </div>
                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="px-4 py-2 bg-primary-DEFAULT/20 text-primary-light font-mono text-sm rounded hover:bg-primary-DEFAULT/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                EXECUTE
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
