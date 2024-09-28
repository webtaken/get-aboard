"use client";
import { DragEventHandler, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactFlow, {
  Node,
  Background,
  NodeTypes,
  useReactFlow,
  ReactFlowProvider,
  Controls,
  Panel,
} from "reactflow";
import { initialNodes } from "./Nodes";
import { initialEdges } from "./Edges";
import { DataTicketNodeDemo } from "./TicketNodeDemo";
import TicketNodeDemo from "./TicketNodeDemo";
import TutorialAlert from "../Flows/TutorialAlert";
import { useFlowMapDemoStore } from "@/stores/FlowMapDemoStore";
import { useShallow } from "zustand/react/shallow";
import { useDebounce, useLocalStorage } from "@uidotdev/usehooks";
import FlowControls from "./Controls/FlowControls";
import TicketEditorSheetDemo from "../Tickets/TicketSheetDemo";
import "reactflow/dist/style.css";
import "./styles.css";

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes: NodeTypes = { ticket: TicketNodeDemo };
const getId = () => uuidv4();

interface DemoFlowProps {
  nodeId?: string;
}

function Flow({ nodeId }: DemoFlowProps) {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    useFlowMapDemoStore(
      useShallow((state) => ({
        nodes: state.nodes,
        edges: state.edges,
        onNodesChange: state.onNodesChange,
        onEdgesChange: state.onEdgesChange,
        onConnect: state.onConnect,
        addNode: state.addNode,
      }))
    );
  const debouncedNodes = useDebounce(nodes, 800);
  const debouncedEdges = useDebounce(edges, 800);
  const { screenToFlowPosition, setViewport } = useReactFlow();

  const startTransform = useCallback(
    (x: number, y: number) => {
      setViewport({ x: x, y: y, zoom: 1 }, { duration: 800 });
    },
    [setViewport]
  );

  useEffect(() => {
    console.log("update");
    window.localStorage.setItem(
      "flow-demo",
      JSON.stringify({ nodes: debouncedNodes, edges: debouncedEdges })
    );
  }, [debouncedNodes, debouncedEdges]);

  const onDragOver: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }, []);

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      if (event.dataTransfer) {
        const type = event.dataTransfer.getData("application/reactflow");
        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }
        const id = getId();
        const newNode: Node<DataTicketNodeDemo> = {
          id,
          type: "ticket",
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: {
            title: "New node",
            type: "normal",
            description: "",
          },
        };
        addNode(newNode);
      }
    },
    [screenToFlowPosition]
  );

  return (
    <ReactFlow
      className="border-2"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDrop={onDrop}
      onDragOver={onDragOver}
      nodeTypes={nodeTypes}
      fitView
      nodeOrigin={[0.5, 0]}
    >
      <Background size={2} />
      <Controls />
      <Panel position="top-right">
        <FlowControls startTransform={startTransform} />
      </Panel>
    </ReactFlow>
  );
}

export default function DemoFlow({ nodeId }: DemoFlowProps) {
  const [storedFlow, saveStoredFlow] = useLocalStorage("flow-demo", {
    nodes: initialNodes,
    edges: initialEdges,
  });
  const { setNodes, setEdges, reset: resetDemoFlowMap } = useFlowMapDemoStore();

  useEffect(() => {
    setNodes(storedFlow.nodes);
    setEdges(storedFlow.edges);

    return () => {
      resetDemoFlowMap();
    };
  }, []);

  return (
    <>
      <TutorialAlert />
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
      <TicketEditorSheetDemo />
    </>
  );
}
