"use client";

import {
  Dispatch,
  DragEventHandler,
  SetStateAction,
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
} from "reactflow";
import TicketSheetEditor from "../Tickets/TicketSheetEditor";
import "reactflow/dist/style.css";
import TicketNode, { DataTicketNode } from "@/components/Demos/TicketNode";
import FlowControls from "./FlowControls";
import { useDebounce } from "use-debounce";
import { useFlowStore } from "@/stores/FlowStore";

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes: NodeTypes = { ticket: TicketNode };
const getId = () => uuidv4();

interface FlowProps {
  nodeId?: string;
  initialNodes: Node<DataTicketNode>[];
  initialEdges: Edge[];
  openEditor: boolean;
  setOpenEditor: Dispatch<SetStateAction<boolean>>;
}

export function Flow({
  nodeId,
  initialNodes,
  openEditor,
  initialEdges,
  setOpenEditor,
}: FlowProps) {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef<string | null>(null);
  const [nodes, setNodes, onNodesChange] =
    useNodesState<DataTicketNode>(initialNodes);
  const [nodesDebounced] = useDebounce(nodes, 1000);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition, setViewport } = useReactFlow();
  const { changeNodeHandler } = useFlowStore();

  const startTransform = useCallback(() => {
    setViewport({ x: 600, y: 50, zoom: 1 }, { duration: 800 });
  }, [setViewport]);

  const openDescriptionHandler = useCallback(
    (nodeId: string) => {
      const foundIndex = nodes.findIndex((node) => node.id == nodeId);
      if (foundIndex === -1) return;
      changeNodeHandler(nodes[foundIndex].id);
      setOpenEditor(true);
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
    const nodesToSave = nodes.filter((node) => !node.data.onDB);
    console.log("nodes to save: ", nodesToSave);
  }, [nodesDebounced]);

  useEffect(() => {
    let defaultSelectedIndex = 0;
    if (nodeId) {
      defaultSelectedIndex = nodes.findIndex((node) => node.id == nodeId);
    }
    if (defaultSelectedIndex !== -1 && nodeId !== undefined) {
      setOpenEditor(true);
      changeNodeHandler(nodes[defaultSelectedIndex].id);
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
            onDB: false,
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
            onDB: false,
          },
        };

        setNodes((nds) => nds.concat({ ...newNode }));
      }
    },
    [screenToFlowPosition]
  );

  const saveHandler = () => {
    const nodesToSave = nodes.filter((node) => !node.data.onDB);
    console.log("nodes to save: ", nodesToSave);
    console.log("edges: ", edges);
  };

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
          fitView
          nodeOrigin={[0.5, 0]}
        >
          <Background size={2} />
          <Controls />
          <Panel position="top-right">
            <FlowControls saveHandler={saveHandler} />
          </Panel>
        </ReactFlow>
      </div>
    </>
  );
}

interface FlowMapProps {
  nodeId?: string;
  initialNodes: Node<DataTicketNode>[];
  initialEdges: Edge[];
}
export function FlowMap(props: FlowMapProps) {
  const { nodeId } = useFlowStore();
  const [open, setOpen] = useState(false);
  return (
    <>
      <ReactFlowProvider>
        <Flow {...props} openEditor={open} setOpenEditor={setOpen} />
      </ReactFlowProvider>
      <TicketSheetEditor open={open} setOpen={setOpen} nodeId={nodeId} />
    </>
  );
}
