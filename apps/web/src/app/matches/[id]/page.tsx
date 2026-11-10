import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { StatusChip } from "@/components/ui/StatusChip";
import { ProbabilityBar } from "@/components/ui/ProbabilityBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DEMO_MATCHES } from "@/data/demo-data";
import { getMatchById } from "@/lib/football-data";

interface MatchAnalysisPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return DEMO_MATCHES.map((match) => ({
    id: match.id,
  }));
}

export default async function MatchAnalysisPage({ params }: MatchAnalysisPageProps) {
  const { id } = await params;
  const match = (await getMatchById(id)) || DEMO_MATCHES[0];
  const isLive = match.status === "LIVE";

  return (
    <AppShell>
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2D4A]">
        <div className="flex items-center gap-3">
          <Link href="/live">
            <Button variant="ghost" size="sm">
              ← Back
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="blue">{match.competition}</Badge>
              <span className="text-xs font-mono text-[#64748B]">MATCH ID // {match.id}</span>
              <StatusChip
                status={match.status}
                label={isLive ? `LIVE ${match.minute}'` : "UPCOMING"}
              />
            </div>
            <h1 className="text-lg font-mono font-bold text-[#F8FAFC] mt-0.5">
              {match.homeTeam.name} vs {match.awayTeam.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#64748B]">{match.venue}</span>
        </div>
      </div>

      {/* Main Scoreboard Telemetry Box */}
      <div className="p-6 rounded-lg bg-[#121A2D] border border-[#1E2D4A] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/60 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-center">
          {/* Home */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#F8FAFC]">{match.homeTeam.name}</h2>
            <div className="text-sm font-mono text-[#60A5FA]">
              Rolling xG: {match.telemetry.homeXG.toFixed(2)}
            </div>
            <div className="text-xs font-mono text-[#94A3B8]">
              Possession: {match.telemetry.possessionHome}%
            </div>
          </div>

          {/* Center Score */}
          <div className="flex flex-col items-center justify-center p-4 rounded bg-[#0D1322] border border-[#1E2D4A]">
            {isLive ? (
              <>
                <div className="text-4xl font-mono font-extrabold text-[#F8FAFC] tracking-widest">
                  {match.homeTeam.score} - {match.awayTeam.score}
                </div>
                <div className="text-xs font-mono text-[#F87171] mt-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#EF4444] animate-ping" />
                  <span>MINUTE {match.minute}&apos;</span>
                </div>
              </>
            ) : (
              <>
                <div className="text-2xl font-mono font-bold text-[#CBD5E1]">VS</div>
                <div className="text-xs font-mono text-[#64748B] mt-1">
                  {new Date(match.scheduledAt).toLocaleString()}
                </div>
              </>
            )}
          </div>

          {/* Away */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#F8FAFC]">{match.awayTeam.name}</h2>
            <div className="text-sm font-mono text-[#F87171]">
              Rolling xG: {match.telemetry.awayXG.toFixed(2)}
            </div>
            <div className="text-xs font-mono text-[#94A3B8]">
              Possession: {match.telemetry.possessionAway}%
            </div>
          </div>
        </div>

        {/* Continuous 1X2 Probabilities */}
        <div className="mt-6 pt-4 border-t border-[#1E2D4A]/70">
          <div className="flex justify-between text-xs font-mono text-[#94A3B8] mb-2">
            <span>BAYESIAN IN-PLAY PROBABILITY DISTRIBUTION</span>
            <span className="text-[#34D399]">Algorithm Confidence: {match.probabilities.confidence}%</span>
          </div>
          <ProbabilityBar
            homeWin={match.probabilities.homeWin}
            draw={match.probabilities.draw}
            awayWin={match.probabilities.awayWin}
            homeLabel={match.homeTeam.code}
            awayLabel={match.awayTeam.code}
          />
        </div>
      </div>

      {/* Tactical Pitch Surface & Deep Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Synthetic Tactical Pitch */}
        <div className="lg:col-span-2 rounded-lg bg-[#121A2D] border border-[#1E2D4A] p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="green">SPATIAL MATRIX</Badge>
              <h2 className="text-xs font-mono font-bold text-[#F8FAFC] uppercase">
                Pitch Control & Threat Concentration
              </h2>
            </div>
            <span className="text-[11px] font-mono text-[#64748B]">Resolution: 10m Cells</span>
          </div>

          {/* Stylized Synthetic Football Pitch Visualizer */}
          <div className="w-full aspect-[16/9] rounded bg-[#051424] border border-[#1E2D4A] relative overflow-hidden flex items-center justify-center p-6">
            {/* Field Lines */}
            <div className="w-full h-full border-2 border-[#1E2D4A]/80 rounded relative flex items-center justify-center">
              {/* Center Line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#1E2D4A]/80" />
              {/* Center Circle */}
              <div className="w-24 h-24 rounded-full border border-[#1E2D4A]/80 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              </div>
              {/* Left Penalty Box */}
              <div className="absolute left-0 top-1/4 bottom-1/4 w-28 border-r border-t border-b border-[#1E2D4A]/80" />
              {/* Right Penalty Box */}
              <div className="absolute right-0 top-1/4 bottom-1/4 w-28 border-l border-t border-b border-[#1E2D4A]/80" />

              {/* Spatial Heat Nodes (Synthetic Pitch Telemetry) */}
              <div className="absolute left-[35%] top-[40%] w-16 h-16 rounded-full bg-[#3B82F6]/20 blur-md pointer-events-none" />
              <div className="absolute right-[30%] top-[30%] w-20 h-20 rounded-full bg-[#EF4444]/20 blur-md pointer-events-none" />
              <div className="absolute left-[65%] top-[55%] w-14 h-14 rounded-full bg-[#8B5CF6]/25 blur-md pointer-events-none" />

              {/* Pitch Telemetry Overlay Markers */}
              <div className="absolute left-6 bottom-4 text-[10px] font-mono text-[#60A5FA] bg-[#090D16]/80 px-2 py-0.5 rounded border border-[#1E2D4A]">
                {match.homeTeam.code} PRESS LINE: HIGH (44m)
              </div>
              <div className="absolute right-6 bottom-4 text-[10px] font-mono text-[#F87171] bg-[#090D16]/80 px-2 py-0.5 rounded border border-[#1E2D4A]">
                {match.awayTeam.code} COUNTER VECTOR: 18.4 m/s
              </div>
            </div>
          </div>

          {/* Telemetry Detail Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
            <div className="p-3 rounded bg-[#0D1322] border border-[#1E2D4A]">
              <div className="text-[10px] text-[#64748B]">DANGEROUS ATTACKS</div>
              <div className="text-sm font-bold text-[#F8FAFC] mt-1">
                {match.telemetry.dangerousAttacksHome} - {match.telemetry.dangerousAttacksAway}
              </div>
            </div>
            <div className="p-3 rounded bg-[#0D1322] border border-[#1E2D4A]">
              <div className="text-[10px] text-[#64748B]">SHOTS ON TARGET</div>
              <div className="text-sm font-bold text-[#F8FAFC] mt-1">
                {match.telemetry.shotsOnTargetHome} - {match.telemetry.shotsOnTargetAway}
              </div>
            </div>
            <div className="p-3 rounded bg-[#0D1322] border border-[#1E2D4A]">
              <div className="text-[10px] text-[#64748B]">CORNER KICKS</div>
              <div className="text-sm font-bold text-[#F8FAFC] mt-1">
                {match.telemetry.cornersHome} - {match.telemetry.cornersAway}
              </div>
            </div>
            <div className="p-3 rounded bg-[#0D1322] border border-[#1E2D4A]">
              <div className="text-[10px] text-[#64748B]">CONSENSUS ODDS</div>
              <div className="text-sm font-bold text-[#60A5FA] mt-1">
                {match.odds.home.toFixed(2)} | {match.odds.draw.toFixed(2)} | {match.odds.away.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: AI Inference Verdict & Feature Weights */}
        <div className="space-y-4">
          <div className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="violet">MODEL REASONING</Badge>
              <span className="text-[10px] font-mono text-[#34D399]">SHAP EXPLAINABILITY</span>
            </div>

            <h3 className="text-sm font-mono font-bold text-[#F8FAFC]">
              {match.predictionSummary?.model || "v4.2-NEURAL-HYBRID"}
            </h3>

            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              {match.predictionSummary?.verdict || "High defensive block efficiency; sustained spatial dominance in zone 14."}
            </p>

            <div className="p-2.5 rounded bg-[#0D1322] border border-[#1E2D4A] space-y-1.5 text-xs font-mono">
              <div className="text-[10px] text-[#64748B] uppercase">Dominant Feature Vectors:</div>
              <div className="flex justify-between text-[#CBD5E1]">
                <span>1. High Turnovers Forced</span>
                <span className="text-[#34D399] font-semibold">+0.48 xG</span>
              </div>
              <div className="flex justify-between text-[#CBD5E1]">
                <span>2. Box Penetration Delta</span>
                <span className="text-[#34D399] font-semibold">+0.32 xG</span>
              </div>
              <div className="flex justify-between text-[#CBD5E1]">
                <span>3. Rest Defense Shape</span>
                <span className="text-[#60A5FA] font-semibold">-0.14 xGA</span>
              </div>
            </div>
          </div>

          {/* Market Discrepancy Card */}
          <div className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#F8FAFC]">EXPECTED VALUE SCAN</span>
              <span className="text-xs font-mono text-[#34D399] font-bold">
                {match.predictionSummary?.edge.split(" on ")[0] || "+4.2% EV"}
              </span>
            </div>
            <p className="text-xs text-[#94A3B8]">
              {match.predictionSummary?.edge || "Calculated model price offers positive expected value versus sharp books."}
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
