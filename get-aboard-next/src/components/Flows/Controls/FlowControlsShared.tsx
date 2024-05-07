"use client";
import GoToControl from "./GoToControl";

interface FlowControlsSharedProps {
  startTransform: (x: number, y: number) => void;
}

export default function FlowControlsShared({
  startTransform,
}: FlowControlsSharedProps) {
  return (
    <div className="flex items-center gap-x-1">
      <GoToControl startTransform={startTransform} />
    </div>
  );
}
