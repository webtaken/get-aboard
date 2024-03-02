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
import TicketSheetEditor from "../Tickets/TicketSheetEditor";
import TicketNode, { DataTicketNode } from "@/components/Demos/TicketNode";
import FlowControls from "./FlowControls";
import { Node as ApiNode } from "@/client";
import { useFlowStore } from "@/stores/FlowStore";
import { useDebounce } from "@uidotdev/usehooks";
import { toast } from "../ui/use-toast";
import { updateFlowById } from "@/lib/flow-actions";

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
export const buildFlowEdgesMap = (edges: Edge[]) => {
  return edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
  }));
};

interface FlowProps {
  defaultNodeId?: string;
  initialNodes: Node<DataTicketNode>[];
  initialEdges: Edge[];
}

export function Flow({ defaultNodeId, initialNodes, initialEdges }: FlowProps) {
  const reactFlowWrapper = useRef(null);
  const { flowId } = useFlowStore();
  const connectingNodeId = useRef<string | null>(null);
  const [nodes, setNodes, onNodesChange] =
    useNodesState<DataTicketNode>(initialNodes);
  const debouncedNodes = useDebounce(nodes, 500);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const debouncedEdges = useDebounce(edges, 500);
  const { screenToFlowPosition, setViewport } = useReactFlow();
  const { setNodeId } = useFlowStore();

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
        toast({ description: "Saved successfully.", duration: 700 });
      } else {
        toast({
          variant: "destructive",
          description:
            "Error while saving the flow, please reload the page or contact support.",
        });
      }
    };

    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        saveHandler();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [debouncedNodes, debouncedEdges]);

  useEffect(() => {
    // let defaultSelectedIndex = 0;
    // if (nodeId) {
    //   defaultSelectedIndex = nodes.findIndex((node) => node.id == nodeId);
    // }
    // if (defaultSelectedIndex !== -1 && nodeId !== undefined) {
    //   setNodeId(nodes[defaultSelectedIndex].id);
    // }
  }, []);

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
            idOnDB: -1,
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
            idOnDB: -1,
          },
        };

        setNodes((nds) => nds.concat({ ...newNode }));
      }
    },
    [screenToFlowPosition]
  );

  const onNodesDelete: OnNodesDelete = useCallback((nodes) => {
    console.log(nodes);
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} className="wrapper h-[500px]">
        <ReactFlow
          className="border-2"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodesDelete={onNodesDelete}
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
            <FlowControls nodes={nodes} edges={edges} />
          </Panel>
        </ReactFlow>
      </div>
    </>
  );
}

interface FlowMapProps {
  initialNodes: Node<DataTicketNode>[];
  initialEdges: Edge[];
}
export function FlowMap(props: FlowMapProps) {
  return (
    <>
      <ReactFlowProvider>
        <Flow {...props} />
      </ReactFlowProvider>
    </>
  );
}
