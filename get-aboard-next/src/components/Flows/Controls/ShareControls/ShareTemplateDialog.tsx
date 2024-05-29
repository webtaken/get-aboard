"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFlowStore } from "@/stores/FlowStore";
import { useShallow } from "zustand/react/shallow";
import NewFeatureRadar from "@/components/commons/NewFeatureRadar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TagsAdder from "./TagsAdder";
import { useState } from "react";
import { Name } from "@/client";

export default function ShareTemplateDialog() {
  const { flowTemplateOption, setFlowTemplateOption } = useFlowStore(
    useShallow((state) => ({
      flowTemplateOption: state.flowTemplateOption,
      setFlowTemplateOption: state.setFlowTemplateOption,
    }))
  );
  const [tags, setTags] = useState<Name[]>([]);

  const addTag = async (tag: string) => {
    const tagAlreadyExists =
      tags.filter((dbTag) => dbTag.name === tag).length !== 0;
    if (!tagAlreadyExists) {
    }
  };

  return (
    <NewFeatureRadar>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" title="Share">
            <Store className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Share template to Marketplace</DialogTitle>
            <DialogDescription>
              Fill a title for your template and a brief description of the
              On-Boarding.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Onboarding for backend dev"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Textarea
                id="username"
                placeholder="Onboarding template for backend junior dev at Accenture"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Tags
              </Label>
              <TagsAdder addTag={addTag} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Share</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </NewFeatureRadar>
  );
}
