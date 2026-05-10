"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { BrainCircuit, Play, Clock, ArrowRight, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function NextAction() {
  return (
    <motion.div 
      variants={fadeUp}
      className="glass-panel rounded-3xl p-8 relative overflow-hidden group"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full group-hover:bg-indigo-500/30 transition-colors duration-700" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
              <BrainCircuit size={16} className="animate-pulse" />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase text-indigo-400">Next Recommended Action</span>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Review Deadlocks & Paging</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl">
              Based on your latest mock test, your retention for OS memory management algorithms is dropping. An immediate 15-minute revision will stabilize your recall probability to 94%.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-1.5 text-red-400 bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
              <AlertTriangle size={14} />
              <span>High Urgency</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
              <Clock size={14} />
              <span>Est. 15 mins</span>
            </div>
          </div>
        </div>

        <button className="relative group/btn flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold hover:scale-105 transition-all duration-300 w-full md:w-auto overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
          <Play size={18} className="fill-white dark:fill-zinc-900" />
          <span>Start Revision Session</span>
          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
