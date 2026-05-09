"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Upload, Sparkles, LineChart, Target } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import { SpatialCard } from "@/components/ui/spatial-card";
import { fadeUpSpatial, staggerChildren } from "@/lib/motion";
import Link from "next/link";
import { AnimatedIcon } from "@/components/ui/animated-icon";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-primary)]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[var(--color-secondary)]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 px-6 py-4 backdrop-blur-xl border-b border-white/[0.05] bg-[#0A0A0E]/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AnimatedIcon icon={BrainCircuit} glowColor="var(--color-secondary)" size={24} />
            <span className="text-xl font-bold tracking-widest uppercase text-white">TopTier</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Initialize
            </Link>
            <Link href="/signup" className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative pt-40 pb-32 z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Cinematic Hero */}
          <motion.section 
            variants={staggerChildren(0.1)} 
            initial="initial" 
            animate="animate"
            className="flex flex-col items-center text-center max-w-4xl mx-auto mb-32"
          >
            <motion.div variants={fadeUpSpatial} className="inline-flex items-center px-3 py-1 mb-8 rounded-full border border-[var(--color-secondary)]/30 bg-[var(--color-secondary)]/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[var(--color-secondary)] mr-2" />
              <span className="text-xs font-semibold tracking-widest text-[var(--color-secondary)] uppercase">The Future of Cognitive Preparation</span>
            </motion.div>
            
            <motion.h1 variants={fadeUpSpatial} className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight mb-8">
              Your Academic <br />
              <GradientText>Intelligence Engine.</GradientText>
            </motion.h1>
            
            <motion.p variants={fadeUpSpatial} className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10 font-light">
              Upload your material. We extract the concepts, predict the exam, and forge an adaptive neural pathway to mastery. Do not just study—dominate.
            </motion.p>
            
            <motion.div variants={fadeUpSpatial}>
              <Link href="/signup" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-[var(--color-background)] transition-all duration-300 rounded-full bg-white hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                <span>Engage System</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.section>

          {/* Workflow Visualization */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">The Neural Workflow</h2>
              <p className="text-zinc-400">A deterministic path from raw data to absolute mastery.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Upload,
                  title: "1. Knowledge Ingestion",
                  desc: "Drop your PDFs. Our AI extracts core concepts and builds a personalized knowledge graph instantly.",
                  glow: "rgba(99, 102, 241, 0.15)" // Indigo
                },
                {
                  icon: Target,
                  title: "2. Exam Prediction",
                  desc: "We cross-reference your material against millions of academic patterns to predict high-probability questions.",
                  glow: "rgba(6, 182, 212, 0.15)" // Cyan
                },
                {
                  icon: LineChart,
                  title: "3. Cognitive Analysis",
                  desc: "Attempt adaptive simulations. We map your cognitive blind spots and orchestrate your revision.",
                  glow: "rgba(217, 70, 239, 0.15)" // Magenta
                }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SpatialCard glowColor={step.glow} className="h-full">
                    <AnimatedIcon icon={step.icon} glowColor={step.glow.replace('0.15', '1')} size={32} className="mb-6" />
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{step.desc}</p>
                  </SpatialCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Bottom CTA Funnel */}
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#121218] p-12 md:p-24 text-center">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/10 to-transparent pointer-events-none" />
            <h2 className="relative z-10 text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to initialize?
            </h2>
            <p className="relative z-10 text-xl text-zinc-400 mb-10 max-w-xl mx-auto">
              Join the elite tier of students leveraging artificial intelligence to manipulate academic outcomes.
            </p>
            <Link href="/signup" className="relative z-10 group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]">
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </section>

        </div>
      </main>
    </div>
  );
}