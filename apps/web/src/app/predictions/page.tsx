import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { DEMO_SYSTEM_METRICS } from "@/data/demo-data";
import { getPredictionsData, getRecommendedCombos, EnrichedPrediction } from "@/lib/football-data";
import { MatchSimulator } from "@/components/prediction/MatchSimulator";
import { CombosSection } from "@/components/prediction/CombosSection";
import { PredictionsTable } from "@/components/prediction/PredictionsTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PredictionsPage() {
  const predictions: EnrichedPrediction[] = await getPredictionsData();
  const combos = getRecommendedCombos(predictions);

  const uclCount = predictions.filter(
    (p) => p.isUcl || p.competition.toLowerCase().includes("champions league")
  ).length;

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="violet">QUANTUM NEURAL ENGINE</Badge>
            <h1 className="text-lg font-mono font-bold text-[#F8FAFC]">
              CENTRE DE PRONOSTICS & COMBINAISONS IA
            </h1>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Matrice prédictive probabiliste : scores exacts Poisson bivarié, régression spatiale et discovery d&apos;Expected Value (+EV) sur la Ligue des Champions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a href="#combos">
            <Button variant="primary" size="sm">
              <span>Voir les 3 Tickets Combinés</span>
            </Button>
          </a>
          <Link href="/live">
            <Button variant="secondary" size="sm">
              <span>Matchs en Direct</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Model Performance Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          title="Précision Globale Modèle"
          value={`${DEMO_SYSTEM_METRICS.historicalModelAccuracy}%`}
          delta="+2.4% vs Baseline"
          deltaType="positive"
          subtitle="Backtesté sur 1 850 matchs"
          sparklineData={[72, 74, 75, 76, 77, 78.6]}
        />
        <MetricCard
          title="Yield Moyen Expected Value"
          value={DEMO_SYSTEM_METRICS.averageEdgeYield}
          delta="LONG TERM EDGE"
          deltaType="positive"
          subtitle="Consensus sharp closing lines"
          sparklineData={[3.2, 3.8, 4.1, 4.4, 4.8]}
        />
        <MetricCard
          title="Matchs UCL ce Soir"
          value={uclCount > 0 ? `${uclCount} Affiches` : `${predictions.length} Matchs`}
          delta="CALIBRÉ POISSON"
          deltaType="positive"
          subtitle="Champions League & Tops Ligues"
          sparklineData={[2, 4, 6, 8, uclCount || predictions.length]}
        />
        <MetricCard
          title="Latence Inférence"
          value={DEMO_SYSTEM_METRICS.databaseLatency}
          delta="OPTIMAL"
          deltaType="positive"
          subtitle="Pipeline FastAPI + Supabase"
          sparklineData={[28, 24, 22, 19, 18]}
        />
      </div>

      {/* COMBOS / TICKETS COMBINÉS SECTION */}
      <CombosSection combos={combos} />

      {/* Interactive Match Simulator Component */}
      <MatchSimulator />

      {/* Predictions Deep Table with Filter Tabs */}
      <PredictionsTable predictions={predictions} />
    </AppShell>
  );
}
