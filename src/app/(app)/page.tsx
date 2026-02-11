"use client";

import { Users, CalendarDays, ClipboardList, Briefcase } from "lucide-react";
import { he } from "@/lib/i18n/he";
import { useCustomers, useServices, useMeetings, useWaitingList } from "@/lib/stores";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";

export default function DashboardPage() {
  const { customers } = useCustomers();
  const { services } = useServices();
  const { meetings } = useMeetings();
  const { entries } = useWaitingList();

  const today = new Date().toISOString().split("T")[0];
  const meetingsToday = meetings.filter((m) => m.date === today).length;
  const activeServices = services.filter((s) => s.status === "active").length;
  const waitingCount = entries.filter((e) => e.status === "waiting").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{he.dashboard.title}</h1>
        <p className="text-muted-foreground">{he.dashboard.welcome}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={he.dashboard.totalCustomers} value={customers.length} icon={Users} />
        <StatCard title={he.dashboard.meetingsToday} value={meetingsToday} icon={CalendarDays} />
        <StatCard title={he.dashboard.waitingCount} value={waitingCount} icon={ClipboardList} />
        <StatCard title={he.dashboard.activeServices} value={activeServices} icon={Briefcase} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <QuickActions />
      </div>
    </div>
  );
}
