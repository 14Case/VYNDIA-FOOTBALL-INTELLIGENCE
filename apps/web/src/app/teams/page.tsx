import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { DEMO_TEAMS } from "@/data/demo-data";

export default function TeamsPage() {
  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-mono font-bold text-[#F8FAFC]">
              TEAMS & TACTICAL PROFILES
            </h1>
            <Badge variant="blue">{DEMO_TEAMS.length} PROFILED</Badge>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Aggregated rolling expected goals, possession metrics, and recent form curves.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search teams..."
            className="px-3 py-1.5 rounded bg-[#0D1322] border border-[#1E2D4A] text-xs font-mono text-[#F8FAFC] placeholder-[#64748B] focus:border-[#3B82F6] focus:outline-none"
          />
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEMO_TEAMS.map((team) => (
          <div
            key={team.id}
            className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] hover:border-[#2A3C60] transition-all p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded bg-[#0D1322] border border-[#1E2D4A] flex items-center justify-center text-lg">
                  ⚽
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F8FAFC]">{team.name}</h3>
                  <div className="text-[11px] font-mono text-[#64748B]">
                    {team.country} • Est. {team.founded}
                  </div>
                </div>
              </div>
              <Badge variant="blue">{team.code}</Badge>
            </div>

            {/* Recent Form Pills */}
            <div className="flex items-center gap-1.5 py-1">
              <span className="text-[10px] font-mono text-[#64748B] mr-1">FORM:</span>
              {team.form.map((res, i) => (
                <span
                  key={i}
                  className={`h-5 w-5 rounded flex items-center justify-center text-[10px] font-mono font-bold ${
                    res === "W"
                      ? "bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40"
                      : res === "D"
                      ? "bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40"
                      : "bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/40"
                  }`}
                >
                  {res}
                </span>
              ))}
            </div>

            {/* Tactical Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono p-2.5 rounded bg-[#0D1322] border border-[#1E2D4A]/50">
              <div>
                <span className="text-[9px] text-[#64748B]">RECORD</span>
                <div className="text-[#F8FAFC] font-semibold mt-0.5">
                  {team.stats.wins}W-{team.stats.draws}D-{team.stats.losses}L
                </div>
              </div>
              <div>
                <span className="text-[9px] text-[#64748B]">xG / xGA</span>
                <div className="text-[#34D399] font-semibold mt-0.5">
                  {team.stats.xG} / {team.stats.xGA}
                </div>
              </div>
              <div>
                <span className="text-[9px] text-[#64748B]">AVG POSS</span>
                <div className="text-[#60A5FA] font-semibold mt-0.5">
                  {team.stats.possessionAvg}%
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1E2D4A]/60 flex items-center justify-between text-xs font-mono">
              <span className="text-[#64748B]">Goals: +{team.stats.goalsFor - team.stats.goalsAgainst} diff</span>
              <Link href="/live" className="text-[#3B82F6] hover:underline font-medium">
                Live Fixtures →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
