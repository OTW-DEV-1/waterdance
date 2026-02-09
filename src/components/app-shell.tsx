"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <Header sidebarOpen={sidebarOpen} />
      <main
        className={cn(
          "pt-14 transition-all duration-300",
          sidebarOpen ? "mr-64" : "mr-16"
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
