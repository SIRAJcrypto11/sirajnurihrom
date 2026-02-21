import { useRef, useState, useEffect } from "react";
import { useSpring } from "framer-motion";

export const useMagnetic = (strength = 0.5) => {
    const ref = useRef(null);
    const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
    const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        x.set(distanceX * strength);
        y.set(distanceY * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return { ref, x, y, handleMouseMove, handleMouseLeave };
};
