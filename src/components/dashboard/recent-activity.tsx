"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, UserPlus, CheckCircle, ClipboardList } from "lucide-react";
import { he } from "@/lib/i18n/he";
import { formatDateTime } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "customer_created" | "meeting_scheduled" | "meeting_completed" | "waiting_list_added";
  description: string;
  timestamp: string;
}

const iconMap = {
  customer_created: UserPlus,
  meeting_scheduled: CalendarDays,
  meeting_completed: CheckCircle,
  waiting_list_added: ClipboardList,
};

const labelMap = {
  customer_created: he.dashboard.activityCustomerCreated,
  meeting_scheduled: he.dashboard.activityMeetingScheduled,
  meeting_completed: he.dashboard.activityMeetingCompleted,
  waiting_list_added: he.dashboard.activityWaitingListAdded,
};

const mockActivity: ActivityItem[] = [
  { id: "1", type: "meeting_scheduled", description: "דוד כהן — פגישת מעקב", timestamp: "2024-06-22T10:00:00Z" },
  { id: "2", type: "customer_created", description: "לירון חן", timestamp: "2024-06-20T08:00:00Z" },
  { id: "3", type: "meeting_completed", description: "אלון שמיר — ייעוץ מקיף", timestamp: "2024-06-23T12:30:00Z" },
  { id: "4", type: "waiting_list_added", description: "גל אביב — פגישת חירום", timestamp: "2024-06-22T08:30:00Z" },
  { id: "5", type: "meeting_completed", description: "טליה מזרחי — פגישת מעקב", timestamp: "2024-06-22T17:00:00Z" },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{he.dashboard.recentActivity}</CardTitle>
      </CardHeader>
      <CardContent>
        {mockActivity.length === 0 ? (
          <p className="text-sm text-muted-foreground">{he.dashboard.noRecentActivity}</p>
        ) : (
          <div className="space-y-4">
            {mockActivity.map((item) => {
              const Icon = iconMap[item.type];
              return (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{labelMap[item.type]}</p>
                    <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDateTime(item.timestamp)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
