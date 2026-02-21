import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export const ParticleBackground = () => {
    const canvasRef = useRef(null);
    const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
    const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

    // Spring physics for smooth cursor tracking
    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Antigravity standard configuration
        const PARTICLE_COUNT = Math.min(window.innerWidth / 7, 200); // Responsive density
        const CONNECTION_DISTANCE = 120; // Distance to draw constellation lines
        const MOUSE_REPULSION_RADIUS = 200; // Radius of cursor influence
        const REPULSION_FORCE = 0.05; // Strength of the push

        let animationFrameId;
        let particles = [];
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.baseX = this.x;
                this.baseY = this.y;
                // Varying sizes for depth
                this.size = Math.random() * 2 + 0.5;
                // Orbital velocities
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                // Cosmic colors (Blue, Purple, White)
                const colors = ['rgba(0, 196, 255, 0.6)', 'rgba(139, 92, 246, 0.4)', 'rgba(255, 255, 255, 0.3)'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update(mx, my) {
                // Natural orbital drift
                this.baseX += this.vx;
                this.baseY += this.vy;

                // Screen wrapping
                if (this.baseX > width) this.baseX = 0;
                if (this.baseX < 0) this.baseX = width;
                if (this.baseY > height) this.baseY = 0;
                if (this.baseY < 0) this.baseY = height;

                // Physics: Mouse Repulsion
                const dx = mx - this.x;
                const dy = my - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < MOUSE_REPULSION_RADIUS) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (MOUSE_REPULSION_RADIUS - distance) / MOUSE_REPULSION_RADIUS;

                    // Push away aggressively
                    this.x -= forceDirectionX * force * MOUSE_REPULSION_RADIUS * REPULSION_FORCE;
                    this.y -= forceDirectionY * force * MOUSE_REPULSION_RADIUS * REPULSION_FORCE;
                } else {
                    // Elastic snap back to original orbit
                    this.x += (this.baseX - this.x) * 0.05;
                    this.y += (this.baseY - this.y) * 0.05;
                }
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }
        };

        const drawConstellations = () => {
            // Optimization: Skip pairs to reduce O(n^2) pressure
            // Every second particle only checks every second neighbor
            for (let i = 0; i < particles.length; i += 2) {
                for (let j = i + 2; j < particles.length; j += 2) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distanceSquared = dx * dx + dy * dy; // Use squared distance for perf

                    if (distanceSquared < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
                        const distance = Math.sqrt(distanceSquared);
                        // Opacity based on distance
                        const opacity = 1 - (distance / CONNECTION_DISTANCE);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 196, 255, ${opacity * 0.12})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const render = () => {
            // Trail effect (semi-transparent CLEAR black for perfect mix-blend-screen)
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(0, 0, width, height);

            const currentMouseX = smoothMouseX.get();
            const currentMouseY = smoothMouseY.get();

            drawConstellations();

            particles.forEach((p) => {
                p.update(currentMouseX, currentMouseY);
                p.draw();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', resizeCanvas);
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);

        resizeCanvas();
        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mouseX, mouseY, smoothMouseX, smoothMouseY]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[50] pointer-events-none w-full h-full mix-blend-screen opacity-80 gpu-accelerated"
        />
    );
};
