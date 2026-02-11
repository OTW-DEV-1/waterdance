"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { he } from "@/lib/i18n/he";

interface DataTableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode;
}

export function DataTableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  children,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder || he.common.searchPlaceholder}
          className="pr-9"
        />
      </div>
      {children}
    </div>
  );
}
