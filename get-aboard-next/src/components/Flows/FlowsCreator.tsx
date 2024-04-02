"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { State, createFlow } from "@/lib/flow-actions";
import { useFormState } from "react-dom";

export default function FlowsCreator() {
  const initialState = { message: null, errors: {} };
  // eslint-disable-next-line
  // @ts-ignore
  const [state, dispatch] = useFormState<State>(createFlow, initialState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Flow</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your flow</DialogTitle>
          <DialogDescription asChild>
            <form action={dispatch} className="space-y-3 pt-3 px-5">
              <div className="w-full items-center space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
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
              <Button type="submit">Create</Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
