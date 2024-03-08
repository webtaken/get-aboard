"use client";

import {
  DragEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import ReactFlow, {
  Node,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  NodeTypes,
  useReactFlow,
  OnConnectEnd,
  OnConnect,
  OnConnectStart,
  Panel,
  ReactFlowProvider,
  Edge,
  OnNodesDelete,
} from "reactflow";
import { Flow } from "@/client";
import TicketNode, { DataTicketNode } from "@/components/Demos/TicketNode";
import FlowControls from "./FlowControls";
import { useFlowStore } from "@/stores/FlowStore";
import { useDebounce } from "@uidotdev/usehooks";
import { toast } from "../ui/use-toast";
import { updateFlowById } from "@/lib/flow-actions";
import isEqual from "lodash.isequal";
// Important! don't delete the styles css, otherwise the flow won't work.
import "reactflow/dist/style.css";
import TicketEditorSheet from "../Tickets/TicketSheetEditor";
import { Button } from "../ui/button";
import { CheckCircle2, Loader2, Workflow, XCircle } from "lucide-react";
import FlowStatus from "./FlowStatus";

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes: NodeTypes = { ticket: TicketNode };
const getId = () => uuidv4();

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

interface FlowProps {
  defaultNodeId?: string;
  initialNodes: Node<DataTicketNode>[];
  initialEdges: Edge[];
}

function Flow({ defaultNodeId, initialNodes, initialEdges }: FlowProps) {
  const { flowId, flow, setFlow } = useFlowStore();
  const connectingNodeId = useRef<string | null>(null);
  const [nodes, setNodes, onNodesChange] =
    useNodesState<DataTicketNode>(initialNodes);
  const debouncedNodes = useDebounce(nodes, 500);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const debouncedEdges = useDebounce(edges, 500);
  const [saveStatus, setStatusSaved] = useState<
    "initial" | "loading" | "success" | "error"
  >("initial");
  const [flowMapsChanged, setFlowMapsChanged] = useState(false);
  const { screenToFlowPosition, setViewport } = useReactFlow();

  const startTransform = useCallback(() => {
    setViewport({ x: 600, y: 50, zoom: 1 }, { duration: 800 });
  }, [setViewport]);

  useEffect(() => {
    const saveHandler = async () => {
      const nodesMap = buildFlowNodesMap(debouncedNodes);
      const edgesMap = buildFlowEdgesMap(debouncedEdges);

      const updatedFlow = await updateFlowById(flowId!, {
        nodes_map: nodesMap,
        edges_map: edgesMap,
      });

      if (updatedFlow) {
        setFlow(updatedFlow);
        const newReactFlowNodes = buildReactFlowNodesMap(updatedFlow.nodes_map);
        const newReactFlowEdges = buildReactFlowEdgesMap(updatedFlow.edges_map);
        setNodes(newReactFlowNodes);
        setEdges(newReactFlowEdges);
        setStatusSaved("success");
      } else {
        toast({
          variant: "destructive",
          description:
            "Error while saving the flow, please reload the page or contact support.",
        });
        setStatusSaved("error");
      }
    };

    const flowMapsHasChanged = () => {
      const newReactFlowNodes = buildReactFlowNodesMap(flow?.nodes_map);
      if (debouncedNodes.length !== newReactFlowNodes.length) {
        return true;
      }
      for (let i = 0; i < newReactFlowNodes.length; i++) {
        const n1 = newReactFlowNodes[i];
        const n2 = debouncedNodes[i];
        if (
          n1.id !== n2.id ||
          n1.type !== n2.type ||
          !isEqual(n1.position, n2.position) ||
          !isEqual(n1.data, n2.data)
        ) {
          return true;
        }
      }
      const newReactFlowEdges = buildReactFlowEdgesMap(flow?.edges_map);
      if (debouncedEdges.length !== newReactFlowEdges.length) {
        return true;
      }
      for (let i = 0; i < newReactFlowEdges.length; i++) {
        const e1 = newReactFlowEdges[i];
        const e2 = debouncedEdges[i];
        if (
          e1.id !== e2.id ||
          e1.source !== e2.source ||
          e1.target !== e2.target
        ) {
          return true;
        }
      }
      return false;
    };
    if (flow && flowMapsHasChanged()) {
      saveHandler();
      setStatusSaved("loading");
    }
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        saveHandler();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [debouncedNodes, debouncedEdges, flow]);

  const onConnect: OnConnect = useCallback((params) => {
    // reset the start node on connections
    connectingNodeId.current = null;
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          animated: true,
          style: {
            strokeWidth: "0.125rem",
          },
        },
        eds
      )
    );
  }, []);

  const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback<OnConnectEnd>(
    (event) => {
      if (!connectingNodeId.current) return;
      const target = event.target as Element;

      const targetIsPane = target.classList.contains("react-flow__pane");
      const mouseEvent = event as MouseEvent;
      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const newNode: Node<DataTicketNode> = {
          id,
          type: "ticket",
          position: screenToFlowPosition({
            x: mouseEvent.clientX,
            y: mouseEvent.clientY,
          }),
          data: {
            title: "New node",
            type: "normal",
            idOnDB: null,
          },
        };
        setNodes((nds) => nds.concat({ ...newNode }));
        setEdges((eds) => {
          return eds.concat({
            id,
            source: connectingNodeId.current || "",
            target: id,
            animated: true,
            style: {
              strokeWidth: "0.125rem",
            },
          });
        });
      }
    },
    [screenToFlowPosition]
  );

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

        setNodes((nds) => nds.concat({ ...newNode }));
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
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      onDrop={onDrop}
      onDragOver={onDragOver}
      nodeTypes={nodeTypes}
      fitView
      nodeOrigin={[0.5, 0]}
    >
      <Background size={2} />
      <Controls />
      <Panel position="top-right">
        <FlowControls />
      </Panel>
      <Panel position="top-left">
        <FlowStatus status={saveStatus} />
      </Panel>
    </ReactFlow>
  );
}

interface FlowMapProps {
  flow: Flow;
}
export default function FlowMap({ flow }: FlowMapProps) {
  const { setFlowId, setFlow, reset } = useFlowStore();

  useEffect(() => {
    setFlowId(flow.flow_id);
    setFlow(flow);
    return () => {
      reset();
    };
  }, []);

  const reactFlowEdges = buildFlowEdgesMap(flow.edges_map);
  const reactFlowNodes = buildFlowNodesMap(flow.nodes_map);

  return (
    <>
      <ReactFlowProvider>
        <Flow initialEdges={reactFlowEdges} initialNodes={reactFlowNodes} />
      </ReactFlowProvider>
      <TicketEditorSheet />
    </>
  );
}
