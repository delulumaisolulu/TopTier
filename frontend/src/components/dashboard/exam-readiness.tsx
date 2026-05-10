"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { Target, TrendingUp, ShieldAlert, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExamReadinessProps {
  percentage: number;
}

export function ExamReadiness({ percentage }: ExamReadinessProps) {
  // Calculate circumference for circular progress
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div variants={fadeUp} className="glass-panel rounded-3xl p-6 relative flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Target size={18} className="text-cyan-600 dark:text-cyan-400" />
          Readiness Engine
        </h3>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
          <TrendingUp size={12} />
          <span>+4% this week</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="relative w-40 h-40 flex items-center justify-center mb-4">
          {/* Neon Glow Behind */}
          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />
          
          <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 160 160">
            {/* Background Circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              className="stroke-black/5 dark:stroke-white/5"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress Circle */}
            <motion.circle
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, ease: "easeOut" }}
              cx="80"
              cy="80"
              r={radius}
              className="stroke-cyan-500 dark:stroke-cyan-400"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                filter: "drop-shadow(0 0 8px rgba(34,211,238,0.5))"
              }}
            />
          </svg>
          
          <div className="absolute flex flex-col items-center justify-center text-center">
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 to-cyan-600 dark:from-white dark:to-cyan-200"
            >
              {percentage}%
            </motion.span>
            <span className="text-[10px] uppercase tracking-widest text-cyan-600 dark:text-cyan-400/80 font-bold mt-1 flex items-center gap-1">
              <Sparkles size={10} /> Confident
            </span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="w-full space-y-3 mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">Operating Systems</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">92%</span>
          </div>
          <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full w-[92%]" />
          </div>

          <div className="flex items-center justify-between text-sm pt-1">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">Computer Networks</span>
            <span className="text-amber-500 dark:text-amber-400 font-bold">68%</span>
          </div>
          <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 dark:bg-amber-400 rounded-full w-[68%]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
