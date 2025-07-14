"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {
  const { useSession, signOut } = authClient;
  const session = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">App Starter</h1>
            </div>
            <div className="flex items-center space-x-4">
              {!session.data ? (
                <>
                  <Button variant="link" asChild>
                    <Link href="/signin">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() =>
                    signOut({
                      fetchOptions: {
                        onSuccess: () => router.push("/"),
                      },
                    })
                  }
                >
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Hello World
          </h1>
          <div className="text-lg text-gray-600 max-w-2xl mx-auto">
            {session.data ? (
              <p className="mt-4 text-gray-600">
                Welcome back, {session?.data?.user?.name ?? "User"}!
              </p>
            ) : (
              <p className="mt-4 text-red-950-600">You are not signed in.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
