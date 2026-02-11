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
import { MeetingStatusBadge } from "./meeting-status-badge";
import { MeetingFormDialog } from "./meeting-form-dialog";
import { MeetingDeleteDialog } from "./meeting-delete-dialog";
import { useMeetings } from "@/lib/stores";
import { he } from "@/lib/i18n/he";
import { useDebounce } from "@/hooks/use-debounce";

export function MeetingsTable() {
  const { meetings } = useMeetings();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    if (!debouncedSearch) return meetings;
    const q = debouncedSearch.toLowerCase();
    return meetings.filter(
      (m) =>
        m.customerName.toLowerCase().includes(q) ||
        m.serviceName.toLowerCase().includes(q) ||
        m.agentName.toLowerCase().includes(q)
    );
  }, [meetings, debouncedSearch]);

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
                <TableHead>{he.meetings.customer}</TableHead>
                <TableHead>{he.meetings.service}</TableHead>
                <TableHead>{he.meetings.agent}</TableHead>
                <TableHead>{he.common.date}</TableHead>
                <TableHead>{he.common.time}</TableHead>
                <TableHead>{he.common.status}</TableHead>
                <TableHead className="w-24">{he.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell className="font-medium">{meeting.customerName}</TableCell>
                  <TableCell>{meeting.serviceName}</TableCell>
                  <TableCell>{meeting.agentName}</TableCell>
                  <TableCell>{meeting.date}</TableCell>
                  <TableCell>{meeting.time}</TableCell>
                  <TableCell>
                    <MeetingStatusBadge status={meeting.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MeetingFormDialog mode="edit" meeting={meeting} />
                      <MeetingDeleteDialog meetingId={meeting.id} />
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
