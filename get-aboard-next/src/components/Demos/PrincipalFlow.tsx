"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactFlow, {
  Edge,
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
  NodeMouseHandler,
} from "reactflow";
import TicketSheet from "../Tickets/TicketSheet";
import "reactflow/dist/style.css";
import TicketNode from "./TicketNode";
import { initialNodes, DataTicketNode } from "./Nodes";
import { initialEdges } from "./Edges";
import "./styles.css";

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
  const { screenToFlowPosition } = useReactFlow();

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const onNodeClick: NodeMouseHandler = (event, node) => {
    const foundIndex = nodes.findIndex((_node) => _node.id == node.id);
    if (foundIndex === -1) return;
    setSelectedIndex(foundIndex);
    setOpen(true);
  };

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
          data: { title: "New node", type: "normal", description: `` },
        };
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => {
          return eds.concat({
            id,
            source: connectingNodeId.current || "",
            target: id,
            animated: true,
          });
        });
      }
    },
    [screenToFlowPosition]
  );

  return (
    <>
      <div ref={reactFlowWrapper} className="wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          nodeTypes={nodeTypes}
          fitView
          nodeOrigin={[0.5, 0]}
        >
          <Background size={2} />
          <Controls />
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

export default function PrincipalFlow({ nodeId }: PrincipalFlowProps) {
  return (
    <ReactFlowProvider>
      <Flow nodeId={nodeId} />
    </ReactFlowProvider>
  );
}
