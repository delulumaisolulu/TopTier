"use client";

import { motion } from "framer-motion";
import { staggerChildren } from "@/lib/motion";
import { HeroSection } from "@/components/dashboard/hero-section";
import { NextAction } from "@/components/dashboard/next-action";
import { UploadPanel } from "@/components/dashboard/upload-panel";
import { AiInsights } from "@/components/dashboard/ai-insights";
import { ExamReadiness } from "@/components/dashboard/exam-readiness";
import { WeakTopics } from "@/components/dashboard/weak-topics";
import { ProbabilityEngine } from "@/components/dashboard/probability-engine";
import { TestGeneration } from "@/components/dashboard/test-generation";
import { StudyTimeline } from "@/components/dashboard/study-timeline";
import { PerformanceAnalytics } from "@/components/dashboard/performance-analytics";
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
        {/* Next Recommended Action (Top Priority) */}
        <div className="lg:col-span-12">
          <NextAction />
        </div>

        {/* Upload & Insight Feed */}
        <div className="lg:col-span-4 h-[360px]">
          <UploadPanel />
        </div>
        <div className="lg:col-span-8 h-[360px]">
          <AiInsights />
        </div>

        {/* Readiness & Weaknesses */}
        <div className="lg:col-span-4 h-[360px]">
          <ExamReadiness percentage={84} />
        </div>
        <div className="lg:col-span-8 h-[360px]">
          <WeakTopics />
        </div>

        {/* Probability & Test Generation */}
        <div className="lg:col-span-6 h-[340px]">
          <ProbabilityEngine />
        </div>
        <div className="lg:col-span-6 h-[340px]">
          <TestGeneration />
        </div>

        {/* Analytics & Timeline */}
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