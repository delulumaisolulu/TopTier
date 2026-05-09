"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { springSpatial } from "@/lib/motion";

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  glowColor?: string;
}

export function AnimatedIcon({
  icon: Icon,
  size = 18,
  className,
  glowColor = "var(--color-primary)",
}: AnimatedIconProps) {
  return (
    <motion.div 
      className={cn("relative group flex items-center justify-center", className)}
      whileHover="hover"
      initial="initial"
    >
      {/* Ambient Glow */}
      <motion.div
        variants={{
          initial: { opacity: 0, scale: 0.8 },
          hover: { opacity: 0.3, scale: 1.5, transition: springSpatial },
        }}
        className="absolute inset-0 rounded-full blur-md"
        style={{ backgroundColor: glowColor }}
      />
      
      {/* Actual Icon */}
      <motion.div
        variants={{
          initial: { scale: 1, opacity: 0.7 },
          hover: { scale: 1.1, opacity: 1, transition: springSpatial },
        }}
        className="relative z-10"
      >
        <Icon size={size} strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );
}
