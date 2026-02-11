import { Inbox } from "lucide-react";
import { he } from "@/lib/i18n/he";

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ message, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
      {icon || <Inbox className="h-12 w-12 mb-3" />}
      <p className="text-sm">{message || he.common.noResults}</p>
    </div>
  );
}
