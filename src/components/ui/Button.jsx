import React, { useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { audio } from '../../utils/audio';
import { useMagnetic } from '../../hooks/useMagnetic';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(({
    className,
    variant = 'primary',
    size = 'default',
    asChild = false,
    children,
    onMouseEnter,
    onClick,
    ...props
}, ref) => {
    const { ref: magneticRef, x, y, handleMouseMove, handleMouseLeave: magneticMouseLeave } = useMagnetic(0.25);
    useImperativeHandle(ref, () => magneticRef.current);

    const Comp = asChild ? motion.a : motion.button;

    const handleMouseEnter = (e) => {
        audio.playTick();
        if (onMouseEnter) onMouseEnter(e);
    };

    const handleMouseLeave = (e) => {
        magneticMouseLeave();
    };

    const handleClick = (e) => {
        audio.playClick();
        if (onClick) onClick(e);
    };

    const variants = {
        primary: 'bg-gradient-primary text-white shadow-medium hover:shadow-heavy hover:shadow-glow',
        secondary: 'bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:border-white/40',
        ghost: 'bg-transparent text-text-primary hover:text-primary-DEFAULT transition-colors'
    };

    const sizes = {
        default: 'px-6 py-3',
        sm: 'px-4 py-2 text-sm',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <Comp
            ref={magneticRef}
            style={{ x, y }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className={cn(
                'inline-flex items-center justify-center gap-3 rounded-full font-semibold focus-visible:ring-4 focus-visible:ring-accent-electric/50 outline-none transition-all duration-300 overflow-hidden relative z-10',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </Comp>
    );
});

Button.displayName = 'Button';
