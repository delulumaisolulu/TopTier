"use client";

import { motion } from "framer-motion";
import { fadeUpSpatial, staggerChildren } from "@/lib/motion";
import { useRouter } from "next/navigation";
import {
  Trophy,
  Target,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  CheckCircle2,
  XCircle,
  BarChart3,
  BrainCircuit,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientText } from "@/components/ui/gradient-text";

// ────────────────────────────────────────────────
// Demo Results Data
// ────────────────────────────────────────────────
const results = {
  score: 72,
  totalQuestions: 5,
  correct: 4,
  incorrect: 1,
  unanswered: 0,
  timeTaken: "8m 34s",
  avgTimePerQuestion: "1m 42s",
  topicBreakdown: [
    { name: "Operating Systems", correct: 2, total: 2, accuracy: 100 },
    { name: "Computer Networks", correct: 1, total: 1, accuracy: 100 },
    { name: "Database Management", correct: 0, total: 1, accuracy: 0 },
    { name: "Data Structures", correct: 1, total: 1, accuracy: 100 },
  ],
  weakTopics: ["Database Management"],
  strongTopics: ["Operating Systems", "Computer Networks"],
};

export default function TestResultsPage() {
  const router = useRouter();

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (results.score / 100) * circumference;
  const scoreColor = results.score >= 80 ? "text-emerald-500" : results.score >= 60 ? "text-amber-500" : "text-red-500";
  const strokeClass = results.score >= 80 ? "stroke-emerald-500" : results.score >= 60 ? "stroke-amber-500" : "stroke-red-500";

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 flex flex-col gap-10 min-h-screen">
      {/* Header */}
      <motion.section
        variants={staggerChildren(0.1)}
        initial="initial"
        animate="animate"
        className="relative z-10 flex flex-col items-center text-center gap-4"
      >
        <motion.div variants={fadeUpSpatial} className="flex flex-col gap-2 items-center">
          <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm">
            <Trophy className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mr-2" />
            <span className="text-xs font-semibold tracking-widest text-emerald-500 dark:text-emerald-400 uppercase">
              Assessment Complete
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Your <GradientText>Intelligence Report</GradientText>
          </h1>
        </motion.div>
      </motion.section>

      {/* Score Card */}
      <motion.div
        variants={fadeUpSpatial}
        initial="initial"
        animate="animate"
        className="glass-panel rounded-3xl p-8 relative overflow-hidden"
      >
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          {/* Score Ring */}
          <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
            <div className={cn("absolute inset-0 blur-2xl rounded-full animate-pulse",
              results.score >= 80 ? "bg-emerald-500/20" : results.score >= 60 ? "bg-amber-500/20" : "bg-red-500/20"
            )} />
            <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r={radius} className="stroke-black/5 dark:stroke-white/5" strokeWidth="12" fill="none" />
              <motion.circle
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2, ease: "easeOut" }}
                cx="80" cy="80" r={radius}
                className={strokeClass}
                strokeWidth="12" fill="none" strokeLinecap="round"
                style={{ strokeDasharray: circumference, filter: "drop-shadow(0 0 8px currentColor)" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className={cn("text-5xl font-black", scoreColor)}
              >
                {results.score}%
              </motion.span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mt-1">Overall Score</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 size={20} className="text-emerald-500 dark:text-emerald-400 mb-2" />
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{results.correct}</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Correct</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
              <XCircle size={20} className="text-red-500 dark:text-red-400 mb-2" />
              <span className="text-2xl font-black text-red-600 dark:text-red-400">{results.incorrect}</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Incorrect</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <Clock size={20} className="text-indigo-500 dark:text-indigo-400 mb-2" />
              <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{results.timeTaken}</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Time Taken</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
              <BarChart3 size={20} className="text-purple-500 dark:text-purple-400 mb-2" />
              <span className="text-lg font-black text-purple-600 dark:text-purple-400">{results.avgTimePerQuestion}</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Avg/Question</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Topic Breakdown */}
      <motion.div
        variants={fadeUpSpatial}
        initial="initial"
        animate="animate"
        className="glass-panel rounded-3xl p-6"
      >
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-6">
          <Target size={18} className="text-cyan-500 dark:text-cyan-400" />
          Topic Performance Breakdown
        </h3>

        <div className="space-y-4">
          {results.topicBreakdown.map((topic, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-zinc-900 dark:text-white">{topic.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">{topic.correct}/{topic.total}</span>
                  <span className={cn("text-xs font-bold",
                    topic.accuracy >= 80 ? "text-emerald-500 dark:text-emerald-400" :
                    topic.accuracy >= 50 ? "text-amber-500 dark:text-amber-400" :
                    "text-red-500 dark:text-red-400"
                  )}>
                    {topic.accuracy}%
                  </span>
                </div>
              </div>
              <div className="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${topic.accuracy}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  className={cn("h-full rounded-full",
                    topic.accuracy >= 80 ? "bg-emerald-500" :
                    topic.accuracy >= 50 ? "bg-amber-500" :
                    "bg-red-500"
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        variants={fadeUpSpatial}
        initial="initial"
        animate="animate"
        className="glass-panel rounded-3xl p-6 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full" />

        <div className="relative z-10">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-6">
            <BrainCircuit size={18} className="text-purple-500 dark:text-purple-400 animate-pulse" />
            AI Analysis
          </h3>

          <div className="space-y-4">
            {results.weakTopics.length > 0 && (
              <div className="flex gap-4 items-start">
                <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 shrink-0">
                  <AlertTriangle size={14} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-200 mb-0.5">Vulnerability Detected</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {results.weakTopics.join(", ")} needs immediate attention. Schedule a focused revision within the next 24 hours.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-4 items-start">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 shrink-0">
                <TrendingUp size={14} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-200 mb-0.5">Strengths Confirmed</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {results.strongTopics.join(", ")} — high mastery detected. These topics are exam-ready.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 shrink-0">
                <Sparkles size={14} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-200 mb-0.5">Recommendation</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Your overall readiness improved to {results.score}%. Focus on weak topics and retake an assessment in 48 hours for optimal retention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={fadeUpSpatial}
        initial="initial"
        animate="animate"
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button
          onClick={() => router.push("/dashboard")}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold transition-all duration-300 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] shadow-xl"
        >
          <BarChart3 size={18} />
          <span>View Full Analytics Dashboard</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => router.push("/test/configure")}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
        >
          Retake Assessment
        </button>
      </motion.div>
    </div>
  );
}
