"use client";

import { useAuth } from "@/lib/auth-context";
import { BrainCircuit, LogOut, Moon, Sun } from "lucide-react";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const { signOut } = useAuth();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial theme from html tag
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <nav className="sticky top-0 inset-x-0 z-50 px-6 py-4 backdrop-blur-xl border-b border-zinc-200 dark:border-white/[0.05] bg-white/80 dark:bg-[#0A0A0E]/50 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/dashboard" className="flex items-center space-x-3">
          <AnimatedIcon icon={BrainCircuit} glowColor="var(--color-primary)" size={24} />
          <span className="text-xl font-bold tracking-widest uppercase text-zinc-900 dark:text-white transition-colors">TopTier</span>
        </Link>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
            title="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg transition-all"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">End Session</span>
          </button>
        </div>

      </div>
    </nav>
  );
}
