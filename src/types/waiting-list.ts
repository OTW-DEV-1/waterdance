export type WaitingListStatus = "waiting" | "contacted" | "scheduled" | "removed";
export type WaitingListPriority = "low" | "medium" | "high" | "urgent";

export interface WaitingListEntry {
  id: string;
  customerId: string;
  customerName: string;
  serviceId: string;
  serviceName: string;
  priority: WaitingListPriority;
  status: WaitingListStatus;
  notes: string;
  dateAdded: string;
  updatedAt: string;
}
