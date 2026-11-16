import { NextResponse } from "next/server";
import { DEMO_AGENTS } from "@/data/demo-data";

export async function GET() {
  const fastapiUrl = process.env.FASTAPI_URL ?? "http://localhost:8000";

  try {
    const res = await fetch(`${fastapiUrl}/api/v1/agents`, {
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(1500),
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch {
    // Graceful fallback if FastAPI is offline
  }

  return NextResponse.json({
    status: "active",
    orchestrator_version: "v1.4.0",
    total_agents: DEMO_AGENTS.length,
    agents: DEMO_AGENTS,
  });
}
