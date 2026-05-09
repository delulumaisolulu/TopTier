import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TopTier | AI Command Center",
  description: "Futuristic AI-powered academic operating system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col text-[var(--color-foreground)] bg-[var(--color-background)] selection:bg-[var(--color-primary)]/30 overflow-x-hidden">
        <AuthProvider>
          <AmbientBackground />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
