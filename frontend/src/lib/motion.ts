import { Transition, Variants } from "framer-motion";

// Spatial Springs (snappy, non-bouncy, Vision Pro-like)
export const springSpatial: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
  mass: 0.8,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// Cinematic Easing for Layout and Opacity
export const easeCinematic: Transition = {
  type: "tween",
  ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth deceleration
  duration: 0.8,
};

// Standard Stagger Configurations
export const staggerChildren = (staggerDelay = 0.04) => ({
  animate: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

// Common Spatial Variants
export const fadeUpSpatial: Variants = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: springSpatial },
  exit: { opacity: 0, y: -4, filter: "blur(2px)", transition: { duration: 0.2 } },
};

export const fadeUp = fadeUpSpatial;

export const scaleSpatial: Variants = {
  initial: { opacity: 0, scale: 0.96, filter: "blur(8px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: springSpatial },
};

// Float Animation for Idle elements (e.g. AI bubble)
export const floatVariant: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-4, 4, -4],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
