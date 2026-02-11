export type ServiceStatus = "active" | "archived";

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  bufferTime: number;
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
}
