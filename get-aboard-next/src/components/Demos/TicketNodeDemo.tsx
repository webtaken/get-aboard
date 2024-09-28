import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Handle, NodeProps, Position } from "reactflow";
import { Content } from "@tiptap/react";
import { EditIcon, LucideEdit3, Save, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useFlowDemoStore } from "@/stores/FlowDemoStore";
import { toast } from "../ui/use-toast";
import { useFlowMapDemoStore } from "@/stores/FlowMapDemoStore";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";
import { useEditorSheetStore } from "@/stores/SheetEditorStore";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export interface DataTicketNodeDemo {
  title: string;
  description: Content;
  tags?: string[];
  type: "input" | "normal";
}

export default function TicketNodeDemo(props: NodeProps<DataTicketNodeDemo>) {
  const { title, type, tags } = props.data;
  const { id, data, isConnectable } = props;
  const { setNode } = useFlowDemoStore(
    useShallow((state) => ({
      setNode: state.setNode,
    }))
  );
  const { deleteNode, updateNodeMapData } = useFlowMapDemoStore(
    useShallow((state) => ({
      deleteNode: state.deleteNode,
      updateNodeMapData: state.updateNodeMapData,
    }))
  );
  const { setOpen } = useEditorSheetStore();
  const [editing, setEditing] = useState(false);
  const [nodeTitle, setNodeTitle] = useState(title);

  const onEditTitle = () => {
    updateNodeMapData(id, { ...data, title: nodeTitle });
    setEditing(false);
  };

  return (
    <>
      <Card className="w-96 border-foreground border bg-slate-300 dark:bg-stone-950">
        <CardHeader>
          {editing ? (
            <CardTitle className="tracking-tight flex items-center gap-x-2">
              <Input
                className="w-full"
                value={nodeTitle}
                onChange={(e) => setNodeTitle(e.target.value)}
              />{" "}
              <Button size="icon" onClick={onEditTitle}>
                <Save className="w-4 h-4" />
              </Button>
            </CardTitle>
          ) : (
            <CardTitle
              onClick={() => setEditing(true)}
              className="tracking-tight flex items-center gap-x-2 hover:cursor-pointer"
            >
              {title}{" "}
              <Button size="icon" variant="ghost">
                <LucideEdit3 className="w-4 h-4" />
              </Button>
            </CardTitle>
          )}
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
                title="Edit description"
                size="icon"
                variant="ghost"
                className="mx-auto"
                onClick={() => {
                  setOpen(true);
                  setNode(props);
                }}
              >
                <EditIcon className="w-3.5 h-3.5" />
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
                  deleteNode(id);
                  toast({
                    description: "Node deleted successfully!",
                    duration: 700,
                  });
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
      />
    </>
  );
}
