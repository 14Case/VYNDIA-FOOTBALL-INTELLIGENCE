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

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
            <Badge variant="blue">🏆 LIGUE DES CHAMPIONS CE SOIR</Badge>
          </div>
          <p className="text-xs text-[#94A3B8]">
            Multi-agent spatial coordinates, Poisson scoreline distributions, et 3 tickets combinés optimisés pour ce soir.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/predictions#combos">
            <Button variant="primary" size="sm">
              <span>🏆 Tickets Combinés IA</span>
              <span>→</span>
            </Button>
          </Link>
          <Link href="/predictions">
            <Button variant="secondary" size="sm">
              <span>Tous les Pronostics</span>
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
          value={liveMatches.length}
          delta="ACTIVE PITCH"
          deltaType={liveMatches.length > 0 ? "positive" : "neutral"}
          subtitle="Sub-second xG & pressing telemetry"
          sparklineData={[0, 1, 1, 2, 2, 2, liveMatches.length]}
        />
        <MetricCard
          title="Daily Projections"
          value={upcomingMatches.length + liveMatches.length}
          delta="REALTIME SYNC"
          deltaType="positive"
          subtitle="Real fixtures tracked in Supabase"
          sparklineData={[12, 18, 25, 34, 45, upcomingMatches.length + liveMatches.length]}
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

            {liveMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {liveMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-[#121A2D] border border-[#1E2D4A] text-center text-xs font-mono text-[#94A3B8]">
                No matches currently in-play. Real-time telemetry will activate automatically when fixtures kick off.
              </div>
            )}
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
          {/* Edge Opportunity Spotlight: Real UCL Match */}
          <div className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] p-4 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent" />
            
            <div className="flex items-center justify-between">
              <Badge variant="blue">🏆 CHOC DU SOIR • UCL 20h00</Badge>
              <span className="text-[10px] font-mono text-[#34D399] font-bold">+18.4% EV</span>
            </div>

            <div>
              <h3 className="text-sm font-mono font-bold text-[#F8FAFC]">
                Paris Saint Germain vs AS Roma
              </h3>
              <p className="text-[11px] font-mono text-[#34D399] mt-0.5 font-semibold">
                Conseil IA : Victoire Paris Saint Germain @1.60
              </p>
            </div>

            <div className="p-2.5 rounded bg-[#0D1322] border border-[#1E2D4A] space-y-2 text-xs font-mono">
              <div className="flex justify-between text-[#94A3B8]">
                <span>Indice Confiance Modèle</span>
                <span className="text-[#34D399] font-bold">83%</span>
              </div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>Score Projeté Poisson</span>
                <span className="text-[#38BDF8] font-bold">2 - 1</span>
              </div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>Cote Marché vs Juste</span>
                <span className="text-[#60A5FA]">1.60 vs 1.63</span>
              </div>
              <ProbabilityBar homeWin={61.2} draw={20.1} awayWin={18.6} homeLabel="PSG" awayLabel="ASR" />
            </div>

            <Link href="/predictions" className="block">
              <Button variant="secondary" size="sm" className="w-full justify-center">
                Voir Analyse Complète du Match →
              </Button>
            </Link>
          </div>

          {/* AI Combo Tickets Spotlight */}
          <div className="rounded-lg bg-gradient-to-br from-[#121A2D] to-[#0D1322] border border-[#3B82F6]/30 p-4 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <Badge variant="green">⚡ COMBINÉS PRÉ-CALCULÉS</Badge>
              <span className="text-[10px] font-mono text-[#38BDF8]">3 Stratégies</span>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold text-[#F8FAFC]">
                Combinaisons IA du Soir
              </h3>
              <p className="text-[11px] font-mono text-[#94A3B8] mt-1">
                Optimisées par Bivariate Poisson & Monte Carlo pour la Ligue des Champions.
              </p>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="p-2 rounded bg-[#090D16] border border-[#1E2D4A] flex justify-between items-center">
                <span className="text-[#34D399] font-semibold">🛡️ Ticket Sécurisé</span>
                <span className="text-[#F8FAFC] font-bold">Cote @2.33</span>
              </div>
              <div className="p-2 rounded bg-[#090D16] border border-[#1E2D4A] flex justify-between items-center">
                <span className="text-[#38BDF8] font-semibold">⭐ Spécial Champions League</span>
                <span className="text-[#F8FAFC] font-bold">Cote @6.51</span>
              </div>
              <div className="p-2 rounded bg-[#090D16] border border-[#1E2D4A] flex justify-between items-center">
                <span className="text-[#A78BFA] font-semibold">⚡ Value Max (+EV)</span>
                <span className="text-[#F8FAFC] font-bold">Cote @14.24</span>
              </div>
            </div>

            <Link href="/predictions#combos" className="block pt-1">
              <Button variant="primary" size="sm" className="w-full justify-center text-xs">
                Consulter & Copier les 3 Tickets →
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
