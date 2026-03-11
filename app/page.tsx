"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Page = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: any[] = [];
    const particleCount = 150;
    const mouse = { x: 0, y: 0, radius: 120 };

    const colors = [
      "rgba(251,146,60,0.6)",
      "rgba(249,115,22,0.5)",
      "rgba(253,186,116,0.4)",
      "rgba(254,215,170,0.3)",
      "rgba(255,237,213,0.25)",
      "rgba(253,224,71,0.35)",
      "rgba(252,211,77,0.3)",
    ];

    for (let i = 0; i < particleCount; i++) {
      const type = i % 3 === 0 ? "orbit" : i % 3 === 1 ? "wave" : "normal";

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
        waveOffset: Math.random() * Math.PI * 2,
        orbitRadius: type === "orbit" ? Math.random() * 100 + 50 : 0,
        orbitSpeed: type === "orbit" ? Math.random() * 0.02 + 0.01 : 0,
        orbitAngle: Math.random() * Math.PI * 2,
        type,
      });
    }

    const drawConnections = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = 0.15 * (1 - distance / 100);
            ctx.strokeStyle = `rgba(251,146,60,${opacity})`;
            ctx.lineWidth = 0.5;

            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawParticle = (particle: any) => {
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size * 3
      );

      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, "rgba(255,255,255,0)");

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    };

    const updateParticles = () => {
      particles.forEach((particle) => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          particle.speedX = dx * force * 0.05;
          particle.speedY = dy * force * 0.05;
        }

        if (particle.type === "normal") {
          particle.x += particle.speedX;
          particle.y += particle.speedY;
        }

        if (particle.type === "orbit") {
          particle.orbitAngle += particle.orbitSpeed;
          particle.x =
            mouse.x + Math.cos(particle.orbitAngle) * particle.orbitRadius;
          particle.y =
            mouse.y + Math.sin(particle.orbitAngle) * particle.orbitRadius;
        }

        if (particle.type === "wave") {
          particle.waveOffset += 0.05;
          particle.x += particle.speedX;
          particle.y += Math.sin(particle.waveOffset) * 0.5;
        }

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
      });
    };

    const animate = () => {
      ctx.fillStyle = "rgba(255,250,235,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      mouse.x = (mousePos.x / 100) * canvas.width;
      mouse.y = (mousePos.y / 100) * canvas.height;

      updateParticles();
      drawConnections();

      particles.forEach(drawParticle);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden bg-gradient-to-b from-[#fff4e6] via-[#fff7ed] to-[#fffbeb]"
      onMouseMove={handleMouseMove}
    >
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />

      {/* Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(251,146,60,0.22), rgba(255,250,235,1))`,
        }}
      />

      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 40px rgba(248,113,22,0.35)",
        }}
        className="relative bg-white/95 border border-orange-300/70 rounded-2xl p-8 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 z-20 backdrop-blur-md"
      >
        <div className="flex-1 space-y-4 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900">
            CODEZILLA
          </h1>

          <p className="text-orange-500 text-xl font-semibold">
            Reintroducing Codezilla
          </p>

          <p className="text-gray-700 leading-relaxed">
            Codezilla is a Mozilla Campus Community in SRMIST Ramapuram,
            providing an open-source platform for students to develop their
            technical knowledge and skills through technical events and
            hands-on sessions.
          </p>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src="/photo.jpg"
            alt="Codezilla club members"
            width={600}
            height={400}
            className="rounded-2xl object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Page;