import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { AgentCommandCenter } from "@/components/agents/AgentCommandCenter";

export default function AgentsPage() {
  return (
    <AppShell>
      <AgentCommandCenter />
    </AppShell>
  );
}
