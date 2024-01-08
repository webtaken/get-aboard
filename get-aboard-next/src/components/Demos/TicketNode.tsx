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
import { Content } from "@tiptap/react";
import { Menu, MousePointerClick } from "lucide-react";
import { Button } from "../ui/button";

export interface DataTicketNode {
  title: string;
  description: Content;
  tags?: string[];
  type: "input" | "normal";
  openDescriptionHandler?: (modeId: string) => void;
}

export default function TicketNode({
  id,
  data,
  isConnectable,
}: NodeProps<DataTicketNode>) {
  const { title, type, tags, openDescriptionHandler } = data;

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
                  onClick={() => {
                    openDescriptionHandler && openDescriptionHandler(id);
                  }}
                >
                  See Description
                </DropdownMenuItem>
                <DropdownMenuItem disabled>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-1">
          <Button
            variant="link"
            className="p-0"
            onClick={() => {
              openDescriptionHandler && openDescriptionHandler(id);
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
