import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { StatusChip } from "@/components/ui/StatusChip";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DEMO_AGENTS } from "@/data/demo-data";

export default function AgentsPage() {
  return (
    <AppShell>
      {/* Header */}
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
          <Button variant="secondary" size="sm">
            <span>Ping All Agents</span>
          </Button>
          <Button variant="primary" size="sm">
            <span>Deploy Model Update</span>
          </Button>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEMO_AGENTS.map((agent) => (
          <div
            key={agent.id}
            className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] hover:border-[#2A3C60] transition-all p-5 space-y-4 relative overflow-hidden"
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
                <div className="text-[#60A5FA] font-bold mt-0.5">{agent.latencyMs}ms</div>
              </div>
              <div>
                <span className="text-[10px] text-[#64748B]">PREDICTIONS</span>
                <div className="text-[#F8FAFC] font-semibold mt-0.5">{agent.predictionsCount}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#64748B] pt-1">
              <span>Model: <span className="text-[#CBD5E1]">{agent.modelVersion}</span></span>
              <span>Heartbeat: <span className="text-[#34D399]">{agent.lastActive}</span></span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
