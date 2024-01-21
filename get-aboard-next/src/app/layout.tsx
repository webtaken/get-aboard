import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/Navigation/NavBar";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Get aboard",
  description: "Help junior devs on your onboarding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100 dark:bg-slate-900`}>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
          <Toaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
