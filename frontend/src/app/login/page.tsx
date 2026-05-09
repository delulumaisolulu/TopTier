"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Loader2 } from "lucide-react";
import { SpatialCard } from "@/components/ui/spatial-card";
import { fadeUpSpatial, staggerChildren } from "@/lib/motion";
import Link from "next/link";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { useAuth } from "@/lib/auth-context";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await signIn(email, password);

    if (authError) {
      setError(authError);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[var(--color-background)] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-primary)]/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <motion.div 
        variants={staggerChildren(0.1)} 
        initial="initial" 
        animate="animate"
        className="w-full max-w-md relative z-10"
      >
        <motion.div variants={fadeUpSpatial} className="flex justify-center mb-8">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
            <AnimatedIcon icon={BrainCircuit} glowColor="var(--color-primary)" size={32} />
          </div>
        </motion.div>

        <motion.div variants={fadeUpSpatial} className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Initialize Session</h1>
          <p className="text-zinc-400">Authenticate to access your cognitive dashboard.</p>
        </motion.div>

        <motion.div variants={fadeUpSpatial}>
          <SpatialCard glowColor="rgba(99, 102, 241, 0.15)" interactive={false}>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Email Identity</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full bg-[#0A0A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all disabled:opacity-50"
                  placeholder="student@university.edu"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Security Key</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                  disabled={loading}
                  minLength={6}
                  className="w-full bg-[#0A0A0E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 group relative inline-flex w-full items-center justify-center px-8 py-4 text-sm font-medium text-white transition-all duration-300 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Authenticate</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </SpatialCard>
        </motion.div>

        <motion.div variants={fadeUpSpatial} className="mt-8 text-center">
          <p className="text-sm text-zinc-500">
            Unregistered entity?{" "}
            <Link href="/signup" className="text-white font-medium hover:text-[var(--color-primary)] transition-colors">
              Establish connection
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}