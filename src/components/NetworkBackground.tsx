import React, { useEffect, useRef } from 'react';

interface NetworkBackgroundProps {
  isDarkMode?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

export const NetworkBackground: React.FC<NetworkBackgroundProps> = ({ isDarkMode = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Track mouse position
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle density calculation
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((width * height) / 12000); // density factor
      const maxParticles = Math.min(Math.max(particleCount, 45), 110);

      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 1.8 + 1.2,
          baseAlpha: Math.random() * 0.5 + 0.3,
        });
      }
    };

    initParticles();

    // Render loop
    const maxDistance = 140;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Colors based on theme
      const nodeColor = isDarkMode ? '168, 85, 247' : '124, 58, 237'; // Purple-500 / Violet-600
      const lineColor = isDarkMode ? '147, 51, 234' : '147, 51, 234'; // Purple line

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction (gentle push)
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          const angle = Math.atan2(dyMouse, dxMouse);
          p.x += Math.cos(angle) * force * 1.5;
          p.y += Math.sin(angle) * force * 1.5;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${p.baseAlpha})`;
        ctx.fill();

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Connect with mouse cursor
        if (distMouse < mouse.radius) {
          const alpha = (1 - distMouse / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${nodeColor}, ${alpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full opacity-60 dark:opacity-75 z-0"
    />
  );
};
