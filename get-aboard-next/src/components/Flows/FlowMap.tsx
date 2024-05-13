"use client";

import { DragEventHandler, useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactFlow, {
  Node,
  Controls,
  Background,
  NodeTypes,
  useReactFlow,
  Panel,
  ReactFlowProvider,
  Edge,
} from "reactflow";
import { toast as toastSooner } from "sonner";
import { Flow as FlowAPI, FlowShareURL } from "@/client";
import TicketNode, { DataTicketNode } from "@/components/Nodes/TicketNode";
import FlowControls from "./Controls/FlowControls";
import { useFlowStore } from "@/stores/FlowStore";
import { useDebounce } from "@uidotdev/usehooks";
import isEqual from "lodash.isequal";
import TicketEditorSheet from "../Tickets/TicketSheetEditor";
import FlowStatus from "./FlowStatus";
import { useShallow } from "zustand/react/shallow";
import { useFlowMapStore } from "@/stores/FlowMapStore";
import { toast } from "../ui/use-toast";
import { updateFlowById } from "@/lib/flow-actions";
import { useRouter } from "next/navigation";
import FlowMenu from "./FlowMenu";
// Important! don't delete the styles css, otherwise the flow won't work.
import "reactflow/dist/style.css";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import TutorialAlert from "./TutorialAlert";

export const buildFlowNodesMap = (nodes: Node<DataTicketNode>[]) => {
  return nodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: { ...node.position },
    data: { ...node.data },
  }));
};

export const buildReactFlowNodesMap = (nodes_map: any[]) => {
  const reactFlowNodes: Node<DataTicketNode>[] = nodes_map.map((node) => {
    return {
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data,
    };
  });
  return reactFlowNodes;
};

export const buildFlowEdgesMap = (edges: Edge[]) => {
  return edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    animated: true,
    style: {
      strokeWidth: "0.125rem",
    },
  }));
};

export const buildReactFlowEdgesMap = (edges_map: any[]) => {
  const reactFlowEdges: Edge[] = edges_map.map((edge) => {
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
  return reactFlowEdges;
};

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes: NodeTypes = { ticket: TicketNode };
const getId = () => uuidv4();

interface FlowProps {
  serverFlow: FlowAPI;
}

function Flow({ serverFlow }: FlowProps) {
  const router = useRouter();
  const { flowId, flow, setFlow } = useFlowStore(
    useShallow((state) => ({
      flowId: state.flowId,
      flow: state.flow,
      setFlow: state.setFlow,
    }))
  );
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    useFlowMapStore(
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
  const [saveStatus, setStatusSaved] = useState<
    "initial" | "loading" | "success" | "error"
  >("initial");
  const { screenToFlowPosition, setViewport } = useReactFlow();

  const startTransform = useCallback(
    (x: number, y: number) => {
      setViewport({ x: x, y: y, zoom: 1 }, { duration: 800 });
    },
    [setViewport]
  );

  useEffect(() => {
    const saveFlow = async () => {
      const nodesMap = buildFlowNodesMap(debouncedNodes);
      const edgesMap = buildFlowEdgesMap(debouncedEdges);
      const [updatedFlow, error] = await updateFlowById(flowId!, {
        nodes_map: nodesMap,
        edges_map: edgesMap,
      });

      if (updatedFlow) {
        setFlow(updatedFlow);
        setStatusSaved("success");
        return;
      }

      toast({
        variant: "destructive",
        description: error?.detail,
      });
      if (error?.code && error.code === "nodes_limit_reached") {
        toastSooner("Upgrade your plan", {
          description:
            "Unlock all features and get unlimited access to our support team.",
          action: {
            label: "Upgrade",
            onClick: () => {
              router.push("/pricing");
            },
          },
        });
      }
      setStatusSaved("error");
    };

    const flowMapsHaveChanged = () => {
      const pastReactFlowNodes = buildReactFlowNodesMap(flow?.nodes_map);
      if (pastReactFlowNodes.length !== debouncedNodes.length) return true;
      for (let i = 0; i < pastReactFlowNodes.length; i++) {
        const n1 = pastReactFlowNodes[i];
        const n2 = debouncedNodes[i];
        if (
          n1.id !== n2.id ||
          n1.type !== n2.type ||
          !isEqual(n1.position, n2.position) ||
          !isEqual(n1.data, n2.data)
        )
          return true;
      }
      const pastReactFlowEdges = buildReactFlowEdgesMap(flow?.edges_map);
      if (debouncedEdges.length !== pastReactFlowEdges.length) return true;
      for (let i = 0; i < pastReactFlowEdges.length; i++) {
        const e1 = pastReactFlowEdges[i];
        const e2 = debouncedEdges[i];
        if (
          e1.id !== e2.id ||
          e1.source !== e2.source ||
          e1.target !== e2.target
        )
          return true;
      }
      return false;
    };

    const canUpdate =
      flow?.nodes_map &&
      flow?.edges_map &&
      (debouncedNodes.length > 0 || debouncedEdges.length > 0);

    if (canUpdate && flowMapsHaveChanged()) {
      setStatusSaved("loading");
      saveFlow();
    }
  }, [flow, debouncedNodes, debouncedEdges]);

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
        const newNode: Node<DataTicketNode> = {
          id,
          type: "ticket",
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: {
            title: "New node",
            type: "normal",
            idOnDB: null,
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
      deleteKeyCode={null}
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
      <Panel position="top-left">
        {flow ? (
          <FlowMenu flow={serverFlow} />
        ) : (
          <Button size="icon">
            <Menu className="w-4 h-4" />
          </Button>
        )}
      </Panel>
      <Panel position="bottom-right">
        <FlowStatus status={saveStatus} />
      </Panel>
    </ReactFlow>
  );
}

interface FlowMapProps {
  flow: FlowAPI;
  shareOption?: FlowShareURL;
}
export default function FlowMap({ flow, shareOption }: FlowMapProps) {
  const { setNodes, setEdges, reset: resetFlowMap } = useFlowMapStore();
  const {
    setFlowId,
    setFlow,
    setFlowShareOption,
    reset: resetFlow,
  } = useFlowStore(
    useShallow((state) => ({
      setFlowId: state.setFlowId,
      setFlow: state.setFlow,
      setFlowShareOption: state.setFlowShareOption,
      reset: state.reset,
    }))
  );

  useEffect(() => {
    setFlowId(flow.flow_id);
    setFlow(flow);
    setFlowShareOption(shareOption ? shareOption : null);
    const reactFlowEdges = buildFlowEdgesMap(flow.edges_map);
    const reactFlowNodes = buildFlowNodesMap(flow.nodes_map);
    setNodes(reactFlowNodes);
    setEdges(reactFlowEdges);

    return () => {
      resetFlowMap();
      resetFlow();
    };
  }, []);

  return (
    <>
      <TutorialAlert />
      <ReactFlowProvider>
        <Flow serverFlow={flow} />
      </ReactFlowProvider>
      <TicketEditorSheet />
    </>
  );
}
