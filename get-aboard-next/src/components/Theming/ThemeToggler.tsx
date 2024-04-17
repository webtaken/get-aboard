"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggler() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        if (theme === "light") setTheme("dark");
        else setTheme("light");
      }}
    >
      <MoonIcon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <SunIcon className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    </Button>
  );
}
