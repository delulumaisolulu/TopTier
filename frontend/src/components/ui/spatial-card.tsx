"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, MouseEvent, useState } from "react";
import { cn } from "@/lib/utils";

interface SpatialCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string; // e.g., "rgba(6, 182, 212, 0.15)"
  interactive?: boolean; // Set false for form-heavy cards to disable tilt
}

export function SpatialCard({ 
  children, 
  className, 
  glowColor = "rgba(255, 255, 255, 0.06)",
  interactive = true,
}: SpatialCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position relative to the card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for spatial tilt (Apple Vision Pro feel)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation (-2 to 2 degrees) — only when interactive
  const rotateX = useTransform(springY, [-0.5, 0.5], interactive ? ["2deg", "-2deg"] : ["0deg", "0deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], interactive ? ["-2deg", "2deg"] : ["0deg", "0deg"]);

  // Radial gradient mapped to cursor
  const background = useMotionTemplate`radial-gradient(400px circle at ${useTransform(mouseX, (v) => v * 100 + 50)}% ${useTransform(mouseY, (v) => v * 100 + 50)}%, ${glowColor}, transparent 80%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Normalize coordinates from -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    // Reset to center smoothly
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      style={{
        perspective: interactive ? 1000 : undefined,
      }}
      className={cn("relative group w-full", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        className="glass-panel relative h-full w-full rounded-2xl overflow-hidden transition-all duration-300"
      >
        {/* Ambient Glow Ring — always visible, provides depth in light mode */}
        <motion.div
          className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 z-0"
          style={{ background }}
        />

        {/* Cursor Glow Layer — tracks mouse, always softly on */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{ background }}
        />
        
        {/* Content Layer */}
        <div className="relative z-10 h-full w-full p-6">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
