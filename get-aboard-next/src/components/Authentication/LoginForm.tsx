"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GoogleIcon from "../Icons/GoogleIcon";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

const FormSchema = z.object({
  email: z.string().min(1, {
    message: "Email must not be empty.",
  }),
  password: z.string().min(1, {
    message: "Password must not be empty.",
  }),
});

export default function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setIsSubmitting(false);
    if (res?.ok) {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Send the correct credentials",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  aria-label="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  aria-label="password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mx-auto" disabled={isSubmitting}>
          {isSubmitting ? "Login In..." : "Login"}
        </Button>
        <Button
          className="flex items-center gap-2 mx-auto"
          type="button"
          disabled={isSubmitting}
          onClick={() =>
            signIn("google", { callbackUrl: callbackUrl || "/dashboard" })
          }
        >
          <GoogleIcon className="w-4 h-4 fill-slate-200 dark:fill-slate-950" />{" "}
          Enter with Google
        </Button>
      </form>
    </Form>
  );
}
