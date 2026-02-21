import { cn } from './Button';

export const Badge = ({ children, className, variant = 'default' }) => {
    const variants = {
        default: 'bg-primary-DEFAULT/10 border border-primary-DEFAULT/30 text-primary-DEFAULT',
        glass: 'bg-white/10 border border-white/20 text-white backdrop-blur-md',
    };

    return (
        <span className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold',
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
};
