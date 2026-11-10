import React from "react";
import Link from "next/link";
import { Match } from "@/data/demo-data";
import { StatusChip } from "./StatusChip";
import { ProbabilityBar } from "./ProbabilityBar";
import { Badge } from "./Badge";

interface MatchCardProps {
  match: Match;
  className?: string;
}

export function MatchCard({ match, className = "" }: MatchCardProps) {
  const isLive = match.status === "LIVE";

  return (
    <div
      className={`relative group rounded-lg bg-[#121A2D] border border-[#1E2D4A] hover:border-[#2A3C60] transition-all p-3.5 flex flex-col justify-between ${className}`}
    >
      {/* Top Header: Competition & Status */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Badge variant="blue">{match.competition}</Badge>
          <span className="text-[11px] font-mono text-[#64748B]">MD {match.matchday}</span>
        </div>
        <div>
          {isLive ? (
            <StatusChip status="LIVE" label={`${match.minute}'`} />
          ) : (
            <StatusChip
              status="UPCOMING"
              label={new Date(match.scheduledAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          )}
        </div>
      </div>

      {/* Main Scoreboard / Teams */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 my-2">
        {/* Home Team */}
        <div className="flex flex-col items-start truncate">
          <span className="text-sm font-semibold text-[#F8FAFC] truncate">
            {match.homeTeam.name}
          </span>
          <span className="text-[10px] font-mono text-[#64748B]">
            xG: {match.telemetry.homeXG.toFixed(2)}
          </span>
        </div>

        {/* Score or VS */}
        <div className="px-3 py-1 rounded bg-[#0D1322] border border-[#1E2D4A] text-center min-w-[64px]">
          {isLive ? (
            <div className="text-base font-mono font-bold text-[#F8FAFC] tracking-wider">
              {match.homeTeam.score} - {match.awayTeam.score}
            </div>
          ) : (
            <div className="text-xs font-mono font-medium text-[#94A3B8]">VS</div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-end truncate">
          <span className="text-sm font-semibold text-[#F8FAFC] truncate text-right">
            {match.awayTeam.name}
          </span>
          <span className="text-[10px] font-mono text-[#64748B]">
            xG: {match.telemetry.awayXG.toFixed(2)}
          </span>
        </div>
      </div>

      {/* 1X2 Probabilities Bar */}
      <div className="my-2.5">
        <ProbabilityBar
          homeWin={match.probabilities.homeWin}
          draw={match.probabilities.draw}
          awayWin={match.probabilities.awayWin}
          homeLabel={match.homeTeam.code}
          awayLabel={match.awayTeam.code}
        />
      </div>

      {/* Footer / Telemetry Bar & Action */}
      <div className="pt-2 border-t border-[#1E2D4A]/60 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
        <div className="flex items-center gap-3">
          <span>Poss: {match.telemetry.possessionHome}% / {match.telemetry.possessionAway}%</span>
          <span className="hidden sm:inline">Att: {match.telemetry.dangerousAttacksHome} / {match.telemetry.dangerousAttacksAway}</span>
        </div>

        <Link
          href={`/matches/${match.id}`}
          className="text-[#3B82F6] hover:text-[#60A5FA] font-medium flex items-center gap-1 transition-colors"
        >
          <span>Deep Telemetry</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
