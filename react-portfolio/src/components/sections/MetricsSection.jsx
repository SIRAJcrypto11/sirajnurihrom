import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const AnimatedCounter = ({ from, to, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(from);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!inView) return;

        let startTime;
        const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            // Ease Out Expo logic for satisfying slowing down effect
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            if (progress < 1) {
                setCount(Math.floor(from + (to - from) * easeOutExpo));
                requestAnimationFrame(updateCount);
            } else {
                setCount(to);
            }
        };
        requestAnimationFrame(updateCount);
    }, [inView, from, to, duration]);

    return (
        <span ref={ref} className="font-mono tabular-nums">
            {count}{suffix}
        </span>
    );
};

export const MetricsSection = () => {
    const metrics = [
        { label: 'Platform Uptime', value: 99, suffix: '.9%', delay: 0 },
        { label: 'Ecosystem Apps', value: 24, suffix: '+', delay: 0.1 },
        { label: 'Monthly Active Requests', value: 50, suffix: 'k+', delay: 0.2 },
        { label: 'Lines of Code Shipped', value: 1.2, suffix: 'M+', delay: 0.3 },
    ];

    return (
        <section className="py-24 bg-black text-white relative overflow-hidden border-t border-white/10">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Glowing Orbs */}
            <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-primary-DEFAULT/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-accent-electric/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
                    {metrics.map((metric, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: metric.delay, ease: "easeOut" }}
                            className="flex flex-col items-center justify-center text-center px-4"
                        >
                            <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                                <AnimatedCounter from={0} to={metric.value} suffix={metric.suffix} />
                            </div>
                            <div className="text-sm md:text-base font-medium text-neutral-400 uppercase tracking-widest">
                                {metric.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
