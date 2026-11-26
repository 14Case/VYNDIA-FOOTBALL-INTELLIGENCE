import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { DEMO_SYSTEM_METRICS } from "@/data/demo-data";
import {
  getPredictionsData,
  getRecommendedCombos,
  getPastEvaluatedTickets,
  EnrichedPrediction,
} from "@/lib/football-data";
import { MatchSimulator } from "@/components/prediction/MatchSimulator";
import { TicketGenerator } from "@/components/prediction/TicketGenerator";
import { AILearningDashboard } from "@/components/prediction/AILearningDashboard";
import { PredictionsTable } from "@/components/prediction/PredictionsTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PredictionsPage() {
  const predictions: EnrichedPrediction[] = await getPredictionsData();
  const initialCombos = getRecommendedCombos(predictions, 3);
  const pastTickets = getPastEvaluatedTickets();

  const activeCount = predictions.filter((p) => p.status !== "FINISHED").length;

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="violet">QUANTUM NEURAL ENGINE</Badge>
            <h1 className="text-lg font-mono font-bold text-[#F8FAFC]">
              CENTRE DE PRONOSTICS &amp; COMBINAISONS IA
            </h1>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Matrice prédictive probabiliste : auto-destruction des matchs terminés, générateur de 2 à 4 tickets et apprentissage continu à partir des erreurs passées.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/results">
            <Button variant="secondary" size="sm">
              <span>Résultats des Matchs Passés</span>
            </Button>
          </Link>
          <a href="#combos">
            <Button variant="primary" size="sm">
              <span>Générateur de Tickets</span>
            </Button>
          </a>
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
          title="Matchs Actifs Disponibles"
          value={`${activeCount} Affiches`}
          delta="PURGE AUTO"
          deltaType="positive"
          subtitle="Matchs passés retirés des tickets"
          sparklineData={[6, 8, 9, 10, activeCount]}
        />
        <MetricCard
          title="Apprentissage Continu"
          value="94.2%"
          delta="FEEDBACK LOOP"
          deltaType="positive"
          subtitle="4 règles correctives injectées"
          sparklineData={[82, 85, 88, 91, 94.2]}
        />
      </div>

      {/* INTERACTIVE TICKET GENERATOR (2 to 4 Tickets with Auto-Destruction) */}
      <TicketGenerator initialCombos={initialCombos} predictions={predictions} />

      {/* AI SELF-CORRECTION & LEARNING DASHBOARD */}
      <AILearningDashboard pastTickets={pastTickets} />

      {/* Interactive Match Simulator Component */}
      <MatchSimulator />

      {/* Predictions Deep Table with Filter Tabs */}
      <PredictionsTable predictions={predictions} />
    </AppShell>
  );
}
