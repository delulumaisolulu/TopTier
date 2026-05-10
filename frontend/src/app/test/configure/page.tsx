"use client";

import { motion } from "framer-motion";
import { fadeUpSpatial, staggerChildren } from "@/lib/motion";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Settings2,
  Sparkles,
  Zap,
  ArrowRight,
  Target,
  BrainCircuit,
  BookOpen,
  Calculator,
  FileText,
  MessageSquare,
  Briefcase,
  Gauge,
  SlidersHorizontal,
  Filter,
  TrendingUp,
  AlertTriangle,
  Shuffle,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientText } from "@/components/ui/gradient-text";

// ────────────────────────────────────────────────
// Config Options
// ────────────────────────────────────────────────
const questionTypes = [
  { id: "mcq", label: "MCQs", icon: Target, description: "Multiple choice" },
  { id: "numerical", label: "Numericals", icon: Calculator, description: "Problem solving" },
  { id: "short", label: "Short Answer", icon: MessageSquare, description: "Brief explanations" },
  { id: "long", label: "Long Answer", icon: FileText, description: "Detailed responses" },
  { id: "case_study", label: "Case Study", icon: Briefcase, description: "Scenario analysis" },
];

const difficulties = [
  { id: "easy", label: "Easy", color: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { id: "medium", label: "Medium", color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { id: "hard", label: "Hard", color: "text-red-500 dark:text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  { id: "adaptive", label: "AI Adaptive", color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
];

const questionCounts = [10, 20, 50];

const filterModes = [
  { id: "mixed", label: "Mixed Mode", icon: Shuffle, description: "Balanced across all topics" },
  { id: "weak_only", label: "Weak Topics Only", icon: AlertTriangle, description: "Focus on vulnerabilities" },
  { id: "high_prob", label: "High Probability", icon: TrendingUp, description: "Likely exam questions" },
  { id: "revision", label: "Revision Mode", icon: Clock, description: "Spaced repetition targets" },
];

// ────────────────────────────────────────────────
// Page Component
// ────────────────────────────────────────────────
export default function TestConfigurePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [selectedTypes, setSelectedTypes] = useState<string[]>(["mcq"]);
  const [difficulty, setDifficulty] = useState("medium");
  const [count, setCount] = useState(20);
  const [customCount, setCustomCount] = useState("");
  const [filterMode, setFilterMode] = useState("mixed");
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleType = (id: string) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (selectedTypes.length === 0) return;
    setIsGenerating(true);

    // Simulate generation time (in production, this hits FastAPI)
    await new Promise((r) => setTimeout(r, 2500));

    // In production: POST to /api/test/generate with config
    // const result = await generateTest({ question_types: selectedTypes, difficulty, question_count: finalCount, filter_mode: filterMode }, token);
    // router.push(`/test/attempt/${result.test_id}`);

    // For now, navigate to a mock test
    router.push("/test/attempt/demo");
  };

  const finalCount = customCount ? parseInt(customCount) || count : count;

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
          <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
            <Settings2 className="w-4 h-4 text-purple-500 dark:text-purple-400 mr-2" />
            <span className="text-xs font-semibold tracking-widest text-purple-500 dark:text-purple-400 uppercase">
              Test Intelligence
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Configure Your <GradientText>Assessment</GradientText>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl mt-2 font-light">
            Fine-tune your AI-generated exam simulation. The system will tailor questions to your extracted intelligence profile.
          </p>
        </motion.div>
      </motion.section>

      {/* Configuration Grid */}
      <motion.div
        variants={staggerChildren(0.08)}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Question Types */}
        <motion.div variants={fadeUpSpatial} className="glass-panel rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen size={18} className="text-indigo-500 dark:text-indigo-400" />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Question Types</h3>
          </div>

          <div className="space-y-3">
            {questionTypes.map((type) => {
              const selected = selectedTypes.includes(type.id);
              return (
                <button
                  key={type.id}
                  onClick={() => toggleType(type.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left",
                    selected
                      ? "bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                      : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-xl transition-colors",
                    selected ? "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400" : "bg-black/5 dark:bg-white/5 text-zinc-400"
                  )}>
                    <type.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <p className={cn("text-sm font-bold", selected ? "text-indigo-600 dark:text-indigo-300" : "text-zinc-900 dark:text-zinc-200")}>
                      {type.label}
                    </p>
                    <p className="text-xs text-zinc-500">{type.description}</p>
                  </div>
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    selected ? "border-indigo-500 bg-indigo-500" : "border-zinc-300 dark:border-zinc-600"
                  )}>
                    {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Difficulty & Count */}
        <motion.div variants={fadeUpSpatial} className="flex flex-col gap-6">
          {/* Difficulty */}
          <div className="glass-panel rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Gauge size={18} className="text-amber-500 dark:text-amber-400" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Difficulty Level</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {difficulties.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDifficulty(d.id)}
                  className={cn(
                    "p-3 rounded-xl border text-center transition-all duration-300",
                    difficulty === d.id
                      ? `${d.bg} ${d.color} font-bold shadow-lg`
                      : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-zinc-500 dark:text-zinc-400 hover:bg-black/10 dark:hover:bg-white/10"
                  )}
                >
                  <span className="text-sm font-bold">{d.label}</span>
                  {d.id === "adaptive" && (
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Sparkles size={10} />
                      <span className="text-[10px]">AI-Driven</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div className="glass-panel rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal size={18} className="text-cyan-500 dark:text-cyan-400" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Question Count</h3>
            </div>

            <div className="flex gap-3">
              {questionCounts.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCount(c);
                    setCustomCount("");
                  }}
                  className={cn(
                    "flex-1 p-3 rounded-xl border text-center text-sm font-bold transition-all duration-300",
                    count === c && !customCount
                      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400 shadow-lg"
                      : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-zinc-500 dark:text-zinc-400 hover:bg-black/10 dark:hover:bg-white/10"
                  )}
                >
                  {c}
                </button>
              ))}
              <input
                type="number"
                placeholder="Custom"
                value={customCount}
                onChange={(e) => setCustomCount(e.target.value)}
                className="flex-1 p-3 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-center text-sm font-bold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                min={1}
                max={100}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Generation Filter */}
      <motion.div variants={fadeUpSpatial} initial="initial" animate="animate" className="glass-panel rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Filter size={18} className="text-purple-500 dark:text-purple-400" />
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Generation Strategy</h3>
          <span className="text-xs text-zinc-400 ml-auto">AI Recommendation: High Probability</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filterModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setFilterMode(mode.id)}
              className={cn(
                "p-4 rounded-2xl border text-left transition-all duration-300",
                filterMode === mode.id
                  ? "bg-purple-500/10 dark:bg-purple-500/15 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                  : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10"
              )}
            >
              <mode.icon size={18} className={cn(
                "mb-2",
                filterMode === mode.id ? "text-purple-600 dark:text-purple-400" : "text-zinc-400"
              )} />
              <p className={cn(
                "text-sm font-bold mb-0.5",
                filterMode === mode.id ? "text-purple-600 dark:text-purple-300" : "text-zinc-900 dark:text-zinc-200"
              )}>
                {mode.label}
              </p>
              <p className="text-xs text-zinc-500">{mode.description}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* AI Intelligence Summary */}
      <motion.div
        variants={fadeUpSpatial}
        initial="initial"
        animate="animate"
        className="glass-panel rounded-3xl p-6 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/10 blur-[60px] rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-2">
              <BrainCircuit size={18} className="text-indigo-500 dark:text-indigo-400 animate-pulse" />
              AI Configuration Summary
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-md border border-indigo-500/20">
                {selectedTypes.length} type{selectedTypes.length !== 1 ? "s" : ""}
              </span>
              <span className="text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-md border border-amber-500/20 capitalize">
                {difficulty}
              </span>
              <span className="text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-1 rounded-md border border-cyan-500/20">
                {finalCount} questions
              </span>
              <span className="text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-md border border-purple-500/20">
                {filterModes.find((m) => m.id === filterMode)?.label}
              </span>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || selectedTypes.length === 0}
            className={cn(
              "group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold transition-all duration-300 rounded-2xl shadow-xl w-full md:w-auto",
              isGenerating
                ? "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 cursor-not-allowed"
                : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            )}
          >
            {isGenerating ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <BrainCircuit size={18} />
                </motion.div>
                <span>Generating Intelligence...</span>
              </>
            ) : (
              <>
                <Zap size={18} className="fill-current" />
                <span>Deploy Assessment</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
