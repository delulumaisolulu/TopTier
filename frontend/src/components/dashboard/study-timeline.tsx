import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { CalendarClock, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const revisionData = [
  { id: 1, topic: "Virtual Memory", time: "Now", urgency: "critical", prob: "89% forgetting prob." },
  { id: 2, topic: "Semaphore Logic", time: "In 4 hrs", urgency: "high", prob: "75% forgetting prob." },
  { id: 3, topic: "B-Trees", time: "Tomorrow", urgency: "low", prob: "Spaced repetition" },
];

export function StudyTimeline() {
  return (
    <motion.div variants={fadeUp} className="glass-panel rounded-3xl p-6 relative flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <CalendarClock size={18} className="text-amber-600 dark:text-amber-400" />
            Adaptive Revision
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Spaced repetition schedule</p>
        </div>
      </div>
      
      <div className="relative border-l-2 border-black/10 dark:border-white/10 ml-3 space-y-6 flex-1 py-2">
        {revisionData.map((item, index) => {
          const isCritical = item.urgency === "critical";
          const isHigh = item.urgency === "high";

          return (
            <div key={item.id} className="relative pl-6 group">
              {/* Node Icon */}
              <div className="absolute -left-[11px] top-1 bg-white dark:bg-[#0A0A0E] rounded-full p-1">
                {isCritical ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-rose-500 blur-sm rounded-full opacity-50" />
                    <AlertCircle className="text-rose-400 relative z-10" size={14} />
                  </motion.div>
                ) : isHigh ? (
                  <Clock className="text-amber-400" size={14} />
                ) : (
                  <CheckCircle2 className="text-zinc-500 group-hover:text-emerald-400 transition-colors" size={14} />
                )}
              </div>

              {/* Content */}
              <div className="flex items-start justify-between bg-black/5 dark:bg-white/5 p-3 rounded-xl border border-black/5 dark:border-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors cursor-pointer">
                <div>
                  <h4 className={cn("font-bold text-sm", isCritical ? "text-rose-600 dark:text-rose-100" : "text-zinc-900 dark:text-white")}>
                    {item.topic}
                  </h4>
                  <span className={cn("text-xs font-medium", isCritical ? "text-rose-500 dark:text-rose-400" : isHigh ? "text-amber-600 dark:text-amber-400" : "text-zinc-500")}>
                    {item.prob}
                  </span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider bg-black/5 dark:bg-black/40 px-2 py-1 rounded text-zinc-500 dark:text-zinc-400">
                  {item.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
