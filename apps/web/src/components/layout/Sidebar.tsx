"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      href: "/",
      icon: (active) => (
        <svg className={`w-4 h-4 ${active ? "text-[#3B82F6]" : "text-[#94A3B8]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: "Live Matches",
      href: "/live",
      badge: "2 LIVE",
      badgeColor: "bg-[#EF4444]/20 text-[#F87171] border-[#EF4444]/40",
      icon: (active) => (
        <svg className={`w-4 h-4 ${active ? "text-[#EF4444]" : "text-[#94A3B8]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: "Upcoming",
      href: "/upcoming",
      icon: (active) => (
        <svg className={`w-4 h-4 ${active ? "text-[#3B82F6]" : "text-[#94A3B8]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "Predictions",
      href: "/predictions",
      badge: "AI EDGE",
      badgeColor: "bg-[#8B5CF6]/20 text-[#A78BFA] border-[#8B5CF6]/40",
      icon: (active) => (
        <svg className={`w-4 h-4 ${active ? "text-[#8B5CF6]" : "text-[#94A3B8]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      name: "Competitions",
      href: "/competitions",
      icon: (active) => (
        <svg className={`w-4 h-4 ${active ? "text-[#3B82F6]" : "text-[#94A3B8]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      name: "Teams",
      href: "/teams",
      icon: (active) => (
        <svg className={`w-4 h-4 ${active ? "text-[#3B82F6]" : "text-[#94A3B8]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      name: "Players",
      href: "/players",
      icon: (active) => (
        <svg className={`w-4 h-4 ${active ? "text-[#3B82F6]" : "text-[#94A3B8]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      name: "Statistical Analysis",
      href: "/analysis",
      icon: (active) => (
        <svg className={`w-4 h-4 ${active ? "text-[#3B82F6]" : "text-[#94A3B8]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      name: "AI Agents",
      href: "/agents",
      badge: "4 ACTIVE",
      badgeColor: "bg-[#10B981]/20 text-[#34D399] border-[#10B981]/40",
      icon: (active) => (
        <svg className={`w-4 h-4 ${active ? "text-[#10B981]" : "text-[#94A3B8]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "Settings",
      href: "/settings",
      icon: (active) => (
        <svg className={`w-4 h-4 ${active ? "text-[#3B82F6]" : "text-[#94A3B8]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`h-screen sticky top-0 bg-[#051424] border-r border-[#1E2D4A] flex flex-col justify-between transition-all duration-300 z-30 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Top Header / Logo */}
      <div>
        <div className="h-14 border-b border-[#1E2D4A] px-4 flex items-center justify-between">
          {!collapsed ? (
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center font-mono font-bold text-xs text-white shadow-sm">
                V
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold font-mono tracking-widest text-[#F8FAFC]">
                  VYNDIA
                </span>
                <span className="text-[9px] font-mono tracking-wider text-[#64748B]">
                  FOOTBALL INTEL
                </span>
              </div>
            </Link>
          ) : (
            <div className="mx-auto h-7 w-7 rounded bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center font-mono font-bold text-xs text-white">
              V
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-[#64748B] hover:text-[#CBD5E1] p-1 rounded hover:bg-[#1E2D4A]/40 transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {collapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              )}
            </svg>
          </button>
        </div>

        {/* Quick Search Shortcut */}
        {!collapsed && (
          <div className="p-3">
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-[#0D1322] border border-[#1E2D4A] text-xs font-mono text-[#64748B]">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Command Matrix</span>
              </span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#162035] text-[10px] text-[#94A3B8] border border-[#1E2D4A]">
                ⌘K
              </kbd>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="px-2 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-2.5 py-2 rounded text-xs transition-all ${
                  isActive
                    ? "bg-[#121A2D] text-[#F8FAFC] border border-[#2A3C60] font-medium"
                    : "text-[#94A3B8] hover:bg-[#0D1322] hover:text-[#CBD5E1]"
                } ${collapsed ? "justify-center" : ""}`}
                title={collapsed ? item.name : undefined}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon(isActive)}
                  {!collapsed && <span>{item.name}</span>}
                </div>

                {!collapsed && item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                      item.badgeColor || "bg-[#1E2D4A] text-[#94A3B8] border-[#1E2D4A]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-3 border-t border-[#1E2D4A] space-y-2">
        {!collapsed ? (
          <>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B]">
              <span>ACTIVE MODEL:</span>
              <span className="text-[#34D399] font-medium">v4.2-NEURAL</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B]">
              <span>TELEMETRY PING:</span>
              <span className="text-[#60A5FA]">18ms (OK)</span>
            </div>
            <Link
              href="/login"
              className="block w-full py-1.5 text-center text-xs font-mono font-medium rounded bg-[#121A2D] hover:bg-[#162035] text-[#CBD5E1] border border-[#1E2D4A] hover:border-[#2A3C60] transition-colors mt-2"
            >
              Sign In / Session
            </Link>
          </>
        ) : (
          <div className="text-center">
            <span className="h-2 w-2 rounded-full bg-[#10B981] inline-block" title="Online" />
          </div>
        )}
      </div>
    </aside>
  );
}
