import { create } from "zustand";
import { NodeProps } from "reactflow";
import { DataTicketNodeDemo } from "@/components/Demos/TicketNodeDemo";

export interface FlowDemoState {
  node: NodeProps<DataTicketNodeDemo> | null;
}

export interface FlowDemoActions {
  setNode: (node: NodeProps<DataTicketNodeDemo> | null) => void;
  reset: () => void;
}

const initialState: FlowDemoState = {
  node: null,
};

export const useFlowDemoStore = create<FlowDemoState & FlowDemoActions>()(
  (set) => {
    return {
      ...initialState,
      setNode: (node) => {
        set({ node });
      },
      reset: () => set(initialState),
    };
  }
);
