import { he } from "@/lib/i18n/he";

export default function MeetingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{he.meetings.title}</h1>
        <p className="text-muted-foreground">{he.meetings.description}</p>
      </div>
    </div>
  );
}
