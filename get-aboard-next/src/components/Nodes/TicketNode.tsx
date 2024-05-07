"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Handle, NodeProps, Position } from "reactflow";
import { Edit2, Trash2, Waypoints } from "lucide-react";
import { Button } from "../ui/button";
import { deleteNodeById } from "@/lib/node-actions";
import { useFlowStore } from "@/stores/FlowStore";
import { useEditorSheetStore } from "@/stores/SheetEditorStore";
import { toast } from "../ui/use-toast";
import { useFlowMapStore } from "@/stores/FlowMapStore";
import { useShallow } from "zustand/react/shallow";
import { Separator } from "../ui/separator";

export interface DataTicketNode {
  title: string;
  idOnDB: number | null;
  tags?: string[];
  type: "input" | "normal";
}

export default function TicketNode(props: NodeProps<DataTicketNode>) {
  const { setNodeId, setNode, setNodeMapId } = useFlowStore();
  const { deleteNode } = useFlowMapStore(
    useShallow((state) => ({
      deleteNode: state.deleteNode,
    }))
  );
  const { setOpen } = useEditorSheetStore();
  const { id, data, isConnectable } = props;
  const { title, type, idOnDB, tags } = data;
  return (
    <>
      <Card className="w-96 border-foreground border bg-slate-300 dark:bg-stone-950">
        <CardHeader>
          <CardTitle className="tracking-tight flex items-center justify-between">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Choose an option below</p>
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
        </CardContent>
        <CardFooter className="grid grid-rows">
          <Separator />
          <div className="grid grid-cols-5 w-full mt-2">
            <div className="w-full grid col-span-2">
              <Button
                title="See description"
                size="icon"
                variant="ghost"
                className="mx-auto"
                onClick={() => {
                  setOpen(true);
                  setNodeId(idOnDB);
                  !idOnDB && setNode(null);
                  setNodeMapId(id);
                }}
              >
                <Edit2 className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="w-full col-span-1">
              <Separator orientation="vertical" className="mx-auto" />
            </div>
            <div className="w-full grid col-span-2">
              <Button
                title="Delete Node"
                size="icon"
                variant="ghost"
                className="mx-auto"
                onClick={async () => {
                  if (idOnDB) {
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
                  deleteNode(id);
                }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
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
        className="w-10 h-10"
      />
    </>
  );
}
