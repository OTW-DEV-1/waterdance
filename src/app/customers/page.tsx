import { he } from "@/lib/i18n/he";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{he.customers.title}</h1>
        <p className="text-muted-foreground">{he.customers.description}</p>
      </div>
    </div>
  );
}
