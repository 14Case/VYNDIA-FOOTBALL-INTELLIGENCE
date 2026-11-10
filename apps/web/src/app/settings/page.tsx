"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const [fastApiOnline, setFastApiOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/health")
      .then((res) => {
        if (res.ok) setFastApiOnline(true);
      })
      .catch(() => setFastApiOnline(false))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-mono font-bold text-[#F8FAFC]">
              SYSTEM & TERMINAL SETTINGS
            </h1>
            <Badge variant="blue">CONFIGURATION</Badge>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Backend connection parameters, model hyperparameters, and analyst session configuration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm">
            <span>Save Settings</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backend & Database Infrastructure */}
        <div className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] p-5 space-y-4">
          <h2 className="text-sm font-mono font-bold text-[#F8FAFC] uppercase tracking-wider">
            Infrastructure Connectivity
          </h2>

          <div className="space-y-3 text-xs font-mono">
            {/* FastAPI Backend */}
            <div className="p-3 rounded bg-[#0D1322] border border-[#1E2D4A] flex items-center justify-between">
              <div>
                <div className="font-bold text-[#F8FAFC]">FastAPI Python Engine</div>
                <div className="text-[10px] text-[#64748B]">Endpoint: http://localhost:8000</div>
              </div>
              <div>
                {loading ? (
                  <span className="text-[#F59E0B]">Checking...</span>
                ) : fastApiOnline ? (
                  <Badge variant="green">ONLINE (200 OK)</Badge>
                ) : (
                  <Badge variant="red">OFFLINE / STANDBY</Badge>
                )}
              </div>
            </div>

            {/* Supabase / PostgreSQL */}
            <div className="p-3 rounded bg-[#0D1322] border border-[#1E2D4A] flex items-center justify-between">
              <div>
                <div className="font-bold text-[#F8FAFC]">Supabase PostgreSQL</div>
                <div className="text-[10px] text-[#64748B]">Prisma Client v7 / Database URL</div>
              </div>
              <div>
                <Badge variant="blue">CONFIGURED (READY)</Badge>
              </div>
            </div>

            {/* Ingestion Pipeline */}
            <div className="p-3 rounded bg-[#0D1322] border border-[#1E2D4A] flex items-center justify-between">
              <div>
                <div className="font-bold text-[#F8FAFC]">Data Ingestion Pipeline</div>
                <div className="text-[10px] text-[#64748B]">Sync interval: 60 seconds</div>
              </div>
              <div>
                <Badge variant="green">ACTIVE</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Inference & Odds Thresholds */}
        <div className="rounded-lg bg-[#121A2D] border border-[#1E2D4A] p-5 space-y-4">
          <h2 className="text-sm font-mono font-bold text-[#F8FAFC] uppercase tracking-wider">
            Analytical Thresholds
          </h2>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-[#94A3B8] mb-1">
                Minimum Edge Yield Filter (% Expected Value)
              </label>
              <input
                type="number"
                defaultValue={3.0}
                step={0.5}
                className="w-full px-3 py-2 rounded bg-[#0D1322] border border-[#1E2D4A] text-[#F8FAFC] focus:border-[#3B82F6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#94A3B8] mb-1">
                Confidence Rating Threshold (%)
              </label>
              <input
                type="number"
                defaultValue={80}
                className="w-full px-3 py-2 rounded bg-[#0D1322] border border-[#1E2D4A] text-[#F8FAFC] focus:border-[#3B82F6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#94A3B8] mb-1">
                Default Primary Model
              </label>
              <select className="w-full px-3 py-2 rounded bg-[#0D1322] border border-[#1E2D4A] text-[#F8FAFC] focus:border-[#3B82F6] focus:outline-none">
                <option>v4.2-NEURAL-HYBRID (Recommended)</option>
                <option>v3.8.0-POISSON (Bivariate Scorelines)</option>
                <option>v2.4.0-ARBITRAGE (Consensus Edge Only)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
