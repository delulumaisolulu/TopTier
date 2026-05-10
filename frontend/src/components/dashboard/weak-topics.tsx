"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { AlertTriangle, Activity, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const weaknesses = [
  { topic: "CPU Scheduling", risk: "HIGH RISK", color: "text-red-500 dark:text-red-400", bg: "bg-red-500/10 dark:bg-red-400/10", border: "border-red-500/20 dark:border-red-400/20", bar: "bg-red-600 dark:bg-red-500", progress: "85%" },
  { topic: "Recursion", risk: "MODERATE", color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-500/10 dark:bg-amber-400/10", border: "border-amber-500/20 dark:border-amber-400/20", bar: "bg-amber-600 dark:bg-amber-500", progress: "60%" },
  { topic: "SQL Normalization", risk: "LOW RISK", color: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-500/10 dark:bg-emerald-400/10", border: "border-emerald-500/20 dark:border-emerald-400/20", bar: "bg-emerald-600 dark:bg-emerald-500", progress: "30%" },
];

export function WeakTopics() {
  return (
    <motion.div variants={fadeUp} className="glass-panel rounded-3xl p-6 relative flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Activity size={18} className="text-rose-500 dark:text-rose-400" />
          Vulnerability Heatmap
        </h3>
      </div>

      <div className="flex-1 space-y-4">
        {weaknesses.map((item, i) => (
          <div key={i} className="group relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-zinc-900 dark:text-white">{item.topic}</span>
              <div className={cn("flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-bold tracking-wider", item.bg, item.color, item.border)}>
                {item.risk === "HIGH RISK" ? <AlertTriangle size={10} /> : <AlertCircle size={10} />}
                {item.risk}
              </div>
            </div>
            
            <div className="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden mb-2">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: item.progress }}
                transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                className={cn("h-full rounded-full shadow-[0_0_10px_currentColor]", item.color)}
                style={{ backgroundColor: "currentColor" }}
              />
            </div>

            <button className="flex items-center gap-1 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-200">
              Generate Revision Quiz <ArrowRight size={12} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
