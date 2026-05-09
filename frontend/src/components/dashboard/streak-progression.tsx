"use client";

import { motion } from "framer-motion";
import { SpatialCard } from "@/components/ui/spatial-card";
import { fadeUpSpatial } from "@/lib/motion";
import { Flame } from "lucide-react";
import { useEffect, useState } from "react";

export function StreakProgression({ days = 14 }: { days?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const incrementTime = (duration / days);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === days) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [days]);

  return (
    <motion.div variants={fadeUpSpatial} className="h-full">
      <SpatialCard glowColor="rgba(245, 158, 11, 0.25)" className="h-full">
        <div className="flex flex-col h-full justify-between gap-4 text-center">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Streak</h3>
          
          <div className="relative flex justify-center">
            <motion.div
              animate={{ rotate: [-2, 2, -2], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-[var(--color-accent)] drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            >
              <Flame size={64} strokeWidth={1} />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center pt-4">
              <span className="text-2xl font-bold tabular-nums text-[var(--color-foreground)] drop-shadow-md">{count}</span>
            </div>
          </div>
          
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Keep the momentum going.</p>
        </div>
      </SpatialCard>
    </motion.div>
  );
}
