import { create } from "zustand";
import { Node, Flow, FlowShareURL, FlowTemplate } from "@/client";

export interface FlowState {
  flowId: number | null;
  flow: Flow | null;
  flowShareOption: FlowShareURL | null;
  flowTemplateOption: FlowTemplate | null;
  nodeMapId: string | null;
  nodeId: number | null;
  node: Node | null;
}

export interface FlowActions {
  setFlowId: (newId: number | null) => void;
  setFlow: (newFlow: Flow | null) => void;
  setFlowShareOption: (newFlowShareOption: FlowShareURL | null) => void;
  setFlowTemplateOption: (newFlowTemplateOption: FlowTemplate | null) => void;
  setNodeMapId: (newId: string | null) => void;
  setNodeId: (newId: number | null) => void;
  setNode: (newNode: Node | null) => void;
  reset: () => void;
}

const initialState: FlowState = {
  flowId: null,
  flow: null,
  flowShareOption: null,
  flowTemplateOption: null,
  nodeMapId: null,
  nodeId: null,
  node: null,
};

export const useFlowStore = create<FlowState & FlowActions>()((set) => {
  return {
    ...initialState,
    setFlowId: (newId) =>
      set((state) => ({
        flowId: newId,
      })),
    setFlow: (newFlow) =>
      set((state) => ({
        flow: newFlow,
      })),
    setFlowShareOption: (newFlowShareOption) =>
      set((state) => ({
        flowShareOption: newFlowShareOption,
      })),
    setFlowTemplateOption: (newFlowTemplateOption) =>
      set((state) => ({
        flowTemplateOption: newFlowTemplateOption,
      })),
    setNodeMapId: (newId) =>
      set((state) => ({
        nodeMapId: newId,
      })),
    setNodeId: (newId) =>
      set((state) => ({
        nodeId: newId,
      })),
    setNode: (newNode) =>
      set((state) => ({
        node: newNode,
      })),
    reset: () => set(initialState),
  };
});
