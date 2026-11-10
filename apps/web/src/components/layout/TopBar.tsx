"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopBar() {
  const pathname = usePathname();
  const [backendStatus, setBackendStatus] = useState<"checking" | "online" | "offline">("checking");

  useEffect(() => {
    // Check FastAPI health endpoint
    fetch("http://localhost:8000/api/v1/health")
      .then((res) => {
        if (res.ok) setBackendStatus("online");
        else setBackendStatus("offline");
      })
      .catch(() => setBackendStatus("offline"));
  }, []);

  // Format pathname into readable title
  const getPageTitle = (path: string) => {
    if (path === "/") return "Overview Dashboard";
    if (path.startsWith("/live")) return "Live Match Telemetry";
    if (path.startsWith("/upcoming")) return "Upcoming Fixtures & Odds";
    if (path.startsWith("/matches")) return "Detailed Match Analysis";
    if (path.startsWith("/predictions")) return "AI Prediction Center";
    if (path.startsWith("/competitions")) return "Competitions & Leagues";
    if (path.startsWith("/teams")) return "Teams & Rosters";
    if (path.startsWith("/players")) return "Players Database";
    if (path.startsWith("/analysis")) return "Statistical & Tactical Analysis";
    if (path.startsWith("/agents")) return "AI Agent Orchestration Center";
    if (path.startsWith("/settings")) return "System & Terminal Settings";
    return "Football Intelligence";
  };

  return (
    <header className="h-14 border-b border-[#1E2D4A] bg-[#090D16]/95 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Breadcrumb / Title */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-[#64748B]">TERMINAL //</span>
        <h1 className="text-sm font-semibold font-mono tracking-tight text-[#F8FAFC]">
          {getPageTitle(pathname)}
        </h1>
      </div>

      {/* Right: Telemetry & Actions */}
      <div className="flex items-center gap-4">
        {/* Backend Connectivity Status */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0D1322] border border-[#1E2D4A] text-[11px] font-mono">
          <span className="text-[#64748B]">FASTAPI:</span>
          {backendStatus === "online" ? (
            <span className="text-[#34D399] flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
              ONLINE
            </span>
          ) : backendStatus === "checking" ? (
            <span className="text-[#F59E0B]">CONNECTING</span>
          ) : (
            <span className="text-[#F87171] flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
              STANDBY
            </span>
          )}
        </div>

        {/* Live Odds Feed Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0D1322] border border-[#1E2D4A] text-[11px] font-mono text-[#CBD5E1]">
          <span className="text-[#64748B]">FEED:</span>
          <span className="text-[#60A5FA]">SPATIAL v4.2</span>
        </div>

        {/* User Pill / Login Link */}
        <Link
          href="/login"
          className="flex items-center gap-2 pl-2 pr-3 py-1 rounded bg-[#121A2D] hover:bg-[#162035] border border-[#1E2D4A] hover:border-[#2A3C60] transition-colors"
        >
          <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-[10px] font-mono font-bold text-white">
            A
          </div>
          <span className="text-xs font-mono text-[#CBD5E1]">Analyst Session</span>
        </Link>
      </div>
    </header>
  );
}
