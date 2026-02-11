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
import { useCustomers } from "@/lib/stores";
import { he } from "@/lib/i18n/he";
import { toast } from "sonner";
import type { Customer, CustomerStatus, CustomerType } from "@/types";

interface CustomerFormDialogProps {
  mode: "create" | "edit";
  customer?: Customer;
}

export function CustomerFormDialog({ mode, customer }: CustomerFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState<CustomerType>("individual");
  const [status, setStatus] = useState<CustomerStatus>("lead");
  const [notes, setNotes] = useState("");

  const { addCustomer, updateCustomer } = useCustomers();

  useEffect(() => {
    if (customer && mode === "edit") {
      setName(customer.name);
      setEmail(customer.email);
      setPhone(customer.phone);
      setCompany(customer.company || "");
      setType(customer.type);
      setStatus(customer.status);
      setNotes(customer.notes);
    }
  }, [customer, mode]);

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setType("individual");
    setStatus("lead");
    setNotes("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      name,
      email,
      phone,
      company: company || null,
      type,
      status,
      notes,
    };

    if (mode === "create") {
      addCustomer(data);
      toast.success(he.customers.customerCreated);
    } else if (customer) {
      updateCustomer(customer.id, data);
      toast.success(he.customers.customerUpdated);
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
            {he.customers.addCustomer}
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
            {mode === "create" ? he.customers.addCustomer : he.customers.editCustomer}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{he.customers.customerName}</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>{he.common.email}</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>{he.common.phone}</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>{he.customers.company}</Label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{he.customers.type}</Label>
              <Select value={type} onValueChange={(v) => setType(v as CustomerType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">{he.customers.typeIndividual}</SelectItem>
                  <SelectItem value="company">{he.customers.typeCompany}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{he.common.status}</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as CustomerStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">{he.customers.statusLead}</SelectItem>
                  <SelectItem value="active">{he.customers.statusActive}</SelectItem>
                  <SelectItem value="inactive">{he.customers.statusInactive}</SelectItem>
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
