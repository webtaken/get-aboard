import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import { edgesClass } from "./FlowMapStore";
import { DataTicketNodeDemo } from "@/components/Demos/TicketNodeDemo";

export interface FlowMapDemoState {
  nodes: Node<DataTicketNodeDemo>[];
  edges: Edge[];
}

export interface FlowMapDemoActions {
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node<DataTicketNodeDemo>[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (nodes: Node<DataTicketNodeDemo>) => void;
  deleteNode: (nodeId: string) => void;
  updateNodeMapData: (nodeId: string, dbData: DataTicketNodeDemo) => void;
  getNodeMapData: (nodeId: string) => DataTicketNodeDemo | null;
  reset: () => void;
}

const initialState: FlowMapDemoState = {
  nodes: [],
  edges: [],
};

export const useFlowMapDemoStore = create<
  FlowMapDemoState & FlowMapDemoActions
>((set, get) => ({
  ...initialState,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          animated: true,
          type: "smoothstep",
          style: edgesClass,
        },
        get().edges
      ),
    });
  },
  setNodes: (nodes: Node<DataTicketNodeDemo>[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  addNode: (node: Node<DataTicketNodeDemo>) => {
    set((state) => ({
      nodes: state.nodes.concat([node]),
    }));
  },
  deleteNode: (nodeId: string) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
    }));
  },
  updateNodeMapData: (nodeId: string, dbData: DataTicketNodeDemo) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) return { ...node, data: { ...dbData } };
        return node;
      }),
    }));
  },
  getNodeMapData: (nodeId: string) => {
    const nodeData = get().nodes.find((node) => node.id === nodeId);
    if (nodeData) return nodeData.data;
    return null;
  },
  reset: () => set(initialState),
}));
