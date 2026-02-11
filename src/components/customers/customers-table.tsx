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
import { CustomerStatusBadge } from "./customer-status-badge";
import { CustomerFormDialog } from "./customer-form-dialog";
import { CustomerDeleteDialog } from "./customer-delete-dialog";
import { useCustomers } from "@/lib/stores";
import { he } from "@/lib/i18n/he";
import { formatDate } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";

export function CustomersTable() {
  const { customers } = useCustomers();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    if (!debouncedSearch) return customers;
    const q = debouncedSearch.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.company && c.company.toLowerCase().includes(q))
    );
  }, [customers, debouncedSearch]);

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
                <TableHead>{he.customers.customerName}</TableHead>
                <TableHead>{he.common.email}</TableHead>
                <TableHead>{he.common.phone}</TableHead>
                <TableHead>{he.customers.company}</TableHead>
                <TableHead>{he.common.status}</TableHead>
                <TableHead>{he.common.createdAt}</TableHead>
                <TableHead className="w-24">{he.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.company || "—"}</TableCell>
                  <TableCell>
                    <CustomerStatusBadge status={customer.status} />
                  </TableCell>
                  <TableCell>{formatDate(customer.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CustomerFormDialog mode="edit" customer={customer} />
                      <CustomerDeleteDialog
                        customerId={customer.id}
                        customerName={customer.name}
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
