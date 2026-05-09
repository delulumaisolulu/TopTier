"use client";

import { motion } from "framer-motion";
import { SpatialCard } from "@/components/ui/spatial-card";
import { fadeUpSpatial } from "@/lib/motion";
import { BrainCircuit, Zap, BookOpen } from "lucide-react";
import { AnimatedIcon } from "@/components/ui/animated-icon";

const insights = [
  {
    id: 1,
    title: "Memory Decay Detected",
    description: "Your retention for 'Neural Networks' is dropping. Review recommended.",
    icon: BrainCircuit,
    color: "var(--color-warning)", // Magenta for urgency
    glowColor: "rgba(217, 70, 239, 0.25)",
    actionText: "Review Now",
  },
  {
    id: 2,
    title: "Learning Pattern Optimized",
    description: "You perform 24% better during morning sessions. Adjusted schedule.",
    icon: Zap,
    color: "var(--color-accent)", // Gold for success/streak
    glowColor: "rgba(245, 158, 11, 0.25)",
    actionText: "View Schedule",
  },
  {
    id: 3,
    title: "New Material Correlated",
    description: "Chapter 4 directly relates to your recent project. Connect concepts.",
    icon: BookOpen,
    color: "var(--color-secondary)", // Cyan for intelligence
    glowColor: "rgba(6, 182, 212, 0.25)",
    actionText: "Explore Concepts",
  }
];

export function AiInsights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      {insights.map((insight) => (
        <motion.div key={insight.id} variants={fadeUpSpatial} className="h-full">
          <SpatialCard className="h-full group cursor-pointer" glowColor={insight.glowColor}>
            <div className="flex flex-col h-full gap-4">
              <div className="flex items-center justify-between">
                <AnimatedIcon icon={insight.icon} glowColor={insight.color} />
              </div>
              
              <div className="flex-grow">
                <h4 className="text-[var(--color-foreground)] font-medium mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--color-foreground)] group-hover:to-zinc-500 transition-all duration-300">
                  {insight.title}
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {insight.description}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-white/[0.05]">
                <span 
                  className="text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
                  style={{ color: insight.color }}
                >
                  {insight.actionText} &rarr;
                </span>
              </div>
            </div>
          </SpatialCard>
        </motion.div>
      ))}
    </div>
  );
}
