import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { MatchCard } from "@/components/ui/MatchCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DEMO_COMPETITIONS } from "@/data/demo-data";
import { getUpcomingMatches } from "@/lib/football-data";

export default async function UpcomingMatchesPage() {
  const upcomingMatches = await getUpcomingMatches();

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-mono font-bold text-[#F8FAFC]">
              UPCOMING FIXTURES & VALUE MATRIX
            </h1>
            <Badge variant="blue">{upcomingMatches.length} FIXTURES</Badge>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Pre-match structural projections, Poisson distributions, and bookmaker line discrepancies.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <Button variant="primary" size="sm">All Leagues</Button>
          {DEMO_COMPETITIONS.map((c) => (
            <Button key={c.id} variant="secondary" size="sm">
              {c.code}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid of Upcoming Match Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upcomingMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      {/* Edge Calculation Table */}
      <div className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="violet">QUANTUM ARBITRAGE</Badge>
            <h2 className="text-xs font-mono font-bold text-[#F8FAFC] uppercase">
              Consensus Odds vs Model Probability
            </h2>
          </div>
          <span className="text-[10px] font-mono text-[#64748B]">Updated: Real-time</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#1E2D4A] text-[#64748B] text-[10px] uppercase">
                <th className="py-2 px-3">Fixture</th>
                <th className="py-2 px-3">Competition</th>
                <th className="py-2 px-3 text-center">Model 1X2 Prob</th>
                <th className="py-2 px-3 text-center">Market Odds (1/X/2)</th>
                <th className="py-2 px-3 text-right">Edge Yield</th>
                <th className="py-2 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2D4A]/50">
              {upcomingMatches.map((match) => (
                <tr key={match.id} className="hover:bg-[#162035]/50 transition-colors">
                  <td className="py-3 px-3 font-medium text-[#F8FAFC]">
                    {match.homeTeam.name} vs {match.awayTeam.name}
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant="blue">{match.competitionCode}</Badge>
                  </td>
                  <td className="py-3 px-3 text-center text-[#CBD5E1]">
                    {match.probabilities.homeWin}% / {match.probabilities.draw}% / {match.probabilities.awayWin}%
                  </td>
                  <td className="py-3 px-3 text-center text-[#94A3B8]">
                    {match.odds.home.toFixed(2)} / {match.odds.draw.toFixed(2)} / {match.odds.away.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right text-[#34D399] font-bold">
                    {match.predictionSummary?.edge.split(" on ")[0] || "+3.8% EV"}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link href={`/matches/${match.id}`}>
                      <Button variant="ghost" size="sm">Inspect →</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
