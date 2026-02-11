import { he } from "@/lib/i18n/he";
import { PageHeader } from "@/components/shared/page-header";
import { ServicesTable } from "@/components/services/services-table";
import { ServiceFormDialog } from "@/components/services/service-form-dialog";

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title={he.services.title}
        description={he.services.description}
        action={<ServiceFormDialog mode="create" />}
      />
      <ServicesTable />
    </div>
  );
}
