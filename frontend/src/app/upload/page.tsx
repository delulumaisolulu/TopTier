"use client";

import { motion, AnimatePresence } from "framer-motion";
import { fadeUpSpatial, staggerChildren } from "@/lib/motion";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Loader2,
  Sparkles,
  X,
  ArrowRight,
  BrainCircuit,
  Network,
  BarChart3,
  Target,
  Zap,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientText } from "@/components/ui/gradient-text";

// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────
type FileStatus = "pending" | "uploading" | "extracting" | "analyzing" | "graphing" | "computing" | "ready" | "failed";

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: string;
  type: string;
  status: FileStatus;
  progress: number;
  docId?: string;
}

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ACCEPTED_EXTENSIONS = [".pdf", ".pptx", ".docx"];
const MAX_FILES = 4;

// ────────────────────────────────────────────────
// Processing Pipeline Stages
// ────────────────────────────────────────────────
const processingStages: { key: FileStatus; label: string; icon: React.ElementType; color: string }[] = [
  { key: "uploading", label: "Uploading to Vault", icon: UploadCloud, color: "text-indigo-500 dark:text-indigo-400" },
  { key: "extracting", label: "Extracting Content", icon: FileText, color: "text-cyan-500 dark:text-cyan-400" },
  { key: "analyzing", label: "AI Topic Analysis", icon: BrainCircuit, color: "text-purple-500 dark:text-purple-400" },
  { key: "graphing", label: "Building Knowledge Graph", icon: Network, color: "text-amber-500 dark:text-amber-400" },
  { key: "computing", label: "Computing Exam Weightage", icon: BarChart3, color: "text-emerald-500 dark:text-emerald-400" },
  { key: "ready", label: "Intelligence Ready", icon: CheckCircle2, color: "text-emerald-500 dark:text-emerald-400" },
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

// ────────────────────────────────────────────────
// Main Upload Page
// ────────────────────────────────────────────────
export default function UploadPage() {
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [globalStatus, setGlobalStatus] = useState<"idle" | "processing" | "complete">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ── File Validation ──
  const validateFile = (file: File): string | null => {
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ACCEPTED_EXTENSIONS.includes(ext) && !ACCEPTED_TYPES.includes(file.type)) {
      return `${file.name}: Only PDF, PPTX, DOCX are accepted.`;
    }
    if (file.size > 50 * 1024 * 1024) {
      return `${file.name}: File exceeds 50 MB limit.`;
    }
    return null;
  };

  // ── Add Files ──
  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const incoming = Array.from(newFiles);
      const remaining = MAX_FILES - files.length;
      if (remaining <= 0) return;

      const validFiles: UploadedFile[] = [];
      for (const file of incoming.slice(0, remaining)) {
        const error = validateFile(file);
        if (error) {
          console.warn(error);
          continue;
        }
        validFiles.push({
          id: crypto.randomUUID(),
          file,
          name: file.name,
          size: formatFileSize(file.size),
          type: file.name.split(".").pop()?.toUpperCase() || "FILE",
          status: "pending",
          progress: 0,
        });
      }

      setFiles((prev) => [...prev, ...validFiles]);
      setErrorMessage(null);
    },
    [files.length]
  );

  // ── Remove File ──
  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // ── Upload & Process Pipeline ──
  const startProcessing = async () => {
    if (files.length === 0 || !user) return;

    setGlobalStatus("processing");
    setErrorMessage(null);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const currentFile = files[i];

      // Stage 1: Uploading
      updateFileStatus(currentFile.id, "uploading", 10);
      try {
        const filePath = `${user.id}/${Date.now()}_${currentFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("study-materials")
          .upload(filePath, currentFile.file);

        if (uploadError) {
          console.error("Storage upload error:", uploadError);
          updateFileStatus(currentFile.id, "failed", 0);
          // Surface meaningful error to user
          if (uploadError.message?.includes("Bucket not found") || uploadError.message?.includes("not found")) {
            setErrorMessage("Storage bucket 'study-materials' not found. Please create it in your Supabase Dashboard → Storage.");
          } else {
            setErrorMessage(`Upload failed: ${uploadError.message}`);
          }
          continue;
        }

        updateFileStatus(currentFile.id, "uploading", 30);

        // Store document record in database
        const { data: docData, error: dbError } = await supabase
          .from("documents")
          .insert({
            user_id: user.id,
            file_name: currentFile.name,
            file_path: filePath,
            file_type: currentFile.name.split(".").pop()?.toLowerCase(),
            file_size: currentFile.file.size,
            status: "uploaded",
          })
          .select("id")
          .single();

        if (dbError || !docData) {
          console.error("Database insert error:", dbError);
          updateFileStatus(currentFile.id, "failed", 0);
          if (dbError?.message?.includes("relation") && dbError?.message?.includes("does not exist")) {
            setErrorMessage("Table 'documents' not found. Please run the SQL migration in Supabase Dashboard → SQL Editor.");
          } else {
            setErrorMessage(`Database error: ${dbError?.message || "Failed to create record"}`);
          }
          continue;
        }

        // Stage 2-5: Simulate AI processing stages
        // (In production, these hit FastAPI; for now we simulate the experience)
        const stages: FileStatus[] = ["extracting", "analyzing", "graphing", "computing"];
        for (let s = 0; s < stages.length; s++) {
          updateFileStatus(currentFile.id, stages[s], 30 + (s + 1) * 15);
          await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
        }

        // Stage 6: Ready
        updateFileStatus(currentFile.id, "ready", 100);
        successCount++;

        // Update DB status
        await supabase
          .from("documents")
          .update({ status: "ready" })
          .eq("id", docData.id);

      } catch (err) {
        console.error("Processing error:", err);
        updateFileStatus(currentFile.id, "failed", 0);
      }
    }

    // Only mark complete if at least one file succeeded
    if (successCount > 0) {
      setGlobalStatus("complete");
    } else {
      setGlobalStatus("idle");
    }
  };

  const updateFileStatus = (id: string, status: FileStatus, progress: number) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status, progress } : f))
    );
  };

  // ── Drag & Drop Handlers ──
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const allReady = files.length > 0 && files.every((f) => f.status === "ready");

  // ────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 flex flex-col gap-10 min-h-screen">
      {/* Header */}
      <motion.section
        variants={staggerChildren(0.1)}
        initial="initial"
        animate="animate"
        className="relative z-10 flex flex-col items-center text-center gap-4"
      >
        <motion.div variants={fadeUpSpatial} className="flex flex-col gap-2 items-center">
          <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-indigo-400 mr-2" />
            <span className="text-xs font-semibold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase">
              Intelligence Source
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Upload Your <GradientText>Study Material</GradientText>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl mt-2 font-light">
            Drop your documents. The AI will extract concepts, build a knowledge graph, and calculate exam-weighted topic intelligence.
          </p>
        </motion.div>
      </motion.section>

      {/* Error Banner */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="rounded-2xl border border-red-500/20 bg-red-500/10 backdrop-blur-sm p-4 flex items-start gap-3"
          >
            <AlertCircle size={18} className="text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-red-600 dark:text-red-400">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-300 transition-colors shrink-0"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropzone */}
      <motion.div variants={fadeUpSpatial} initial="initial" animate="animate">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "glass-panel rounded-3xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 relative overflow-hidden group",
            isDragging && "border-indigo-500/50 bg-indigo-500/5 scale-[1.01]",
            globalStatus !== "idle" && "pointer-events-none opacity-50"
          )}
          onClick={() => {
            if (globalStatus !== "idle") return;
            const input = document.createElement("input");
            input.type = "file";
            input.multiple = true;
            input.accept = ".pdf,.pptx,.docx";
            input.onchange = (e) => {
              const target = e.target as HTMLInputElement;
              if (target.files) addFiles(target.files);
            };
            input.click();
          }}
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

          <motion.div
            animate={isDragging ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
            className="relative z-10 flex flex-col items-center gap-4"
          >
            <div className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
              isDragging
                ? "bg-indigo-500/20 text-indigo-400 shadow-[0_0_40px_rgba(99,102,241,0.3)]"
                : "bg-black/5 dark:bg-white/5 text-zinc-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:bg-indigo-500/10"
            )}>
              <UploadCloud size={32} />
            </div>
            <div>
              <p className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                {isDragging ? "Release to Upload" : "Drag & Drop Study Material"}
              </p>
              <p className="text-sm text-zinc-500">
                PDF, PPTX, DOCX • Max 4 files • Up to 50 MB each
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {files.length}/{MAX_FILES} slots available
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* File List */}
      <AnimatePresence mode="popLayout">
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {files.map((file) => (
              <motion.div
                key={file.id}
                layout
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-2xl p-5 relative overflow-hidden"
              >
                <div className="flex items-center gap-4 relative z-10">
                  {/* File Icon */}
                  <div className={cn(
                    "p-3 rounded-xl border shrink-0 transition-colors",
                    file.status === "ready"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 dark:text-emerald-400"
                      : file.status === "failed"
                      ? "bg-red-500/10 border-red-500/20 text-red-500 dark:text-red-400"
                      : "bg-indigo-500/10 border-indigo-500/20 text-indigo-500 dark:text-indigo-400"
                  )}>
                    <FileText size={20} />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate pr-4">
                        {file.name}
                      </h4>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded">
                          {file.type}
                        </span>
                        <span className="text-xs text-zinc-500">{file.size}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                      {file.status === "pending" && (
                        <span className="text-xs text-zinc-400 font-medium">Ready to process</span>
                      )}
                      {file.status === "failed" && (
                        <span className="text-xs text-red-500 dark:text-red-400 font-medium flex items-center gap-1">
                          <AlertCircle size={12} /> Upload failed
                        </span>
                      )}
                      {file.status === "ready" && (
                        <span className="text-xs text-emerald-500 dark:text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 size={12} /> Intelligence extracted
                        </span>
                      )}
                      {!["pending", "ready", "failed"].includes(file.status) && (
                        <span className="text-xs text-indigo-500 dark:text-indigo-400 font-medium flex items-center gap-1">
                          <Loader2 size={12} className="animate-spin" />
                          {processingStages.find((s) => s.key === file.status)?.label || "Processing..."}
                        </span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {!["pending", "ready", "failed"].includes(file.status) && (
                      <div className="h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: `${file.progress}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Remove Button */}
                  {(file.status === "pending" || file.status === "failed") && (
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors shrink-0"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing Pipeline Visualization */}
      {(globalStatus === "processing" || globalStatus === "complete") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-3xl p-8"
        >
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            {globalStatus === "complete" ? (
              <CheckCircle2 size={20} className="text-emerald-500 dark:text-emerald-400" />
            ) : (
              <BrainCircuit size={20} className="text-indigo-500 dark:text-indigo-400 animate-pulse" />
            )}
            {globalStatus === "complete" ? "Processing Complete" : "AI Processing Pipeline"}
          </h3>

          <div className="relative space-y-4">
            {(() => {
              const activeFile = files.find(
                (f) => !["pending", "ready", "failed"].includes(f.status)
              );
              const activeStageIndex = activeFile
                ? processingStages.findIndex((s) => s.key === activeFile.status)
                : -1;

              return processingStages.map((stage, i) => {
                const isComplete = globalStatus === "complete";
                const isActive = !isComplete && i === activeStageIndex;
                const isDone = isComplete || i < activeStageIndex;

                return (
                  <div key={stage.key} className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 shrink-0",
                      isDone
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 dark:text-emerald-400"
                        : isActive
                        ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-500 dark:text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                        : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-zinc-400"
                    )}>
                      {isDone ? (
                        <CheckCircle2 size={18} />
                      ) : isActive ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                          <stage.icon size={18} />
                        </motion.div>
                      ) : (
                        <stage.icon size={18} />
                      )}
                    </div>
                    <span className={cn(
                      "text-sm font-medium transition-colors",
                      isDone
                        ? "text-emerald-600 dark:text-emerald-400"
                        : isActive
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-400"
                    )}>
                      {stage.label}
                    </span>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex-1 flex justify-end"
                      >
                        <Sparkles size={14} className="text-indigo-400" />
                      </motion.div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        variants={fadeUpSpatial}
        initial="initial"
        animate="animate"
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        {globalStatus === "idle" && files.length > 0 && (
          <button
            onClick={startProcessing}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white transition-all duration-300 rounded-2xl bg-indigo-500 hover:bg-indigo-600 hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] shadow-xl"
          >
            <Zap size={18} className="fill-white" />
            <span>Activate AI Processing</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {globalStatus === "complete" && allReady && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => router.push("/test/configure")}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold transition-all duration-300 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] shadow-xl"
          >
            <Target size={18} />
            <span>Configure Test Intelligence</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
