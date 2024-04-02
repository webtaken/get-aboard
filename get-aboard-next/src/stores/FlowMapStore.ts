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
import { DataTicketNode } from "@/components/Nodes/TicketNode";

export interface FlowMapState {
  nodes: Node<DataTicketNode>[];
  edges: Edge[];
}

export interface FlowMapActions {
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node<DataTicketNode>[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (nodes: Node<DataTicketNode>) => void;
  deleteNode: (nodeId: string) => void;
  updateNodeMapData: (nodeId: string, dbData: DataTicketNode) => void;
  reset: () => void;
}

const initialState: FlowMapState = {
  nodes: [],
  edges: [],
};

export const useFlowMapStore = create<FlowMapState & FlowMapActions>(
  (set, get) => ({
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
            style: {
              strokeWidth: "0.125rem",
            },
          },
          get().edges
        ),
      });
    },
    setNodes: (nodes: Node<DataTicketNode>[]) => {
      set({ nodes });
    },
    setEdges: (edges: Edge[]) => {
      set({ edges });
    },
    addNode: (node: Node<DataTicketNode>) => {
      set((state) => ({
        nodes: state.nodes.concat([node]),
      }));
    },
    deleteNode: (nodeId: string) => {
      set((state) => ({
        nodes: state.nodes.filter((node) => node.id !== nodeId),
      }));
    },
    updateNodeMapData: (nodeId: string, dbData: DataTicketNode) => {
      set((state) => ({
        nodes: state.nodes.map((node) => {
          if (node.id === nodeId) return { ...node, data: { ...dbData } };
          return node;
        }),
      }));
    },
    reset: () => set(initialState),
  })
);
