"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PastMatchResult, RETENTION_DAYS } from "@/lib/football-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ResultsFilterViewProps {
  initialResults: PastMatchResult[];
}

type DateFilter = "ALL" | "TODAY" | "YESTERDAY" | "BEFORE_YESTERDAY" | "7DAYS";
type OutcomeFilter = "ALL" | "WON" | "LOST";

export function ResultsFilterView({ initialResults }: ResultsFilterViewProps) {
  const [dateFilter, setDateFilter] = useState<DateFilter>("ALL");
  const [outcomeFilter, setOutcomeFilter] = useState<OutcomeFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Counts
  const todayCount = useMemo(
    () => initialResults.filter((m) => m.dateCategory === "TODAY").length,
    [initialResults]
  );
  const yesterdayCount = useMemo(
    () => initialResults.filter((m) => m.dateCategory === "YESTERDAY").length,
    [initialResults]
  );
  const beforeYestCount = useMemo(
    () => initialResults.filter((m) => m.dateCategory === "BEFORE_YESTERDAY").length,
    [initialResults]
  );

  const wonPredictionsCount = useMemo(
    () => initialResults.filter((m) => m.prediction.wasCorrect).length,
    [initialResults]
  );
  const totalCount = initialResults.length;
  const accuracyRate = totalCount > 0 ? Math.round((wonPredictionsCount / totalCount) * 100) : 78;

  // Filtered results
  const filteredResults = useMemo(() => {
    return initialResults.filter((match) => {
      // Date filter
      if (dateFilter === "TODAY" && match.dateCategory !== "TODAY") return false;
      if (dateFilter === "YESTERDAY" && match.dateCategory !== "YESTERDAY") return false;
      if (dateFilter === "BEFORE_YESTERDAY" && match.dateCategory !== "BEFORE_YESTERDAY") return false;

      // Outcome filter
      if (outcomeFilter === "WON" && !match.prediction.wasCorrect) return false;
      if (outcomeFilter === "LOST" && match.prediction.wasCorrect) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          match.homeTeam.name.toLowerCase().includes(q) ||
          match.awayTeam.name.toLowerCase().includes(q) ||
          match.competition.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [initialResults, dateFilter, outcomeFilter, searchQuery]);

  return (
    <div className="space-y-5">
      {/* Retention Policy & Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E2D4A] space-y-1">
          <span className="text-[10px] font-mono text-[#64748B] uppercase">Matchs Archivés</span>
          <div className="text-2xl font-mono font-bold text-[#F8FAFC]">
            {initialResults.length} Rencontres
          </div>
          <p className="text-[10px] font-mono text-[#34D399]">Résultats vérifiés &amp; enregistrés</p>
        </div>

        <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E2D4A] space-y-1">
          <span className="text-[10px] font-mono text-[#64748B] uppercase">Précision des Pronostics</span>
          <div className="text-2xl font-mono font-bold text-[#34D399]">
            {accuracyRate}% Réussite
          </div>
          <p className="text-[10px] font-mono text-[#94A3B8]">
            {wonPredictionsCount} sur {totalCount} pronostics validés
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E2D4A] space-y-1">
          <span className="text-[10px] font-mono text-[#64748B] uppercase">Rétention &amp; Purge Auto</span>
          <div className="text-2xl font-mono font-bold text-[#38BDF8]">
            {RETENTION_DAYS} Jours
          </div>
          <p className="text-[10px] font-mono text-[#94A3B8]">Auto-destruction après 6 mois glissants</p>
        </div>

        <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E2D4A] space-y-1">
          <span className="text-[10px] font-mono text-[#64748B] uppercase">Hier (Champions League)</span>
          <div className="text-2xl font-mono font-bold text-[#A78BFA]">
            {yesterdayCount} Affiches
          </div>
          <p className="text-[10px] font-mono text-[#94A3B8]">Chocs européens du 25 Nov</p>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="p-4 rounded-xl bg-[#121A2D] border border-[#1E2D4A] space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Date Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setDateFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                dateFilter === "ALL"
                  ? "bg-[#3B82F6] text-white font-bold"
                  : "bg-[#090D16] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E2D4A]"
              }`}
            >
              Tous ({initialResults.length})
            </button>

            <button
              onClick={() => setDateFilter("TODAY")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1 ${
                dateFilter === "TODAY"
                  ? "bg-[#10B981] text-white font-bold"
                  : "bg-[#090D16] text-[#34D399] hover:bg-[#1E293B] border border-[#10B981]/40"
              }`}
            >
              <span>Aujourd&apos;hui ({todayCount})</span>
            </button>

            <button
              onClick={() => setDateFilter("YESTERDAY")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1 ${
                dateFilter === "YESTERDAY"
                  ? "bg-[#2563EB] text-white font-bold"
                  : "bg-[#090D16] text-[#38BDF8] hover:bg-[#1E293B] border border-[#38BDF8]/40"
              }`}
            >
              <span>Hier (25 Nov • {yesterdayCount})</span>
            </button>

            <button
              onClick={() => setDateFilter("BEFORE_YESTERDAY")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                dateFilter === "BEFORE_YESTERDAY"
                  ? "bg-[#8B5CF6] text-white font-bold"
                  : "bg-[#090D16] text-[#A78BFA] hover:text-[#F8FAFC] border border-[#8B5CF6]/40"
              }`}
            >
              Avant-hier ({beforeYestCount})
            </button>
          </div>

          {/* Search Field */}
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Rechercher club ou ligue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-[#090D16] border border-[#1E2D4A] text-xs font-mono text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
        </div>

        {/* Outcome Sub-Filters */}
        <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#1E2D4A]/60">
          <div className="flex items-center gap-2">
            <span className="text-[#64748B]">Bilan IA :</span>
            <button
              onClick={() => setOutcomeFilter("ALL")}
              className={`px-2 py-0.5 rounded text-[11px] ${
                outcomeFilter === "ALL" ? "text-white font-bold bg-[#1E2D4A]" : "text-[#94A3B8]"
              }`}
            >
              Tout ({initialResults.length})
            </button>
            <button
              onClick={() => setOutcomeFilter("WON")}
              className={`px-2 py-0.5 rounded text-[11px] flex items-center gap-1 ${
                outcomeFilter === "WON"
                  ? "text-[#34D399] font-bold bg-[#10B981]/20 border border-[#10B981]/40"
                  : "text-[#34D399]/70 hover:text-[#34D399]"
              }`}
            >
              ✓ Gagnés ({wonPredictionsCount})
            </button>
            <button
              onClick={() => setOutcomeFilter("LOST")}
              className={`px-2 py-0.5 rounded text-[11px] flex items-center gap-1 ${
                outcomeFilter === "LOST"
                  ? "text-[#F87171] font-bold bg-[#EF4444]/20 border border-[#EF4444]/40"
                  : "text-[#F87171]/70 hover:text-[#F87171]"
              }`}
            >
              ✗ Manqués ({totalCount - wonPredictionsCount})
            </button>
          </div>

          <span className="text-[11px] text-[#64748B]">
            {filteredResults.length} résultats affichés
          </span>
        </div>
      </div>

      {/* Match Results Grid */}
      <div className="space-y-3">
        {filteredResults.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-[#94A3B8] bg-[#0F172A] rounded-xl border border-[#1E2D4A]">
            Aucun match terminé trouvé pour les filtres sélectionnés.
          </div>
        ) : (
          filteredResults.map((match) => (
            <div
              key={match.id}
              className={`p-4 rounded-xl bg-[#0D1322] border transition-all hover:border-[#2A3C60] ${
                match.prediction.wasCorrect
                  ? "border-[#10B981]/30 bg-gradient-to-r from-[#0D1322] via-[#091F18]/20 to-[#0D1322]"
                  : "border-[#1E2D4A]"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                {/* Column 1: Match Meta & Date */}
                <div className="lg:col-span-3 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="blue">{match.competitionCode}</Badge>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E293B] text-[#94A3B8]">
                      FT
                    </span>
                    <span className="text-[10px] font-mono text-[#38BDF8] font-bold">
                      {match.formattedDate}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[#64748B] truncate">
                    {match.venue}
                  </div>
                </div>

                {/* Column 2: Scoreboard */}
                <div className="lg:col-span-4">
                  <div className="p-3 rounded-lg bg-[#090D16] border border-[#1E2D4A] flex items-center justify-between">
                    <div className="text-right flex-1 truncate pr-2">
                      <span className="text-sm font-semibold text-[#F8FAFC] truncate block">
                        {match.homeTeam.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#64748B]">
                        xG {match.telemetry.homeXG.toFixed(2)}
                      </span>
                    </div>

                    <div className="px-3 py-1 rounded bg-[#131E35] border border-[#1E2D4A] text-center shrink-0">
                      <div className="text-lg font-mono font-black text-[#F8FAFC]">
                        {match.homeTeam.score} - {match.awayTeam.score}
                      </div>
                      {match.halfTimeScore && (
                        <div className="text-[9px] font-mono text-[#64748B]">
                          MT: {match.halfTimeScore.home} - {match.halfTimeScore.away}
                        </div>
                      )}
                    </div>

                    <div className="text-left flex-1 truncate pl-2">
                      <span className="text-sm font-semibold text-[#F8FAFC] truncate block">
                        {match.awayTeam.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#64748B]">
                        xG {match.telemetry.awayXG.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column 3: AI Prediction Evaluation */}
                <div className="lg:col-span-4 text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                        match.prediction.wasCorrect
                          ? "bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40"
                          : "bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/40"
                      }`}
                    >
                      {match.prediction.wasCorrect ? "✓ PRONOSTIC VALIDÉ" : "✗ PRONOSTIC MANQUÉ"}
                    </span>
                    <span className="text-[11px] text-[#94A3B8]">
                      Cote : <strong className="text-[#F8FAFC]">@{match.prediction.odds.toFixed(2)}</strong>
                    </span>
                  </div>

                  <div className="text-[11px] text-[#E2E8F0]">
                    <span className="text-[#64748B]">Conseil : </span>
                    <strong className="text-[#38BDF8]">{match.prediction.tip}</strong>
                    <span className="text-[10px] text-[#64748B] ml-1.5">
                      (Proj: {match.prediction.projectedScore})
                    </span>
                  </div>

                  <p className="text-[10px] text-[#94A3B8] leading-tight">
                    {match.prediction.analysis}
                  </p>
                </div>

                {/* Column 4: Details Link */}
                <div className="lg:col-span-1 flex lg:justify-end">
                  <Link href={`/matches/${match.id}`}>
                    <Button variant="secondary" size="sm">
                      Détails
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
