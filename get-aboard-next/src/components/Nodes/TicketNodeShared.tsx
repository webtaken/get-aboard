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
import { MousePointerClick } from "lucide-react";
import { Button } from "../ui/button";
import { useFlowStore } from "@/stores/FlowStore";
import { useEditorSheetStore } from "@/stores/SheetEditorStore";
import { DataTicketNode } from "./TicketNode";

export default function TicketNodeShared(props: NodeProps<DataTicketNode>) {
  const { setNodeId, setNode, setNodeMapId } = useFlowStore();
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
