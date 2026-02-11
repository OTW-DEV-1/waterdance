import type { User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "user-001",
    email: "admin@waterdance.co.il",
    name: "יוסי כהן",
    role: "admin",
  },
  {
    id: "user-002",
    email: "agent1@waterdance.co.il",
    name: "רונית לוי",
    role: "agent",
  },
  {
    id: "user-003",
    email: "agent2@waterdance.co.il",
    name: "משה דוד",
    role: "agent",
  },
];
