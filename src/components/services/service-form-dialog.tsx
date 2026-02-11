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
import { useServices } from "@/lib/stores";
import { he } from "@/lib/i18n/he";
import { toast } from "sonner";
import type { Service, ServiceStatus } from "@/types";

interface ServiceFormDialogProps {
  mode: "create" | "edit";
  service?: Service;
}

export function ServiceFormDialog({ mode, service }: ServiceFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("60");
  const [price, setPrice] = useState("0");
  const [bufferTime, setBufferTime] = useState("15");
  const [status, setStatus] = useState<ServiceStatus>("active");

  const { addService, updateService } = useServices();

  useEffect(() => {
    if (service && mode === "edit") {
      setName(service.name);
      setDescription(service.description);
      setDuration(String(service.duration));
      setPrice(String(service.price));
      setBufferTime(String(service.bufferTime));
      setStatus(service.status);
    }
  }, [service, mode]);

  function resetForm() {
    setName("");
    setDescription("");
    setDuration("60");
    setPrice("0");
    setBufferTime("15");
    setStatus("active");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      name,
      description,
      duration: Number(duration),
      price: Number(price),
      bufferTime: Number(bufferTime),
      status,
    };

    if (mode === "create") {
      addService(data);
      toast.success(he.services.serviceCreated);
    } else if (service) {
      updateService(service.id, data);
      toast.success(he.services.serviceUpdated);
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
            {he.services.addService}
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
            {mode === "create" ? he.services.addService : he.services.editService}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label>{he.services.serviceName}</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>{he.services.duration}</Label>
              <Input type="number" min="5" value={duration} onChange={(e) => setDuration(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>{he.services.price} ({he.services.currency})</Label>
              <Input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>{he.services.bufferTime}</Label>
              <Input type="number" min="0" value={bufferTime} onChange={(e) => setBufferTime(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>{he.common.status}</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as ServiceStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{he.services.statusActive}</SelectItem>
                  <SelectItem value="archived">{he.services.statusArchived}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>{he.services.serviceDescription}</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
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
