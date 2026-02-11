export type UserRole = "admin" | "agent" | "secretary";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}
