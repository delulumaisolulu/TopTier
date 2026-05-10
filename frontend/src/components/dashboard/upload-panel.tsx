"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { UploadCloud, FileText, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const files = [
  { name: "OS_Unit4_Notes.pdf", size: "2.4 MB", status: "ready", time: "2m ago" },
  { name: "DBMS_Transactions.pptx", size: "4.1 MB", status: "analyzing", time: "Just now" },
];

export function UploadPanel() {
  return (
    <motion.div variants={fadeUp} className="glass-panel rounded-3xl p-6 relative flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <UploadCloud size={18} className="text-indigo-400" />
          Intelligence Source
        </h3>
        <span className="text-xs font-medium bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md text-zinc-500 dark:text-zinc-400">
          PDF, PPT, DOCX
        </span>
      </div>

      {/* Drag & Drop Zone */}
      <div className="border-2 border-dashed border-black/10 dark:border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer mb-6 group">
        <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
          <UploadCloud size={20} className="text-zinc-500 dark:text-zinc-400 group-hover:text-indigo-500 transition-colors" />
        </div>
        <p className="text-sm font-medium text-zinc-900 dark:text-white mb-1">Upload Study Material</p>
        <p className="text-xs text-zinc-500">Drag & drop to inject into AI pipeline</p>
      </div>

      {/* Processing List */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {files.map((file, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <div className={cn(
              "p-2 rounded-lg",
              file.status === "ready" ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400" : "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400"
            )}>
              <FileText size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-white truncate pr-2">{file.name}</p>
                <span className="text-[10px] text-zinc-500 shrink-0">{file.time}</span>
              </div>
              
              <div className="flex items-center gap-2">
                {file.status === "ready" ? (
                  <>
                    <CheckCircle2 size={12} className="text-emerald-400" />
                    <span className="text-xs text-emerald-400 font-medium">Extracted & Ready</span>
                  </>
                ) : (
                  <>
                    <Loader2 size={12} className="text-indigo-400 animate-spin" />
                    <span className="text-xs text-indigo-400 font-medium flex items-center gap-1">
                      AI Analyzing <Sparkles size={10} className="animate-pulse" />
                    </span>
                  </>
                )}
              </div>
              
              {file.status === "analyzing" && (
                <div className="h-1 w-full bg-black/10 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="h-full bg-indigo-500 rounded-full"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
