import React, { useState, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { cn } from './Button';
import { useMagnetic } from '../../hooks/useMagnetic';

export const Card = React.forwardRef(({
    className,
    children,
    hoverEffect = true,
    ...props
}, ref) => {
    const { ref: magneticRef, x, y, handleMouseMove: magneticMouseMove, handleMouseLeave: magneticMouseLeave } = useMagnetic(0.12);
    useImperativeHandle(ref, () => magneticRef.current);

    // Flashlight mouse tracking state
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        magneticMouseMove(e);
        if (!magneticRef.current) return;
        const rect = magneticRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseLeave = () => {
        magneticMouseLeave();
    };

    return (
        <motion.div
            ref={magneticRef}
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={hoverEffect ? { y: -8, scale: 1.02 } : {}}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
            }}
            className={cn(
                'bg-bg-card rounded-[20px] shadow-light border border-white/10 relative min-w-0 break-words will-change-transform will-change-[box-shadow] overflow-hidden group',
                hoverEffect && 'hover:shadow-heavy',
                className
            )}
            {...props}
        >
            {/* Dynamic Flashlight Gradient */}
            {hoverEffect && (
                <div
                    className="pointer-events-none absolute -inset-px rounded-[20px] opacity-0 transition duration-500 group-hover:opacity-100 z-50 mix-blend-plus-lighter"
                    style={{
                        background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 196, 255, 0.08), transparent 40%)`
                    }}
                />
            )}

            {children}
        </motion.div>
    );
});

Card.displayName = 'Card';
