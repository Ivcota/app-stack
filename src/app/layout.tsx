import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Starter",
  description:
    "A starter template for building applications with Next.js, Drizzle ORM, and Better Auth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
