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
import { MousePointerClick } from "lucide-react";

interface TicketNodeProps {
  title: string;
  description: Content;
  tags?: string[];
  type: "input" | "normal";
}

export default function TicketNode({
  id,
  data,
  isConnectable,
}: NodeProps<TicketNodeProps>) {
  const { title, type, description, tags } = data;

  return (
    <>
      <Card className="w-96 border-foreground border hover:border-2 hover:cursor-pointer bg-slate-300 dark:bg-stone-950">
        <CardHeader>
          <CardTitle className="tracking-tight flex items-center justify-between">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-1">
          See description <MousePointerClick className="w-4 h-4" />
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
