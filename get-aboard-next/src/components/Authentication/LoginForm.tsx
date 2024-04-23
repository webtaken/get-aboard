"use client";

import GoogleIcon from "../Icons/GoogleIcon";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  return (
    <Button
      className="flex items-center gap-2 mx-auto"
      onClick={() =>
        signIn("google", { callbackUrl: callbackUrl || "/dashboard" })
      }
    >
      <GoogleIcon className="w-4 h-4 fill-slate-200 dark:fill-slate-950" />{" "}
      Enter with Google
    </Button>
  );
}
