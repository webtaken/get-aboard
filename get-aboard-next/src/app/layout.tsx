import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import NavBar from "@/components/Navigation/NavBar";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const notoSans = Noto_Sans({ subsets: ["latin"] });

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
      <body
        className={`${notoSans.className} bg-slate-100 dark:bg-slate-900 px-20`}
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <Toaster />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
