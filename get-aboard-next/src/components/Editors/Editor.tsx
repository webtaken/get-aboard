"use client";

import Link from "@tiptap/extension-link";
import { Loader2Icon, Save } from "lucide-react";
import { Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { PatchedNode } from "@/client";
import { createNode, updateNodeById } from "@/lib/node-actions";
import { useFlowStore } from "@/stores/FlowStore";
import { useToast } from "../ui/use-toast";
import { Node as ApiNode } from "@/client";
import EditorControls from "./EditorControls";
import { useFlowMapStore } from "@/stores/FlowMapStore";
import "./styles.css";
import { useShallow } from "zustand/react/shallow";
import { useRouter } from "next/navigation";
import { toast as toastSooner } from "sonner";

interface EditorProps {
  title: string;
  content?: Content;
}

export default function Editor({ title, content }: EditorProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { updateNodeMapData } = useFlowMapStore(
    useShallow((state) => ({
      updateNodeMapData: state.updateNodeMapData,
    }))
  );
  const { flowId, nodeId, nodeMapId, setNodeId, setNode } = useFlowStore();
  const editor = useEditor({
    extensions: [
      Link.configure({
        protocols: ["mailto"],
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert min-w-full prose-sm hover:prose-a:cursor-pointer h-72 md:h-80 lg:h-96 overflow-auto p-1",
      },
    },
    content: content,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <EditorContent editor={editor} />
      <EditorControls editor={editor} />
      <Button
        className="flex items-center gap-x-2"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          // Node doesn't exist, we'll create a new one
          if (!nodeId) {
            //@ts-expect-error
            const newNodeData: ApiNode = {
              flow: flowId!,
              title: title,
              description: editor.getHTML(),
            };
            const [newNode, error] = await createNode(newNodeData);
            if (newNode) {
              setNode(newNode);
              setNodeId(newNode.node_id);
              updateNodeMapData(nodeMapId!, {
                title: newNode.title,
                type: "normal",
                idOnDB: newNode.node_id,
              });
              toast({
                description: "Description updated successfully!",
                duration: 1000,
              });
            } else {
              toast({
                variant: "destructive",
                description: error?.detail,
              });
              if (error?.code && error.code === "nodes_limit_reached") {
                toastSooner("Upgrade your plan", {
                  description:
                    "Unlock all features and get unlimited access to our support team.",
                  action: {
                    label: "Upgrade",
                    onClick: () => {
                      router.push("/pricing");
                    },
                  },
                });
              }
            }
            setLoading(false);
            return;
          }

          const newData: PatchedNode = {
            title: title,
            description: editor.getHTML(),
          };
          const updatedNode = await updateNodeById(+nodeId, newData);
          if (updatedNode) {
            setNode(updatedNode);
            setNodeId(updatedNode.node_id);
            updateNodeMapData(nodeMapId!, {
              title: updatedNode.title,
              type: "normal",
              idOnDB: updatedNode.node_id,
            });
            toast({
              description: "Description updated successfully!",
              duration: 1000,
            });
          } else {
            toast({
              variant: "destructive",
              description:
                "Error while updating the node, please contact support.",
            });
          }
          setLoading(false);
        }}
      >
        {loading ? (
          <Loader2Icon className="w-4 h-4 animate-spin" />
        ) : (
          <Save className="w-4 h-4" />
        )}{" "}
        Save
      </Button>
    </>
  );
}
