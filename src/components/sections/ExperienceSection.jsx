import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink, Layers, Sparkles, Briefcase, Zap } from 'lucide-react';

export const ExperienceSection = () => {
    // Categorizing the massive SNISHOP ecosystem for a Senior Developer UI presentation
    const snishopEcosystem = [
        {
            category: "Enterprise & Business",
            icon: <Briefcase className="w-4 h-4 text-primary-DEFAULT" />,
            apps: [
                { name: "AutoInvoice", url: "https://invoice.snishop.com" },
                { name: "FormEase", url: "https://formease.snishop.com" },
                { name: "TaskDay", url: "https://taskday.snishop.com" },
                { name: "KasirinAI", url: "https://kasirin.snishop.com" },
                { name: "CatatanID", url: "https://catatan.snishop.com" }
            ]
        },
        {
            category: "Artificial Intelligence",
            icon: <Sparkles className="w-4 h-4 text-accent-electric" />,
            apps: [
                { name: "StudeeAI", url: "https://studee.snishop.com" },
                { name: "VoiceScribe", url: "https://scribe.snishop.com" },
                { name: "FineEaseAI", url: "https://fineease.snishop.com" }
            ]
        },
        {
            category: "Education & Utilities",
            icon: <Layers className="w-4 h-4 text-primary-light" />,
            apps: [
                { name: "Cek Turnitin", url: "https://turnitin.snishop.com" },
                { name: "TeamMath", url: "https://teammath.snishop.com" },
                { name: "Snidesain", url: "https://desain.snishop.com" },
                { name: "Bangunweb", url: "https://bangunweb.snishop.com" },
                { name: "Snijadwalin", url: "https://jadwalin.snishop.com" }
            ]
        },
        {
            category: "Digital Services",
            icon: <Zap className="w-4 h-4 text-yellow-500" />,
            apps: [
                { name: "PPOB SNISHOP", url: "https://ppob.snishop.com" },
                { name: "TopUp Game", url: "https://topup.snishop.com" },
                { name: "Sninonton", url: "https://nonton.snishop.com" }
            ]
        }
    ];

    const experiences = [
        {
            period: '2018 - Present',
            role: 'CEO, Founder & Lead Engineer',
            company: 'SNISHOP.COM Ecosystem',
            description: 'Architecting and scaling a massive unified digital platform encompassing Enterprise SaaS, state-of-the-art AI wrappers, productivity suites, and digital delivery services. Spearheaded the full-stack development of 20+ interconnected applications under a single unified ecosystem.',
            ecosystem: snishopEcosystem,
            github: 'https://github.com/SIRAJcrypto11',
            link: 'https://snishop.com',
            isFlagship: true
        },
        {
            period: '2023 - Present',
            role: 'Founder & Software Architect',
            company: 'ERP SNISHOP',
            description: 'Developed an all-in-one business operating system tailored for MSMEs, featuring Point of Sale, CRM, HR, Payroll, Finance, and comprehensive Inventory management modules.',
            github: 'https://github.com/SIRAJcrypto11',
            link: 'https://erp.snishop.com',
            isFlagship: false
        },
        {
            period: '2023 - Present',
            role: 'Founder & Developer',
            company: 'TODOIT & TODOIT AI',
            description: 'Engineered an intelligent AI-powered productivity and financial planner platform. Streamlines task management and budget tracking for individuals and teams with high-performance metrics.',
            github: 'https://github.com/SIRAJcrypto11',
            link: 'https://todoit.snishop.com',
            isFlagship: false
        },
        {
            period: '2023 - Present',
            role: 'Founder & Product Engineer',
            company: 'Budgy AI',
            description: 'Created a specialized intelligent budget tracking and financial forecasting suite powered by state-of-the-art generative AI to revolutionize personal finance.',
            github: 'https://github.com/SIRAJcrypto11',
            link: 'https://budgy.snishop.com',
            isFlagship: false
        },
        {
            period: '2024 - Present',
            role: 'Founder & CTO',
            company: 'CoTrade.ID',
            description: 'Engineering a marketplace aimed at students and SMEs in Bengkulu. Successfully developed the core platform architecture and secured BMW funding for continuous infrastructure scaling.',
            github: 'https://github.com/SIRAJcrypto11',
            link: 'https://cotrade.id',
            isFlagship: false
        },
        {
            period: '2023 - Present',
            role: 'Founder & Technical Lead',
            company: 'CryptoCurrent.id',
            description: 'Founded a cryptocurrency education and media platform to empower individuals with blockchain knowledge. Built the content delivery system from the ground up prioritizing high-performance SEO.',
            github: 'https://github.com/SIRAJcrypto11',
            link: 'https://cryptocurrent.id',
            isFlagship: false
        }
    ];

    return (
        <section id="experience" className="py-32 bg-neutral-900 relative">
            {/* Dark mode background for high-contrast SaaS look */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary-DEFAULT/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-DEFAULT/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 z-0" />

            <div className="container mx-auto px-6 relative z-10 w-full mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-accent-electric font-mono font-bold tracking-widest uppercase text-sm mb-4 block">Milestones & Scale</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white drop-shadow-lg">Professional Ecosystem</h2>
                    <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
                        A dynamic timeline of the enterprise platforms and advanced digital solutions I've architected.
                    </p>
                </motion.div>

                {/* STACKING CARDS CONTAINER */}
                <div className="relative max-w-4xl mx-auto flex flex-col gap-6 lg:gap-8 pb-32">
                    {experiences.map((exp, i) => {
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="sticky w-full"
                                style={{
                                    top: `calc(12vh + ${i * 30}px)`,
                                    zIndex: i + 1
                                }}
                            >
                                <Card
                                    className={`p-8 md:p-12 backdrop-blur-3xl transition-all duration-500 
                                        shadow-[0_-15px_60px_-15px_rgba(0,0,0,0.8)] 
                                        border-t-2 border-l border-r border-b 
                                        ${exp.isFlagship
                                            ? 'ring-2 ring-primary-DEFAULT shadow-[0_-20px_80px_rgba(0,196,255,0.3)] bg-neutral-900 border-t-primary-DEFAULT border-b-white/5 border-x-white/5'
                                            : 'bg-neutral-800/80 border-t-white/10 border-b-white/5 border-x-white/5'
                                        }`}
                                    style={{
                                        // Stronger tinting
                                        backgroundColor: exp.isFlagship ? '#0f172a' : `rgba(30, 41, 59, ${0.8 + (i * 0.02)})`,
                                        // Translate Y slightly to enforce overlap depth mapping visually
                                        transform: `translateY(${i * -2}px)`
                                    }}
                                >
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                                        <span className="font-mono text-sm font-bold bg-white/5 text-primary-light px-4 py-1.5 rounded-full border border-white/10">
                                            {exp.period}
                                        </span>
                                        <div className="flex gap-4">
                                            {exp.github && (
                                                <a href={exp.github} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-text-primary transition-colors p-2 hover:bg-neutral-100 rounded-full">
                                                    <FaGithub size={22} />
                                                </a>
                                            )}
                                            {exp.link && (
                                                <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary-DEFAULT transition-colors p-2 hover:bg-neutral-100 rounded-full">
                                                    <ExternalLink size={22} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary mb-3 tracking-tight group-hover:text-primary-DEFAULT transition-colors">
                                        {exp.role}
                                    </h3>

                                    <div className="text-xl md:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6 inline-block">
                                        @ {exp.company}
                                    </div>

                                    <p className="text-neutral-400 leading-relaxed mb-10 text-lg md:text-xl">
                                        {exp.description}
                                    </p>

                                    {/* Flagship Ecosystem Categorized Grid */}
                                    {exp.ecosystem && (
                                        <div className="mt-8 pt-8 border-t border-neutral-200">
                                            <div className="flex items-center gap-2 mb-8">
                                                <div className="h-px bg-white/10 flex-grow" />
                                                <h4 className="text-sm font-black text-neutral-500 uppercase tracking-widest px-4">
                                                    Unified Ecosystem Engine
                                                </h4>
                                                <div className="h-px bg-white/10 flex-grow" />
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-8">
                                                {exp.ecosystem.map((category, idx) => (
                                                    <div key={idx} className="space-y-4">
                                                        <div className="flex items-center gap-2 text-text-primary font-bold">
                                                            {category.icon}
                                                            <span>{category.category}</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {category.apps.map(app => (
                                                                <a
                                                                    key={app.name}
                                                                    href={app.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="group/badge"
                                                                >
                                                                    <Badge
                                                                        className="bg-white/5 text-neutral-300 border border-white/10 group-hover/badge:border-primary-DEFAULT/50 group-hover/badge:bg-primary-DEFAULT group-hover/badge:text-white transition-all duration-300 shadow-sm py-1.5 px-3 flex items-center gap-1.5 cursor-none"
                                                                    >
                                                                        {app.name}
                                                                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/badge:opacity-100 transition-opacity" />
                                                                    </Badge>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
