"use client";
import { Replace } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ShareControl from "./ShareControl";
import GoToControl from "./GoToControl";

interface FlowControlsProps {
  startTransform: (x: number, y: number) => void;
}

export default function FlowControls({ startTransform }: FlowControlsProps) {
  return (
    <div className="flex items-center gap-x-1">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onDragStart={(e) => {
                e.dataTransfer.setData("application/reactflow", "ticket");
                e.dataTransfer.effectAllowed = "move";
              }}
              className="flex items-center gap-x-1"
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
      <GoToControl startTransform={startTransform} />
      <ShareControl />
    </div>
  );
}
