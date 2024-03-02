import { Edge, Node } from "reactflow";
import { DataTicketNode } from "@/components/Demos/TicketNode";
import { Skeleton } from "../ui/skeleton";
import { FlowMap } from "./FlowMap";
import { Suspense } from "react";
import { getFlowNodes } from "@/lib/node-actions";

interface FlowPanelProps {
  edgesMap: any[];
  nodesMap: any[];
}

export function FlowPanelFallback() {
  return <Skeleton className="w-full h-[200px] rounded-md" />;
}

export default async function FlowPanel({
  edgesMap,
  nodesMap,
}: FlowPanelProps) {
  const reactFlowEdges: Edge[] = edgesMap.map((edge) => {
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

  const reactFlowNodes: Node<DataTicketNode>[] = nodesMap.map((node) => {
    return {
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data,
    };
  });

  return (
    <Suspense fallback={<FlowPanelFallback />}>
      <FlowMap initialNodes={reactFlowNodes} initialEdges={reactFlowEdges} />
    </Suspense>
  );
}
