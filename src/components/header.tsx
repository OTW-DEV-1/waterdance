"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Sun, Moon, Bell, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { he } from "@/lib/i18n/he";
import { useAuth } from "@/lib/stores";

interface HeaderProps {
  sidebarOpen: boolean;
}

export function Header({ sidebarOpen }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-30 h-14 bg-background/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 transition-all duration-300",
        sidebarOpen ? "right-64" : "right-16"
      )}
    >
      <div className="flex items-center gap-2" />

      <div className="flex items-center gap-1">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={he.header.toggleTheme}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        )}

        <Button variant="ghost" size="icon" className="relative" aria-label={he.header.notifications}>
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 left-1.5 h-2 w-2 bg-destructive rounded-full" />
        </Button>

        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 pr-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {user?.name?.slice(0, 2) || he.header.userInitials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:inline">
                {user?.name || he.header.user}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem>
              <User className="h-4 w-4 ml-2" />
              {he.userMenu.profile}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 ml-2" />
              {he.userMenu.settings}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4 ml-2" />
              {he.userMenu.logout}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
