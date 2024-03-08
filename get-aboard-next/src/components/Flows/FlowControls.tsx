"use client";
import { Replace } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FlowControlsProps {}

export default function FlowControls({}: FlowControlsProps) {
  return (
    <div className="flex items-center gap-x-2">
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
