"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { he } from "@/lib/i18n/he";
import { toast } from "sonner";

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success(he.auth.resetSent);
    setEmail("");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="text-3xl font-bold mb-2">{he.app.name}</div>
        <CardTitle>{he.auth.resetPasswordTitle}</CardTitle>
        <CardDescription>{he.auth.resetPasswordDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{he.auth.email}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={he.auth.emailPlaceholder}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {he.auth.resetButton}
          </Button>
          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {he.auth.backToLogin}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
