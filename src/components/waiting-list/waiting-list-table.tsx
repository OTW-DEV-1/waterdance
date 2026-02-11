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
import { WaitingListPriorityBadge, WaitingListStatusBadge } from "./waiting-list-priority-badge";
import { WaitingListFormDialog } from "./waiting-list-form-dialog";
import { WaitingListDeleteDialog } from "./waiting-list-delete-dialog";
import { useWaitingList } from "@/lib/stores";
import { he } from "@/lib/i18n/he";
import { formatDate } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";

export function WaitingListTable() {
  const { entries } = useWaitingList();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    if (!debouncedSearch) return entries;
    const q = debouncedSearch.toLowerCase();
    return entries.filter(
      (e) =>
        e.customerName.toLowerCase().includes(q) ||
        e.serviceName.toLowerCase().includes(q)
    );
  }, [entries, debouncedSearch]);

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
                <TableHead>{he.waitingList.customer}</TableHead>
                <TableHead>{he.waitingList.service}</TableHead>
                <TableHead>{he.waitingList.priority}</TableHead>
                <TableHead>{he.common.status}</TableHead>
                <TableHead>{he.waitingList.dateAdded}</TableHead>
                <TableHead>{he.common.notes}</TableHead>
                <TableHead className="w-24">{he.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.customerName}</TableCell>
                  <TableCell>{entry.serviceName}</TableCell>
                  <TableCell>
                    <WaitingListPriorityBadge priority={entry.priority} />
                  </TableCell>
                  <TableCell>
                    <WaitingListStatusBadge status={entry.status} />
                  </TableCell>
                  <TableCell>{formatDate(entry.dateAdded)}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{entry.notes || "—"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <WaitingListFormDialog mode="edit" entry={entry} />
                      <WaitingListDeleteDialog entryId={entry.id} />
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
