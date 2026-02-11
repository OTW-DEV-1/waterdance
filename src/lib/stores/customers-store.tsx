"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Customer } from "@/types";
import { mockCustomers } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";

interface CustomersContextValue {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, "id" | "createdAt" | "updatedAt">) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  getCustomer: (id: string) => Customer | undefined;
}

const CustomersContext = createContext<CustomersContextValue | null>(null);

export function CustomersProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);

  const addCustomer = useCallback(
    (data: Omit<Customer, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const customer: Customer = {
        ...data,
        id: `cust-${generateId()}`,
        createdAt: now,
        updatedAt: now,
      };
      setCustomers((prev) => [customer, ...prev]);
    },
    []
  );

  const updateCustomer = useCallback((id: string, updates: Partial<Customer>) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
      )
    );
  }, []);

  const deleteCustomer = useCallback((id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const getCustomer = useCallback(
    (id: string) => customers.find((c) => c.id === id),
    [customers]
  );

  return (
    <CustomersContext.Provider
      value={{ customers, addCustomer, updateCustomer, deleteCustomer, getCustomer }}
    >
      {children}
    </CustomersContext.Provider>
  );
}

export function useCustomers() {
  const ctx = useContext(CustomersContext);
  if (!ctx) throw new Error("useCustomers must be used within CustomersProvider");
  return ctx;
}
