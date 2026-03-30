import { motion } from 'framer-motion';
import { Rocket, Code2, LineChart } from 'lucide-react';
import { InfiniteMarquee } from '../ui/InfiniteMarquee';

export const SkillsSection = () => {
    const categories = [
        {
            title: 'Leadership & Management',
            icon: <Rocket className="w-5 h-5 text-primary-DEFAULT" />,
            direction: 1,
            speed: 55,
            skills: ['Team Management', 'Project Management', 'Strategic Planning', 'Agile Methodology', 'Product Development', 'Cross-functional Leadership', 'Conflict Resolution', 'Mentorship']
        },
        {
            title: 'Engineering & Architecture',
            icon: <Code2 className="w-5 h-5 text-accent-electric" />,
            direction: -1,
            speed: 45,
            skills: ['Full-Stack Web Development', 'React.js Ecosystem', 'NestJS / Node.js', 'System Architecture', 'Cloud Deployment (VPS / Docker)', 'PostgreSQL & Redis', 'Tailwind CSS v4', 'Framer Motion']
        },
        {
            title: 'Business & Growth',
            icon: <LineChart className="w-5 h-5 text-primary-light" />,
            direction: 1,
            speed: 50,
            skills: ['Startup Development', 'Market Analysis', 'Venture Funding', 'B2B SaaS Strategy', 'Financial Forecasting', 'Performance Metrics', 'Product-Led Growth', 'Customer Acquisition']
        }
    ];

    return (
        <section id="skills" className="py-32 bg-neutral-900 overflow-hidden relative border-t border-white/5">
            <div className="container mx-auto px-6 mb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <span className="text-primary-DEFAULT font-bold tracking-widest uppercase text-sm mb-4 block">Core Competencies</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">Technical & Business Mastery</h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        A continuous flow of the exact skills driving the SNISHOP ecosystem forward.
                    </p>
                </motion.div>
            </div>

            <div className="flex flex-col gap-6 md:gap-8 relative z-10 w-[110%] -ml-[5%]">
                {categories.map((category) => (
                    <div key={category.title} className="flex flex-col gap-4">
                        <InfiniteMarquee
                            items={category.skills}
                            direction={category.direction}
                            speed={category.speed}
                            renderItem={(skill) => (
                                <div className="flex items-center gap-3 px-8 py-4 bg-white/5 rounded-full border border-white/10 transition-all hover:border-primary-DEFAULT/50 hover:bg-white hover:shadow-md group cursor-none">
                                    <div className="opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110 group-hover:rotate-12 duration-300">
                                        {category.icon}
                                    </div>
                                    <span className="text-lg font-bold text-white group-hover:text-primary-DEFAULT transition-colors whitespace-nowrap">
                                        {skill}
                                    </span>
                                </div>
                            )}
                        />
                    </div>
                ))}
            </div>

            {/* Edge fades for seamless infinite looping */}
            <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-neutral-900 to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-neutral-900 to-transparent z-20 pointer-events-none" />
        </section>
    );
};
