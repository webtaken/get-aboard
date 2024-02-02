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
  ReactFlowProvider,
  OnConnectEnd,
  OnConnect,
  OnConnectStart,
  Panel,
} from "reactflow";
import TicketSheet from "../Tickets/TicketSheet";
import "reactflow/dist/style.css";
import TicketNode, { DataTicketNode } from "@/components/Demos/TicketNode";
import { initialNodes } from "@/components/Demos/Nodes";
import { initialEdges } from "@/components/Demos/Edges";
import { Button } from "../ui/button";
import FlowControls from "./FlowControls";

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes: NodeTypes = { ticket: TicketNode };
const getId = () => uuidv4();

interface PrincipalFlowProps {
  nodeId?: string;
}

function Flow({ nodeId }: PrincipalFlowProps) {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef<string | null>(null);
  const [nodes, setNodes, onNodesChange] =
    useNodesState<DataTicketNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition, setViewport } = useReactFlow();
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const startTransform = useCallback(() => {
    setViewport({ x: 600, y: 50, zoom: 1 }, { duration: 800 });
  }, [setViewport]);

  const openDescriptionHandler = useCallback(
    (nodeId: string) => {
      const foundIndex = nodes.findIndex((node) => node.id == nodeId);
      if (foundIndex === -1) return;
      setSelectedIndex(foundIndex);
      setOpen(true);
    },
    [nodes]
  );

  useEffect(() => {
    nodes.forEach((node) => {
      if (!node.data.openDescriptionHandler) {
        node.data.openDescriptionHandler = openDescriptionHandler;
      }
    });
  }, [nodes]);

  useEffect(() => {
    let defaultSelectedIndex = 0;
    if (nodeId) {
      defaultSelectedIndex = nodes.findIndex((node) => node.id == nodeId);
    }
    if (defaultSelectedIndex !== -1 && nodeId !== undefined) {
      setOpen(true);
      setSelectedIndex(defaultSelectedIndex);
    }
  }, []);

  const onConnect: OnConnect = useCallback((params) => {
    // reset the start node on connections
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
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
            description: ``,
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
            description: ``,
          },
        };

        setNodes((nds) => nds.concat({ ...newNode }));
      }
    },
    [screenToFlowPosition]
  );

  return (
    <>
      <div ref={reactFlowWrapper} className="wrapper h-[500px]">
        <ReactFlow
          className="border-2"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          // fitView
          defaultViewport={{
            x: 500,
            y: 0,
            zoom: 0,
          }}
          nodeOrigin={[0.5, 0]}
        >
          <Background size={2} />
          <Controls />
          <Panel position="top-right">
            <div className="flex items-center gap-x-1">
              <FlowControls />
            </div>
          </Panel>
        </ReactFlow>
      </div>
      <TicketSheet
        open={open}
        setOpen={setOpen}
        data={nodes[selectedIndex].data}
      />
    </>
  );
}

export default function FlowPanel({ nodeId }: PrincipalFlowProps) {
  return (
    <ReactFlowProvider>
      <Flow nodeId={nodeId} />
    </ReactFlowProvider>
  );
}
