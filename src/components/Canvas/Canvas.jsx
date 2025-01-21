import React, { useEffect, useRef, useState } from 'react';

export default function Canvas() {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(() => {
    if (window.innerWidth > 768) {
      return window.innerWidth / 2;
    } else {
      return window.innerWidth;
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const height = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = height;

    const colors = ["#000000"];

    const particles = [];
    const numParticles = 200;

    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * canvasWidth;
      const y = Math.random() * height;
      const radius = Math.random() * 5 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particles.push({
        x: x,
        y: y,
        radius: radius,
        color: color,
        dx: Math.random() - 0.5,
        dy: Math.random() - 0.5,
        angle: Math.random() * 360,
        angularVelocity: Math.random() * 0.1 - 0.05,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, height);

      for (let i = 0; i < numParticles; i++) {
        const particle = particles[i];

        particle.x += particle.dx;
        particle.y += particle.dy;

        particle.angle += particle.angularVelocity;

        if (
          particle.x + particle.radius > canvasWidth ||
          particle.x - particle.radius < 0
        ) {
          particle.dx *= -1;
        }

        if (
          particle.y + particle.radius > height ||
          particle.y - particle.radius < 0
        ) {
          particle.dy *= -1;
        }

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.angle * Math.PI) / 180);
        ctx.beginPath();
        ctx.arc(0, 0, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        for (let j = i + 1; j < numParticles; j++) {
          const otherParticle = particles[j];
          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1 - distance / 200;
            ctx.stroke();
            ctx.closePath();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setCanvasWidth(window.innerWidth / 2);
      } else {
        setCanvasWidth(window.innerWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animate);
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasWidth]);

  return (
    <>
      <div className="cover"></div>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};
