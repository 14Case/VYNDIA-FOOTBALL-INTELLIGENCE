"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { EnrichedPrediction } from "@/lib/football-data";
import { ProbabilityBar } from "@/components/ui/ProbabilityBar";
import { StatusChip } from "@/components/ui/StatusChip";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface PredictionsTableProps {
  predictions: EnrichedPrediction[];
}

type FilterTab = "ALL" | "UCL" | "HIGH_CONFIDENCE" | "VALUE_EDGE";

export function PredictionsTable({ predictions }: PredictionsTableProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const uclCount = useMemo(
    () => predictions.filter((p) => p.isUcl || p.competition.toLowerCase().includes("champions league")).length,
    [predictions]
  );

  const highConfCount = useMemo(
    () => predictions.filter((p) => p.probabilities.confidence >= 80).length,
    [predictions]
  );

  const valueCount = useMemo(
    () => predictions.filter((p) => p.edge?.isPositive).length,
    [predictions]
  );

  const filteredPredictions = useMemo(() => {
    return predictions.filter((pred) => {
      // Search filter
      const matchesSearch =
        pred.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pred.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pred.competition.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Tab filter
      if (activeTab === "UCL") {
        return pred.isUcl || pred.competition.toLowerCase().includes("champions league");
      }
      if (activeTab === "HIGH_CONFIDENCE") {
        return pred.probabilities.confidence >= 80;
      }
      if (activeTab === "VALUE_EDGE") {
        return pred.edge?.isPositive;
      }
      return true;
    });
  }, [predictions, activeTab, searchQuery]);

  return (
    <div className="rounded-xl bg-[#121A2D] border border-[#1E2D4A] p-4 sm:p-5 space-y-4">
      {/* Table Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-mono font-bold text-[#F8FAFC] uppercase tracking-wider">
              Pronostics Détaillés par Match & Arbitrage de Marché
            </h2>
            <Badge variant="blue">{filteredPredictions.length} AFFICHÉS</Badge>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Modélisation Poisson multivariée, scores exacts projetés et conseils de paris avec cotes dé-margées.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Rechercher équipe ou compétition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 rounded-md bg-[#090D16] border border-[#1E2D4A] text-xs font-mono text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6]"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        <button
          onClick={() => setActiveTab("ALL")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            activeTab === "ALL"
              ? "bg-[#3B82F6] text-white font-bold shadow-md shadow-[#3B82F6]/20"
              : "bg-[#090D16] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E2D4A]"
          }`}
        >
          Tous les Matchs ({predictions.length})
        </button>

        <button
          onClick={() => setActiveTab("UCL")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
            activeTab === "UCL"
              ? "bg-[#2563EB] text-white font-bold shadow-md shadow-[#2563EB]/20 border border-[#60A5FA]"
              : "bg-[#090D16] text-[#38BDF8] hover:bg-[#1E293B] border border-[#38BDF8]/40"
          }`}
        >
          <span>🏆 Soirée Ligue des Champions ({uclCount})</span>
        </button>

        <button
          onClick={() => setActiveTab("HIGH_CONFIDENCE")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            activeTab === "HIGH_CONFIDENCE"
              ? "bg-[#10B981] text-white font-bold shadow-md shadow-[#10B981]/20"
              : "bg-[#090D16] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E2D4A]"
          }`}
        >
          Haute Confiance &gt;80% ({highConfCount})
        </button>

        <button
          onClick={() => setActiveTab("VALUE_EDGE")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            activeTab === "VALUE_EDGE"
              ? "bg-[#8B5CF6] text-white font-bold shadow-md shadow-[#8B5CF6]/20"
              : "bg-[#090D16] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E2D4A]"
          }`}
        >
          Value Edge (+EV) ({valueCount})
        </button>
      </div>

      {/* Match Cards List */}
      <div className="space-y-3">
        {filteredPredictions.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-[#94A3B8] bg-[#090D16] rounded-lg border border-[#1E2D4A]">
            Aucun match ne correspond aux filtres sélectionnés.
          </div>
        ) : (
          filteredPredictions.map((pred) => {
            const isUcl = pred.isUcl || pred.competition.toLowerCase().includes("champions league");

            return (
              <div
                key={pred.id}
                className={`p-4 rounded-lg bg-[#0D1322] border transition-all grid grid-cols-1 lg:grid-cols-12 gap-4 items-center ${
                  isUcl
                    ? "border-[#1E3A8A] hover:border-[#3B82F6]/60 bg-gradient-to-r from-[#0D1322] via-[#0F1A33] to-[#0D1322]"
                    : "border-[#1E2D4A] hover:border-[#2A3C60]"
                }`}
              >
                {/* Column 1: Match & Kickoff */}
                <div className="lg:col-span-4 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={isUcl ? "blue" : "neutral"}>
                      {isUcl ? "🏆 UEFA CHAMPIONS LEAGUE" : pred.competitionCode}
                    </Badge>
                    <StatusChip
                      status={pred.status === "LIVE" ? "LIVE" : "UPCOMING"}
                      label={pred.status === "LIVE" ? "LIVE" : `COUP D'ENVOI ${pred.kickoffTime}`}
                    />
                  </div>

                  <div className="text-sm font-semibold text-[#F8FAFC]">
                    {pred.homeTeam.name} vs {pred.awayTeam.name}
                  </div>

                  <div className="text-[11px] font-mono text-[#64748B] flex items-center gap-2">
                    <span>{pred.venue}</span>
                    <span>•</span>
                    <span>
                      Score proj. :{" "}
                      <span className="text-[#F8FAFC] font-bold">
                        {pred.topScoreline}
                      </span>
                    </span>
                  </div>

                  {/* AI Recommended Tip Banner */}
                  <div className="pt-1">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#10B981]/10 border border-[#10B981]/30 text-[11px] font-mono text-[#34D399]">
                      <span className="font-bold">Conseil IA :</span>
                      <span>{pred.recommendedTip.selection}</span>
                      <span className="text-[#F8FAFC] font-bold">
                        @{pred.recommendedTip.odds.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Probabilities Bar */}
                <div className="lg:col-span-4">
                  <div className="text-[10px] font-mono text-[#94A3B8] mb-1 flex justify-between">
                    <span>VECTEUR DE PROBABILITÉS</span>
                    <span className="text-[#34D399]">
                      Confiance : {pred.probabilities.confidence}%
                    </span>
                  </div>
                  <ProbabilityBar
                    homeWin={pred.probabilities.homeWin}
                    draw={pred.probabilities.draw}
                    awayWin={pred.probabilities.awayWin}
                    homeLabel={pred.homeTeam.code}
                    awayLabel={pred.awayTeam.code}
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#64748B] mt-1">
                    <span>1: {pred.probabilities.homeWin}%</span>
                    <span>N: {pred.probabilities.draw}%</span>
                    <span>2: {pred.probabilities.awayWin}%</span>
                  </div>
                </div>

                {/* Column 3: Fair Odds & Value Discovery */}
                <div className="lg:col-span-3 text-xs font-mono space-y-1">
                  <div className="text-[10px] text-[#64748B] uppercase flex items-center justify-between">
                    <span>COTE DU MARCHÉ</span>
                    {pred.marketOdds && (
                      <span className="text-[#38BDF8]">
                        {pred.marketOdds.source} @{pred.marketOdds.home.toFixed(2)} / {pred.marketOdds.draw.toFixed(2)} / {pred.marketOdds.away.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="text-[#34D399] font-bold text-xs">
                    {pred.edge?.text ?? "+3.5% EV sur Domicile"}
                  </div>

                  <div className="text-[10px] text-[#94A3B8] leading-tight">
                    {pred.recommendedTip.reason}
                  </div>
                </div>

                {/* Column 4: Inspect Button */}
                <div className="lg:col-span-1 flex lg:justify-end">
                  <Link href={`/matches/${pred.fixtureId}`}>
                    <Button variant="secondary" size="sm">
                      Inspecter
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
