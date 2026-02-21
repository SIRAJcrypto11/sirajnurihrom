import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ExternalLink, LayoutGrid, ArrowRight } from 'lucide-react';
import { SpatialCard } from '../ui/SpatialCard';

export const ProjectsSection = ({ onOpenLaunchpad }) => {

    const featuredApp = {
        title: 'SNISHOP.ID OS (ERP)',
        description: 'The flagship enterprise operating system. An all-in-one suite tailored for MSMEs, featuring Point of Sale, CRM, Human Resources, Payroll, Finance, and complex Inventory management logic running at scale.',
        tags: ['Enterprise', 'ERP', 'SaaS', 'Flagship'],
        link: 'http://erp.snishop.com/',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600'
    };

    return (
        <section id="projects" className="py-32 bg-neutral-900 relative overflow-hidden perspective-1000">
            {/* Background Decorative Mesh for Dark Theme */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-primary-DEFAULT/10 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center max-w-3xl mx-auto"
                >
                    <span className="text-accent-electric font-bold tracking-widest uppercase text-sm mb-4 block">Ecosystem Architecture</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white">The Flagship <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent-electric">Engine.</span></h2>
                    <p className="text-neutral-400 text-lg">
                        Powering thousands of transactions daily. The SNISHOP ERP is the crown jewel of the ecosystem, designed for ultimate scale and absolute reliability.
                    </p>
                </motion.div>

                {/* FEATURED FLAGSHIP SPOTLIGHT */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <a href={featuredApp.link} target="_blank" rel="noreferrer" className="block group w-full">
                        <SpatialCard className="w-full relative z-20">
                            <Card className="overflow-hidden border border-white/10 bg-black/50 backdrop-blur-xl hover:border-primary-DEFAULT/50 transition-all duration-500 hover:shadow-[0_0_80px_-15px_rgba(0,196,255,0.3)]">
                                <div className="grid lg:grid-cols-2 gap-0 relative z-10 bg-neutral-900/80">

                                    {/* Image Half */}
                                    <div className="relative h-64 lg:h-[500px] overflow-hidden">
                                        <img
                                            src={featuredApp.image}
                                            alt={featuredApp.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-black/80 via-black/20 to-transparent pointer-events-none" />
                                    </div>

                                    {/* Content Half */}
                                    <div className="p-10 lg:p-16 flex flex-col justify-center relative z-10 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-900/90 to-black/90">
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {featuredApp.tags.map(tag => (
                                                <Badge key={tag} className={tag === 'Flagship' ? 'bg-primary-DEFAULT text-white border-primary-DEFAULT' : 'bg-white/5 text-neutral-300 border-white/10'}>
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="mb-6 flex items-center">
                                            <img
                                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e711957c86e922f92ad49f/a236b74f4_Logosnishopbirupanjang.png"
                                                className="h-10 lg:h-14 w-auto object-contain"
                                                alt="SNISHOP ERP"
                                            />
                                        </div>
                                        <p className="text-neutral-400 text-lg leading-relaxed mb-10">
                                            {featuredApp.description}
                                        </p>
                                        <div className="flex items-center text-white font-bold tracking-wider uppercase text-sm group-hover:translate-x-4 transition-transform duration-300">
                                            Initialize System <ExternalLink size={18} className="ml-2" />
                                        </div>
                                    </div>

                                </div>
                            </Card>
                        </SpatialCard>
                    </a>
                </motion.div>

                {/* THE 20+ APP ECOSYSTEM LAUNCHPAD CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.3 }}
                    className="mt-20 text-center"
                >
                    <SpatialCard className="inline-block w-full max-w-4xl mx-auto cursor-pointer" onClick={onOpenLaunchpad}>
                        <div className="inline-flex flex-col items-center p-8 lg:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group w-full" onClick={onOpenLaunchpad}>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-DEFAULT/0 via-accent-electric/10 to-primary-DEFAULT/0 group-hover:opacity-100 opacity-0 transition-opacity duration-700 blur-xl pointer-events-none" />

                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-primary-DEFAULT text-white border border-white/20 relative z-10">
                                <LayoutGrid size={32} />
                            </div>

                            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 relative z-10">Explore the 20+ App Ecosystem</h3>
                            <p className="text-neutral-400 text-lg max-w-2xl mb-8 relative z-10">
                                From AI productivity planners to no-code website builders. The SNISHOP architecture spans across multiple highly specialized domains.
                            </p>

                            <button
                                aria-label="Open Ecosystem Launchpad"
                                className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-neutral-200 transition-colors relative z-10 pointer-events-none"
                            >
                                Open Launchpad <ArrowRight size={20} />
                            </button>
                        </div>
                    </SpatialCard>
                </motion.div>

            </div>
        </section>
    );
};
