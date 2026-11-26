"use client";

import React, { useState } from "react";
import { ComboTicket, EnrichedPrediction, getRecommendedCombos } from "@/lib/football-data";
import { ComboTicketCard } from "./ComboTicketCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface TicketGeneratorProps {
  initialCombos: ComboTicket[];
  predictions: EnrichedPrediction[];
}

export function TicketGenerator({ initialCombos, predictions }: TicketGeneratorProps) {
  const [ticketCount, setTicketCount] = useState<number>(3);
  const [combos, setCombos] = useState<ComboTicket[]>(initialCombos);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationNotice, setGenerationNotice] = useState<string>("");

  const handleGenerate = (count: number = ticketCount) => {
    setIsGenerating(true);
    setGenerationNotice("Analyse des probabilités de Poisson et application des règles d'auto-correction...");

    setTimeout(() => {
      const newCombos = getRecommendedCombos(predictions, count);
      setCombos(newCombos);
      setIsGenerating(false);
      setGenerationNotice(`✓ ${count} tickets générés avec succès ! Les matchs passés ont été purgés.`);
      setTimeout(() => setGenerationNotice(""), 4000);
    }, 600);
  };

  const handleCountChange = (count: number) => {
    setTicketCount(count);
    handleGenerate(count);
  };

  return (
    <section id="combos" className="space-y-4">
      {/* Header Banner & Interactive Generator Control */}
      <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#1E293B] via-[#0F172A] to-[#1E293B] border border-[#334155] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#10B981] via-[#3B82F6] to-[#F59E0B]" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="blue">GÉNÉRATEUR D&apos;INTELLIGENCE ARTIFICIELLE</Badge>
              <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/30">
                ● Auto-Destruction des Matchs Passés Active
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-mono font-bold text-[#F8FAFC] tracking-tight">
              Tickets Combinés Recommandés &amp; Personnalisables
            </h2>
            <p className="text-xs font-mono text-[#94A3B8] leading-relaxed">
              Dès qu&apos;une rencontre est jouée, elle est automatiquement retirée des tickets actifs. Choisissez le nombre de tickets désirés (2 à 4) pour générer des combinaisons variées calibrées sur les leçons des matchs passés.
            </p>
          </div>

          {/* Interactive Generator Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-[#090D16] p-3 rounded-xl border border-[#1E2D4A] shrink-0">
            <div className="flex items-center justify-between sm:justify-start gap-2 text-xs font-mono text-[#94A3B8]">
              <span>Nombre :</span>
              <div className="flex gap-1">
                {[2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleCountChange(num)}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                      ticketCount === num
                        ? "bg-[#3B82F6] text-white font-bold shadow-sm shadow-[#3B82F6]/30"
                        : "bg-[#131E35] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E2D4A]"
                    }`}
                  >
                    {num} Tickets
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => handleGenerate(ticketCount)}
              disabled={isGenerating}
              className="text-xs font-mono font-bold justify-center"
            >
              {isGenerating ? (
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Calcul Poisson...
                </span>
              ) : (
                <span>⚡ Générer de Nouveaux Tickets</span>
              )}
            </Button>
          </div>
        </div>

        {/* Live Generation Feedback */}
        {generationNotice && (
          <div className="mt-3 p-2 rounded bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-xs font-mono text-[#38BDF8] flex items-center gap-2 animate-fadeIn">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] animate-ping" />
            <span>{generationNotice}</span>
          </div>
        )}
      </div>

      {/* Grid of Generated Tickets (Responsive based on count) */}
      <div
        className={`grid grid-cols-1 gap-5 ${
          combos.length === 2
            ? "md:grid-cols-2"
            : combos.length === 4
            ? "md:grid-cols-2 lg:grid-cols-4"
            : "md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {combos.map((ticket) => (
          <ComboTicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>

      {/* Security & Clean Code Footer Bar */}
      <div className="p-3.5 rounded-lg bg-[#090D16] border border-[#1E2D4A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-[#64748B]">
        <div className="flex items-center gap-2">
          <span className="text-[#10B981]">🧠 Système Auto-Apprenant :</span>
          <span>
            Les erreurs détectées sur les tickets passés sont injectées comme contraintes de pénalité dans la composition des nouveaux combinés.
          </span>
        </div>
        <a
          href="#learning-dashboard"
          className="text-[#38BDF8] hover:underline font-semibold shrink-0"
        >
          Consulter le Journal d&apos;Apprentissage →
        </a>
      </div>
    </section>
  );
}
