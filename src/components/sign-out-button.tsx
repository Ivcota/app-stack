"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const { signOut } = authClient;
  const router = useRouter();

  const handleSignOut = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => router.push("/"),
      },
    });
  };

  return (
    <SidebarMenuButton onClick={handleSignOut}>
      <LogOut className="size-4" />
      <span>Sign Out</span>
    </SidebarMenuButton>
  );
}