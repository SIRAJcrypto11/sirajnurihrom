import { motion } from 'framer-motion';

export const InfiniteMarquee = ({ items, renderItem, speed = 30, direction = 1, className = "" }) => {
    return (
        <div className={`overflow-hidden flex gap-4 w-full relative ${className}`}>
            <motion.div
                className="flex flex-nowrap gap-4 min-w-max"
                animate={{
                    x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%']
                }}
                transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration: speed
                }}
            >
                {/* Render the core array twice back-to-back to create a seamless infinite loop block */}
                <div className="flex gap-4 min-w-max">
                    {items.map((item, i) => renderItem ? renderItem(item, i) : <div key={i}>{item}</div>)}
                </div>
                <div className="flex gap-4 min-w-max">
                    {items.map((item, i) => renderItem ? renderItem(item, i + items.length) : <div key={i + items.length}>{item}</div>)}
                </div>
            </motion.div>
        </div>
    );
};
