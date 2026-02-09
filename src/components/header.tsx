"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { he } from "@/lib/i18n/he";

interface HeaderProps {
  sidebarOpen: boolean;
}

export function Header({ sidebarOpen }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-30 h-14 bg-background/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 transition-all duration-300",
        sidebarOpen ? "right-64" : "right-16"
      )}
    >
      {/* Page area - left side in RTL */}
      <div className="flex items-center gap-2">
        {/* Placeholder for breadcrumbs or page title */}
      </div>

      {/* Actions - right side in RTL (appears on left due to RTL) */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            aria-label={he.header.toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        )}

        {/* Notifications */}
        <button
          className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors relative"
          aria-label={he.header.notifications}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 left-1 h-2 w-2 bg-destructive rounded-full" />
        </button>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-accent transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              {he.header.userInitials}
            </div>
            <span className="text-sm font-medium hidden sm:inline">{he.header.user}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          {userMenuOpen && (
            <div className="absolute left-0 top-full mt-1 w-48 bg-popover text-popover-foreground rounded-lg border border-border shadow-lg py-1 z-50">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent transition-colors">
                <User className="h-4 w-4" />
                <span>{he.userMenu.profile}</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent transition-colors">
                <Settings className="h-4 w-4" />
                <span>{he.userMenu.settings}</span>
              </button>
              <div className="border-t border-border my-1" />
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-accent transition-colors">
                <LogOut className="h-4 w-4" />
                <span>{he.userMenu.logout}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
