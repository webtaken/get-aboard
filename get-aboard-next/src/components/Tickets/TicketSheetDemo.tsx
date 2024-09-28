"use client";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { useFlowDemoStore } from "@/stores/FlowDemoStore";
import { useEditorSheetStore } from "@/stores/SheetEditorStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import AdvancedEditorDemo from "../Editors/tailwind/advanced-editor-demo";

export default function TicketEditorSheetDemo() {
  const { open, setOpen } = useEditorSheetStore();
  const { node, setNode } = useFlowDemoStore();

  useEffect(() => {
    if (!open) {
      setNode(null);
    }
  }, [open, setNode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle>
        <DialogDescription>Edit step description</DialogDescription>
      </DialogTitle>
      <DialogContent className="flex flex-col max-w-3xl h-[calc(100vh-100px)] p-10">
        {node ? (
          <ScrollArea className="max-h-screen">
            <AdvancedEditorDemo nodeId={node.id} nodeData={node.data} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <div className="pr-6 pt-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-72 md:h-80 lg:h-96 w-full" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
