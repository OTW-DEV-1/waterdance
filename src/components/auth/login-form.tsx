"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/stores";
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

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(email, password);
    router.push("/");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="text-3xl font-bold mb-2">{he.app.name}</div>
        <CardTitle>{he.auth.loginTitle}</CardTitle>
        <CardDescription>{he.auth.loginDescription}</CardDescription>
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
          <div className="space-y-2">
            <Label htmlFor="password">{he.auth.password}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={he.auth.passwordPlaceholder}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {he.auth.loginButton}
          </Button>
          <div className="text-center">
            <Link
              href="/reset-password"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {he.auth.forgotPassword}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
