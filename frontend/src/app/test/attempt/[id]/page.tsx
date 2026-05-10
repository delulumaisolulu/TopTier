"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  Target,
  Sparkles,
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  Maximize2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ────────────────────────────────────────────────
// Demo Questions (In production, fetched from Supabase)
// ────────────────────────────────────────────────
const demoQuestions = [
  {
    id: "q1",
    topic: "Operating Systems",
    type: "mcq",
    difficulty: "medium",
    exam_probability: 87,
    marks: 2,
    text: "Which of the following page replacement algorithms suffers from Belady's anomaly?",
    options: [
      { label: "A", text: "LRU (Least Recently Used)", is_correct: false },
      { label: "B", text: "FIFO (First In First Out)", is_correct: true },
      { label: "C", text: "Optimal Page Replacement", is_correct: false },
      { label: "D", text: "LFU (Least Frequently Used)", is_correct: false },
    ],
  },
  {
    id: "q2",
    topic: "Database Management",
    type: "mcq",
    difficulty: "hard",
    exam_probability: 74,
    marks: 2,
    text: "In a relational database, which normal form eliminates transitive dependencies?",
    options: [
      { label: "A", text: "First Normal Form (1NF)", is_correct: false },
      { label: "B", text: "Second Normal Form (2NF)", is_correct: false },
      { label: "C", text: "Third Normal Form (3NF)", is_correct: true },
      { label: "D", text: "Boyce-Codd Normal Form (BCNF)", is_correct: false },
    ],
  },
  {
    id: "q3",
    topic: "Computer Networks",
    type: "mcq",
    difficulty: "easy",
    exam_probability: 92,
    marks: 2,
    text: "Which layer of the OSI model is responsible for routing and forwarding packets?",
    options: [
      { label: "A", text: "Data Link Layer", is_correct: false },
      { label: "B", text: "Transport Layer", is_correct: false },
      { label: "C", text: "Network Layer", is_correct: true },
      { label: "D", text: "Session Layer", is_correct: false },
    ],
  },
  {
    id: "q4",
    topic: "Operating Systems",
    type: "mcq",
    difficulty: "hard",
    exam_probability: 68,
    marks: 2,
    text: "Which scheduling algorithm is optimal for minimizing average waiting time?",
    options: [
      { label: "A", text: "First Come First Serve (FCFS)", is_correct: false },
      { label: "B", text: "Shortest Job First (SJF)", is_correct: true },
      { label: "C", text: "Round Robin (RR)", is_correct: false },
      { label: "D", text: "Priority Scheduling", is_correct: false },
    ],
  },
  {
    id: "q5",
    topic: "Data Structures",
    type: "mcq",
    difficulty: "medium",
    exam_probability: 81,
    marks: 2,
    text: "What is the time complexity of searching in a balanced Binary Search Tree?",
    options: [
      { label: "A", text: "O(n)", is_correct: false },
      { label: "B", text: "O(log n)", is_correct: true },
      { label: "C", text: "O(n log n)", is_correct: false },
      { label: "D", text: "O(1)", is_correct: false },
    ],
  },
];

// ────────────────────────────────────────────────
// Timer Component
// ────────────────────────────────────────────────
function Timer({ seconds, onExpire }: { seconds: number; onExpire: () => void }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire();
      return;
    }
    const interval = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(interval);
  }, [remaining, onExpire]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isLow = remaining < 60;

  return (
    <div className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-sm font-bold border transition-colors",
      isLow
        ? "bg-red-500/10 border-red-500/20 text-red-500 dark:text-red-400 animate-pulse"
        : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-zinc-900 dark:text-white"
    )}>
      <Clock size={14} />
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </div>
  );
}

// ────────────────────────────────────────────────
// Main Test Page
// ────────────────────────────────────────────────
export default function TestAttemptPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const question = demoQuestions[currentIndex];
  const totalQuestions = demoQuestions.length;
  const answeredCount = Object.keys(answers).length;

  // ── Keyboard Navigation ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "n") {
        if (currentIndex < totalQuestions - 1) setCurrentIndex((i) => i + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "p") {
        if (currentIndex > 0) setCurrentIndex((i) => i - 1);
      }
      if (e.key === "f") {
        toggleFlag(question.id);
      }
      if (["a", "b", "c", "d"].includes(e.key.toLowerCase())) {
        const optionIndex = e.key.toLowerCase().charCodeAt(0) - 97;
        if (question.options && question.options[optionIndex]) {
          setAnswers((prev) => ({ ...prev, [question.id]: question.options[optionIndex].label }));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, question]);

  const toggleFlag = (id: string) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    // In production: POST answers to FastAPI for evaluation
    await new Promise((r) => setTimeout(r, 2000));
    router.push("/test/results/demo");
  }, [router]);

  const difficultyColor = {
    easy: "text-emerald-500 dark:text-emerald-400",
    medium: "text-amber-500 dark:text-amber-400",
    hard: "text-red-500 dark:text-red-400",
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 glass-panel border-b border-black/5 dark:border-white/5 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BrainCircuit size={20} className="text-indigo-500 dark:text-indigo-400" />
            <span className="text-sm font-bold text-zinc-900 dark:text-white">
              AI Assessment Engine
            </span>
            <span className="text-xs text-zinc-400 hidden sm:inline">
              {answeredCount}/{totalQuestions} answered
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Timer seconds={totalQuestions * 120} onExpire={() => handleSubmit()} />
            <button
              onClick={() => setShowConfirm(true)}
              className="px-4 py-2 rounded-xl bg-indigo-500 text-white text-sm font-bold hover:bg-indigo-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-8 flex gap-6">
        {/* Question Area */}
        <div className="flex-1 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-3xl p-8 flex-1"
            >
              {/* Question Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Q{currentIndex + 1} of {totalQuestions}
                </span>
                <span className="text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md border border-indigo-500/20">
                  {question.topic}
                </span>
                <span className={cn("text-xs font-bold px-2 py-0.5 rounded-md border capitalize", 
                  difficultyColor[question.difficulty as keyof typeof difficultyColor],
                  question.difficulty === "easy" ? "bg-emerald-500/10 border-emerald-500/20" :
                  question.difficulty === "medium" ? "bg-amber-500/10 border-amber-500/20" :
                  "bg-red-500/10 border-red-500/20"
                )}>
                  {question.difficulty}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-purple-500 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                  <Target size={10} />
                  {question.exam_probability}% likely
                </div>
                <span className="text-xs text-zinc-400 ml-auto">{question.marks} marks</span>
              </div>

              {/* Question Text */}
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white leading-relaxed mb-8">
                {question.text}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {question.options?.map((option) => {
                  const selected = answers[question.id] === option.label;
                  return (
                    <button
                      key={option.label}
                      onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option.label }))}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300",
                        selected
                          ? "bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                          : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 transition-all",
                        selected
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : "border-zinc-300 dark:border-zinc-600 text-zinc-500"
                      )}>
                        {option.label}
                      </div>
                      <span className={cn(
                        "text-sm font-medium",
                        selected ? "text-indigo-600 dark:text-indigo-300" : "text-zinc-800 dark:text-zinc-200"
                      )}>
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-sm font-bold text-zinc-900 dark:text-white disabled:opacity-30 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <button
              onClick={() => toggleFlag(question.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors",
                flagged.has(question.id)
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                  : "bg-black/5 dark:bg-white/5 text-zinc-500 hover:text-amber-500"
              )}
            >
              <Flag size={14} /> {flagged.has(question.id) ? "Flagged" : "Flag"}
            </button>

            <button
              onClick={() => setCurrentIndex((i) => Math.min(totalQuestions - 1, i + 1))}
              disabled={currentIndex === totalQuestions - 1}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-sm font-bold text-zinc-900 dark:text-white disabled:opacity-30 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Question Navigator Sidebar */}
        <div className="hidden lg:flex flex-col gap-4 w-64">
          <div className="glass-panel rounded-2xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Navigator</h4>
            <div className="grid grid-cols-5 gap-2">
              {demoQuestions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "w-full aspect-square rounded-lg text-xs font-bold flex items-center justify-center border transition-all",
                    currentIndex === i
                      ? "bg-indigo-500 text-white border-indigo-500 shadow-lg"
                      : answers[q.id]
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                      : flagged.has(q.id)
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                      : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-zinc-500"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/30" />
              <span className="text-zinc-500">Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/30" />
              <span className="text-zinc-500">Flagged ({flagged.size})</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5" />
              <span className="text-zinc-500">Unanswered ({totalQuestions - answeredCount})</span>
            </div>
          </div>

          <div className="text-[10px] text-zinc-400 px-2 space-y-1">
            <p><kbd className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">←</kbd> <kbd className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">→</kbd> Navigate</p>
            <p><kbd className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">A-D</kbd> Select option</p>
            <p><kbd className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">F</kbd> Toggle flag</p>
          </div>
        </div>
      </div>

      {/* Confirm Submit Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel rounded-3xl p-8 max-w-md w-full text-center"
            >
              {isSubmitting ? (
                <div className="flex flex-col items-center gap-4 py-8">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}>
                    <BrainCircuit size={40} className="text-indigo-500 dark:text-indigo-400" />
                  </motion.div>
                  <p className="text-lg font-bold text-zinc-900 dark:text-white">AI is evaluating your answers...</p>
                  <p className="text-sm text-zinc-500">Computing analytics and identifying patterns</p>
                </div>
              ) : (
                <>
                  <AlertTriangle size={32} className="text-amber-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Submit Assessment?</h3>
                  <p className="text-sm text-zinc-500 mb-4">
                    You have answered {answeredCount} of {totalQuestions} questions.
                    {totalQuestions - answeredCount > 0 && (
                      <span className="text-amber-500 font-bold"> {totalQuestions - answeredCount} unanswered.</span>
                    )}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="flex-1 px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 text-sm font-bold text-zinc-900 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                    >
                      Continue Test
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 px-4 py-3 rounded-xl bg-indigo-500 text-white text-sm font-bold hover:bg-indigo-600 transition-colors"
                    >
                      Submit Now
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
