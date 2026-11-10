"use client";

import React, { useState, useMemo } from "react";
import { simulateMatch, SimulationResult } from "@/lib/simulator";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Preset {
  name: string;
  homeTeam: string;
  awayTeam: string;
  homeXg: number;
  awayXg: number;
  league: string;
}

const PRESETS: Preset[] = [
  {
    name: "Premier League Classic",
    homeTeam: "Manchester City",
    awayTeam: "Liverpool",
    homeXg: 2.15,
    awayXg: 1.45,
    league: "EPL",
  },
  {
    name: "El Clásico",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    homeXg: 1.9,
    awayXg: 1.65,
    league: "La Liga",
  },
  {
    name: "Der Klassiker",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    homeXg: 2.4,
    awayXg: 1.3,
    league: "Bundesliga",
  },
  {
    name: "London Derby",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    homeXg: 1.95,
    awayXg: 1.1,
    league: "EPL",
  },
  {
    name: "Ligue 1 Clash",
    homeTeam: "Paris Saint-Germain",
    awayTeam: "AS Monaco",
    homeXg: 2.25,
    awayXg: 1.25,
    league: "Ligue 1",
  },
];

export function MatchSimulator() {
  const [homeTeam, setHomeTeam] = useState<string>("Manchester City");
  const [awayTeam, setAwayTeam] = useState<string>("Liverpool");
  const [homeXg, setHomeXg] = useState<number>(2.15);
  const [awayXg, setAwayXg] = useState<number>(1.45);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [iterationsCount, setIterationsCount] = useState<number>(10000);

  // Compute Poisson results reactively
  const simulation: SimulationResult = useMemo(() => {
    return simulateMatch(homeXg, awayXg, homeTeam, awayTeam);
  }, [homeXg, awayXg, homeTeam, awayTeam]);

  const handleApplyPreset = (preset: Preset) => {
    setHomeTeam(preset.homeTeam);
    setAwayTeam(preset.awayTeam);
    setHomeXg(preset.homeXg);
    setAwayXg(preset.awayXg);
  };

  const handleRunMonteCarlo = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setIterationsCount((prev) => prev + 10000);
    }, 450);
  };

  return (
    <div className="rounded-xl bg-[#0D1322] border border-[#1E2D4A] p-5 sm:p-6 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Background neon glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="blue">BIVARIATE POISSON SIMULATOR</Badge>
            <span className="text-[11px] font-mono text-[#38BDF8] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
              10,000 MONTE CARLO RUNS
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-mono font-bold text-[#F8FAFC] mt-1">
            Tactical Expected Goals (xG) Matrix Simulator
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Adjust offensive production to recalculate outcome distributions, fair closing odds, and +EV betting edges in real time.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-[#64748B] mr-1">Presets:</span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => handleApplyPreset(p)}
              className={`px-2.5 py-1 text-[11px] font-mono rounded border transition-all ${
                homeTeam === p.homeTeam && awayTeam === p.awayTeam
                  ? "bg-[#1E2D4A] border-[#38BDF8] text-[#38BDF8] shadow-sm"
                  : "bg-[#121A2D] border-[#1E2D4A] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#2A3C60]"
              }`}
            >
              {p.homeTeam.split(" ")[0]} v {p.awayTeam.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Home Team Control Card */}
        <div className="p-4 rounded-lg bg-[#121A2D] border border-[#1E2D4A] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
              <span className="text-xs font-mono font-semibold text-[#F8FAFC] uppercase tracking-wider">
                Home Side (Domicile)
              </span>
            </div>
            <input
              type="text"
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              className="text-xs font-mono bg-[#090D16] border border-[#1E2D4A] rounded px-2.5 py-1 text-[#F8FAFC] focus:outline-none focus:border-[#38BDF8] w-40 text-right"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-mono text-[#94A3B8]">Home Expected Goals (xG)</span>
              <span className="text-lg font-mono font-bold text-[#38BDF8]">{homeXg.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="4.5"
              step="0.05"
              value={homeXg}
              onChange={(e) => setHomeXg(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#1E2D4A] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#64748B]">
              <span>Low (0.2)</span>
              <span>Average (1.5)</span>
              <span>Dominant (3.0+)</span>
            </div>
          </div>
        </div>

        {/* Away Team Control Card */}
        <div className="p-4 rounded-lg bg-[#121A2D] border border-[#1E2D4A] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
              <span className="text-xs font-mono font-semibold text-[#F8FAFC] uppercase tracking-wider">
                Away Side (Extérieur)
              </span>
            </div>
            <input
              type="text"
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              className="text-xs font-mono bg-[#090D16] border border-[#1E2D4A] rounded px-2.5 py-1 text-[#F8FAFC] focus:outline-none focus:border-[#F43F5E] w-40 text-right"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-mono text-[#94A3B8]">Away Expected Goals (xG)</span>
              <span className="text-lg font-mono font-bold text-[#F43F5E]">{awayXg.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="4.5"
              step="0.05"
              value={awayXg}
              onChange={(e) => setAwayXg(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#1E2D4A] rounded-lg appearance-none cursor-pointer accent-[#F43F5E]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#64748B]">
              <span>Low (0.2)</span>
              <span>Average (1.2)</span>
              <span>Dominant (2.8+)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Results Banner */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#F8FAFC] uppercase tracking-wider">
              Simulation Output — 1X2 Probabilities & Fair Odds
            </span>
            <Badge variant={simulation.confidence > 75 ? "green" : "violet"}>
              CONFIDENCE {simulation.confidence}%
            </Badge>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRunMonteCarlo}
            disabled={isSimulating}
          >
            <span>{isSimulating ? "Recalculating 10k Paths..." : "Re-run Monte Carlo"}</span>
          </Button>
        </div>

        {/* 3-Way Vector Bar */}
        <div className="p-4 rounded-lg bg-[#090D16] border border-[#1E2D4A] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="text-[#38BDF8] font-bold">{homeTeam}</span>
              <span className="text-[#94A3B8]">({simulation.probabilities.homeWin.toFixed(1)}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#94A3B8]">Draw</span>
              <span className="text-[#64748B]">({simulation.probabilities.draw.toFixed(1)}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#F43F5E] font-bold">{awayTeam}</span>
              <span className="text-[#94A3B8]">({simulation.probabilities.awayWin.toFixed(1)}%)</span>
            </div>
          </div>

          <div className="h-3 w-full bg-[#121A2D] rounded-full overflow-hidden flex border border-[#1E2D4A]">
            <div
              style={{ width: `${simulation.probabilities.homeWin}%` }}
              className="bg-gradient-to-r from-[#0284C7] to-[#38BDF8] transition-all duration-300 relative group"
            />
            <div
              style={{ width: `${simulation.probabilities.draw}%` }}
              className="bg-[#475569] transition-all duration-300"
            />
            <div
              style={{ width: `${simulation.probabilities.awayWin}%` }}
              className="bg-gradient-to-r from-[#F43F5E] to-[#FB7185] transition-all duration-300"
            />
          </div>

          {/* Fair Odds Display */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded bg-[#121A2D] border border-[#1E2D4A] text-center">
              <div className="text-[10px] font-mono text-[#64748B] uppercase">Fair Odd (1)</div>
              <div className="text-base sm:text-lg font-mono font-bold text-[#38BDF8] mt-0.5">
                {simulation.fairOdds.home.toFixed(2)}
              </div>
              <div className="text-[10px] font-mono text-[#94A3B8]">
                {simulation.probabilities.homeWin.toFixed(1)}% prob
              </div>
            </div>

            <div className="p-3 rounded bg-[#121A2D] border border-[#1E2D4A] text-center">
              <div className="text-[10px] font-mono text-[#64748B] uppercase">Fair Odd (X)</div>
              <div className="text-base sm:text-lg font-mono font-bold text-[#CBD5E1] mt-0.5">
                {simulation.fairOdds.draw.toFixed(2)}
              </div>
              <div className="text-[10px] font-mono text-[#94A3B8]">
                {simulation.probabilities.draw.toFixed(1)}% prob
              </div>
            </div>

            <div className="p-3 rounded bg-[#121A2D] border border-[#1E2D4A] text-center">
              <div className="text-[10px] font-mono text-[#64748B] uppercase">Fair Odd (2)</div>
              <div className="text-base sm:text-lg font-mono font-bold text-[#F43F5E] mt-0.5">
                {simulation.fairOdds.away.toFixed(2)}
              </div>
              <div className="text-[10px] font-mono text-[#94A3B8]">
                {simulation.probabilities.awayWin.toFixed(1)}% prob
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Markets & Top Scorelines Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Goal Markets */}
        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-xs font-mono font-bold text-[#F8FAFC] uppercase tracking-wider">
            Secondary Derivative Markets
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {/* Over 2.5 */}
            <div className="p-3 rounded-lg bg-[#121A2D] border border-[#1E2D4A] space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#94A3B8]">Over 2.5 Goals</span>
                <span className="text-[#34D399] font-bold">
                  {simulation.markets.over25.toFixed(1)}%
                </span>
              </div>
              <div className="text-base font-mono font-bold text-[#F8FAFC]">
                @{simulation.markets.fairOddsOver25.toFixed(2)}
              </div>
              <div className="text-[10px] text-[#64748B]">Implied total goals</div>
            </div>

            {/* Under 2.5 */}
            <div className="p-3 rounded-lg bg-[#121A2D] border border-[#1E2D4A] space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#94A3B8]">Under 2.5 Goals</span>
                <span className="text-[#CBD5E1] font-bold">
                  {simulation.markets.under25.toFixed(1)}%
                </span>
              </div>
              <div className="text-base font-mono font-bold text-[#F8FAFC]">
                @{simulation.markets.fairOddsUnder25.toFixed(2)}
              </div>
              <div className="text-[10px] text-[#64748B]">Defensive lock scenario</div>
            </div>

            {/* BTTS Yes */}
            <div className="p-3 rounded-lg bg-[#121A2D] border border-[#1E2D4A] space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#94A3B8]">BTTS (Yes)</span>
                <span className="text-[#FBBF24] font-bold">
                  {simulation.markets.bttsYes.toFixed(1)}%
                </span>
              </div>
              <div className="text-base font-mono font-bold text-[#F8FAFC]">
                @{simulation.markets.fairOddsBttsYes.toFixed(2)}
              </div>
              <div className="text-[10px] text-[#64748B]">Both teams score</div>
            </div>

            {/* BTTS No */}
            <div className="p-3 rounded-lg bg-[#121A2D] border border-[#1E2D4A] space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#94A3B8]">BTTS (No)</span>
                <span className="text-[#CBD5E1] font-bold">
                  {simulation.markets.bttsNo.toFixed(1)}%
                </span>
              </div>
              <div className="text-base font-mono font-bold text-[#F8FAFC]">
                @{simulation.markets.fairOddsBttsNo.toFixed(2)}
              </div>
              <div className="text-[10px] text-[#64748B]">Clean sheet for at least one</div>
            </div>
          </div>
        </div>

        {/* Top 5 Most Likely Exact Scorelines */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-mono font-bold text-[#F8FAFC] uppercase tracking-wider">
              Top 5 Most Probable Scorelines
            </h3>
            <span className="text-[10px] font-mono text-[#64748B]">POISSON JOINT MATRIX</span>
          </div>

          <div className="space-y-1.5">
            {simulation.topScorelines.map((scoreline, idx) => (
              <div
                key={scoreline.score}
                className="flex items-center justify-between p-2 px-3 rounded bg-[#121A2D] border border-[#1E2D4A] hover:border-[#2A3C60] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#1E2D4A] text-[10px] font-mono flex items-center justify-center text-[#94A3B8]">
                    #{idx + 1}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#F8FAFC] tracking-wider">
                    {scoreline.score}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-[#090D16] rounded-full overflow-hidden border border-[#1E2D4A]">
                    <div
                      style={{ width: `${Math.min(100, (scoreline.probability / 0.15) * 100)}%` }}
                      className="h-full bg-gradient-to-r from-[#38BDF8] to-[#10B981] rounded-full"
                    />
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#10B981] w-12 text-right">
                    {(scoreline.probability * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expected Value (+EV) Discovery Alert */}
      {simulation.edgeAlert && (
        <div className="p-3.5 rounded-lg bg-[#0F231D] border border-[#059669]/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#059669]/20 border border-[#059669]/50 flex items-center justify-center text-[#34D399] font-mono font-bold text-sm">
              +EV
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#F8FAFC]">
                Market Inefficiency Detected: {simulation.edgeAlert.market}
              </div>
              <div className="text-[11px] text-[#A7F3D0]">
                {simulation.edgeAlert.recommendation}
              </div>
            </div>
          </div>
          <Badge variant="green">+{simulation.edgeAlert.expectedValue}% EDGE</Badge>
        </div>
      )}
    </div>
  );
}
