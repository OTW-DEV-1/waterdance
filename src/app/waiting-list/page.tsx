import { he } from "@/lib/i18n/he";

export default function WaitingListPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{he.waitingList.title}</h1>
        <p className="text-muted-foreground">{he.waitingList.description}</p>
      </div>
    </div>
  );
}
