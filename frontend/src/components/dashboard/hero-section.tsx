"use client";

import { motion } from "framer-motion";
import { GradientText } from "@/components/ui/gradient-text";
import { fadeUpSpatial, staggerChildren } from "@/lib/motion";
import { useAuth } from "@/lib/auth-context";

export function HeroSection({ userName = "Student" }: { userName?: string }) {
  const { user } = useAuth();
  
  // Extract name from user object or fallback
  const displayName = user?.name || userName;

  return (
    <motion.section
      variants={staggerChildren(0.1)}
      initial="initial"
      animate="animate"
      className="relative w-full py-8 z-10 flex flex-col items-center text-center gap-4 mt-8"
    >
      <motion.div variants={fadeUpSpatial} className="flex flex-col gap-2 items-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-foreground)]">
          Focus engaged, <GradientText className="capitalize">{displayName}</GradientText>.
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mt-2 font-light">
          Your AI command center is active. You are currently in the top <span className="text-[var(--color-foreground)] font-medium">12%</span> of your cohort for System Architecture.
        </p>
      </motion.div>
    </motion.section>
  );
}
