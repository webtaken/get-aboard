import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/Navigation/NavBar";
import Providers from "./providers";
import { OpenAPI } from "@/client";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

console.log(process.env.BASE_PATH_API);
OpenAPI.BASE = process.env.BASE_PATH_API!;

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
      <body className={inter.className}>
        <NavBar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
