import React from "react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#1E2D4A] bg-[#090D16] px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-[#64748B] select-none">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-[#34D399]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span>TERMINAL ONLINE</span>
        </span>
        <span className="text-[#1E2D4A]">|</span>
        <span className="tracking-widest uppercase font-semibold text-[#94A3B8]">
          DEMO DATA // PROBABILISTIC MODEL - NOT BETTING ADVICE
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span>ENGINE: v4.2-NEURAL-HYBRID</span>
        <span className="text-[#1E2D4A]">|</span>
        <span>LATENCY: 18ms</span>
        <span className="text-[#1E2D4A]">|</span>
        <span className="text-[#94A3B8]">VYNDIA © 2026</span>
      </div>
    </footer>
  );
}
