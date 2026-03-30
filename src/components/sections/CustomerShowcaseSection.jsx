import { motion } from 'framer-motion';
import { ecosystemCategories } from '../../data/ecosystem';
import { ExternalLink, LayoutTemplate, Star } from 'lucide-react';
import { Card } from '../ui/Card';
import { SpatialCard } from '../ui/SpatialCard';
import { Badge } from '../ui/Badge';

export const CustomerShowcaseSection = () => {
    const customerCategory = ecosystemCategories.find(cat => cat.category === "Customer Showcase");

    if (!customerCategory) return null;

    return (
        <section id="customer-showcase" className="py-32 bg-black/30 relative overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-DEFAULT/50 to-transparent" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4">
                            <Star size={16} fill="currentColor" />
                            <span>Client Success Stories</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                            Customer <span className="text-emerald-500">Showcase.</span>
                        </h2>
                        <p className="text-neutral-400 text-lg leading-relaxed">
                            Transforming visions into high-performance digital realities. These are specialized solutions built for businesses to scale their operations and reach.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"
                    >
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <LayoutTemplate size={24} />
                        </div>
                        <div>
                            <span className="block text-white font-bold">{customerCategory.apps.length} Projects</span>
                            <span className="block text-xs text-neutral-400 uppercase tracking-wider font-semibold">Deployed to Production</span>
                        </div>
                    </motion.div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {customerCategory.apps.map((app, idx) => (
                        <motion.div
                            key={app.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                        >
                            <a href={app.url} target="_blank" rel="noreferrer" className="group block">
                                <SpatialCard>
                                    <Card className="bg-neutral-900/40 border border-white/10 overflow-hidden hover:border-emerald-500/50 transition-all duration-500 group">
                                        <div className="relative h-64 overflow-hidden border-b border-white/5">
                                            <img 
                                                src={app.image} 
                                                alt={app.name} 
                                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
                                            
                                            {/* Tech Badge */}
                                            <div className="absolute bottom-6 left-6 flex gap-2 z-20">
                                                <Badge className="bg-emerald-500 text-white border-emerald-500">Live Production</Badge>
                                            </div>
                                        </div>

                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300">
                                                    {app.logo}
                                                </div>
                                                <div className="flex items-center gap-2 text-emerald-500 font-bold group-hover:translate-x-2 transition-transform">
                                                    Visit Site <ExternalLink size={16} />
                                                </div>
                                            </div>
                                            
                                            <h3 className="text-2xl font-black text-white mb-3 group-hover:text-emerald-400 transition-colors">
                                                {app.name}
                                            </h3>
                                            <p className="text-neutral-400 leading-relaxed mb-6">
                                                {app.desc}
                                            </p>

                                            <div className="h-px w-full bg-white/5 mb-6" />
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-mono text-neutral-500 tracking-tighter uppercase">Category: Digital Artisan</span>
                                                <div className="flex -space-x-2">
                                                    {[1,2,3].map(i => (
                                                        <div key={i} className="w-6 h-6 rounded-full border border-neutral-900 bg-neutral-800" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </SpatialCard>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
