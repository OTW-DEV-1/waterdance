"use client";

import { Badge } from "@/components/ui/badge";
import { he } from "@/lib/i18n/he";
import type { WaitingListPriority, WaitingListStatus } from "@/types";

const priorityConfig: Record<WaitingListPriority, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  low: { label: he.waitingList.priorityLow, variant: "outline" },
  medium: { label: he.waitingList.priorityMedium, variant: "secondary" },
  high: { label: he.waitingList.priorityHigh, variant: "default" },
  urgent: { label: he.waitingList.priorityUrgent, variant: "destructive" },
};

const statusConfig: Record<WaitingListStatus, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  waiting: { label: he.waitingList.statusWaiting, variant: "default" },
  contacted: { label: he.waitingList.statusContacted, variant: "secondary" },
  scheduled: { label: he.waitingList.statusScheduled, variant: "outline" },
  removed: { label: he.waitingList.statusRemoved, variant: "destructive" },
};

export function WaitingListPriorityBadge({ priority }: { priority: WaitingListPriority }) {
  const config = priorityConfig[priority];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function WaitingListStatusBadge({ status }: { status: WaitingListStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
