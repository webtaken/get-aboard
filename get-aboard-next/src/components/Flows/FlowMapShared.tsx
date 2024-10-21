"use client";

import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  NodeTypes,
  useReactFlow,
  ReactFlowProvider,
  Panel,
} from "reactflow";
import { Flow as FlowAPI } from "@/client";
import { useShallow } from "zustand/react/shallow";
import { useFlowMapStore } from "@/stores/FlowMapStore";
import { buildFlowEdgesMap, buildFlowNodesMap } from "./FlowMap";
import TicketEditorSheetShared from "../Tickets/TicketSheetEditorShared";
// Important! don't delete the styles css, otherwise the flow won't work.
import "reactflow/dist/style.css";
import TicketNodeShared from "../Nodes/TicketNodeShared";
import FlowControlsShared from "./Controls/FlowControlsShared";
import FlowMenuShared from "./FlowMenuShared";
import { getSharedFlow } from "@/lib/flow-actions";
import { toast } from "../ui/use-toast";
import { LoaderCircle } from "lucide-react";

const nodeTypes: NodeTypes = { ticket: TicketNodeShared };

function Flow({ serverFlow }: { serverFlow: FlowAPI }) {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useFlowMapStore(
      useShallow((state) => ({
        nodes: state.nodes,
        edges: state.edges,
        onNodesChange: state.onNodesChange,
        onEdgesChange: state.onEdgesChange,
        onConnect: state.onConnect,
      }))
    );
  const { setViewport } = useReactFlow();

  const startTransform = useCallback(
    (x: number, y: number) => {
      setViewport({ x: x, y: y, zoom: 1 }, { duration: 800 });
    },
    [setViewport]
  );

  return (
    <ReactFlow
      className="border-2"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      deleteKeyCode={null}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      nodeOrigin={[0.5, 0]}
    >
      <Background size={2} />
      <Controls />
      <Panel position="top-right">
        <FlowControlsShared startTransform={startTransform} />
      </Panel>
      <Panel position="top-left">
        <FlowMenuShared flow={serverFlow} />
      </Panel>
    </ReactFlow>
  );
}

export default function FlowMapShared({
  flowId,
  option,
  pin,
}: {
  flowId: number;
  option: string;
  pin?: string;
}) {
  const [fetching, setFetching] = useState(false);
  const [flow, setFlow] = useState<FlowAPI | null>(null);
  const { setNodes, setEdges } = useFlowMapStore();

  useEffect(() => {
    const fetchFlow = async () => {
      setFetching(true);
      const fetchedFlow = await getSharedFlow(flowId, option, pin);
      setFetching(false);
      if (!fetchedFlow) {
        toast({ variant: "destructive", title: "Flow not found" });
        return;
      }
      setFlow(fetchedFlow);
      const reactFlowEdges = buildFlowEdgesMap(fetchedFlow.edges_map);
      const reactFlowNodes = buildFlowNodesMap(fetchedFlow.nodes_map);
      setNodes(reactFlowNodes);
      setEdges(reactFlowEdges);
    };
    fetchFlow();
  }, []);

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-32">
        <LoaderCircle className="animate-spin w-10 h-10" />
      </div>
    );
  }

  return (
    <>
      {flow ? (
        <>
          <ReactFlowProvider>
            <Flow serverFlow={flow} />
          </ReactFlowProvider>
          <TicketEditorSheetShared />
        </>
      ) : (
        <p>Flow not found, contact support.</p>
      )}
    </>
  );
}
