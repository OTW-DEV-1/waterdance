"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "@/components/shared/data-table-toolbar";
import { EmptyState } from "@/components/shared/empty-state";
import { ServiceStatusBadge } from "./service-status-badge";
import { ServiceFormDialog } from "./service-form-dialog";
import { ServiceDeleteDialog } from "./service-delete-dialog";
import { useServices } from "@/lib/stores";
import { he } from "@/lib/i18n/he";
import { formatCurrency } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";

export function ServicesTable() {
  const { services } = useServices();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    if (!debouncedSearch) return services;
    const q = debouncedSearch.toLowerCase();
    return services.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [services, debouncedSearch]);

  return (
    <div className="space-y-4">
      <DataTableToolbar searchValue={search} onSearchChange={setSearch} />

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{he.services.serviceName}</TableHead>
                <TableHead>{he.services.serviceDescription}</TableHead>
                <TableHead>{he.services.duration}</TableHead>
                <TableHead>{he.services.price}</TableHead>
                <TableHead>{he.services.bufferTime}</TableHead>
                <TableHead>{he.common.status}</TableHead>
                <TableHead className="w-24">{he.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{service.description}</TableCell>
                  <TableCell>{service.duration} {he.services.minutes}</TableCell>
                  <TableCell>{formatCurrency(service.price)}</TableCell>
                  <TableCell>{service.bufferTime} {he.services.minutes}</TableCell>
                  <TableCell>
                    <ServiceStatusBadge status={service.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <ServiceFormDialog mode="edit" service={service} />
                      <ServiceDeleteDialog
                        serviceId={service.id}
                        serviceName={service.name}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
