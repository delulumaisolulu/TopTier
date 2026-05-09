"use client";

import { motion } from "framer-motion";
import { staggerChildren } from "@/lib/motion";
import { HeroSection } from "@/components/dashboard/hero-section";
import { ExamReadiness } from "@/components/dashboard/exam-readiness";
import { AiInsights } from "@/components/dashboard/ai-insights";
import { StudyTimeline } from "@/components/dashboard/study-timeline";
import { StreakProgression } from "@/components/dashboard/streak-progression";

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
        {/* Top Half */}
        <div className="lg:col-span-4 h-[320px]">
          <ExamReadiness percentage={84} />
        </div>
        <div className="lg:col-span-8 h-[320px]">
          <AiInsights />
        </div>

        {/* Bottom Half */}
        <div className="lg:col-span-8 h-[360px]">
          <StudyTimeline />
        </div>
        <div className="lg:col-span-4 h-[360px]">
          <StreakProgression days={14} />
        </div>
      </motion.div>
    </div>
  );
}