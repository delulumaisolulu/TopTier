"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { BarChart3, TrendingUp, TrendingDown, Target } from "lucide-react";

export function PerformanceAnalytics() {
  return (
    <motion.div variants={fadeUp} className="glass-panel rounded-3xl p-6 relative flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <BarChart3 size={18} className="text-emerald-600 dark:text-emerald-400" />
            Performance Snapshot
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Based on last 14 days of activity</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Metric 1 */}
        <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs font-bold mb-1">
            <Target size={14} />
            TEST ACCURACY
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white flex items-baseline gap-2">
            78%
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
              <TrendingUp size={10} className="mr-0.5" /> +5%
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs font-bold mb-1">
            <BarChart3 size={14} />
            AVG TIME/Q
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white flex items-baseline gap-2">
            1.2m
            <span className="text-xs font-medium text-rose-600 dark:text-rose-400 flex items-center">
              <TrendingDown size={10} className="mr-0.5" /> -12s
            </span>
          </div>
        </div>

        {/* Strong/Weak */}
        <div className="col-span-2 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-4 mt-auto">
          <div className="flex justify-between items-center mb-3 text-xs font-bold text-zinc-500 dark:text-zinc-400">
            <span>STRONGEST</span>
            <span>WEAKEST</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-500/20 dark:border-emerald-400/20">OS Theory</span>
            <div className="flex-1 border-t border-dashed border-black/10 dark:border-white/10 mx-3" />
            <span className="text-sm font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 dark:bg-rose-400/10 px-2 py-1 rounded-md border border-rose-500/20 dark:border-rose-400/20">Algorithms</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
