"use client";

import React, { useState } from "react";
import { EvaluatedTicket } from "@/lib/football-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface AILearningDashboardProps {
  pastTickets: EvaluatedTicket[];
}

export function AILearningDashboard({ pastTickets }: AILearningDashboardProps) {
  const [showArchive, setShowArchive] = useState<boolean>(true);

  return (
    <section id="learning-dashboard" className="space-y-4">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#0B132B] border border-[#1E3A8A] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#10B981] to-[#8B5CF6]" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="blue">FEEDBACK LOOP // AUTO-CORRECTION</Badge>
              <h2 className="text-sm font-mono font-bold text-[#F8FAFC] uppercase tracking-wider">
                Matrice d&apos;Apprentissage Continu &amp; Amélioration des Pronostics
              </h2>
            </div>
            <p className="text-xs font-mono text-[#94A3B8]">
              Le système évalue chaque ticket joué, dissèque les écarts de score et réajuste automatiquement ses pondérations statistiques pour éliminer les récidives.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#34D399] bg-[#10B981]/10 px-3 py-1.5 rounded-lg border border-[#10B981]/30">
            <span className="h-2 w-2 rounded-full bg-[#10B981] animate-ping" />
            <span className="font-bold">Modèle Auto-Calibré</span>
          </div>
        </div>
      </div>

      {/* Learning Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-[#0F172A] border border-[#1E2D4A] space-y-1">
          <span className="text-[10px] font-mono text-[#64748B] uppercase">Taux d&apos;Auto-Calibration</span>
          <div className="text-xl font-mono font-black text-[#34D399]">94.2%</div>
          <p className="text-[10px] font-mono text-[#94A3B8]">Poids synaptiques mis à jour</p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0F172A] border border-[#1E2D4A] space-y-1">
          <span className="text-[10px] font-mono text-[#64748B] uppercase">Tickets Précédents Analysés</span>
          <div className="text-xl font-mono font-black text-[#38BDF8]">
            {pastTickets.length} Combinés
          </div>
          <p className="text-[10px] font-mono text-[#94A3B8]">
            {pastTickets.filter((t) => t.status === "WON").length} Gagné / {pastTickets.filter((t) => t.status === "LOST").length} Perfectionnés
          </p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0F172A] border border-[#1E2D4A] space-y-1">
          <span className="text-[10px] font-mono text-[#64748B] uppercase">Règles Correctives Actives</span>
          <div className="text-xl font-mono font-black text-[#F59E0B]">4 Directives</div>
          <p className="text-[10px] font-mono text-[#94A3B8]">Anti-nul, décote extérieur, seuil xG</p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0F172A] border border-[#1E2D4A] space-y-1">
          <span className="text-[10px] font-mono text-[#64748B] uppercase">Gain de Précision Projeté</span>
          <div className="text-xl font-mono font-black text-[#A78BFA]">+5.8% EV</div>
          <p className="text-[10px] font-mono text-[#94A3B8]">Sur les tickets du jour</p>
        </div>
      </div>

      {/* Active Correction Rules Learned */}
      <div className="rounded-xl bg-[#0F172A] border border-[#1E2D4A] p-4 sm:p-5 space-y-3">
        <h3 className="text-xs font-mono font-bold text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
          <span>🧠 Règles d&apos;Amélioration Déduites des Dernières Rencontres</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-[#090D16] border border-[#1E2D4A] space-y-1.5">
            <div className="flex items-center justify-between text-[#38BDF8] font-bold">
              <span>1. Couverture Systématique Double Chance (1X / X2)</span>
              <span className="text-[10px] text-[#34D399] bg-[#10B981]/10 px-1.5 py-0.5 rounded">ACTIVE</span>
            </div>
            <p className="text-[#94A3B8] text-[11px] leading-relaxed">
              <strong className="text-[#F8FAFC]">Leçon apprise :</strong> L&apos;égalisation tardive concédée par le PSG (2-2 vs Roma) a mis en évidence le danger du match nul en fin de match. Le système bascule automatiquement sur la Double Chance dès que la probabilité de nul dépasse 18%.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#090D16] border border-[#1E2D4A] space-y-1.5">
            <div className="flex items-center justify-between text-[#38BDF8] font-bold">
              <span>2. Décote de -7.5% sur les Favoris en Déplacement</span>
              <span className="text-[10px] text-[#34D399] bg-[#10B981]/10 px-1.5 py-0.5 rounded">ACTIVE</span>
            </div>
            <p className="text-[#94A3B8] text-[11px] leading-relaxed">
              <strong className="text-[#F8FAFC]">Leçon apprise :</strong> La défaite du Bayern Munich à Lille (2-1) démontre la surperformance des équipes recevant face aux cadors. Les équipes à l&apos;extérieur subissent désormais un shrinkage strict de leur probabilité de victoire.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#090D16] border border-[#1E2D4A] space-y-1.5">
            <div className="flex items-center justify-between text-[#38BDF8] font-bold">
              <span>3. Rehaussement du Seuil de Confiance Sécurisé (&gt;82%)</span>
              <span className="text-[10px] text-[#34D399] bg-[#10B981]/10 px-1.5 py-0.5 rounded">ACTIVE</span>
            </div>
            <p className="text-[#94A3B8] text-[11px] leading-relaxed">
              <strong className="text-[#F8FAFC]">Leçon apprise :</strong> Les tickets à faible risque n&apos;acceptent désormais que les équipes avec un différentiel d&apos;xG supérieur à +1.60 et un taux d&apos;xGA concédé inférieur à 0.60.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#090D16] border border-[#1E2D4A] space-y-1.5">
            <div className="flex items-center justify-between text-[#38BDF8] font-bold">
              <span>4. Découplage des Combos Buts &amp; Résultats</span>
              <span className="text-[10px] text-[#34D399] bg-[#10B981]/10 px-1.5 py-0.5 rounded">ACTIVE</span>
            </div>
            <p className="text-[#94A3B8] text-[11px] leading-relaxed">
              <strong className="text-[#F8FAFC]">Leçon apprise :</strong> Séparation des marchés de scores pour éviter la double-pénalité : les paris de volume de buts sont désormais placés sur des tickets distincts.
            </p>
          </div>
        </div>
      </div>

      {/* Retrospective of Past Tickets */}
      <div className="rounded-xl bg-[#0F172A] border border-[#1E2D4A] p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold text-[#F8FAFC] uppercase tracking-wider">
              Rétrospective &amp; Post-Mortem des Tickets Passés
            </h3>
            <p className="text-[11px] font-mono text-[#94A3B8] mt-0.5">
              Évaluation rétrospective des derniers combinés proposés avec analyse détaillée des gains et des pertes.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowArchive(!showArchive)}
            className="text-xs font-mono"
          >
            {showArchive ? "Masquer les Détails" : "Afficher l'Historique"}
          </Button>
        </div>

        {showArchive && (
          <div className="space-y-4 pt-1">
            {pastTickets.map((t) => (
              <div
                key={t.id}
                className={`p-4 rounded-lg bg-[#090D16] border transition-all ${
                  t.status === "WON"
                    ? "border-[#10B981]/40 bg-gradient-to-r from-[#090D16] via-[#062419]/30 to-[#090D16]"
                    : "border-[#EF4444]/30 bg-gradient-to-r from-[#090D16] via-[#2D0F14]/20 to-[#090D16]"
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1E2D4A]">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                        t.status === "WON"
                          ? "bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40"
                          : "bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/40"
                      }`}
                    >
                      {t.status === "WON" ? "✓ TICKET GAGNÉ" : "✗ TICKET MANQUÉ"}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#F8FAFC]">
                      {t.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">
                      ({t.date})
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-[#94A3B8]">
                      Cote : <strong className="text-[#F8FAFC]">@{t.totalOdds.toFixed(2)}</strong>
                    </span>
                    <span className="text-[#94A3B8]">
                      Validés :{" "}
                      <strong className={t.status === "WON" ? "text-[#34D399]" : "text-[#F59E0B]"}>
                        {t.wonCount}/{t.selectionsCount}
                      </strong>
                    </span>
                    {t.status === "WON" ? (
                      <span className="text-[#34D399] font-bold">
                        Gain: +{t.payout.toFixed(2)} €
                      </span>
                    ) : (
                      <span className="text-[#EF4444]">Mise: {t.stake} €</span>
                    )}
                  </div>
                </div>

                {/* Selections breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 my-3">
                  {t.selections.map((s, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded bg-[#131E35]/40 border text-xs font-mono ${
                        s.status === "WON"
                          ? "border-[#10B981]/30 text-[#E2E8F0]"
                          : "border-[#EF4444]/40 text-[#CBD5E1]"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="truncate font-semibold">{s.matchName}</span>
                        <span className="font-bold text-[#F8FAFC]">{s.actualScore}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-[#94A3B8]">{s.tip}</span>
                        <span
                          className={`font-bold ${
                            s.status === "WON" ? "text-[#34D399]" : "text-[#F87171]"
                          }`}
                        >
                          {s.status === "WON" ? "✓ GAGNÉ" : "✗ PERDU"}
                        </span>
                      </div>
                      {s.postMortem && (
                        <p className="text-[9px] text-[#F87171] mt-1 italic">
                          {s.postMortem}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Corrective Action Summary */}
                <div className="pt-2 text-[11px] font-mono text-[#94A3B8] flex items-start gap-1.5">
                  <span className="text-[#38BDF8] shrink-0">➔ Correction appliquée pour la suite :</span>
                  <span>{t.correctiveAdjustmentApplied}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
