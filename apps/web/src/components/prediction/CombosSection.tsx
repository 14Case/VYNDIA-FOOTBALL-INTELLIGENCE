import React from "react";
import { ComboTicket } from "@/lib/football-data";
import { ComboTicketCard } from "./ComboTicketCard";
import { Badge } from "@/components/ui/Badge";

interface CombosSectionProps {
  combos: ComboTicket[];
}

export function CombosSection({ combos }: CombosSectionProps) {
  return (
    <section id="combos" className="space-y-4">
      {/* Header Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#1E293B]/80 via-[#0F172A] to-[#1E293B]/80 border border-[#334155] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#10B981] via-[#3B82F6] to-[#8B5CF6]" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="blue">COMBINAISONS MULTI-MATCHS</Badge>
              <h2 className="text-sm font-mono font-bold text-[#F8FAFC] uppercase tracking-wider">
                Tickets Combinés Recommandés par l&apos;Intelligence Artificielle
              </h2>
            </div>
            <p className="text-xs font-mono text-[#94A3B8]">
              Génération automatique de combinaisons à haute espérance de gain (+EV) à partir des simulations Bivariate Poisson et des matrices de corrélations de la Ligue des Champions.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
            <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[#E2E8F0] font-bold">3 Stratégies Disponibles</span>
          </div>
        </div>
      </div>

      {/* Grid of 3 Combo Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {combos.map((ticket) => (
          <ComboTicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>

      {/* Mathematical Rigor Note */}
      <div className="p-3.5 rounded-lg bg-[#090D16] border border-[#1E2D4A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-[#64748B]">
        <div className="flex items-center gap-2">
          <span className="text-[#38BDF8]">ℹ️ Note Modélisation :</span>
          <span>
            Les cotes combinées sont calculées par produit vectoriel avec neutralisation du sur-marge des opérateurs.
          </span>
        </div>
        <span className="text-[#34D399] font-semibold shrink-0">
          Expected Value positive vérifiée
        </span>
      </div>
    </section>
  );
}
