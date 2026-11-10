import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function AnalysisPage() {
  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="blue">STATISTICAL ENGINE</Badge>
            <h1 className="text-lg font-mono font-bold text-[#F8FAFC]">
              STATISTICAL & TACTICAL ANALYSIS
            </h1>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Macro league metrics, tactical style clusters, PPDA pressing intensities, and expected goals variance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <span>Methodology Spec</span>
          </Button>
          <Button variant="primary" size="sm">
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* High-Level Analytical Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          title="Avg Non-Penalty xG / Match"
          value="2.74"
          delta="+0.12 vs 2025"
          deltaType="positive"
          subtitle="Top 5 European Leagues"
          sparklineData={[2.55, 2.6, 2.64, 2.7, 2.74]}
        />
        <MetricCard
          title="Pressing Intensity (PPDA)"
          value="10.8"
          delta="-0.6 Passes"
          deltaType="positive"
          subtitle="Faster defensive recoveries"
          sparklineData={[12.2, 11.8, 11.4, 11.0, 10.8]}
        />
        <MetricCard
          title="Direct Speed Vector"
          value="1.72 m/s"
          delta="TRANSITION SURGE"
          deltaType="neutral"
          subtitle="Average speed of offensive buildup"
          sparklineData={[1.65, 1.68, 1.7, 1.71, 1.72]}
        />
        <MetricCard
          title="Model Edge Stability"
          value="94.2%"
          delta="CALIBRATED"
          deltaType="positive"
          subtitle="Brier score: 0.182"
          sparklineData={[91, 92, 93, 93.8, 94.2]}
        />
      </div>

      {/* Deep Analytical Methodology Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="violet">MODEL SPECIFICATION</Badge>
            <h2 className="text-sm font-mono font-bold text-[#F8FAFC]">
              Algorithmic Foundation Architecture
            </h2>
          </div>

          <div className="space-y-3 text-xs text-[#CBD5E1]">
            <p className="leading-relaxed">
              VYNDIA Football Intelligence uses a three-tier modeling framework to evaluate football matches:
            </p>

            <div className="p-3 rounded bg-[#0D1322] border border-[#1E2D4A] space-y-1.5 font-mono">
              <span className="text-[#60A5FA] font-bold">1. Bivariate Poisson Matrix</span>
              <p className="text-[11px] text-[#94A3B8]">
                Estimates joint scoreline distributions by calibrating attack and defense strength ratings using Dixon-Coles parameters and time-decay weighting.
              </p>
            </div>

            <div className="p-3 rounded bg-[#0D1322] border border-[#1E2D4A] space-y-1.5 font-mono">
              <span className="text-[#A78BFA] font-bold">2. Deep Spatial Vector Regressor</span>
              <p className="text-[11px] text-[#94A3B8]">
                Processes tracking coordinates and event frames to compute instantaneous pitch control, pressing triggers, and continuous Expected Threat (xT).
              </p>
            </div>

            <div className="p-3 rounded bg-[#0D1322] border border-[#1E2D4A] space-y-1.5 font-mono">
              <span className="text-[#34D399] font-bold">3. Bayesian Market Calibration Layer</span>
              <p className="text-[11px] text-[#94A3B8]">
                Reconciles pure structural probabilities with consensus sharp market odds to detect pricing inefficiencies while avoiding market bias.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="green">VALIDATION</Badge>
            <h2 className="text-sm font-mono font-bold text-[#F8FAFC]">
              Empirical Backtest Metrics
            </h2>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded bg-[#0D1322] border border-[#1E2D4A] space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Logarithmic Loss (Multi-class 1X2):</span>
                <span className="text-[#34D399] font-bold">0.942</span>
              </div>
              <div className="w-full bg-[#162035] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#10B981] h-full w-[82%]" />
              </div>
            </div>

            <div className="p-3 rounded bg-[#0D1322] border border-[#1E2D4A] space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Brier Score Benchmark:</span>
                <span className="text-[#60A5FA] font-bold">0.182</span>
              </div>
              <div className="w-full bg-[#162035] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#3B82F6] h-full w-[88%]" />
              </div>
            </div>

            <div className="p-3 rounded bg-[#0D1322] border border-[#1E2D4A] space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">xG Prediction Mean Absolute Error (MAE):</span>
                <span className="text-[#F59E0B] font-bold">0.31 goals</span>
              </div>
              <div className="w-full bg-[#162035] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#F59E0B] h-full w-[76%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
