import React from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-[#090D16] text-[#CBD5E1]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
