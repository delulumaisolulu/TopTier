"use client";

import { motion, useMotionValue, useSpring, HTMLMotionProps } from "framer-motion";
import { ReactNode, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  magneticPull?: number; // Strength of the pull
}

export function MagneticButton({ 
  children, 
  className, 
  magneticPull = 0.2,
  ...props 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    x.set(middleX * magneticPull);
    y.set(middleY * magneticPull);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn(
        "relative flex items-center justify-center transition-colors duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
