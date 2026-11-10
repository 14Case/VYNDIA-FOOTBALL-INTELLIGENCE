import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  let variantClass = "bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] shadow-sm";
  if (variant === "secondary") {
    variantClass =
      "bg-[#1E2D4A]/50 hover:bg-[#162035] text-[#CBD5E1] border border-[#1E2D4A] hover:border-[#2A3C60]";
  } else if (variant === "destructive") {
    variantClass =
      "bg-[#EF4444]/10 hover:bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/40";
  } else if (variant === "ghost") {
    variantClass = "bg-transparent hover:bg-[#1E2D4A]/40 text-[#94A3B8] hover:text-[#F8FAFC]";
  }

  let sizeClass = "h-8 px-3 text-xs";
  if (size === "sm") {
    sizeClass = "h-7 px-2 text-[11px]";
  } else if (size === "lg") {
    sizeClass = "h-10 px-4 text-sm font-medium";
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded font-mono font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
