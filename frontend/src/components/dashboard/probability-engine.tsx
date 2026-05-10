"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { LineChart, Sparkles, TrendingUp, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const probabilities = [
  { topic: "Backpropagation", prob: 87, trend: "up" },
  { topic: "Deadlocks", prob: 82, trend: "up" },
  { topic: "Paging Algorithms", prob: 74, trend: "down" },
  { topic: "Database Normalization", prob: 65, trend: "up" },
];

export function ProbabilityEngine() {
  return (
    <motion.div variants={fadeUp} className="glass-panel rounded-3xl p-6 relative flex flex-col h-full">
      <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
        <LineChart size={100} className="text-purple-400" strokeWidth={1} />
      </div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Sparkles size={18} className="text-purple-600 dark:text-purple-400" />
            Exam Probability Engine
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Based on past 5 years of university data</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 relative z-10">
        {probabilities.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-zinc-500 w-4">{i + 1}.</span>
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{item.topic}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400">
                {item.prob}%
                <TrendingUp size={12} className={cn(item.trend === "down" && "rotate-180 text-zinc-500")} />
              </div>
              <ChevronRight size={14} className="text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
