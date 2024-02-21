import { Edge, Node } from "reactflow";
import { DataTicketNode } from "@/components/Demos/TicketNode";
import { Skeleton } from "../ui/skeleton";
import { FlowMap } from "./FlowMap";
import { Suspense } from "react";
import { getFlowNodes } from "@/lib/node-actions";

interface FlowPanelProps {
  flowId: string;
  nodeId?: string;
  initialEdges: string;
}

export function FlowPanelFallback() {
  return <Skeleton className="w-full h-[200px] rounded-md" />;
}

export default async function FlowPanel({
  flowId,
  nodeId,
  initialEdges,
}: FlowPanelProps) {
  const nodes = await getFlowNodes(+flowId);
  let reactFlowNodes: Node<DataTicketNode>[] = [];
  if (nodes) {
    reactFlowNodes = nodes.map((node) => {
      return {
        id: String(node.node_id),
        type: "ticket",
        position: { x: node.x_pos, y: node.y_pos },
        data: {
          title: node.title,
          description: "",
          tags: [],
          type: "normal",
          onDB: true,
        },
      };
    });
  }

  console.log("flowpanel init edges", initialEdges);

  let reactFlowEdges: Edge[] = [];
  // const initialEdges: Edge[] = [
  //   {
  //     id: "0",
  //     source: "0",
  //     target: "1",
  //     style: {
  //       strokeWidth: "0.125rem",
  //     },
  //     animated: true,
  //   },
  // ];

  // @ts-ignore
  const flowEdges: Edge[] = (JSON.parse(initialEdges) as any[]).map((edge) => {
    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      style: {
        strokeWidth: "0.125rem",
      },
      animated: true,
    };
  });

  return (
    <Suspense fallback={<FlowPanelFallback />}>
      <FlowMap
        nodeId={nodeId}
        initialNodes={reactFlowNodes}
        initialEdges={reactFlowEdges}
      />
    </Suspense>
  );
}
