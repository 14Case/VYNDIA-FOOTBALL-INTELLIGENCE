import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { MatchCard } from "@/components/ui/MatchCard";
import { ProbabilityBar } from "@/components/ui/ProbabilityBar";
import { StatusChip } from "@/components/ui/StatusChip";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  DEMO_AGENTS,
  DEMO_SYSTEM_METRICS,
} from "@/data/demo-data";
import { getLiveMatches, getUpcomingMatches } from "@/lib/football-data";

export default async function OverviewDashboard() {
  const liveMatches = await getLiveMatches();
  const upcomingMatches = await getUpcomingMatches();

  return (
    <AppShell>
      {/* Top Banner / System Telemetry Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-[#121A2D] border border-[#1E2D4A] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono font-bold text-[#F8FAFC]">
              NEURAL INFERENCE ENGINE
            </span>
            <StatusChip status="CONFIRMED" label="REALTIME SYNC" />
          </div>
          <p className="text-xs text-[#94A3B8]">
            Multi-agent spatial coordinates, Poisson scoreline distributions, and sharp market discrepancies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/predictions">
            <Button variant="primary" size="sm">
              <span>View Predictions</span>
              <span>→</span>
            </Button>
          </Link>
          <Link href="/live">
            <Button variant="secondary" size="sm">
              <span>Live Pitch Feed ({liveMatches.length})</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          title="Active AI Models"
          value={DEMO_SYSTEM_METRICS.activeModels}
          delta="100% ONLINE"
          deltaType="positive"
          subtitle="4 neural & probabilistic engines"
          sparklineData={[4, 4, 4, 4, 4, 4, 4, 4]}
        />
        <MetricCard
          title="Live Matches Monitored"
          value={DEMO_SYSTEM_METRICS.liveMatchesTracked}
          delta="ACTIVE PITCH"
          deltaType="neutral"
          subtitle="Sub-second xG & pressing telemetry"
          sparklineData={[0, 1, 1, 2, 2, 2, 3, 2]}
        />
        <MetricCard
          title="Daily Predictions"
          value={DEMO_SYSTEM_METRICS.predictionsCalculatedToday}
          delta="+18 vs Yesterday"
          deltaType="positive"
          subtitle="Tier-1 European competitions"
          sparklineData={[120, 140, 155, 162, 170, 184]}
        />
        <MetricCard
          title="Model Edge Yield"
          value={DEMO_SYSTEM_METRICS.averageEdgeYield}
          delta="78.6% ACCURACY"
          deltaType="positive"
          subtitle="Statistical outperformance benchmark"
          sparklineData={[68, 71, 74, 72, 76, 78.6]}
        />
      </div>

      {/* Main Grid: Live Matches & Predictions Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Matches & Upcoming */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Matches Section */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#EF4444] animate-ping" />
                <h2 className="text-sm font-mono font-semibold tracking-wider text-[#F8FAFC] uppercase">
                  Live Match Telemetry
                </h2>
                <Badge variant="red">{liveMatches.length} Matches</Badge>
              </div>
              <Link href="/live" className="text-xs font-mono text-[#3B82F6] hover:underline">
                All Live ({liveMatches.length}) →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {liveMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>

          {/* Upcoming High-Value Fixtures */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-mono font-semibold tracking-wider text-[#F8FAFC] uppercase">
                  Upcoming High-Confidence Fixtures
                </h2>
                <Badge variant="blue">Next 48h</Badge>
              </div>
              <Link href="/upcoming" className="text-xs font-mono text-[#3B82F6] hover:underline">
                View Schedule →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        </div>

        {/* Right Col: AI Agent Insights & High EV Edge */}
        <div className="space-y-6">
          {/* Edge Opportunity Spotlight */}
          <div className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] p-4 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent" />
            
            <div className="flex items-center justify-between">
              <Badge variant="violet">Top Model Edge</Badge>
              <span className="text-[10px] font-mono text-[#34D399]">+5.1% EV</span>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold text-[#F8FAFC]">
                Bayern München vs Liverpool
              </h3>
              <p className="text-[11px] font-mono text-[#94A3B8] mt-1">
                Both Teams To Score (Yes)
              </p>
            </div>

            <div className="p-2.5 rounded bg-[#0D1322] border border-[#1E2D4A] space-y-2 text-xs font-mono">
              <div className="flex justify-between text-[#94A3B8]">
                <span>Model Confidence</span>
                <span className="text-[#34D399] font-bold">86.8%</span>
              </div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>Fair Odds vs Market</span>
                <span className="text-[#60A5FA]">1.58 vs 1.72</span>
              </div>
              <ProbabilityBar homeWin={46.5} draw={24.8} awayWin={28.7} homeLabel="BAY" awayLabel="LIV" />
            </div>

            <Link href="/predictions" className="block">
              <Button variant="secondary" size="sm" className="w-full">
                Inspect Mathematical Model →
              </Button>
            </Link>
          </div>

          {/* AI Agents Health Deck */}
          <div className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-semibold tracking-wider text-[#F8FAFC] uppercase">
                Active AI Agents
              </h2>
              <Link href="/agents" className="text-[10px] font-mono text-[#3B82F6] hover:underline">
                Inspect All →
              </Link>
            </div>

            <div className="space-y-2">
              {DEMO_AGENTS.map((agent) => (
                <div
                  key={agent.id}
                  className="p-2.5 rounded bg-[#0D1322] border border-[#1E2D4A] flex items-center justify-between text-xs"
                >
                  <div className="truncate mr-2">
                    <div className="font-mono font-medium text-[#F8FAFC] text-xs truncate">
                      {agent.name}
                    </div>
                    <div className="text-[10px] font-mono text-[#64748B]">
                      {agent.codename}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#34D399]">
                      {agent.accuracy}%
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
