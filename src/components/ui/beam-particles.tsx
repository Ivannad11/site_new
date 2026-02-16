"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  originalX: number;
  originalY: number;
  friction: number;
  ease: number;
}

export const BeamParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, isActive: false });
  const animationFrameId = useRef<number>(0);
  const obstacles = useRef<{x: number, y: number, width: number, height: number}[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      updateObstacles();
      initParticles();
    };

    const updateObstacles = () => {
      const btn1 = document.getElementById("hero-button-primary");
      const btn2 = document.getElementById("hero-button-secondary");
      obstacles.current = [];
      
      if (btn1) {
        const rect = btn1.getBoundingClientRect();
        obstacles.current.push({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        });
      }
      
      if (btn2) {
        const rect = btn2.getBoundingClientRect();
        obstacles.current.push({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        });
      }
    };

    const initParticles = () => {
      particles.current = [];
      const particleCount = window.innerWidth < 768 ? 500 : 4000;
      const centerX = canvas.width / 2;

      for (let i = 0; i < particleCount; i++) {
        const spread = window.innerWidth < 768 ? 100 : 300; 
        const x = centerX + (Math.random() - 0.5) * spread;
        const y = Math.random() * canvas.height;
        
        particles.current.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 0.2, 
          vy: Math.random() * 3 + 1.5, // Restored faster speed
          size: Math.random() * 1.5 + 0.3,
          color: `rgba(200, 220, 255, ${Math.random() * 0.5 + 0.1})`, 
          originalX: x,
          originalY: y,
          friction: 0.95,
          ease: 0.05,
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Soft vignette (Fog)
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(0.5, "rgba(0,0,0,0.2)");
      gradient.addColorStop(1, "rgba(0,0,0,0.8)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p) => {
        // Physics
        p.y += p.vy;
        p.x += p.vx;

        // Reset if reaches bottom
        if (p.y > canvas.height) {
          p.y = -10;
          const spread = window.innerWidth < 768 ? 100 : 300;
          p.x = (canvas.width / 2) + (Math.random() - 0.5) * spread;
          p.vy = Math.random() * 3 + 1.5;
          p.vx = (Math.random() - 0.5) * 0.2;
        }

        // Obstacle Avoidance (Radial check but tighter)
        obstacles.current.forEach((obs) => {
            const obsCenterX = obs.x + obs.width / 2;
            const obsCenterY = obs.y + obs.height / 2;
            // Smaller radius to allow particles closer
            const obsRadius = Math.max(obs.width, obs.height) / 1.8; 

            const dx = p.x - obsCenterX;
            const dy = p.y - obsCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < obsRadius) {
                const force = (obsRadius - distance) / obsRadius;
                const angle = Math.atan2(dy, dx);
                
                // Stronger sideways push
                const forceX = Math.cos(angle) * force * 3;
                const forceY = Math.sin(angle) * force * 1;

                p.vx += forceX;
                p.vy += forceY;
            }
        });

        // Mouse interaction (Subtle)
        if (mouse.current.isActive) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceDistance = 100;

          if (distance < forceDistance) {
            const force = (forceDistance - distance) / forceDistance;
            const angle = Math.atan2(dy, dx);
            const forceX = Math.cos(angle) * force * 1.5;
            const forceY = Math.sin(angle) * force * 1.5;

            p.vx -= forceX;
            p.vy -= forceY;
          }
        }

        // Return to center (Very weak Magnetic pull)
        const centerX = canvas.width / 2;
        const distToCenter = centerX - p.x;
        p.vx += distToCenter * 0.0001; 

        // Damping
        p.vx *= 0.95; 
        if (p.vy < 2) p.vy += 0.05;

        // Draw particle (Circle, no trail)
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.current.isActive = false;
    };

    // Update obstacles on scroll
    const handleScroll = () => {
      updateObstacles();
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none mix-blend-screen"
      style={{ width: "100%", height: "100%" }}
    />
  );
};
