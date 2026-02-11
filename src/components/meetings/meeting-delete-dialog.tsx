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
import { useMeetings } from "@/lib/stores";
import { he } from "@/lib/i18n/he";
import { toast } from "sonner";

interface MeetingDeleteDialogProps {
  meetingId: string;
}

export function MeetingDeleteDialog({ meetingId }: MeetingDeleteDialogProps) {
  const { deleteMeeting } = useMeetings();

  function handleDelete() {
    deleteMeeting(meetingId);
    toast.success(he.meetings.meetingDeleted);
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
          <AlertDialogDescription>{he.meetings.deleteConfirm}</AlertDialogDescription>
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
