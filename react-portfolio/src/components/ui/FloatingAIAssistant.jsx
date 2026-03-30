import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, ExternalLink } from 'lucide-react';
import { matchQueryIntelligently } from '../../data/ai';

export const FloatingAIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: 'Sistem Online. Handshake protokol diterima. Halo! Saya adalah agen AI super-cerdas lokal untuk portfolio Siraj Nur Ihrom. Anda bisa bertanya secara spesifik tentang teknologi yang ia gunakan, visi perusahaan SNISHOP.COM, tujuan dari aplikasi seperti ERP atau BudgyAI, atau bagaimana cara menghubunginya. Bagaimana saya bisa membantu eksplorasi Anda hari ini?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        // Simulate deep AI thinking delay for complex keyword scoring
        setTimeout(() => {
            const response = matchQueryIntelligently(userMsg);

            if (response) {
                setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: response }]);
            } else {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    sender: 'ai',
                    text: 'Jawaban spesifik untuk pola ini belum tersentuh di database lokal saya. Namun untuk pertanyaan kompleks, asisten akan menghubungkan Anda secara langsung ke master server (Siraj Nur Ihrom):',
                    isFallback: true
                }]);
            }
            setIsTyping(false);
        }, 1200 + Math.random() * 800);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[990]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute bottom-20 right-0 w-80 sm:w-96 bg-[#050510]/95 backdrop-blur-xl border border-primary-DEFAULT/30 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,196,255,0.2)] flex flex-col overflow-hidden"
                        style={{ height: '500px', maxHeight: '70vh' }}
                    >
                        {/* Header */}
                        <div className="bg-black/80 px-4 py-3 border-b border-primary-DEFAULT/30 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full bg-primary-DEFAULT/20 flex items-center justify-center text-primary-DEFAULT">
                                        <Bot size={18} />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">Local AI Agent</h3>
                                    <p className="text-primary-DEFAULT text-xs font-mono">Offline & Secure</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="Close AI Assistant"
                                className="text-neutral-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 layout-scrollbar">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.sender === 'user' ? 'bg-accent-electric/20 text-accent-electric' : 'bg-primary-DEFAULT/20 text-primary-DEFAULT'}`}>
                                            {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                                        </div>
                                        <div className={`px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${msg.sender === 'user'
                                            ? 'bg-accent-electric/10 text-white border border-accent-electric/20 rounded-tr-none'
                                            : 'bg-white/5 text-neutral-200 border border-white/10 rounded-tl-none'
                                            }`}>
                                            {msg.text}
                                            {msg.isFallback && (
                                                <div className="mt-3 flex flex-col gap-2">
                                                    <a href="https://wa.me/6285185151356" target="_blank" rel="noreferrer" className="block w-full text-center py-1.5 px-3 bg-green-600/20 text-green-400 border border-green-600/30 rounded-lg hover:bg-green-600/30 transition-colors text-xs font-semibold">
                                                        WhatsApp Siraj
                                                    </a>
                                                    <a href="mailto:sirajnurihrom11@gmail.com" className="block w-full text-center py-1.5 px-3 bg-primary-DEFAULT/20 text-primary-light border border-primary-DEFAULT/30 rounded-lg hover:bg-primary-DEFAULT/30 transition-colors text-xs font-semibold">
                                                        Email Siraj
                                                    </a>
                                                    <a href="https://snishop.com" target="_blank" rel="noreferrer" className="block w-full text-center py-1.5 px-3 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-xs font-semibold flex items-center justify-center gap-1">
                                                        Go to Snishop.com <ExternalLink size={10} />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 rounded-full bg-primary-DEFAULT/20 text-primary-DEFAULT flex items-center justify-center shrink-0 mt-1">
                                            <Bot size={12} />
                                        </div>
                                        <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                            <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
                                            <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                            <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-black/50 border-t border-white/10">
                            <form onSubmit={handleSend} className="flex gap-2 relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask the AI something..."
                                    className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary-DEFAULT/50 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    aria-label="Send message"
                                    className="absolute right-1 top-1 bottom-1 w-8 flex items-center justify-center rounded-full bg-primary-DEFAULT text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
                                >
                                    <Send size={14} className="ml-0.5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle AI Assistant"
                className="w-14 h-14 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center text-white relative z-50 overflow-hidden group"
            >
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1, scale: isOpen ? 0.5 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                >
                    <MessageSquare size={24} />
                </motion.div>
                <motion.div
                    animate={{ rotate: isOpen ? 0 : -90, opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                >
                    <X size={24} />
                </motion.div>

                {/* Radar sweep effect idle */}
                {!isOpen && (
                    <div className="absolute inset-0 pointer-events-none border-2 border-transparent rounded-full group-hover:border-white/50 animate-ping opacity-20" />
                )}
            </motion.button>
        </div>
    );
};
