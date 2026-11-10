import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { StatusChip } from "@/components/ui/StatusChip";
import { ProbabilityBar } from "@/components/ui/ProbabilityBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getLiveMatches } from "@/lib/football-data";

export default async function LiveMatchesPage() {
  const liveMatches = await getLiveMatches();

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444] animate-ping" />
            <h1 className="text-lg font-mono font-bold text-[#F8FAFC]">
              LIVE MATCH TELEMETRY
            </h1>
            <StatusChip status="LIVE" label={`${liveMatches.length} ACTIVE`} />
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Real-time pitch telemetry, rolling expected goals (xG), and in-play probabilistic shifts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <span>Refresh Feed</span>
          </Button>
        </div>
      </div>

      {/* Grid of Live Match Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {liveMatches.map((match) => (
          <div
            key={match.id}
            className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] p-4 space-y-4"
          >
            {/* Header info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="blue">{match.competition}</Badge>
                <span className="text-xs font-mono text-[#64748B]">{match.venue}</span>
              </div>
              <StatusChip status="LIVE" label={`${match.minute}' MIN`} />
            </div>

            {/* Scoreboard Big Display */}
            <div className="p-4 rounded bg-[#0D1322] border border-[#1E2D4A] grid grid-cols-3 items-center text-center">
              <div>
                <div className="text-base font-bold text-[#F8FAFC]">{match.homeTeam.name}</div>
                <div className="text-xs font-mono text-[#34D399]">xG {match.telemetry.homeXG.toFixed(2)}</div>
              </div>

              <div className="text-3xl font-mono font-extrabold text-[#F8FAFC] tracking-wider">
                {match.homeTeam.score} - {match.awayTeam.score}
              </div>

              <div>
                <div className="text-base font-bold text-[#F8FAFC]">{match.awayTeam.name}</div>
                <div className="text-xs font-mono text-[#34D399]">xG {match.telemetry.awayXG.toFixed(2)}</div>
              </div>
            </div>

            {/* 1X2 Real-time Probabilities */}
            <div>
              <div className="text-xs font-mono text-[#94A3B8] mb-1.5 flex justify-between">
                <span>IN-PLAY PROBABILITIES</span>
                <span className="text-[#34D399] font-medium">Confidence: {match.probabilities.confidence}%</span>
              </div>
              <ProbabilityBar
                homeWin={match.probabilities.homeWin}
                draw={match.probabilities.draw}
                awayWin={match.probabilities.awayWin}
                homeLabel={match.homeTeam.code}
                awayLabel={match.awayTeam.code}
              />
            </div>

            {/* Detailed Telemetry Grid */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded bg-[#0D1322] border border-[#1E2D4A]/50">
                <div className="text-[10px] text-[#64748B]">POSSESSION</div>
                <div className="text-[#F8FAFC] font-semibold mt-0.5">
                  {match.telemetry.possessionHome}% - {match.telemetry.possessionAway}%
                </div>
              </div>
              <div className="p-2 rounded bg-[#0D1322] border border-[#1E2D4A]/50">
                <div className="text-[10px] text-[#64748B]">DANGEROUS ATTACKS</div>
                <div className="text-[#F8FAFC] font-semibold mt-0.5">
                  {match.telemetry.dangerousAttacksHome} - {match.telemetry.dangerousAttacksAway}
                </div>
              </div>
              <div className="p-2 rounded bg-[#0D1322] border border-[#1E2D4A]/50">
                <div className="text-[10px] text-[#64748B]">SHOTS ON TARGET</div>
                <div className="text-[#F8FAFC] font-semibold mt-0.5">
                  {match.telemetry.shotsOnTargetHome} - {match.telemetry.shotsOnTargetAway}
                </div>
              </div>
            </div>

            {/* Model Insight Box */}
            {match.predictionSummary && (
              <div className="p-3 rounded bg-[#0D1322]/80 border border-[#8B5CF6]/30 text-xs font-mono space-y-1">
                <div className="flex items-center justify-between text-[#A78BFA]">
                  <span>AI VERDICT ({match.predictionSummary.model})</span>
                  <span className="text-[#34D399]">{match.predictionSummary.edge}</span>
                </div>
                <p className="text-[#CBD5E1] text-[11px]">
                  {match.predictionSummary.verdict}
                </p>
              </div>
            )}

            {/* Action */}
            <Link href={`/matches/${match.id}`} className="block">
              <Button variant="primary" size="sm" className="w-full">
                Open Full Tactical Pitch & Deep Telemetry →
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
