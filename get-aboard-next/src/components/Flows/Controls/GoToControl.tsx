"use client";
import { Check, Waypoints } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Node, useReactFlow } from "reactflow";
import { cn } from "@/lib/utils";
import { useShallow } from "zustand/react/shallow";
import { useFlowStore } from "@/stores/FlowStore";
import { useEffect, useState } from "react";
import { buildReactFlowNodesMap } from "../FlowMap";
import { DataTicketNode } from "@/components/Nodes/TicketNode";
import { useWindowSize } from "@uidotdev/usehooks";

function getWidthOffset(width: number) {
  console.log(width);
  let offset = 70;
  if (width >= 640) offset = 120;
  if (width >= 768) offset = 120;
  if (width >= 1024) offset = 250;
  if (width >= 1280) offset = 370;
  if (width >= 1536) offset = 490;
  return offset;
}

interface GoToControlProps {
  startTransform: (x: number, y: number) => void;
}

export default function GoToControl({ startTransform }: GoToControlProps) {
  const size = useWindowSize();
  const [open, setOpen] = useState(false);
  const [breakpoints, setBreakpoints] = useState<Node<DataTicketNode>[]>([]);
  const [nodeTitle, setNodeTitle] = useState("");
  const { flow } = useFlowStore(
    useShallow((state) => ({
      flow: state.flow,
    }))
  );

  useEffect(() => {
    if (flow?.nodes_map) setBreakpoints(buildReactFlowNodesMap(flow.nodes_map));
  }, [flow]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="flex items-center gap-x-1"
        >
          <Waypoints className="w-4 h-4" /> Go to node
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 h-[200px]">
        {breakpoints && (
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandEmpty>No breakpoints found.</CommandEmpty>
            <CommandGroup className="overflow-y-auto">
              {breakpoints.map((breakpoint) => (
                <CommandItem
                  key={breakpoint.id}
                  value={breakpoint.data.title}
                  onSelect={(currentValue) => {
                    setNodeTitle(
                      currentValue.toLowerCase() === nodeTitle.toLowerCase()
                        ? ""
                        : currentValue
                    );
                    startTransform(
                      -breakpoint.position.x +
                        192 +
                        getWidthOffset(size.width ?? 540),
                      -breakpoint.position.y + 50
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      nodeTitle.toLowerCase() ===
                        breakpoint.data.title.toLowerCase()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {breakpoint.data.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
}
