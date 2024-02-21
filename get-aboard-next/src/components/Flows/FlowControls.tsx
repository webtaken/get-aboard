"use client";
import { Button } from "../ui/button";
import { Save } from "lucide-react";

interface FlowControlsProps {
  saveHandler: () => void;
}

export default function FlowControls({ saveHandler }: FlowControlsProps) {
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onDragStart={(e) => {
          e.dataTransfer.setData("application/reactflow", "ticket");
          e.dataTransfer.effectAllowed = "move";
        }}
        draggable
      >
        Node
      </Button>
      <Button className="flex items-center gap-x-2" onClick={saveHandler}>
        <Save className="w-4 h-4" />
        Save
      </Button>
    </div>
  );
}
