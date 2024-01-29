"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { type ThemeProviderProps } from "next-themes/dist/types";

const queryClient = new QueryClient();

export default function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
