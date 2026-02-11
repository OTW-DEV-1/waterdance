"use client";

import { Badge } from "@/components/ui/badge";
import { he } from "@/lib/i18n/he";
import type { MeetingStatus } from "@/types";

const statusConfig: Record<MeetingStatus, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  scheduled: { label: he.meetings.statusScheduled, variant: "default" },
  completed: { label: he.meetings.statusCompleted, variant: "secondary" },
  cancelled: { label: he.meetings.statusCancelled, variant: "outline" },
  "no-show": { label: he.meetings.statusNoShow, variant: "destructive" },
};

export function MeetingStatusBadge({ status }: { status: MeetingStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
