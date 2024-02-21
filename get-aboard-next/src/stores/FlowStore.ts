import { create } from "zustand";
import { Node, Edge } from "reactflow";
import { DataTicketNode } from "@/components/Demos/TicketNode";

export interface FlowState {
  nodeId: string;
  nodeUpdated: boolean;
  nodes: Node<DataTicketNode>[];
  edges: Edge[];
  setEdgesHandler: (newEdges: Edge[]) => void;
  setNodesHandler: (newNodes: Node<DataTicketNode>[]) => void;
  changeNodeHandler: (newId: string) => void;
  setNodeUpdated: () => void;
}

export const useFlowStore = create<FlowState>()((set) => {
  return {
    nodeId: "0",
    nodes: [],
    edges: [],
    nodeUpdated: false,
    setNodesHandler: (newNodes) =>
      set((state) => ({
        nodes: [...newNodes],
      })),
    setEdgesHandler: (newEdges) =>
      set((state) => ({
        edges: [...newEdges],
      })),
    changeNodeHandler: (newId) =>
      set((state) => ({
        nodeId: newId,
      })),
    setNodeUpdated: () =>
      set((state) => ({
        nodeUpdated: !state.nodeUpdated,
      })),
  };
});
