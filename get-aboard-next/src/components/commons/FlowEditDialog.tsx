"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { State } from "@/lib/flow-actions";
import { useFormState, useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast as toastSooner } from "sonner";
import { useRouter } from "next/navigation";

interface FlowEditDialogProps {
  trigger: React.ReactNode;
  title: React.ReactNode;
  defaultTitleValue?: string;
  defaultDescriptionValue?: string;
  submitText: string;
  action: (state: State) => State | Promise<State>;
}

function Submit({ submitText }: { submitText: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="flex items-center gap-x-2"
    >
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {submitText}
    </Button>
  );
}

export default function FlowEditDialog({
  trigger,
  title,
  defaultTitleValue,
  defaultDescriptionValue,
  submitText,
  action,
}: FlowEditDialogProps) {
  const router = useRouter();
  const initialState: State = { message: null, errors: {}, status: "initial" };
  const [state, dispatch] = useFormState<State>(action, initialState);

  useEffect(() => {
    if (state.errors && state.errors.code === "free_plan_ended") {
      toastSooner("Upgrade your plan", {
        description:
          "Unlock all features and get unlimited access to our support team.",
        action: {
          label: "Upgrade",
          onClick: () => {
            router.push("/#pricing_card");
          },
        },
      });
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription asChild>
            <form action={dispatch} className="space-y-3 pt-3 px-5">
              <div className="w-full items-center space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={defaultTitleValue}
                  placeholder="Your flow's title"
                  aria-describedby="flow-title-error"
                />
                <div
                  id="flow-title-error"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {state.errors?.title &&
                    state.errors.title.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
              <div className="w-full items-center space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={defaultDescriptionValue}
                  placeholder="Your flow's description"
                  aria-describedby="flow-description-error"
                />
                <div
                  id="flow-description-error"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {state.errors?.description &&
                    state.errors.description.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
              <Submit submitText={submitText} />
              {state.errors?.general && (
                <p className="mt-2 text-sm text-red-500">
                  {state.errors.general}
                </p>
              )}
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
