"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Users,
  BarChart3,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { he } from "@/lib/i18n/he";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: "dashboard", href: "/", label: he.nav.dashboard, icon: LayoutDashboard },
  { id: "meetings", href: "/meetings", label: he.nav.meetings, icon: CalendarDays },
  { id: "waiting-list", href: "/waiting-list", label: he.nav.waitingList, icon: ClipboardList },
  { id: "customers", href: "/customers", label: he.nav.customers, icon: Users },
  { id: "reports", href: "/reports", label: he.nav.reports, icon: BarChart3 },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed top-0 right-0 z-40 h-screen bg-sidebar text-sidebar-foreground border-l border-sidebar-border transition-all duration-300 ease-in-out flex flex-col",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Logo / Brand */}
      <div className="flex items-center h-14 border-b border-sidebar-border px-3">
        {isOpen && (
          <span className="text-lg font-bold truncate flex-1">{he.app.name}</span>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors mr-auto"
          aria-label={isOpen ? he.sidebar.closeMenu : he.sidebar.openMenu}
        >
          {isOpen ? (
            <ChevronsRight className="h-5 w-5" />
          ) : (
            <ChevronsLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              title={!isOpen ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {isOpen && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
