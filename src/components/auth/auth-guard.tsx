"use client";

import { useAuth } from "@/lib/stores";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { he } from "@/lib/i18n/he";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{he.common.loading}</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
