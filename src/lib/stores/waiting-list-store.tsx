"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { WaitingListEntry } from "@/types";
import { mockWaitingList } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";

interface WaitingListContextValue {
  entries: WaitingListEntry[];
  addEntry: (entry: Omit<WaitingListEntry, "id" | "dateAdded" | "updatedAt">) => void;
  updateEntry: (id: string, updates: Partial<WaitingListEntry>) => void;
  deleteEntry: (id: string) => void;
  getEntry: (id: string) => WaitingListEntry | undefined;
}

const WaitingListContext = createContext<WaitingListContextValue | null>(null);

export function WaitingListProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<WaitingListEntry[]>(mockWaitingList);

  const addEntry = useCallback(
    (data: Omit<WaitingListEntry, "id" | "dateAdded" | "updatedAt">) => {
      const now = new Date().toISOString();
      const entry: WaitingListEntry = {
        ...data,
        id: `wl-${generateId()}`,
        dateAdded: now,
        updatedAt: now,
      };
      setEntries((prev) => [entry, ...prev]);
    },
    []
  );

  const updateEntry = useCallback((id: string, updates: Partial<WaitingListEntry>) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e
      )
    );
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const getEntry = useCallback(
    (id: string) => entries.find((e) => e.id === id),
    [entries]
  );

  return (
    <WaitingListContext.Provider
      value={{ entries, addEntry, updateEntry, deleteEntry, getEntry }}
    >
      {children}
    </WaitingListContext.Provider>
  );
}

export function useWaitingList() {
  const ctx = useContext(WaitingListContext);
  if (!ctx) throw new Error("useWaitingList must be used within WaitingListProvider");
  return ctx;
}
