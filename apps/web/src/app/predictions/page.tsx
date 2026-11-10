import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ProbabilityBar } from "@/components/ui/ProbabilityBar";
import { StatusChip } from "@/components/ui/StatusChip";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { DEMO_SYSTEM_METRICS } from "@/data/demo-data";
import { getPredictionsData, EnrichedPrediction } from "@/lib/football-data";
import { MatchSimulator } from "@/components/prediction/MatchSimulator";

export default async function PredictionsPage() {
  const predictions: EnrichedPrediction[] = await getPredictionsData();

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="violet">QUANTUM NEURAL ENGINE</Badge>
            <h1 className="text-lg font-mono font-bold text-[#F8FAFC]">
              AI PREDICTION & PROBABILITY CENTER
            </h1>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Probabilistic forecasting matrix: Bivariate Poisson scorelines, spatial vector regression, and market EV discovery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <span>Filter High Confidence (&gt;80%)</span>
          </Button>
          <Button variant="primary" size="sm">
            <span>Export Forecasts</span>
          </Button>
        </div>
      </div>

      {/* Model Performance Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          title="Global Model Accuracy"
          value={`${DEMO_SYSTEM_METRICS.historicalModelAccuracy}%`}
          delta="+2.4% vs Baseline"
          deltaType="positive"
          subtitle="Tested across 1,850 matches"
          sparklineData={[72, 74, 75, 76, 77, 78.6]}
        />
        <MetricCard
          title="Average Expected Value"
          value={DEMO_SYSTEM_METRICS.averageEdgeYield}
          delta="LONG TERM EDGE"
          deltaType="positive"
          subtitle="Consensus sharp closing lines"
          sparklineData={[3.2, 3.8, 4.1, 4.4, 4.8]}
        />
        <MetricCard
          title="Active Predictions"
          value={predictions.length}
          delta="VERIFIED"
          deltaType="neutral"
          subtitle="Tier-1 European fixtures"
          sparklineData={[2, 3, 4, 5, predictions.length]}
        />
        <MetricCard
          title="Inference Latency"
          value={DEMO_SYSTEM_METRICS.databaseLatency}
          delta="OPTIMAL"
          deltaType="positive"
          subtitle="FastAPI async pipeline"
          sparklineData={[28, 24, 22, 19, 18]}
        />
      </div>

      {/* Interactive Match Simulator Component */}
      <MatchSimulator />

      {/* Predictions Deep Table */}
      <div className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-mono font-bold text-[#F8FAFC] uppercase tracking-wider">
              Active Fixture Projections & Market Arbitrage
            </h2>
            <Badge variant="blue">{predictions.length} MATCHES COMPUTED</Badge>
          </div>
          <span className="text-[11px] font-mono text-[#64748B]">Supabase Live Sync</span>
        </div>

        <div className="space-y-3">
          {predictions.map((pred) => (
            <div
              key={pred.id}
              className="p-3.5 rounded bg-[#0D1322] border border-[#1E2D4A] hover:border-[#2A3C60] transition-all grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
            >
              {/* Fixture & Competition */}
              <div className="lg:col-span-4 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="blue">{pred.competitionCode}</Badge>
                  <StatusChip
                    status={pred.status === "LIVE" ? "LIVE" : "UPCOMING"}
                    label={pred.status === "LIVE" ? "LIVE" : "UPCOMING"}
                  />
                  <span className="text-[10px] font-mono text-[#64748B]">{pred.modelName}</span>
                </div>
                <div className="text-sm font-semibold text-[#F8FAFC]">
                  {pred.homeTeam.name} vs {pred.awayTeam.name}
                </div>
                <div className="text-[10px] font-mono text-[#64748B] flex items-center gap-2">
                  <span>{pred.venue}</span>
                  <span>•</span>
                  <span>
                    Fair Odds:{" "}
                    <span className="text-[#38BDF8]">{pred.fairOdds.home.toFixed(2)}</span> /{" "}
                    <span className="text-[#94A3B8]">{pred.fairOdds.draw.toFixed(2)}</span> /{" "}
                    <span className="text-[#F43F5E]">{pred.fairOdds.away.toFixed(2)}</span>
                  </span>
                </div>
              </div>

              {/* 1X2 Probabilities Bar */}
              <div className="lg:col-span-4">
                <div className="text-[10px] font-mono text-[#94A3B8] mb-1 flex justify-between">
                  <span>PROBABILITY VECTOR</span>
                  <span className="text-[#34D399]">Confidence: {pred.probabilities.confidence}%</span>
                </div>
                <ProbabilityBar
                  homeWin={pred.probabilities.homeWin}
                  draw={pred.probabilities.draw}
                  awayWin={pred.probabilities.awayWin}
                  homeLabel={pred.homeTeam.code}
                  awayLabel={pred.awayTeam.code}
                />
              </div>

              {/* Edge & Expected Value */}
              <div className="lg:col-span-3 text-xs font-mono space-y-1">
                <div className="text-[10px] text-[#64748B] uppercase flex items-center justify-between">
                  <span>EDGE DISCOVERY</span>
                  {pred.marketOdds && (
                    <span className="text-[#38BDF8]">{pred.marketOdds.source} @{pred.marketOdds.home.toFixed(2)}</span>
                  )}
                </div>
                <div className="text-[#34D399] font-bold text-xs">
                  {pred.edge?.text ?? "+3.5% EV on Home Win"}
                </div>
                <div className="text-[10px] text-[#CBD5E1] truncate">
                  {pred.edge?.verdict ?? "Statistical divergence detected"}
                </div>
              </div>

              {/* Action Button */}
              <div className="lg:col-span-1 flex lg:justify-end">
                <Link href={`/matches/${pred.fixtureId}`}>
                  <Button variant="secondary" size="sm">
                    Inspect
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
