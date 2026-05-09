"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

// ──────────────────────────────────────────────
// Context
// ──────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Transform Supabase User → our lean AuthUser shape.
 */
function toAuthUser(user: User): AuthUser {
  return {
    id: user.id,
    email: user.email ?? "",
    name: user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Student",
  };
}

// ──────────────────────────────────────────────
// Provider
// ──────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // 1. Check existing session on mount
    const getInitialSession = async () => {
      const { data: { user: sbUser } } = await supabase.auth.getUser();
      if (sbUser) {
        setUser(toAuthUser(sbUser));
      }
      setIsLoading(false);
    };

    getInitialSession();

    // 2. Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(toAuthUser(session.user));
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // ────────── Sign Up ──────────
  const signUp = async (email: string, password: string, name: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    router.push("/dashboard");
    router.refresh();
    return { error: null };
  };

  // ────────── Sign In ──────────
  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    router.push("/dashboard");
    router.refresh();
    return { error: null };
  };

  // ────────── Sign Out ──────────
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// ──────────────────────────────────────────────
// Hook
// ──────────────────────────────────────────────
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
