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
import { Input } from "@/components/ui/input";
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
import { useMeetings, useCustomers, useServices } from "@/lib/stores";
import { mockUsers } from "@/lib/mock-data";
import { he } from "@/lib/i18n/he";
import { toast } from "sonner";
import type { Meeting, MeetingStatus } from "@/types";

interface MeetingFormDialogProps {
  mode: "create" | "edit";
  meeting?: Meeting;
}

export function MeetingFormDialog({ mode, meeting }: MeetingFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [agentId, setAgentId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<MeetingStatus>("scheduled");
  const [notes, setNotes] = useState("");

  const { addMeeting, updateMeeting } = useMeetings();
  const { customers } = useCustomers();
  const { services } = useServices();

  useEffect(() => {
    if (meeting && mode === "edit") {
      setCustomerId(meeting.customerId);
      setServiceId(meeting.serviceId);
      setAgentId(meeting.agentId);
      setDate(meeting.date);
      setTime(meeting.time);
      setStatus(meeting.status);
      setNotes(meeting.notes);
    }
  }, [meeting, mode]);

  function resetForm() {
    setCustomerId("");
    setServiceId("");
    setAgentId("");
    setDate("");
    setTime("");
    setStatus("scheduled");
    setNotes("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const customer = customers.find((c) => c.id === customerId);
    const service = services.find((s) => s.id === serviceId);
    const agent = mockUsers.find((u) => u.id === agentId);

    const data = {
      customerId,
      customerName: customer?.name || "",
      serviceId,
      serviceName: service?.name || "",
      agentId,
      agentName: agent?.name || "",
      date,
      time,
      status,
      notes,
    };

    if (mode === "create") {
      addMeeting(data);
      toast.success(he.meetings.meetingCreated);
    } else if (meeting) {
      updateMeeting(meeting.id, data);
      toast.success(he.meetings.meetingUpdated);
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
            {he.meetings.addMeeting}
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
            {mode === "create" ? he.meetings.addMeeting : he.meetings.editMeeting}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{he.meetings.customer}</Label>
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
              <Label>{he.meetings.service}</Label>
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
              <Label>{he.meetings.agent}</Label>
              <Select value={agentId} onValueChange={setAgentId}>
                <SelectTrigger><SelectValue placeholder={he.meetings.selectAgent} /></SelectTrigger>
                <SelectContent>
                  {mockUsers.map((u) => (
                    <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{he.common.status}</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as MeetingStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">{he.meetings.statusScheduled}</SelectItem>
                  <SelectItem value="completed">{he.meetings.statusCompleted}</SelectItem>
                  <SelectItem value="cancelled">{he.meetings.statusCancelled}</SelectItem>
                  <SelectItem value="no-show">{he.meetings.statusNoShow}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{he.common.date}</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>{he.common.time}</Label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
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
