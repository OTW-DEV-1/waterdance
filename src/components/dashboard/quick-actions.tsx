"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, CalendarPlus, BarChart3 } from "lucide-react";
import { he } from "@/lib/i18n/he";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{he.dashboard.quickActions}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="outline" className="w-full justify-start gap-3" asChild>
          <Link href="/customers">
            <UserPlus className="h-4 w-4" />
            {he.dashboard.newCustomer}
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3" asChild>
          <Link href="/meetings">
            <CalendarPlus className="h-4 w-4" />
            {he.dashboard.newMeeting}
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3" asChild>
          <Link href="/reports">
            <BarChart3 className="h-4 w-4" />
            {he.dashboard.viewReports}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
