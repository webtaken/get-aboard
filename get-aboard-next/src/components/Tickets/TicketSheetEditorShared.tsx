"use client";
import { useEffect, useState } from "react";
import { getNodeById } from "@/lib/node-actions";
import { Skeleton } from "../ui/skeleton";
import { useFlowStore } from "@/stores/FlowStore";
import { toast } from "../ui/use-toast";
import { useEditorSheetStore } from "@/stores/SheetEditorStore";
import ReadingAdvancedEditor from "../Editors/tailwind/reading-editor";
import { Dialog, DialogContent } from "../ui/dialog";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface TicketSheetEditorSharedProps {}

export default function TicketEditorSheetShared({}: TicketSheetEditorSharedProps) {
  const { open, setOpen } = useEditorSheetStore();
  const { nodeId, node, nodeMapId, setNode } = useFlowStore();
  const [title, setTitle] = useState(node?.title || "New Node");

  useEffect(() => {
    const fetchNodeData = async (fetchingNodeId: number) => {
      const fetchedNode = await getNodeById(fetchingNodeId!);
      if (fetchedNode) {
        setNode(fetchedNode);
      } else {
        toast({
          variant: "destructive",
          description: "Data couldn't be retrieved",
        });
      }
    };
    if (nodeId && open) {
      fetchNodeData(nodeId);
    }
  }, [nodeId, nodeMapId, open]);

  useEffect(() => {
    if (!open) {
      setNode(null);
    }
  }, [open]);

  useEffect(() => {
    setTitle(node?.title || "New Node");
  }, [node]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col max-w-3xl h-[calc(100vh-100px)] p-10">
        {!nodeId ? (
          <ScrollArea className="max-h-screen">
            <ReadingAdvancedEditor description="" />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : node ? (
          <ScrollArea className="max-h-screen">
            <ReadingAdvancedEditor description={node.description} />
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
