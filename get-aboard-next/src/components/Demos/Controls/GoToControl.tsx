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
  CommandList,
} from "@/components/ui/command";
import { Node, useReactFlow, useStoreApi } from "reactflow";
import { cn } from "@/lib/utils";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { DataTicketNode } from "@/components/Nodes/TicketNode";
import { useWindowSize } from "@uidotdev/usehooks";
import clsx from "clsx";
import { useFlowMapStore } from "@/stores/FlowMapStore";
import { useFlowMapDemoStore } from "@/stores/FlowMapDemoStore";
import { DataTicketNodeDemo } from "../TicketNodeDemo";

export function getWidthOffset(width: number) {
  let offset = 40;
  if (width >= 640) offset = 130;
  if (width >= 768) offset = 140;
  if (width >= 1024) offset = 270;
  if (width >= 1280) offset = 390;
  if (width >= 1536) offset = 510;
  return offset;
}

interface GoToControlProps {
  startTransform: (x: number, y: number) => void;
}

export default function GoToControl({ startTransform }: GoToControlProps) {
  const size = useWindowSize();
  const [open, setOpen] = useState(false);
  const [breakpoints, setBreakpoints] = useState<Node<DataTicketNodeDemo>[]>(
    []
  );
  const [nodeTitle, setNodeTitle] = useState("");
  const { nodes } = useFlowMapDemoStore(
    useShallow((state) => ({
      nodes: state.nodes,
    }))
  );

  useEffect(() => {
    setBreakpoints(nodes);
  }, [nodes]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          type="button"
          aria-expanded={open}
          className="flex items-center gap-x-1"
        >
          <Waypoints className="w-4 h-4" /> Go to node
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={clsx("p-0", breakpoints.length > 0 ? "h-52" : "h-28")}
      >
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No breakpoints found.</CommandEmpty>
            <CommandGroup className="overflow-y-auto" heading="Nodes">
              {breakpoints.map((breakpoint) => (
                <CommandItem
                  key={breakpoint.id}
                  value={breakpoint.data.title}
                  className="data-[disabled='true']"
                  onSelect={(currentValue) => {
                    setNodeTitle(
                      currentValue.toLowerCase() === nodeTitle.toLowerCase()
                        ? ""
                        : currentValue
                    );
                    // focusNode(breakpoint.id);
                    startTransform(
                      -breakpoint.position.x +
                        192 +
                        getWidthOffset(size.width ?? 540),
                      -breakpoint.position.y + 80
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
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}