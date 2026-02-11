import { he } from "@/lib/i18n/he";
import { PageHeader } from "@/components/shared/page-header";
import { WaitingListTable } from "@/components/waiting-list/waiting-list-table";
import { WaitingListFormDialog } from "@/components/waiting-list/waiting-list-form-dialog";

export default function WaitingListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title={he.waitingList.title}
        description={he.waitingList.description}
        action={<WaitingListFormDialog mode="create" />}
      />
      <WaitingListTable />
    </div>
  );
}
