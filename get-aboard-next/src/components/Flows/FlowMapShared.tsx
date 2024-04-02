"use client";

import { useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  NodeTypes,
  useReactFlow,
  ReactFlowProvider,
  Panel,
} from "reactflow";
import { Flow } from "@/client";
import { useShallow } from "zustand/react/shallow";
import {
  FlowMapActions,
  FlowMapState,
  useFlowMapStore,
} from "@/stores/FlowMapStore";
import FlowBasicEditor from "./FlowBasicEditor";
import { buildFlowEdgesMap, buildFlowNodesMap } from "./FlowMap";
import FlowStatus from "./FlowStatus";
import TicketEditorSheetShared from "../Tickets/TicketSheetEditorShared";
// Important! don't delete the styles css, otherwise the flow won't work.
import "reactflow/dist/style.css";
import TicketNodeShared from "../Nodes/TicketNodeShared";

const nodeTypes: NodeTypes = { ticket: TicketNodeShared };

const selector = (state: FlowMapState & FlowMapActions) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  addNode: state.addNode,
});

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useFlowMapStore(useShallow((state) => selector(state)));
  const { screenToFlowPosition, setViewport } = useReactFlow();

  const startTransform = useCallback(() => {
    setViewport({ x: 600, y: 50, zoom: 1 }, { duration: 800 });
  }, [setViewport]);

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
      <Panel position="top-left">
        <FlowStatus status="initial" />
      </Panel>
    </ReactFlow>
  );
}

interface FlowMapProps {
  flow: Flow;
}
export default function FlowMapShared({ flow }: FlowMapProps) {
  const { setNodes, setEdges } = useFlowMapStore();

  useEffect(() => {
    const reactFlowEdges = buildFlowEdgesMap(flow.edges_map);
    const reactFlowNodes = buildFlowNodesMap(flow.nodes_map);
    setNodes(reactFlowNodes);
    setEdges(reactFlowEdges);
  }, []);

  return (
    <>
      <FlowBasicEditor flow={flow} shared />
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
      <TicketEditorSheetShared />
    </>
  );
}
