import React from "react";

export type StatusType = "CONFIRMED" | "ESTIMATED" | "UNAVAILABLE" | "LIVE" | "UPCOMING" | "FINISHED";

interface StatusChipProps {
  status: StatusType;
  label?: string;
  pulse?: boolean;
  className?: string;
}

export function StatusChip({ status, label, pulse = true, className = "" }: StatusChipProps) {
  let borderClass = "border-[#1E2D4A]";
  let bgClass = "bg-[#121A2D]";
  let textClass = "text-[#CBD5E1]";
  let dotColor = "bg-[#64748B]";
  const displayLabel = label ?? status;

  switch (status) {
    case "LIVE":
      borderClass = "border-[#EF4444]/40";
      bgClass = "bg-[#EF4444]/10";
      textClass = "text-[#F87171]";
      dotColor = "bg-[#EF4444]";
      break;
    case "CONFIRMED":
      borderClass = "border-[#10B981]/40";
      bgClass = "bg-[#10B981]/10";
      textClass = "text-[#34D399]";
      dotColor = "bg-[#10B981]";
      break;
    case "ESTIMATED":
      borderClass = "border-[#F59E0B]/40";
      bgClass = "bg-[#F59E0B]/10";
      textClass = "text-[#F59E0B]";
      dotColor = "bg-[#F59E0B]";
      break;
    case "UPCOMING":
      borderClass = "border-[#3B82F6]/40";
      bgClass = "bg-[#3B82F6]/10";
      textClass = "text-[#60A5FA]";
      dotColor = "bg-[#3B82F6]";
      break;
    case "UNAVAILABLE":
    case "FINISHED":
      borderClass = "border-[#1E2D4A]";
      bgClass = "bg-[#0D1322]";
      textClass = "text-[#64748B]";
      dotColor = "bg-[#64748B]";
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono tracking-wider uppercase border ${borderClass} ${bgClass} ${textClass} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (status === "LIVE" || status === "CONFIRMED") && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`} />
      </span>
      <span>{displayLabel}</span>
    </span>
  );
}
