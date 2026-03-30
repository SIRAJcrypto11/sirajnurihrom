import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const [hoveredElement, setHoveredElement] = useState(null);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Dynamic dimensions for rectangular snapping
    const width = useMotionValue(32);
    const height = useMotionValue(32);
    const borderRadius = useMotionValue(9999);

    // Physics-based spring for organic follow movement
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);
    const widthSpring = useSpring(width, springConfig);
    const heightSpring = useSpring(height, springConfig);
    const borderSpring = useSpring(borderRadius, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            if (hoveredElement) {
                const rect = hoveredElement.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const distanceX = e.clientX - centerX;
                const distanceY = e.clientY - centerY;

                cursorX.set(rect.left + distanceX * 0.1);
                cursorY.set(rect.top + distanceY * 0.1);
            } else {
                cursorX.set(e.clientX - 16);
                cursorY.set(e.clientY - 16);
            }
        };

        const handleMouseOver = (e) => {
            const target = e.target.closest('a') || e.target.closest('button') || e.target.closest('.cursor-pointer');

            if (target) {
                const rect = target.getBoundingClientRect();
                setHoveredElement(target);

                const padding = 8;
                width.set(rect.width + padding * 2);
                height.set(rect.height + padding * 2);

                const computedStyle = window.getComputedStyle(target);
                const targetRadius = parseInt(computedStyle.borderRadius) || 8;
                borderRadius.set(targetRadius + padding / 2);

                cursorX.set(rect.left - padding);
                cursorY.set(rect.top - padding);
            } else {
                setHoveredElement(null);
                width.set(32);
                height.set(32);
                borderRadius.set(9999);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY, hoveredElement, width, height, borderRadius]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center border border-white/40 bg-white/5"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                width: widthSpring,
                height: heightSpring,
                borderRadius: borderSpring,
            }}
        >
            {/* Inner dynamic core */}
            <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full bg-blend-difference"
                animate={{ opacity: hoveredElement ? 0 : 1, scale: hoveredElement ? 0 : 1 }}
                transition={{ duration: 0.2 }}
            />
        </motion.div>
    );
};
