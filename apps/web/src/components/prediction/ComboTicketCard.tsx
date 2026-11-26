"use client";

import React, { useState } from "react";
import { ComboTicket } from "@/lib/football-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ComboTicketCardProps {
  ticket: ComboTicket;
}

export function ComboTicketCard({ ticket }: ComboTicketCardProps) {
  const [stake, setStake] = useState<number>(ticket.recommendedStake || 20);
  const [copied, setCopied] = useState<boolean>(false);

  const potentialPayout = (stake * ticket.totalOdds).toFixed(2);
  const netProfit = (stake * ticket.totalOdds - stake).toFixed(2);

  const borderGlow =
    ticket.category === "SAFE"
      ? "border-[#10B981]/40 shadow-[0_0_25px_rgba(16,185,129,0.08)]"
      : ticket.category === "CHAMPIONS_LEAGUE"
      ? "border-[#3B82F6]/50 shadow-[0_0_25px_rgba(59,130,246,0.12)]"
      : ticket.category === "AUDACIOUS"
      ? "border-[#F59E0B]/40 shadow-[0_0_25px_rgba(245,158,11,0.08)]"
      : "border-[#8B5CF6]/40 shadow-[0_0_25px_rgba(139,92,246,0.08)]";

  const topGradient =
    ticket.category === "SAFE"
      ? "from-[#10B981]/40 via-[#10B981]/10 to-transparent"
      : ticket.category === "CHAMPIONS_LEAGUE"
      ? "from-[#38BDF8]/50 via-[#3B82F6]/20 to-transparent"
      : ticket.category === "AUDACIOUS"
      ? "from-[#F59E0B]/40 via-[#F59E0B]/10 to-transparent"
      : "from-[#8B5CF6]/40 via-[#8B5CF6]/10 to-transparent";

  const handleCopy = () => {
    const text = `🏆 VYNDIA AI — ${ticket.title} (Cote @${ticket.totalOdds})\n` +
      `----------------------------------------\n` +
      ticket.selections
        .map(
          (s, idx) =>
            `${idx + 1}. ${s.homeTeam} vs ${s.awayTeam} (${s.kickoffTime})\n   👉 Sélection: ${s.tip} @${s.odds.toFixed(2)} (Confiance: ${s.confidence}%)\n`
        )
        .join("\n") +
      `----------------------------------------\n` +
      `Cote Totale: ${ticket.totalOdds} | EV: ${ticket.expectedValue}\n` +
      `Mise conseillée: ${stake}€ ➔ Gain potentiel: ${potentialPayout}€`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className={`rounded-xl bg-[#0F172A] border ${borderGlow} p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:scale-[1.01]`}
    >
      {/* Top Accent Light Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${topGradient}`} />

      {/* Ticket Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant={ticket.badgeVariant}>
            {ticket.category === "SAFE"
              ? "🛡️ SÉCURISÉ / FAIBLE RISQUE"
              : ticket.category === "CHAMPIONS_LEAGUE"
              ? "⭐ CHOCS DU SOIR (EUROPE)"
              : ticket.category === "AUDACIOUS"
              ? "🎯 AUDACIEUX / MULTI-BUTS"
              : "⚡ VALUE MAX (+EV)"}
          </Badge>
          <span className="text-[11px] font-mono font-bold text-[#34D399]">
            {ticket.expectedValue}
          </span>
        </div>

        <h3 className="text-base font-mono font-bold text-[#F8FAFC] tracking-tight">
          {ticket.title}
        </h3>
        <p className="text-xs font-mono text-[#94A3B8] mt-1 mb-3">
          {ticket.tagline}
        </p>

        {ticket.learnedRule && (
          <div className="p-2 mb-3 rounded bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[10px] font-mono text-[#38BDF8] flex items-center gap-1.5">
            <span>{ticket.learnedRule}</span>
          </div>
        )}

        {/* Big Odds Box */}
        <div className="p-3.5 rounded-lg bg-[#090D16] border border-[#1E2D4A] flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block">
              Cote Totale Combinée
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-mono font-black text-[#F8FAFC]">
                @{ticket.totalOdds.toFixed(2)}
              </span>
              <span className="text-[10px] font-mono text-[#38BDF8]">
                ({ticket.selections.length} Sélections)
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block">
              Taux Réussite Estimé
            </span>
            <span className="text-sm font-mono font-bold text-[#34D399]">
              {ticket.winProbability}%
            </span>
          </div>
        </div>

        {/* Selections List */}
        <div className="space-y-2.5 mb-5">
          <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
            Sélections Analysées par le Modèle
          </div>

          {ticket.selections.map((sel, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-md bg-[#131E35]/60 border border-[#1E2D4A] hover:border-[#2A3C60] transition-colors"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-1">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
                  <span className="text-[#E2E8F0] font-medium truncate">
                    {sel.homeTeam} vs {sel.awayTeam}
                  </span>
                </span>
                <span className="text-[10px] text-[#38BDF8] shrink-0 font-bold ml-2">
                  {sel.kickoffTime}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 mt-1.5">
                <span className="text-xs font-mono font-bold text-[#34D399] bg-[#34D399]/10 px-2 py-0.5 rounded border border-[#34D399]/30">
                  {sel.tip}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#64748B]">
                    Confiance {sel.confidence}%
                  </span>
                  <span className="text-xs font-mono font-bold text-[#F8FAFC] bg-[#090D16] px-1.5 py-0.5 rounded border border-[#1E2D4A]">
                    @{sel.odds.toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-[10px] font-mono text-[#64748B] mt-1.5 leading-relaxed">
                {sel.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Simulator / Payout Section */}
      <div className="pt-3 border-t border-[#1E2D4A] space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-1.5">
            <span>Simulateur de Mise :</span>
            <div className="flex gap-1.5">
              {[10, 20, 50, 100].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setStake(amount)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    stake === amount
                      ? "bg-[#3B82F6] text-white font-bold"
                      : "bg-[#090D16] text-[#94A3B8] hover:text-white border border-[#1E2D4A]"
                  }`}
                >
                  {amount}€
                </button>
              ))}
            </div>
          </div>

          <div className="p-2.5 rounded bg-[#090D16] border border-[#1E2D4A] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#64748B] block">
                Mise : {stake} €
              </span>
              <span className="text-xs font-mono text-[#94A3B8]">
                Bénéfice net :{" "}
                <span className="text-[#34D399] font-bold">+{netProfit} €</span>
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-[#64748B] uppercase block">
                Gain Potentiel
              </span>
              <span className="text-lg font-mono font-black text-[#38BDF8]">
                {potentialPayout} €
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant={ticket.category === "CHAMPIONS_LEAGUE" ? "primary" : "secondary"}
          size="sm"
          className="w-full justify-center text-xs font-mono font-bold"
          onClick={handleCopy}
        >
          {copied ? "✓ Ticket Copié dans le Presse-Papier !" : "Copier ce Ticket Combiné"}
        </Button>
      </div>
    </div>
  );
}
