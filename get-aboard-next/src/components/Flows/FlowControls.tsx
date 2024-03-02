"use client";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edge, Node } from "reactflow";
import { Node as ApiNode } from "@/client";
import { createNodes } from "@/lib/node-actions";
import { Save } from "lucide-react";
import { DataTicketNode } from "../Demos/TicketNode";
import { updateFlowById } from "@/lib/flow-actions";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { buildFlowEdgesMap, buildFlowNodesMap } from "./FlowMap";
import { useFlowStore } from "@/stores/FlowStore";

interface FlowControlsProps {
  nodes: Node<DataTicketNode>[];
  edges: Edge[];
}

export default function FlowControls({ nodes, edges }: FlowControlsProps) {
  const router = useRouter();
  const { flowId } = useFlowStore();
  const { toast } = useToast();

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
              draggable
            >
              Node
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Drag and drop to create a new node</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="flex items-center gap-x-2"
              onClick={async () => {
                const nodesMap = buildFlowNodesMap(nodes);
                const edgesMap = buildFlowEdgesMap(edges);

                const updatedFlow = await updateFlowById(flowId!, {
                  nodes_map: nodesMap,
                  edges_map: edgesMap,
                });

                if (updatedFlow) {
                  toast({ description: "Saved successfully.", duration: 700 });
                } else {
                  toast({
                    variant: "destructive",
                    description:
                      "Error while saving the flow, please reload the page or contact support.",
                  });
                }
              }}
            >
              <Save className="w-4 h-4" />
              Save
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">
              Press{" "}
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>S
              </kbd>{" "}
              to save changes
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
