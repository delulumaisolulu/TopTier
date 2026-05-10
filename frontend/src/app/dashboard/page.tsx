"use client";

import { motion } from "framer-motion";
import { staggerChildren, fadeUp } from "@/lib/motion";
import { HeroSection } from "@/components/dashboard/hero-section";
import { NextAction } from "@/components/dashboard/next-action";
import { AiInsights } from "@/components/dashboard/ai-insights";
import { ExamReadiness } from "@/components/dashboard/exam-readiness";
import { WeakTopics } from "@/components/dashboard/weak-topics";
import { ProbabilityEngine } from "@/components/dashboard/probability-engine";
import { StudyTimeline } from "@/components/dashboard/study-timeline";
import { PerformanceAnalytics } from "@/components/dashboard/performance-analytics";
import { StreakProgression } from "@/components/dashboard/streak-progression";
import Link from "next/link";
import { UploadCloud, Settings2, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 flex flex-col gap-8 min-h-screen">
      <HeroSection userName="Alex" />

      <motion.div 
        variants={staggerChildren(0.1)}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10"
      >
        {/* Next Recommended Action */}
        <div className="lg:col-span-12">
          <NextAction />
        </div>

        {/* Quick Actions Row */}
        <motion.div variants={fadeUp} className="lg:col-span-6">
          <Link href="/upload" className="glass-panel rounded-2xl p-5 flex items-center justify-between group hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300 block">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                <UploadCloud size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">Upload Study Material</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Inject new documents into AI pipeline</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-zinc-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-6">
          <Link href="/test/configure" className="glass-panel rounded-2xl p-5 flex items-center justify-between group hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 block">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 dark:text-purple-400">
                <Settings2 size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">Generate New Test</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Configure & deploy AI assessment</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-zinc-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>

        {/* AI Insight Feed */}
        <div className="lg:col-span-8 h-[360px]">
          <AiInsights />
        </div>
        <div className="lg:col-span-4 h-[360px]">
          <ExamReadiness percentage={84} />
        </div>

        {/* Weaknesses & Probability */}
        <div className="lg:col-span-8 h-[360px]">
          <WeakTopics />
        </div>
        <div className="lg:col-span-4 h-[360px]">
          <ProbabilityEngine />
        </div>

        {/* Analytics & Timeline & Streak */}
        <div className="lg:col-span-5 h-[360px]">
          <StudyTimeline />
        </div>
        <div className="lg:col-span-4 h-[360px]">
          <PerformanceAnalytics />
        </div>
        <div className="lg:col-span-3 h-[360px]">
          <StreakProgression days={14} />
        </div>
      </motion.div>
    </div>
  );
}