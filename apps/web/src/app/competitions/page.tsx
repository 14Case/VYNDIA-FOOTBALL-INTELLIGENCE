import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DEMO_COMPETITIONS } from "@/data/demo-data";

export default function CompetitionsPage() {
  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-mono font-bold text-[#F8FAFC]">
              COMPETITIONS & LEAGUES
            </h1>
            <Badge variant="blue">{DEMO_COMPETITIONS.length} COVERED</Badge>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Tier-1 global leagues tracked by the Vyndia probabilistic intelligence framework.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <span>Filter Active Season</span>
          </Button>
        </div>
      </div>

      {/* Competitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEMO_COMPETITIONS.map((comp) => (
          <div
            key={comp.id}
            className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] hover:border-[#2A3C60] transition-all p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded bg-[#0D1322] border border-[#1E2D4A] flex items-center justify-center font-mono font-bold text-xs text-[#3B82F6]">
                  {comp.code}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F8FAFC]">{comp.name}</h3>
                  <div className="text-[11px] font-mono text-[#64748B]">{comp.country}</div>
                </div>
              </div>
              <Badge variant="green">TIER {comp.tier}</Badge>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 rounded bg-[#0D1322] border border-[#1E2D4A]/50">
              <div>
                <span className="text-[10px] text-[#64748B]">MATCHES PLAYED</span>
                <div className="text-[#F8FAFC] font-semibold mt-0.5">
                  {comp.matchesPlayed} / {comp.matchesTotal}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-[#64748B]">AVG GOALS/90</span>
                <div className="text-[#34D399] font-semibold mt-0.5">
                  {comp.avgGoalsPerMatch}
                </div>
              </div>
              <div className="mt-2">
                <span className="text-[10px] text-[#64748B]">AVG xG/90</span>
                <div className="text-[#60A5FA] font-semibold mt-0.5">
                  {comp.avgXGPerMatch}
                </div>
              </div>
              <div className="mt-2">
                <span className="text-[10px] text-[#64748B]">ACTIVE TEAMS</span>
                <div className="text-[#CBD5E1] font-semibold mt-0.5">
                  {comp.teamsCount} Teams
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1E2D4A]/60 flex items-center justify-between text-xs font-mono">
              <span className="text-[#64748B]">Status: Active Ingestion</span>
              <Link href="/upcoming" className="text-[#3B82F6] hover:underline font-medium">
                View Fixtures →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
