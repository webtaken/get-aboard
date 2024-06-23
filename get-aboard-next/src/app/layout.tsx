import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import NavBar from "@/components/Navigation/NavBar";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as ToasterSooner } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "Convert onboarding process into interactive roadmaps",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_LOCALHOST!}`),
  keywords: [
    "onboarding tool",
    "onboarding process",
    "developers onboarding",
    "productivity for teams",
  ],
  title: {
    default: "get-aboard",
    template: `%s | get-aboard`,
  },
  openGraph: {
    description:
      "Get-aboard, a tool to improve the onboarding process for software development teams.",
    images: [`${process.env.NEXT_PUBLIC_LOCALHOST!}/shareMain.png`],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_LOCALHOST!}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} bg-slate-100 dark:bg-slate-900`}>
        <Providers
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <Toaster />
          <ToasterSooner position="bottom-left" />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
