import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { DEMO_PLAYERS } from "@/data/demo-data";

export default function PlayersPage() {
  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-mono font-bold text-[#F8FAFC]">
              PLAYERS INTELLIGENCE DATABASE
            </h1>
            <Badge variant="blue">{DEMO_PLAYERS.length} MONITORED</Badge>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Individual telemetry: Expected Goals (xG), Expected Assists (xA), and spatial impact ratings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search players..."
            className="px-3 py-1.5 rounded bg-[#0D1322] border border-[#1E2D4A] text-xs font-mono text-[#F8FAFC] placeholder-[#64748B] focus:border-[#3B82F6] focus:outline-none"
          />
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEMO_PLAYERS.map((player) => (
          <div
            key={player.id}
            className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] hover:border-[#2A3C60] transition-all p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#F8FAFC]">{player.name}</h3>
                <div className="text-[11px] font-mono text-[#64748B]">
                  #{player.number} • {player.position} • {player.teamName}
                </div>
              </div>
              <div className="px-2 py-1 rounded bg-[#0D1322] border border-[#3B82F6]/40 text-xs font-mono font-bold text-[#60A5FA]">
                ★ {player.rating.toFixed(2)}
              </div>
            </div>

            {/* Core Stats Grid */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono p-2.5 rounded bg-[#0D1322] border border-[#1E2D4A]/50">
              <div>
                <span className="text-[9px] text-[#64748B]">GOALS</span>
                <div className="text-[#34D399] font-bold mt-0.5">{player.stats.goals}</div>
              </div>
              <div>
                <span className="text-[9px] text-[#64748B]">ASSISTS</span>
                <div className="text-[#60A5FA] font-bold mt-0.5">{player.stats.assists}</div>
              </div>
              <div>
                <span className="text-[9px] text-[#64748B]">xG</span>
                <div className="text-[#F8FAFC] font-semibold mt-0.5">{player.stats.xG}</div>
              </div>
              <div>
                <span className="text-[9px] text-[#64748B]">PASS ACC</span>
                <div className="text-[#CBD5E1] font-semibold mt-0.5">{player.stats.passAccuracy}%</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] pt-1">
              <span>Age: {player.age} ({player.nationality})</span>
              <span>Apps: {player.stats.appearances}</span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
