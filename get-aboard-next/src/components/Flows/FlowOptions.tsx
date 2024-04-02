"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Flow } from "@/client";
import { deleteFlowById } from "@/lib/flow-actions";
import { toast } from "../ui/use-toast";

interface FlowOptionsProps {
  flow: Flow;
}

export default function FlowOptions({ flow }: FlowOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="min-w-4 min-h-4 w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/flows/${flow.flow_id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            const status = await deleteFlowById(flow.flow_id);
            if (!status) {
              toast({
                variant: "destructive",
                description:
                  "Couldn't delete the flow contact support or refresh the page.",
              });
            }
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
