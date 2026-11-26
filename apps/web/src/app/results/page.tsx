import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getPastMatchResults } from "@/lib/football-data";
import { ResultsFilterView } from "@/components/results/ResultsFilterView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ResultsPage() {
  const pastResults = await getPastMatchResults();

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="blue">ARCHIVE &amp; TÉLÉMÉTRIE HISTORIQUE</Badge>
            <h1 className="text-lg font-mono font-bold text-[#F8FAFC]">
              RÉSULTATS DES MATCHS PASSÉS &amp; VÉRIFICATION IA
            </h1>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Scores finaux, résultats à la mi-temps et vérification de la justesse des pronostics de l&apos;IA. Conservation sur 6 mois glissants avec purge automatique.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/predictions">
            <Button variant="primary" size="sm">
              <span>Voir Pronostics &amp; Combinés</span>
              <span>→</span>
            </Button>
          </Link>
          <Link href="/live">
            <Button variant="secondary" size="sm">
              <span>Matchs en Direct</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Interactive Filter View */}
      <ResultsFilterView initialResults={pastResults} />
    </AppShell>
  );
}
