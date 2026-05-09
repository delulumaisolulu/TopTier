"use client";

import { motion } from "framer-motion";
import { SpatialCard } from "@/components/ui/spatial-card";
import { fadeUpSpatial } from "@/lib/motion";
import { CheckCircle2, CircleDashed, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineData = [
  { id: 1, title: "Neural Networks Overview", status: "completed", duration: "45m" },
  { id: 2, title: "Backpropagation Math", status: "active", duration: "60m" },
  { id: 3, title: "Optimization Algorithms", status: "locked", duration: "30m" },
];

export function StudyTimeline() {
  return (
    <motion.div variants={fadeUpSpatial} className="h-full">
      <SpatialCard glowColor="rgba(99, 102, 241, 0.25)" className="h-full">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6">Adaptive Timeline</h3>
        
        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 space-y-8">
          {timelineData.map((item, index) => {
            const isActive = item.status === "active";
            const isCompleted = item.status === "completed";
            const isLocked = item.status === "locked";

            return (
              <div key={item.id} className="relative pl-6">
                {/* Node Icon */}
                <div className="absolute -left-3 top-0 bg-white dark:bg-[#0A0A0E] rounded-full p-1">
                  {isCompleted && <CheckCircle2 className="text-indigo-500" size={16} />}
                  {isActive && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CircleDashed className="text-cyan-500" size={16} />
                    </motion.div>
                  )}
                  {isLocked && <Lock className="text-zinc-400 dark:text-zinc-600" size={16} />}
                </div>

                {/* Content */}
                <div>
                  <h4 className={cn("font-medium", {
                    "text-zinc-400 dark:text-zinc-500": isCompleted,
                    "text-[var(--color-foreground)]": isActive,
                    "text-zinc-300 dark:text-zinc-700": isLocked,
                  })}>
                    {item.title}
                  </h4>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">{item.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      </SpatialCard>
    </motion.div>
  );
}
