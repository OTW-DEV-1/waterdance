"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Service } from "@/types";
import { mockServices } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";

interface ServicesContextValue {
  services: Service[];
  addService: (service: Omit<Service, "id" | "createdAt" | "updatedAt">) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  getService: (id: string) => Service | undefined;
}

const ServicesContext = createContext<ServicesContextValue | null>(null);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(mockServices);

  const addService = useCallback(
    (data: Omit<Service, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const service: Service = {
        ...data,
        id: `srv-${generateId()}`,
        createdAt: now,
        updatedAt: now,
      };
      setServices((prev) => [service, ...prev]);
    },
    []
  );

  const updateService = useCallback((id: string, updates: Partial<Service>) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
      )
    );
  }, []);

  const deleteService = useCallback((id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const getService = useCallback(
    (id: string) => services.find((s) => s.id === id),
    [services]
  );

  return (
    <ServicesContext.Provider
      value={{ services, addService, updateService, deleteService, getService }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const ctx = useContext(ServicesContext);
  if (!ctx) throw new Error("useServices must be used within ServicesProvider");
  return ctx;
}
