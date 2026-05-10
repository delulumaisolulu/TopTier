"use client";

import { useAuth } from "@/lib/auth-context";
import { 
  BrainCircuit, 
  LogOut, 
  Moon, 
  Sun, 
  MessageSquare, 
  Users, 
  Search, 
  Bell, 
  Sparkles,
  Command,
  User,
  Zap,
  Globe2
} from "lucide-react";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NavIconButton = ({ icon: Icon, badge, pulse, active, onClick, tooltip }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={cn(
          "relative p-2.5 rounded-xl transition-all duration-300",
          "bg-white/5 hover:bg-white/10 dark:bg-[#ffffff05] dark:hover:bg-[#ffffff0f]",
          "border border-white/10 dark:border-white/5",
          "hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]",
          "text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400"
        )}
      >
        <Icon size={18} className="relative z-10" />
        
        {/* Glow effect on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 rounded-xl bg-indigo-500/20 blur-md -z-10"
            />
          )}
        </AnimatePresence>

        {badge && (
          <span className="absolute top-1 right-1 flex h-2 w-2">
            {pulse && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
        )}
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap
              bg-zinc-900/90 dark:bg-black/90 text-white backdrop-blur-md border border-white/10
              shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-50 pointer-events-none"
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      className={cn(
        "relative flex items-center w-full max-w-2xl mx-8",
        "transition-all duration-500 rounded-2xl"
      )}
      animate={{
        scale: isFocused ? 1.02 : 1,
      }}
    >
      {/* Animated Gradient Border */}
      <div className={cn(
        "absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-blue-500/40 opacity-0 blur-md transition-opacity duration-500",
        isFocused && "opacity-100"
      )} />
      
      <div className={cn(
        "relative flex items-center w-full h-12 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden transition-colors",
        isFocused ? "border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-[var(--color-surface-elevated)]" : "bg-[var(--color-surface)] dark:bg-[var(--color-glass-bg)]"
      )}>
        <div className="pl-4 pr-3 flex items-center text-zinc-400">
          <Search size={18} className={cn("transition-colors", isFocused && "text-indigo-500 dark:text-indigo-400")} />
        </div>
        
        <input 
          type="text"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search notes, concepts, tests, friends..."
          className="flex-1 h-full bg-transparent border-none outline-none text-sm font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-500/70"
        />

        <div className="flex items-center gap-2 pr-4">
          {/* AI Pulse */}
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
            <Zap size={14} className={cn("transition-all", isFocused ? "animate-pulse" : "")} />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">AI Core</span>
          </div>
          
          {/* Command Shortcut */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 px-2.5 py-1.5 rounded-lg bg-zinc-200/50 dark:bg-black/40 border border-zinc-300 dark:border-white/10">
            <Command size={12} />
            <span>K</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function Navbar() {
  const { signOut } = useAuth();
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check initial theme from html tag
    setIsDark(document.documentElement.classList.contains("dark"));
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-500",
      scrolled ? "py-3" : "py-5"
    )}>
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-500 backdrop-blur-2xl",
          scrolled ? "border-b shadow-sm" : "border-transparent"
        )}
        style={{
          backgroundColor: scrolled ? "color-mix(in srgb, var(--color-background) 80%, transparent)" : "transparent",
          borderColor: scrolled ? "var(--color-glass-border)" : "transparent"
        }}
      >
        {/* Subtle Neon Edge Glow - bottom line */}
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 flex items-center justify-between h-14">
        
        {/* LEFT SIDE */}
        <div className="flex items-center space-x-6 z-10">
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <div className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border border-indigo-500/20 group-hover:border-indigo-500/40 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] dark:group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300">
              <AnimatedIcon icon={BrainCircuit} glowColor="var(--color-primary)" size={22} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-lg font-extrabold tracking-[0.15em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-white dark:to-zinc-400 group-hover:dark:to-white transition-all">
              TopTier
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-2 border-l border-zinc-200 dark:border-white/10 pl-6">
            <NavIconButton 
              icon={MessageSquare} 
              badge={true} 
              pulse={true} 
              tooltip="P2P Comms" 
            />
            <NavIconButton 
              icon={Users} 
              tooltip="Study Squads" 
            />
            <NavIconButton 
              icon={Globe2} 
              tooltip="Global Network" 
            />
          </div>
        </div>

        {/* CENTER */}
        <div className="hidden lg:flex flex-1 justify-center z-10">
          <SearchBar />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-3 sm:space-x-4 z-10">
          <NavIconButton 
            icon={Bell} 
            badge={true} 
            pulse={false} 
            tooltip="Notifications" 
          />
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 transition-all duration-300 shadow-sm"
          >
            <Sparkles size={16} />
            <span className="text-xs font-bold tracking-wider uppercase">Assistant</span>
          </motion.button>
          
          <div className="h-6 w-px bg-zinc-200 dark:bg-white/10 mx-1 hidden sm:block" />

          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-white/50 hover:bg-zinc-100 dark:bg-white/5 dark:hover:bg-white/10 transition-colors border border-zinc-200 dark:border-white/5 shadow-sm"
            title="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="relative group cursor-pointer hidden sm:block">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center border border-zinc-300 dark:border-white/10 overflow-hidden group-hover:border-zinc-400 dark:group-hover:border-white/20 transition-all shadow-sm">
              <User size={20} className="text-zinc-500 dark:text-zinc-400" />
            </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={signOut}
            className="hidden sm:flex items-center justify-center p-2.5 rounded-xl text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 border border-red-200 dark:border-red-500/20 transition-colors shadow-sm"
            title="End Session"
          >
            <LogOut size={18} />
          </motion.button>
        </div>

      </div>
    </header>
  );
}
