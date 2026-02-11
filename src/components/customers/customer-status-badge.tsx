"use client";

import { Badge } from "@/components/ui/badge";
import { he } from "@/lib/i18n/he";
import type { CustomerStatus } from "@/types";

const statusConfig: Record<CustomerStatus, { label: string; variant: "default" | "secondary" | "outline" }> = {
  active: { label: he.customers.statusActive, variant: "default" },
  lead: { label: he.customers.statusLead, variant: "secondary" },
  inactive: { label: he.customers.statusInactive, variant: "outline" },
};

export function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
