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
  const initialState: State = { message: null, errors: {}, status: "initial" };
  const [state, dispatch] = useFormState<State>(action, initialState);

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
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
