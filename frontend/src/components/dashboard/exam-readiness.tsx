"use client";

import { motion } from "framer-motion";
import { SpatialCard } from "@/components/ui/spatial-card";
import { fadeUpSpatial } from "@/lib/motion";
import { Target } from "lucide-react";
import { AnimatedIcon } from "@/components/ui/animated-icon";

export function ExamReadiness({ percentage = 84 }: { percentage?: number }) {
  const isHigh = percentage >= 80;
  const color = isHigh ? "var(--color-secondary)" : "var(--color-warning)"; // Cyan vs Magenta

  return (
    <motion.div variants={fadeUpSpatial} className="h-full">
      <SpatialCard glowColor={isHigh ? "rgba(6, 182, 212, 0.25)" : "rgba(217, 70, 239, 0.25)"} className="h-full">
        <div className="flex flex-col h-full justify-between gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Readiness</h3>
            <AnimatedIcon icon={Target} glowColor={color} />
          </div>

          <div className="relative flex items-center justify-center py-4">
            {/* SVG Ring */}
            <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="var(--color-glass-border)"
                strokeWidth="8"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={color}
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 340" }}
                animate={{ strokeDasharray: `${(percentage / 100) * 340} 340` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                style={{ filter: "drop-shadow(0px 0px 8px currentColor)" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold tabular-nums text-[var(--color-foreground)]">{percentage}%</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {isHigh ? "Optimal state achieved." : "Focus required."}
            </p>
          </div>
        </div>
      </SpatialCard>
    </motion.div>
  );
}
