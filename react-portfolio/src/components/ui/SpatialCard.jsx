import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from './Button';

export const SpatialCard = ({ children, className }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={cn("relative transition-all duration-300 ease-out", className)}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full"
            >
                {children}
            </div>

            {/* Dynamic Glare/Glow Effect */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-50 rounded-3xl mix-blend-overlay transition-opacity duration-300"
                style={{
                    background: useTransform(
                        [mouseXSpring, mouseYSpring],
                        ([xPct, yPct]) => {
                            const angle = Math.atan2(yPct, xPct) * (180 / Math.PI);
                            const distance = Math.sqrt(xPct * xPct + yPct * yPct);
                            const opacity = Math.min(1, distance * 2);
                            return `linear-gradient(${angle + 90}deg, rgba(255,255,255,${0.2 * opacity}) 0%, rgba(255,255,255,0) 80%)`;
                        }
                    ),
                    opacity: useTransform(mouseXSpring, [-0.5, 0.5], [1, 1], { clamp: false }) // Keep it active while moving
                }}
            />
        </motion.div>
    );
};
