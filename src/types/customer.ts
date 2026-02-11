export type CustomerStatus = "lead" | "active" | "inactive";
export type CustomerType = "individual" | "company";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  type: CustomerType;
  status: CustomerStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
