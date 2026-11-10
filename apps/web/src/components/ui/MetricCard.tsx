import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  delta?: string;
  deltaType?: "positive" | "negative" | "neutral";
  subtitle?: string;
  sparklineData?: number[];
  className?: string;
}

export function MetricCard({
  title,
  value,
  delta,
  deltaType = "positive",
  subtitle,
  sparklineData = [12, 19, 14, 25, 22, 30, 28, 35],
  className = "",
}: MetricCardProps) {
  let deltaColor = "text-[#34D399] bg-[#10B981]/10 border-[#10B981]/30";
  if (deltaType === "negative") {
    deltaColor = "text-[#F87171] bg-[#EF4444]/10 border-[#EF4444]/30";
  } else if (deltaType === "neutral") {
    deltaColor = "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30";
  }

  // Generate SVG path points for micro-sparkline
  const minVal = Math.min(...sparklineData);
  const maxVal = Math.max(...sparklineData) || 1;
  const height = 24;
  const width = 100;
  const points = sparklineData
    .map((v, i) => {
      const x = (i / (sparklineData.length - 1)) * width;
      const y = height - ((v - minVal) / (maxVal - minVal || 1)) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const strokeColor = deltaType === "negative" ? "#EF4444" : "#3B82F6";
  const gradientId = `sparkline-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-[#121A2D] border border-[#1E2D4A] hover:border-[#2A3C60] transition-all p-3 flex flex-col justify-between ${className}`}
    >
      {/* Subtle top edge gradient highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent" />

      {/* Header with Title and Delta */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-mono tracking-wider text-[#94A3B8] uppercase">
          {title}
        </span>
        {delta && (
          <span
            className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${deltaColor}`}
          >
            {delta}
          </span>
        )}
      </div>

      {/* Value */}
      <div className="flex items-baseline justify-between mt-1">
        <div className="text-2xl font-mono font-semibold tracking-tight text-[#F8FAFC]">
          {value}
        </div>

        {/* Micro sparkline */}
        <div className="w-[100px] h-[24px]">
          <svg viewBox="0 0 100 24" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
                <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <polygon
              points={`0,${height} ${points} ${width},${height}`}
              fill={`url(#${gradientId})`}
            />
            <polyline
              points={points}
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {subtitle && (
        <span className="text-[10px] font-mono text-[#64748B] mt-1.5">
          {subtitle}
        </span>
      )}
    </div>
  );
}
