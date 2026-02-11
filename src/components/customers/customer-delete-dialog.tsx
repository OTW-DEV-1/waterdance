"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useCustomers } from "@/lib/stores";
import { he } from "@/lib/i18n/he";
import { toast } from "sonner";

interface CustomerDeleteDialogProps {
  customerId: string;
  customerName: string;
}

export function CustomerDeleteDialog({ customerId, customerName }: CustomerDeleteDialogProps) {
  const { deleteCustomer } = useCustomers();

  function handleDelete() {
    deleteCustomer(customerId);
    toast.success(he.customers.customerDeleted);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{he.common.deleteConfirmTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {he.customers.deleteConfirm}
            <br />
            <strong>{customerName}</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{he.common.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-white hover:bg-destructive/90">
            {he.common.delete}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
