import { create } from "zustand";

export interface EditorSheetState {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const useEditorSheetStore = create<EditorSheetState>()((set) => {
  return {
    open: false,
    setOpen: (value) =>
      set((state) => ({
        open: value,
      })),
  };
});
