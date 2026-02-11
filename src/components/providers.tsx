"use client";

import {
  AuthProvider,
  CustomersProvider,
  ServicesProvider,
  MeetingsProvider,
  WaitingListProvider,
} from "@/lib/stores";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <AuthProvider>
        <CustomersProvider>
          <ServicesProvider>
            <MeetingsProvider>
              <WaitingListProvider>{children}</WaitingListProvider>
            </MeetingsProvider>
          </ServicesProvider>
        </CustomersProvider>
      </AuthProvider>
    </TooltipProvider>
  );
}
