import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "violet" | "green" | "amber" | "red" | "neutral";
  className?: string;
}

export function Badge({ children, variant = "neutral", className = "" }: BadgeProps) {
  let colorClass = "bg-[#1E2D4A]/50 text-[#CBD5E1] border-[#1E2D4A]";

  switch (variant) {
    case "blue":
      colorClass = "bg-[#3B82F6]/10 text-[#60A5FA] border-[#3B82F6]/30";
      break;
    case "violet":
      colorClass = "bg-[#8B5CF6]/10 text-[#A78BFA] border-[#8B5CF6]/30";
      break;
    case "green":
      colorClass = "bg-[#10B981]/10 text-[#34D399] border-[#10B981]/30";
      break;
    case "amber":
      colorClass = "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30";
      break;
    case "red":
      colorClass = "bg-[#EF4444]/10 text-[#F87171] border-[#EF4444]/30";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase border ${colorClass} ${className}`}
    >
      {children}
    </span>
  );
}
