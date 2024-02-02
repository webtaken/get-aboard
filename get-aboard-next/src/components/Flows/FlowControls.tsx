"use client";
import { Button } from "../ui/button";

export default function FlowControls() {
  return (
    <>
      <Button
        onDragStart={(e) => {
          e.dataTransfer.setData("application/reactflow", "ticket");
          e.dataTransfer.effectAllowed = "move";
        }}
        draggable
      >
        Node
      </Button>
      <Button>Save</Button>
    </>
  );
}
