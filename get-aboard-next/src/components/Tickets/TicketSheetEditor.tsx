"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { getNodeById } from "@/lib/node-actions";
import { Skeleton } from "../ui/skeleton";
import { useFlowStore } from "@/stores/FlowStore";
import { toast } from "../ui/use-toast";
import { useEditorSheetStore } from "@/stores/SheetEditorStore";
import { useShallow } from "zustand/react/shallow";
import { useFlowMapStore } from "@/stores/FlowMapStore";
import { Dialog, DialogContent } from "../ui/dialog";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import AdvancedEditor from "../Editors/tailwind/advanced-editor";

interface TicketSheetEditorProps {}

export default function TicketEditorSheet({}: TicketSheetEditorProps) {
  const { open, setOpen } = useEditorSheetStore();
  const { getNodeMapData } = useFlowMapStore(
    useShallow((state) => ({ getNodeMapData: state.getNodeMapData }))
  );
  const { nodeId, node, nodeMapId, setNode } = useFlowStore(
    useShallow((state) => ({
      nodeId: state.nodeId,
      node: state.node,
      nodeMapId: state.nodeMapId,
      setNode: state.setNode,
    }))
  );
  const [title, setTitle] = useState(node?.title || "");

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
    if (nodeMapId && open) {
      const newTitle = getNodeMapData(nodeMapId)?.title;
      setTitle(newTitle || "");
    }
  }, [nodeId, nodeMapId, open]);

  useEffect(() => {
    if (!open) {
      setNode(null);
    }
  }, [open]);

  useEffect(() => {
    setTitle(node?.title || "");
  }, [node]);

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col max-w-3xl h-[calc(100vh-100px)] p-10">
        {!nodeId ? (
          <ScrollArea className="max-h-screen">
            <AdvancedEditor title={title} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : node ? (
          <ScrollArea className="max-h-screen">
            <AdvancedEditor title={title} description={node.description} />
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
