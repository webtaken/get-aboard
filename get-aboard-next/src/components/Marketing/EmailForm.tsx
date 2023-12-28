"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { MarketingService } from "@/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";

const formSchema = z.object({
  email: z.coerce.string().email().min(5),
});

export default function EmailForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const onSubmitEmail = async (values: z.infer<typeof formSchema>) => {
    try {
      await MarketingService.registerEmailRegisterEmailPost({
        email: values.email,
      });
      toast({
        title: "E-mail sent successfully ✔️",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title:
          "E-mail sent failed try again later or contact @snode_rojas1 on X",
      });
    }
  };

  return (
    <div className="mx-auto mt-5 items-center w-72">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitEmail)}
          className="flex justify-center gap-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Leave your E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
