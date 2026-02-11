"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Meeting } from "@/types";
import { mockMeetings } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";

interface MeetingsContextValue {
  meetings: Meeting[];
  addMeeting: (meeting: Omit<Meeting, "id" | "createdAt" | "updatedAt">) => void;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  getMeeting: (id: string) => Meeting | undefined;
}

const MeetingsContext = createContext<MeetingsContextValue | null>(null);

export function MeetingsProvider({ children }: { children: ReactNode }) {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);

  const addMeeting = useCallback(
    (data: Omit<Meeting, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const meeting: Meeting = {
        ...data,
        id: `meet-${generateId()}`,
        createdAt: now,
        updatedAt: now,
      };
      setMeetings((prev) => [meeting, ...prev]);
    },
    []
  );

  const updateMeeting = useCallback((id: string, updates: Partial<Meeting>) => {
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString() } : m
      )
    );
  }, []);

  const deleteMeeting = useCallback((id: string) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const getMeeting = useCallback(
    (id: string) => meetings.find((m) => m.id === id),
    [meetings]
  );

  return (
    <MeetingsContext.Provider
      value={{ meetings, addMeeting, updateMeeting, deleteMeeting, getMeeting }}
    >
      {children}
    </MeetingsContext.Provider>
  );
}

export function useMeetings() {
  const ctx = useContext(MeetingsContext);
  if (!ctx) throw new Error("useMeetings must be used within MeetingsProvider");
  return ctx;
}
