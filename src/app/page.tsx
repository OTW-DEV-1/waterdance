import { he } from "@/lib/i18n/he";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{he.dashboard.title}</h1>
        <p className="text-muted-foreground">{he.dashboard.welcome}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: he.dashboard.customers, value: "0" },
          { label: he.dashboard.meetingsToday, value: "0" },
          { label: he.dashboard.waiting, value: "0" },
          { label: he.dashboard.reports, value: "0" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-6"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
