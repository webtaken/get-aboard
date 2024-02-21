"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Editor from "../Editors/Editor";
import { Node as ApiNode } from "@/client";
import { Input } from "../ui/input";
import { DataTicketNode } from "../Demos/TicketNode";
import { getNodeById } from "@/lib/node-actions";
import { Skeleton } from "../ui/skeleton";
import { useFlowStore } from "@/stores/FlowStore";

interface TicketSheetEditorProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  nodeId: string;
}

export default function TicketEditorSheet({
  open,
  setOpen,
  nodeId,
}: TicketSheetEditorProps) {
  const { nodeUpdated } = useFlowStore();
  const [node, setNode] = useState<ApiNode>();

  useEffect(() => {
    const fetchNodeData = async () => {
      const node = await getNodeById(+nodeId);
      setNode(node);
    };
    fetchNodeData();
  }, [nodeId, nodeUpdated]);

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-1/2 sm:max-w-none" side="right">
        {node ? (
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
              <Editor nodeId={nodeId} content={node.description} />
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
