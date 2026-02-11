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
import { useServices } from "@/lib/stores";
import { he } from "@/lib/i18n/he";
import { toast } from "sonner";

interface ServiceDeleteDialogProps {
  serviceId: string;
  serviceName: string;
}

export function ServiceDeleteDialog({ serviceId, serviceName }: ServiceDeleteDialogProps) {
  const { deleteService } = useServices();

  function handleDelete() {
    deleteService(serviceId);
    toast.success(he.services.serviceDeleted);
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
            {he.services.deleteConfirm}
            <br />
            <strong>{serviceName}</strong>
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
