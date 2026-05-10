"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { Terminal, Zap, BookOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const insights = [
  { icon: Zap, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10 dark:bg-amber-400/10", border: "border-amber-500/20 dark:border-amber-400/20", title: "Speed Optimization", text: "Your numerical solving speed improved 18% in the last 3 days." },
  { icon: BookOpen, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-500/10 dark:bg-purple-400/10", border: "border-purple-500/20 dark:border-purple-400/20", title: "Probability Alert", text: "Unit 5 has highest exam appearance probability (82%) based on past 5 years." },
  { icon: Clock, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500/10 dark:bg-indigo-400/10", border: "border-indigo-500/20 dark:border-indigo-400/20", title: "Retention Warning", text: "Revision for 'CPU Scheduling' recommended within next 14 hours." },
];

export function AiInsights() {
  return (
    <motion.div variants={fadeUp} className="glass-panel rounded-3xl p-6 relative flex flex-col h-full overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Terminal size={150} />
      </div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Terminal size={18} className="text-zinc-500 dark:text-zinc-400" />
            AI Insight Terminal
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Analysis Feed
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-4 relative z-10">
        {insights.map((insight, i) => (
          <div key={i} className="flex gap-4 items-start group/item">
            <div className={cn("p-2 rounded-xl border mt-0.5 shrink-0 transition-colors", insight.bg, insight.color, insight.border, "group-hover/item:bg-opacity-20")}>
              <insight.icon size={14} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-200 mb-0.5">{insight.title}</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{insight.text}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
