"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { authClient } from "@/lib/auth-client";

export default function Dashboard() {
  const { useSession } = authClient;
  const session = useSession();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.data?.user?.name ?? "User"}!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Welcome</CardTitle>
            <CardDescription>Your personalized dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">=K</p>
            <p className="text-sm text-muted-foreground">
              You're successfully signed in and using the app!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Account</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Email:</span>{" "}
                {session.data?.user?.email}
              </p>
              <p className="text-sm">
                <span className="font-medium">Name:</span>{" "}
                {session.data?.user?.name ?? "Not set"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Quick Actions</CardTitle>
            <CardDescription>Things you can do</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">" View your profile</p>
              <p className="text-sm">" Update settings</p>
              <p className="text-sm">" Explore the app</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
