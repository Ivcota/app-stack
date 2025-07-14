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
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">App Stack</h1>
            </div>
            <div className="flex items-center space-x-4">
              {!session.data ? (
                <>
                  <Button variant="ghost" asChild>
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

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div className="space-y-6 mb-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                App Stack
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                The quick starter that takes ideas to MVP
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              {!session.data ? (
                <>
                  <Button size="lg" className="h-11 px-8" asChild>
                    <Link href="/signup">Get Started</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="h-11 px-8" asChild>
                    <Link href="/signin">Sign In</Link>
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Welcome back, {session?.data?.user?.name ?? "User"}!
                  </p>
                  <Button size="lg" className="h-11 px-8" asChild>
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">Get your MVP up and running in minutes, not weeks</p>
              </div>
              
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Production Ready</h3>
                <p className="text-sm text-muted-foreground">Built with best practices and modern technologies</p>
              </div>
              
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Developer Love</h3>
                <p className="text-sm text-muted-foreground">Clean code, great DX, and comprehensive documentation</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
