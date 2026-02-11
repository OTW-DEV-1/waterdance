"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil } from "lucide-react";
import { useWaitingList, useCustomers, useServices } from "@/lib/stores";
import { he } from "@/lib/i18n/he";
import { toast } from "sonner";
import type { WaitingListEntry, WaitingListPriority, WaitingListStatus } from "@/types";

interface WaitingListFormDialogProps {
  mode: "create" | "edit";
  entry?: WaitingListEntry;
}

export function WaitingListFormDialog({ mode, entry }: WaitingListFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [priority, setPriority] = useState<WaitingListPriority>("medium");
  const [status, setStatus] = useState<WaitingListStatus>("waiting");
  const [notes, setNotes] = useState("");

  const { addEntry, updateEntry } = useWaitingList();
  const { customers } = useCustomers();
  const { services } = useServices();

  useEffect(() => {
    if (entry && mode === "edit") {
      setCustomerId(entry.customerId);
      setServiceId(entry.serviceId);
      setPriority(entry.priority);
      setStatus(entry.status);
      setNotes(entry.notes);
    }
  }, [entry, mode]);

  function resetForm() {
    setCustomerId("");
    setServiceId("");
    setPriority("medium");
    setStatus("waiting");
    setNotes("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const customer = customers.find((c) => c.id === customerId);
    const service = services.find((s) => s.id === serviceId);

    const data = {
      customerId,
      customerName: customer?.name || "",
      serviceId,
      serviceName: service?.name || "",
      priority,
      status,
      notes,
    };

    if (mode === "create") {
      addEntry(data);
      toast.success(he.waitingList.entryCreated);
    } else if (entry) {
      updateEntry(entry.id, data);
      toast.success(he.waitingList.entryUpdated);
    }

    setOpen(false);
    if (mode === "create") resetForm();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button>
            <Plus className="h-4 w-4 ml-2" />
            {he.waitingList.addEntry}
          </Button>
        ) : (
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? he.waitingList.addEntry : he.waitingList.editEntry}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{he.waitingList.customer}</Label>
              <Select value={customerId} onValueChange={setCustomerId}>
                <SelectTrigger><SelectValue placeholder={he.meetings.selectCustomer} /></SelectTrigger>
                <SelectContent>
                  {customers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{he.waitingList.service}</Label>
              <Select value={serviceId} onValueChange={setServiceId}>
                <SelectTrigger><SelectValue placeholder={he.meetings.selectService} /></SelectTrigger>
                <SelectContent>
                  {services.filter((s) => s.status === "active").map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{he.waitingList.priority}</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as WaitingListPriority)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{he.waitingList.priorityLow}</SelectItem>
                  <SelectItem value="medium">{he.waitingList.priorityMedium}</SelectItem>
                  <SelectItem value="high">{he.waitingList.priorityHigh}</SelectItem>
                  <SelectItem value="urgent">{he.waitingList.priorityUrgent}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{he.common.status}</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as WaitingListStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="waiting">{he.waitingList.statusWaiting}</SelectItem>
                  <SelectItem value="contacted">{he.waitingList.statusContacted}</SelectItem>
                  <SelectItem value="scheduled">{he.waitingList.statusScheduled}</SelectItem>
                  <SelectItem value="removed">{he.waitingList.statusRemoved}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>{he.common.notes}</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {he.common.cancel}
            </Button>
            <Button type="submit">{he.common.save}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
