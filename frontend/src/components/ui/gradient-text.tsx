import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function GradientText({ children, className, as: Component = "span" }: GradientTextProps) {
  return (
    <Component
      className={cn(
        "text-gradient-intelligence font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </Component>
  );
}
