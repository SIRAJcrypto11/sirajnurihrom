import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { LayoutGrid } from 'lucide-react';
import { dockApps } from '../../data/ecosystem';

const DockIcon = ({ app, mouseX, isMenuButton, onClick }) => {
    const ref = useRef(null);

    // Calculate distance from mouse to the center of this icon
    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // MacOS Dock Magnification Physics Maps
    // Output scales: 80px when exactly hovered, shrinking down to 48px baseline
    const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    if (isMenuButton) {
        return (
            <motion.div
                ref={ref}
                style={{ width, height: width }}
                className="relative flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md cursor-pointer group shadow-lg"
                onClick={onClick}
                whileTap={{ scale: 0.9 }}
            >
                <LayoutGrid className="w-1/2 h-1/2 text-white group-hover:text-accent-electric transition-colors" />

                {/* Tooltip */}
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs font-bold px-3 py-1.5 rounded-md pointer-events-none whitespace-nowrap">
                    Launchpad
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
                </div>
            </motion.div>
        );
    }

    return (
        <a href={app.url} target="_blank" rel="noreferrer" className="block outline-none">
            <motion.div
                ref={ref}
                style={{ width, height: width }}
                className={`relative flex items-center justify-center rounded-2xl ${app.color} shadow-lg cursor-pointer group border border-white/20`}
                whileTap={{ scale: 0.9 }}
            >
                {app.icon}

                {/* Tooltip */}
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs font-bold px-3 py-1.5 rounded-md pointer-events-none whitespace-nowrap">
                    {app.name}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
                </div>

                {/* Active App Indicator Dot (MacOS style) */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/50 rounded-full" />
            </motion.div>
        </a>
    );
};

export const EcosystemDock = ({ onOpenLaunchpad }) => {
    // Mouse X tracker mapped to the container to calculate individual icon magnification scale
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[4000] hidden sm:block"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
        >
            <div className="flex items-end gap-3 px-4 py-3 bg-neutral-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                {dockApps.map((app) => (
                    <DockIcon app={app} mouseX={mouseX} key={app.name} />
                ))}

                {/* Divider */}
                <div className="w-px h-10 bg-white/10 mx-2 self-center rounded-full" />

                {/* All Apps / Launchpad Button */}
                <DockIcon mouseX={mouseX} isMenuButton={true} onClick={onOpenLaunchpad} />
            </div>
        </motion.div>
    );
};
