import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#051424] flex flex-col items-center justify-center p-4">
      {/* Container Card */}
      <div className="w-full max-w-md rounded-lg bg-[#121A2D] border border-[#1E2D4A] p-8 space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent" />

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-10 w-10 rounded bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center font-mono font-bold text-lg text-white shadow-md">
            V
          </div>
          <h1 className="text-xl font-mono font-bold tracking-wider text-[#F8FAFC]">
            CREATE ANALYST PROFILE
          </h1>
          <p className="text-xs font-mono text-[#94A3B8]">
            Access live machine learning telemetry and probability models
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4 text-xs font-mono">
          <div className="space-y-1">
            <label className="block text-[#94A3B8]">Full Name</label>
            <input
              type="text"
              placeholder="Alex Ferguson"
              required
              className="w-full px-3 py-2 rounded bg-[#0D1322] border border-[#1E2D4A] text-[#F8FAFC] placeholder-[#64748B] focus:border-[#3B82F6] focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[#94A3B8]">Work Email</label>
            <input
              type="email"
              placeholder="alex@club.com"
              required
              className="w-full px-3 py-2 rounded bg-[#0D1322] border border-[#1E2D4A] text-[#F8FAFC] placeholder-[#64748B] focus:border-[#3B82F6] focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[#94A3B8]">Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              required
              className="w-full px-3 py-2 rounded bg-[#0D1322] border border-[#1E2D4A] text-[#F8FAFC] placeholder-[#64748B] focus:border-[#3B82F6] focus:outline-none transition-colors"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Register Analyst Account →
          </Button>
        </form>

        {/* Footer Links */}
        <div className="pt-4 border-t border-[#1E2D4A] text-center text-xs font-mono text-[#64748B] space-y-2">
          <div>
            Already registered?{" "}
            <Link href="/login" className="text-[#3B82F6] hover:underline font-medium">
              Sign in to session
            </Link>
          </div>
          <div>
            <Link href="/" className="text-[#94A3B8] hover:text-[#F8FAFC]">
              ← Continue as Guest to Overview
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 text-[10px] font-mono text-[#64748B] tracking-wider uppercase">
        DEMO DATA // PROBABILISTIC MODEL - NOT BETTING ADVICE
      </div>
    </div>
  );
}
