"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatusChip } from "@/components/ui/StatusChip";
import { DEMO_AGENTS, AIAgent } from "@/data/demo-data";
import { AgentDossier, pingAllAgents, pingAgent, runAgentAnalysis } from "@/lib/api";

const MATCHUP_PRESETS = [
  { home: "Real Madrid", away: "Manchester City", hXg: 2.15, aXg: 1.75 },
  { home: "Arsenal", away: "Paris Saint-Germain", hXg: 1.95, aXg: 1.45 },
  { home: "Liverpool", away: "Chelsea", hXg: 2.25, aXg: 1.30 },
  { home: "FC Barcelona", away: "Bayern Munich", hXg: 1.85, aXg: 1.90 },
];

export function AgentCommandCenter() {
  const [agents, setAgents] = useState<AIAgent[]>(DEMO_AGENTS);
  const [isPingingAll, setIsPingingAll] = useState(false);
  const [pingingAgentId, setPingingAgentId] = useState<string | null>(null);

  // Match analysis state
  const [selectedPreset, setSelectedPreset] = useState(MATCHUP_PRESETS[0]);
  const [customHome, setCustomHome] = useState(MATCHUP_PRESETS[0].home);
  const [customAway, setCustomAway] = useState(MATCHUP_PRESETS[0].away);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDossier, setAnalysisDossier] = useState<AgentDossier | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  const handlePingAll = async () => {
    setIsPingingAll(true);
    try {
      const res = await pingAllAgents();
      if (res?.heartbeats) {
        setAgents((prev) =>
          prev.map((a) => {
            const hb = res.heartbeats.find((h) => h.id === a.id);
            return hb ? { ...a, latencyMs: hb.latency_ms, lastActive: "Just now" } : a;
          })
        );
      }
    } catch {
      // Simulate latency variations on fallback
      setAgents((prev) =>
        prev.map((a) => ({
          ...a,
          latencyMs: Math.floor(Math.random() * 25) + 15,
          lastActive: "Just now",
        }))
      );
    } finally {
      setTimeout(() => setIsPingingAll(false), 300);
    }
  };

  const handlePingIndividual = async (agentId: string) => {
    setPingingAgentId(agentId);
    try {
      const hb = await pingAgent(agentId);
      if (hb) {
        setAgents((prev) =>
          prev.map((a) =>
            a.id === agentId
              ? { ...a, latencyMs: hb.latency_ms, lastActive: "Just now" }
              : a
          )
        );
      }
    } catch {
      setAgents((prev) =>
        prev.map((a) =>
          a.id === agentId
            ? { ...a, latencyMs: Math.floor(Math.random() * 20) + 18, lastActive: "Just now" }
            : a
        )
      );
    } finally {
      setTimeout(() => setPingingAgentId(null), 400);
    }
  };

  const handleRunCoordinatedScout = async () => {
    setIsAnalyzing(true);
    setActiveStep(1);

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 280);

    try {
      const dossier = await runAgentAnalysis({
        home_team: customHome,
        away_team: customAway,
        home_xg: selectedPreset.hXg,
        away_xg: selectedPreset.aXg,
      });
      clearInterval(stepInterval);
      setActiveStep(4);
      setAnalysisDossier(dossier);
    } catch {
      clearInterval(stepInterval);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="green">ORCHESTRATION ACTIVE</Badge>
            <h1 className="text-lg font-mono font-bold text-[#F8FAFC]">
              AI AGENT COMMAND CENTER
            </h1>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Autonomous specialized analytical agents coordinating spatial modeling, scoreline projections, and market arbitrage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePingAll}
            disabled={isPingingAll}
          >
            <span>{isPingingAll ? "Pinging All Nodes..." : "Ping All Agents"}</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              const el = document.getElementById("scout-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Launch Tactical Scout</span>
          </Button>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => {
          const isPinging = pingingAgentId === agent.id;
          return (
            <div
              key={agent.id}
              className={`rounded-lg bg-[#121A2D] border transition-all p-5 space-y-4 relative overflow-hidden ${
                isPinging ? "border-[#10B981] shadow-lg shadow-[#10B981]/10" : "border-[#1E2D4A] hover:border-[#2A3C60]"
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent" />

              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-mono font-bold text-[#F8FAFC]">{agent.name}</h3>
                    <Badge variant="violet">{agent.codename}</Badge>
                  </div>
                  <div className="text-xs text-[#94A3B8] mt-1">{agent.role}</div>
                </div>
                <StatusChip status="CONFIRMED" label={agent.status} />
              </div>

              <p className="text-xs text-[#CBD5E1] bg-[#0D1322] p-3 rounded border border-[#1E2D4A]/60 leading-relaxed">
                {agent.description}
              </p>

              {/* Performance Stats */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono p-2.5 rounded bg-[#0D1322] border border-[#1E2D4A]/50">
                <div>
                  <span className="text-[10px] text-[#64748B]">ACCURACY</span>
                  <div className="text-[#34D399] font-bold mt-0.5">{agent.accuracy}%</div>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B]">LATENCY</span>
                  <div className={`font-bold mt-0.5 transition-colors ${isPinging ? "text-[#10B981]" : "text-[#60A5FA]"}`}>
                    {agent.latencyMs}ms
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B]">PREDICTIONS</span>
                  <div className="text-[#F8FAFC] font-semibold mt-0.5">{agent.predictionsCount}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#64748B] pt-1">
                <span>Model: <span className="text-[#CBD5E1]">{agent.modelVersion}</span></span>
                <div className="flex items-center gap-3">
                  <span>Heartbeat: <span className="text-[#34D399]">{agent.lastActive}</span></span>
                  <button
                    onClick={() => handlePingIndividual(agent.id)}
                    disabled={isPinging}
                    className="text-[11px] text-[#38BDF8] hover:text-[#7DD3FC] underline cursor-pointer"
                  >
                    {isPinging ? "Probing..." : "Ping"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Coordinated Scouting Engine */}
      <div
        id="scout-section"
        className="rounded-xl bg-[#0D1322] border border-[#1E2D4A] p-5 sm:p-6 space-y-6 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1E2D4A]">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="blue">COORDINATED 4-AGENT SCOUTING ENGINE</Badge>
              <span className="text-[11px] font-mono text-[#34D399]">ASYNC CONCURRENT SYNTHESIS</span>
            </div>
            <h2 className="text-base sm:text-lg font-mono font-bold text-[#F8FAFC] mt-1">
              Live Tactical Match Dossier Generator
            </h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Launch all 4 agents concurrently to produce spatial pitch control, Poisson distributions, and +EV betting edges.
            </p>
          </div>

          {/* Quick Matchup Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono text-[#64748B] mr-1">Matchup:</span>
            {MATCHUP_PRESETS.map((p) => (
              <button
                key={`${p.home}-${p.away}`}
                onClick={() => {
                  setSelectedPreset(p);
                  setCustomHome(p.home);
                  setCustomAway(p.away);
                }}
                className={`px-2.5 py-1 text-[11px] font-mono rounded border transition-all ${
                  customHome === p.home && customAway === p.away
                    ? "bg-[#1E2D4A] border-[#38BDF8] text-[#38BDF8]"
                    : "bg-[#121A2D] border-[#1E2D4A] text-[#94A3B8] hover:text-[#F8FAFC]"
                }`}
              >
                {p.home.split(" ")[0]} v {p.away.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Matchup Inputs & Trigger */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-5">
            <label className="text-[11px] font-mono text-[#64748B] uppercase block mb-1">Home Team</label>
            <input
              type="text"
              value={customHome}
              onChange={(e) => setCustomHome(e.target.value)}
              className="w-full text-xs font-mono bg-[#121A2D] border border-[#1E2D4A] rounded p-2.5 text-[#F8FAFC] focus:outline-none focus:border-[#38BDF8]"
            />
          </div>

          <div className="sm:col-span-2 text-center text-xs font-mono font-bold text-[#64748B] pt-4 sm:pt-0">
            VS
          </div>

          <div className="sm:col-span-5">
            <label className="text-[11px] font-mono text-[#64748B] uppercase block mb-1">Away Team</label>
            <input
              type="text"
              value={customAway}
              onChange={(e) => setCustomAway(e.target.value)}
              className="w-full text-xs font-mono bg-[#121A2D] border border-[#1E2D4A] rounded p-2.5 text-[#F8FAFC] focus:outline-none focus:border-[#38BDF8]"
            />
          </div>
        </div>

        {/* Action Button & Active Agent Stages */}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="md"
            onClick={handleRunCoordinatedScout}
            disabled={isAnalyzing}
            className="w-full justify-center text-xs font-mono font-bold"
          >
            <span>
              {isAnalyzing
                ? `Coordinating Multi-Agent Swarm (Stage ${activeStep}/4)...`
                : `Deploy 4-Agent Analysis: ${customHome} vs ${customAway}`}
            </span>
          </Button>

          {/* Stepper Visualization */}
          {isAnalyzing && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <div className={`p-2 rounded text-[11px] font-mono border text-center transition-all ${activeStep >= 1 ? "bg-[#1E2D4A] border-[#38BDF8] text-[#38BDF8]" : "bg-[#121A2D] border-[#1E2D4A] text-[#64748B]"}`}>
                🔵 NTV: Spatial Pressing
              </div>
              <div className={`p-2 rounded text-[11px] font-mono border text-center transition-all ${activeStep >= 2 ? "bg-[#1E2D4A] border-[#8B5CF6] text-[#8B5CF6]" : "bg-[#121A2D] border-[#1E2D4A] text-[#64748B]"}`}>
                🟣 BPE: Poisson Matrix
              </div>
              <div className={`p-2 rounded text-[11px] font-mono border text-center transition-all ${activeStep >= 3 ? "bg-[#1E2D4A] border-[#10B981] text-[#10B981]" : "bg-[#121A2D] border-[#1E2D4A] text-[#64748B]"}`}>
                🟢 MEA: Arbitrage & EV
              </div>
              <div className={`p-2 rounded text-[11px] font-mono border text-center transition-all ${activeStep >= 4 ? "bg-[#1E2D4A] border-[#F59E0B] text-[#F59E0B]" : "bg-[#121A2D] border-[#1E2D4A] text-[#64748B]"}`}>
                🟡 SSS: Squad Readiness
              </div>
            </div>
          )}
        </div>

        {/* Coordinated Intelligence Dossier Display */}
        {analysisDossier && (
          <div className="p-5 rounded-lg bg-[#121A2D] border border-[#2A3C60] space-y-5 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1E2D4A]">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="green">SYNTHESIS COMPLETE</Badge>
                  <span className="text-xs font-mono text-[#CBD5E1] font-bold">
                    {analysisDossier.matchup}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#64748B] mt-0.5">
                  Consensus Model Confidence: {analysisDossier.consensus_confidence}%
                </div>
              </div>

              <div className="text-xs font-mono text-[#38BDF8] bg-[#0D1322] px-3 py-1.5 rounded border border-[#1E2D4A]">
                Projected Winner: <span className="font-bold text-[#F8FAFC]">{analysisDossier.strategic_summary.projected_winner}</span>
              </div>
            </div>

            {/* Probability Breakdown */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-[#94A3B8]">
                <span>{customHome}: {analysisDossier.strategic_summary.home_win_pct}%</span>
                <span>Draw: {analysisDossier.strategic_summary.draw_pct}%</span>
                <span>{customAway}: {analysisDossier.strategic_summary.away_win_pct}%</span>
              </div>
              <div className="h-2.5 w-full bg-[#0D1322] rounded-full overflow-hidden flex border border-[#1E2D4A]">
                <div style={{ width: `${analysisDossier.strategic_summary.home_win_pct}%` }} className="bg-[#38BDF8]" />
                <div style={{ width: `${analysisDossier.strategic_summary.draw_pct}%` }} className="bg-[#64748B]" />
                <div style={{ width: `${analysisDossier.strategic_summary.away_win_pct}%` }} className="bg-[#F43F5E]" />
              </div>
            </div>

            {/* Tactical & Spatial Decomposition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded bg-[#0D1322] border border-[#1E2D4A] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#38BDF8] font-bold">SPATIAL PITCH DOMINANCE</span>
                  <Badge variant="blue">NTV</Badge>
                </div>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-[#CBD5E1]">
                    <span>{customHome} Pitch Control:</span>
                    <span className="font-bold text-[#38BDF8]">{analysisDossier.tactical_intelligence.spatial_metrics.home_pitch_control_pct}%</span>
                  </div>
                  <div className="flex justify-between text-[#CBD5E1]">
                    <span>Pressing Index:</span>
                    <span className="font-bold text-[#34D399]">{analysisDossier.tactical_intelligence.spatial_metrics.home_pressing_index}/100</span>
                  </div>
                  <div className="flex justify-between text-[#CBD5E1]">
                    <span>Counter Risk:</span>
                    <span className="font-bold text-[#FBBF24]">{analysisDossier.tactical_intelligence.spatial_metrics.counter_attack_risk}</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#94A3B8] pt-1 leading-relaxed border-t border-[#1E2D4A]">
                  {analysisDossier.tactical_intelligence.tactical_verdict}
                </p>
              </div>

              {/* Market Arbitrage & EV */}
              <div className="p-3.5 rounded bg-[#0D1322] border border-[#1E2D4A] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#34D399] font-bold">MARKET VALUE ARBITRAGE</span>
                  <Badge variant="green">MEA</Badge>
                </div>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-[#CBD5E1]">
                    <span>Target Market:</span>
                    <span className="font-bold text-[#F8FAFC]">{analysisDossier.market_arbitrage.edge_discovery.target_market}</span>
                  </div>
                  <div className="flex justify-between text-[#CBD5E1]">
                    <span>Expected Value (+EV):</span>
                    <span className="font-bold text-[#34D399]">+{analysisDossier.market_arbitrage.edge_discovery.expected_value_pct}%</span>
                  </div>
                  <div className="flex justify-between text-[#CBD5E1]">
                    <span>Quarter-Kelly Stake:</span>
                    <span className="font-bold text-[#38BDF8]">{analysisDossier.market_arbitrage.edge_discovery.kelly_recommended_stake_pct}% of bankroll</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#A7F3D0] pt-1 leading-relaxed border-t border-[#1E2D4A]">
                  {analysisDossier.market_arbitrage.edge_discovery.arbitrage_verdict}
                </p>
              </div>
            </div>

            {/* Squad Readiness & Sentiment */}
            <div className="p-3 rounded bg-[#0D1322] border border-[#1E2D4A] text-xs font-mono flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge variant="amber">SSS</Badge>
                <span className="text-[#CBD5E1]">{analysisDossier.squad_sentiment.news_summary}</span>
              </div>
              <span className="text-[#34D399] shrink-0 font-bold">
                Readiness: {analysisDossier.squad_sentiment.squad_readiness.home_team_readiness_pct}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
