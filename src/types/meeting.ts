export type MeetingStatus = "scheduled" | "completed" | "cancelled" | "no-show";

export interface Meeting {
  id: string;
  customerId: string;
  customerName: string;
  serviceId: string;
  serviceName: string;
  agentId: string;
  agentName: string;
  date: string;
  time: string;
  status: MeetingStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
