import { he } from "@/lib/i18n/he";
import { PageHeader } from "@/components/shared/page-header";
import { MeetingsTable } from "@/components/meetings/meetings-table";
import { MeetingFormDialog } from "@/components/meetings/meeting-form-dialog";

export default function MeetingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title={he.meetings.title}
        description={he.meetings.description}
        action={<MeetingFormDialog mode="create" />}
      />
      <MeetingsTable />
    </div>
  );
}
