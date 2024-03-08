"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Handle, NodeProps, Position } from "reactflow";
import { Menu, MousePointerClick } from "lucide-react";
import { Button } from "../ui/button";
import { Delete } from "lucide-react";
import { deleteNodeById } from "@/lib/node-actions";
import { useFlowStore } from "@/stores/FlowStore";
import { useEditorSheetStore } from "@/stores/SheetEditorStore";
import { buildFlowNodesMap, buildReactFlowNodesMap } from "../Flows/FlowMap";
import { updateFlowById } from "@/lib/flow-actions";
import { toast } from "../ui/use-toast";

export interface DataTicketNode {
  title: string;
  idOnDB: number | null;
  tags?: string[];
  type: "input" | "normal";
}

export default function TicketNode(props: NodeProps<DataTicketNode>) {
  const { setNodeId, setNode, setNodeMapId, flow, setFlow } = useFlowStore();
  const { setOpen } = useEditorSheetStore();
  const { id, data, isConnectable } = props;
  const { title, type, idOnDB, tags } = data;

  return (
    <>
      <Card className="w-96 border-foreground border bg-slate-300 dark:bg-stone-950">
        <CardHeader>
          <CardTitle className="tracking-tight flex items-center justify-between">
            {title}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu className="w-6 h-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    if (idOnDB) {
                      console.log("deleting the node on db", idOnDB);
                      const ok = await deleteNodeById(idOnDB);
                      if (ok) {
                        toast({
                          description: "Node deleted successfully!",
                          duration: 700,
                        });
                      } else {
                        toast({
                          variant: "destructive",
                          description: "Could not delete the node",
                        });
                      }
                    }

                    const updatedNodesMap = buildFlowNodesMap(
                      buildReactFlowNodesMap(flow?.nodes_map).filter(
                        (nodeFromMap) => nodeFromMap.id !== id
                      )
                    );

                    // we'll update the flow
                    const updatedFlow = await updateFlowById(flow?.flow_id!, {
                      nodes_map: updatedNodesMap,
                    });

                    if (updatedFlow) {
                      console.log("updated flow", updatedFlow);
                      setFlow(updatedFlow);
                    } else {
                      toast({
                        variant: "destructive",
                        description: "Flow data could not be updated",
                      });
                    }
                  }}
                  className="flex items-center gap-x-2"
                >
                  <Delete className="w-4 h-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Button
            variant="link"
            className="p-0"
            onClick={() => {
              setOpen(true);
              setNodeId(idOnDB);
              !idOnDB && setNode(null);
              setNodeMapId(id);
            }}
          >
            See description <MousePointerClick className="w-4 h-4" />
          </Button>
        </CardContent>
        <CardFooter>
          {tags &&
            tags.map((tag, index) => (
              <Badge
                key={`${id}-${index}`}
                variant="secondary"
                className="mr-1"
              >
                {tag}
              </Badge>
            ))}
        </CardFooter>
      </Card>

      {type == "normal" && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </>
  );
}
