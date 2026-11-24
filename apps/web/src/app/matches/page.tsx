import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { MatchCard } from "@/components/ui/MatchCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getMatches } from "@/lib/football-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MatchesIndexPage() {
  const matches = await getMatches();
  const liveCount = matches.filter((m) => m.status === "LIVE").length;
  const upcomingCount = matches.filter((m) => m.status === "UPCOMING").length;
  const finishedCount = matches.filter((m) => m.status === "FINISHED").length;

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-mono font-bold text-[#F8FAFC]">
              MATCH FIXTURES & TELEMETRY ARCHIVE
            </h1>
            <Badge variant="blue">{matches.length} TOTAL MATCHES</Badge>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Complete fixture schedule, live pitch telemetry, and historical results synced with Supabase PostgreSQL.
          </p>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex items-center gap-2">
          <Link href="/live">
            <Button variant="secondary" size="sm">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#EF4444] animate-ping" />
                Live ({liveCount})
              </span>
            </Button>
          </Link>
          <Link href="/upcoming">
            <Button variant="secondary" size="sm">
              <span>Upcoming ({upcomingCount})</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Chips */}
      <div className="flex items-center gap-3 text-xs font-mono text-[#94A3B8]">
        <span className="px-2.5 py-1 rounded bg-[#121A2D] border border-[#1E2D4A]">
          🔴 Live: <strong className="text-[#EF4444]">{liveCount}</strong>
        </span>
        <span className="px-2.5 py-1 rounded bg-[#121A2D] border border-[#1E2D4A]">
          ⏳ Upcoming: <strong className="text-[#38BDF8]">{upcomingCount}</strong>
        </span>
        <span className="px-2.5 py-1 rounded bg-[#121A2D] border border-[#1E2D4A]">
          ✅ Finished: <strong className="text-[#34D399]">{finishedCount}</strong>
        </span>
      </div>

      {/* Grid of All Matches */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </AppShell>
  );
}
