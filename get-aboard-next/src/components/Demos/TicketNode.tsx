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
import { Dispatch, SetStateAction } from "react";
import { useFlowStore } from "@/stores/FlowStore";
import TicketEditorSheet from "../Tickets/TicketSheetEditor";

export interface DataTicketNode {
  title: string;
  idOnDB: number;
  tags?: string[];
  type: "input" | "normal";
}

export default function TicketNode({
  id,
  data,
  isConnectable,
}: NodeProps<DataTicketNode>) {
  const { setNodeId } = useFlowStore();
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
                    // const ok = await deleteNodeById(pathname, +id);
                    // if (ok === undefined) {
                    //   console.log("Couldn't delete the node");
                    // }
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
          <TicketEditorSheet data={idOnDB === -1 ? data : undefined}>
            <Button
              variant="link"
              className="p-0"
              onClick={() => {
                idOnDB !== -1 && setNodeId(idOnDB);
              }}
            >
              See description <MousePointerClick className="w-4 h-4" />
            </Button>
          </TicketEditorSheet>
          {/* <Button variant="link" className="p-0 gap-x-1">
            <Delete className="w-4 h-4" /> Delete
          </Button> */}
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
