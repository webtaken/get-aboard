"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChangeEvent, useEffect } from "react";
import Editor from "../Editors/Editor";
import { getNodeById } from "@/lib/node-actions";
import { Skeleton } from "../ui/skeleton";
import { useFlowStore } from "@/stores/FlowStore";
import { toast } from "../ui/use-toast";
import { useEditorSheetStore } from "@/stores/SheetEditorStore";

interface TicketSheetEditorProps {}

export default function TicketEditorSheet({}: TicketSheetEditorProps) {
  const { open, setOpen } = useEditorSheetStore();
  const { nodeId, node, nodeMapId, setNode } = useFlowStore();

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
    console.log("id on map", nodeMapId, "id on db", nodeId);
    // If there exist the nodeId and the editor is opened we fetch the node data
    if (nodeId && open) {
      fetchNodeData(nodeId);
    }
  }, [nodeId, nodeMapId, open]);

  useEffect(() => {
    if (!open) {
      setNode(null);
    }
  }, [open]);

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-1/2 sm:max-w-none" side="right">
        {!nodeId ? (
          <>
            <SheetHeader className="pt-6">
              <SheetTitle className="my-2">
                <p className="text-4xl">New node</p>
              </SheetTitle>
            </SheetHeader>
            <div className="space-y-4 w-full">
              <Editor content={``} />
            </div>
          </>
        ) : node ? (
          <>
            <SheetHeader className="pt-6">
              <SheetTitle className="my-2">
                {/* <Input
                  defaultValue={node.title}
                  onChange={changeTitleHandler}
                  className="text-4xl"
                /> */}
                <p className="text-4xl">{node.title}</p>
              </SheetTitle>
            </SheetHeader>
            <div className="space-y-4 w-full">
              <Editor content={node.description} />
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
