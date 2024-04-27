"use client";
import { Check, CircleDot, Copy, Replace, Share2 } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useFlowStore } from "@/stores/FlowStore";
import { shareFlow, unshareFlow } from "@/lib/flow-actions";
import { toast } from "../../ui/use-toast";
import { Switch } from "../../ui/switch";
import { useEffect, useState } from "react";
import { copyTextToClipboard } from "@/lib/utils";
import ShareControl from "./ShareControl";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

interface FlowControlsProps {}

export default function FlowControls({}: FlowControlsProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="flex items-center gap-x-1">
      <TooltipProvider>
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
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className="flex items-center gap-x-1"
          >
            <CircleDot className="w-4 h-4" />{" "}
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Point"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 h-[200px]">
          <Command>
            <CommandInput placeholder="Search Breakpoint..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="overflow-y-auto">
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <ShareControl />
    </div>
  );
}
