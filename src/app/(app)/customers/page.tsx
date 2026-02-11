import { he } from "@/lib/i18n/he";
import { PageHeader } from "@/components/shared/page-header";
import { CustomersTable } from "@/components/customers/customers-table";
import { CustomerFormDialog } from "@/components/customers/customer-form-dialog";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title={he.customers.title}
        description={he.customers.description}
        action={<CustomerFormDialog mode="create" />}
      />
      <CustomersTable />
    </div>
  );
}
