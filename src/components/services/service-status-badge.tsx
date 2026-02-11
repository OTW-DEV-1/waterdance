"use client";

import { Badge } from "@/components/ui/badge";
import { he } from "@/lib/i18n/he";
import type { ServiceStatus } from "@/types";

const statusConfig: Record<ServiceStatus, { label: string; variant: "default" | "outline" }> = {
  active: { label: he.services.statusActive, variant: "default" },
  archived: { label: he.services.statusArchived, variant: "outline" },
};

export function ServiceStatusBadge({ status }: { status: ServiceStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
