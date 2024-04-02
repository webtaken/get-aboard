"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChangeEvent, useEffect, useState } from "react";
import Editor from "../Editors/Editor";
import { getNodeById } from "@/lib/node-actions";
import { Skeleton } from "../ui/skeleton";
import { useFlowStore } from "@/stores/FlowStore";
import { toast } from "../ui/use-toast";
import { useEditorSheetStore } from "@/stores/SheetEditorStore";
import { Input } from "../ui/input";

interface TicketSheetEditorProps {}

export default function TicketEditorSheet({}: TicketSheetEditorProps) {
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

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-1/2 sm:max-w-none" side="right">
        {!nodeId ? (
          <>
            <SheetHeader className="pt-6">
              <SheetTitle className="my-2">
                <Input
                  onChange={changeTitleHandler}
                  value={title}
                  className="text-2xl"
                />
              </SheetTitle>
            </SheetHeader>
            <div className="space-y-4 w-full">
              <Editor content={``} title={title} />
            </div>
          </>
        ) : node ? (
          <>
            <SheetHeader className="pt-6">
              <SheetTitle className="my-2">
                <Input
                  onChange={changeTitleHandler}
                  value={title}
                  className="text-2xl"
                />
              </SheetTitle>
            </SheetHeader>
            <div className="space-y-4 w-full">
              <Editor content={node.description} title={title} />
            </div>
          </>
        ) : (
          <div className="pr-6 pt-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-72 md:h-80 lg:h-96 w-full" />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
