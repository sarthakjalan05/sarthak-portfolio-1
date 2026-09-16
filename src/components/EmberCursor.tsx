import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  maxLife: number;
  life: number;
  color: string;
}

export const EmberCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const isEnabledRef = useRef<boolean>(false);

  useEffect(() => {
    // Disable on touch devices or if user prefers reduced motion
    const isFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer) {
      isEnabledRef.current = false;
      return;
    }

    isEnabledRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const colors = ['#f0c75e', '#d4a84b', '#ff9944', '#ffde7a'];

    const spawnEmber = (x: number, y: number) => {
      const pCount = Math.random() > 0.4 ? 1 : 2;
      for (let i = 0; i < pCount; i++) {
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.7,
          vy: -0.6 - Math.random() * 0.9, // Gentle upward drift like hero embers
          alpha: 0.65 + Math.random() * 0.25,
          size: 1.2 + Math.random() * 1.8,
          maxLife: 35 + Math.random() * 25,
          life: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Limit particle array size
      if (particlesRef.current.length > 50) {
        particlesRef.current = particlesRef.current.slice(-50);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawnRef.current > 35) {
        // ~28 spawns/sec max to keep it subtle and light
        lastSpawnRef.current = now;
        spawnEmber(e.clientX, e.clientY);
        if (!animFrameIdRef.current) {
          animFrameIdRef.current = requestAnimationFrame(render);
        }
      }
    };

    const render = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;

        const progress = p.life / p.maxLife;
        const currentAlpha = Math.max(0, p.alpha * (1 - progress));

        if (progress >= 1 || currentAlpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (particles.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(render);
      } else {
        animFrameIdRef.current = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9990]"
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  );
};
