"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { Settings2, Plus, Zap, FileText } from "lucide-react";

export function TestGeneration() {
  return (
    <motion.div variants={fadeUp} className="glass-panel rounded-3xl p-6 relative flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Settings2 size={18} className="text-blue-600 dark:text-blue-400" />
            Test Command Center
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Configure & deploy custom assessments</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {/* Type Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {["MCQs", "Numericals", "Long Ans", "Case Study"].map((type, i) => (
            <div key={i} className={`p-2 rounded-xl border text-center cursor-pointer text-xs font-bold transition-all ${i === 0 ? "bg-blue-500/20 border-blue-500/50 text-blue-600 dark:text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]" : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:bg-black/10 dark:hover:bg-white/10"}`}>
              {type}
            </div>
          ))}
        </div>

        {/* Sliders & Toggles */}
        <div className="space-y-4 p-4 rounded-2xl bg-zinc-100 dark:bg-black/20 border border-black/5 dark:border-white/5 mt-auto">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">
              <span>Difficulty</span>
              <span className="text-zinc-900 dark:text-white">Advanced</span>
            </div>
            <div className="h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[75%]" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Target Weak Topics Only</span>
            <div className="w-8 h-4 bg-blue-500 rounded-full relative cursor-pointer">
              <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
            </div>
          </div>
        </div>

        <button className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <Zap size={16} className="fill-white" />
          Generate Assessment
        </button>
      </div>
    </motion.div>
  );
}
