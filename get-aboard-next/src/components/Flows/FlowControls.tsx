"use client";
import { Replace, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFlowStore } from "@/stores/FlowStore";
import { useEffect, useState } from "react";
import { shareFlow } from "@/lib/flow-actions";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";

interface FlowControlsProps {}

export default function FlowControls({}: FlowControlsProps) {
  const { flow } = useFlowStore();

  return (
    <div className="flex items-center gap-x-2">
      {/* NOTE: remember to replace this component by <Popover /> in shadcn */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="flex items-center gap-x-2"
              onClick={async () => {
                const url = await shareFlow(flow?.flow_id!, "view");
                if (!url) {
                  toast({
                    variant: "destructive",
                    description: "Not able to get shareable link",
                  });
                  return;
                }
                if ("clipboard" in navigator) {
                  await navigator.clipboard.writeText(url);
                } else {
                  document.execCommand("copy", true, url);
                }
                toast({ description: "Now you can share your flow!" });
              }}
            >
              <Share2 className="w-4 h-4" /> Share
            </Button>
          </TooltipTrigger>
          <TooltipContent className="w-52">
            <div className="space-y-2">
              <h4 className="text-base font-semibold">Click to share flow</h4>
              <p className="text-sm">
                Sharing the flow link will allow anyone able{" "}
                <span className="font-semibold">only to see</span> this data.
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onDragStart={(e) => {
                e.dataTransfer.setData("application/reactflow", "ticket");
                e.dataTransfer.effectAllowed = "move";
              }}
              className="flex items-center gap-x-2"
              draggable
            >
              <Replace className="w-5 h-5" /> Node
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Drag and drop to create a new node</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
