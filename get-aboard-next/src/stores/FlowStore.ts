import { create } from "zustand";
import { Node } from "@/client";
import { DataTicketNode } from "@/components/Demos/TicketNode";

export interface FlowState {
  flowId: number | null;
  nodeId: number | null;
  node: Node | null;
  nodeUpdated: boolean;
  setFlowId: (newId: number | null) => void;
  setNodeId: (newId: number | null) => void;
  setNodeUpdated: () => void;
  setNode: (newNode: Node | null) => void;
}

export const useFlowStore = create<FlowState>()((set) => {
  return {
    flowId: null,
    nodeId: null,
    node: null,
    nodeUpdated: false,
    setFlowId: (newId) =>
      set((state) => ({
        flowId: newId,
      })),
    setNodeId: (newId) =>
      set((state) => ({
        nodeId: newId,
      })),
    setNode: (newNode) =>
      set((state) => ({
        node: newNode,
      })),
    setNodeUpdated: () =>
      set((state) => ({
        nodeUpdated: !state.nodeUpdated,
      })),
  };
});
