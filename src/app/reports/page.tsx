import { he } from "@/lib/i18n/he";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{he.reports.title}</h1>
        <p className="text-muted-foreground">{he.reports.description}</p>
      </div>
    </div>
  );
}
