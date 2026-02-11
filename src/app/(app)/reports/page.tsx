"use client";

import { he } from "@/lib/i18n/he";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCustomers, useServices, useMeetings } from "@/lib/stores";
import { StatCard } from "@/components/dashboard/stat-card";
import { CalendarDays, CheckCircle, TrendingUp, UserPlus } from "lucide-react";

export default function ReportsPage() {
  const { customers } = useCustomers();
  const { services } = useServices();
  const { meetings } = useMeetings();

  const completedMeetings = meetings.filter((m) => m.status === "completed").length;
  const completionRate = meetings.length > 0
    ? Math.round((completedMeetings / meetings.length) * 100)
    : 0;
  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const leadCount = customers.filter((c) => c.status === "lead").length;

  const serviceUsage = services.map((s) => ({
    name: s.name,
    count: meetings.filter((m) => m.serviceId === s.id).length,
  })).sort((a, b) => b.count - a.count);

  const customerStats = [
    { label: he.customers.statusActive, count: activeCustomers },
    { label: he.customers.statusLead, count: leadCount },
    { label: he.customers.statusInactive, count: customers.filter((c) => c.status === "inactive").length },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title={he.reports.title} description={he.reports.description} />

      <Tabs defaultValue="overview" dir="rtl">
        <TabsList>
          <TabsTrigger value="overview">{he.reports.tabOverview}</TabsTrigger>
          <TabsTrigger value="meetings">{he.reports.tabMeetings}</TabsTrigger>
          <TabsTrigger value="customers">{he.reports.tabCustomers}</TabsTrigger>
          <TabsTrigger value="services">{he.reports.tabServices}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title={he.reports.totalMeetings} value={meetings.length} icon={CalendarDays} />
            <StatCard title={he.reports.completionRate} value={`${completionRate}%`} icon={CheckCircle} />
            <StatCard title={he.reports.newCustomersThisMonth} value={leadCount} icon={UserPlus} />
            <StatCard title={he.reports.avgMeetingsPerDay} value={(meetings.length / 7).toFixed(1)} icon={TrendingUp} />
          </div>
        </TabsContent>

        <TabsContent value="meetings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{he.reports.meetingsOverTime}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: he.meetings.statusScheduled, count: meetings.filter((m) => m.status === "scheduled").length },
                  { label: he.meetings.statusCompleted, count: meetings.filter((m) => m.status === "completed").length },
                  { label: he.meetings.statusCancelled, count: meetings.filter((m) => m.status === "cancelled").length },
                  { label: he.meetings.statusNoShow, count: meetings.filter((m) => m.status === "no-show").length },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${meetings.length > 0 ? (item.count / meetings.length) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8 text-left">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{he.reports.customersByStatus}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {customerStats.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${customers.length > 0 ? (item.count / customers.length) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8 text-left">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{he.reports.popularServices}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {serviceUsage.slice(0, 8).map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="text-sm">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${meetings.length > 0 ? (item.count / meetings.length) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8 text-left">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
