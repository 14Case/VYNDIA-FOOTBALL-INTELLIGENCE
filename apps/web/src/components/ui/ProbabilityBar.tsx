import React from "react";

interface ProbabilityBarProps {
  homeWin: number;
  draw: number;
  awayWin: number;
  homeLabel?: string;
  awayLabel?: string;
  showLabels?: boolean;
  className?: string;
}

export function ProbabilityBar({
  homeWin,
  draw,
  awayWin,
  homeLabel = "1",
  awayLabel = "2",
  showLabels = true,
  className = "",
}: ProbabilityBarProps) {
  // Normalize if sum is slightly off 100
  const total = homeWin + draw + awayWin || 100;
  const h = ((homeWin / total) * 100).toFixed(1);
  const d = ((draw / total) * 100).toFixed(1);
  const a = ((awayWin / total) * 100).toFixed(1);

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {showLabels && (
        <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
          <span className="text-[#60A5FA] flex items-center gap-1 font-semibold">
            <span>{homeLabel}</span>
            <span>{h}%</span>
          </span>
          <span className="text-[#F59E0B] flex items-center gap-1">
            <span>X</span>
            <span>{d}%</span>
          </span>
          <span className="text-[#F87171] flex items-center gap-1 font-semibold">
            <span>{awayLabel}</span>
            <span>{a}%</span>
          </span>
        </div>
      )}

      {/* Segmented multi-color continuous bar */}
      <div className="h-2 w-full bg-[#0D1322] rounded-full overflow-hidden flex border border-[#1E2D4A]">
        <div
          style={{ width: `${h}%` }}
          className="h-full bg-gradient-to-r from-[#2563EB] to-[#60A5FA] transition-all duration-500"
          title={`Home Win: ${h}%`}
        />
        <div
          style={{ width: `${d}%` }}
          className="h-full bg-[#F59E0B] transition-all duration-500"
          title={`Draw: ${d}%`}
        />
        <div
          style={{ width: `${a}%` }}
          className="h-full bg-gradient-to-r from-[#EF4444] to-[#F87171] transition-all duration-500"
          title={`Away Win: ${a}%`}
        />
      </div>
    </div>
  );
}
