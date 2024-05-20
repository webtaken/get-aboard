"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFlowStore } from "@/stores/FlowStore";
import { useShallow } from "zustand/react/shallow";
import NewFeatureRadar from "@/components/commons/NewFeatureRadar";

export default function ShareTemplateDialog() {
  const { flowTemplateOption, setFlowTemplateOption } = useFlowStore(
    useShallow((state) => ({
      flowTemplateOption: state.flowTemplateOption,
      setFlowTemplateOption: state.setFlowTemplateOption,
    }))
  );

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
          <p>Content</p>
          <DialogFooter>
            <Button type="submit">Share</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </NewFeatureRadar>
  );
}
