"use client";

import Link from "@tiptap/extension-link";
import { Save } from "lucide-react";
import { Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import "./styles.css";
import { Button } from "../ui/button";
import { PatchedNode } from "@/client";
import { createNode, updateNodeById } from "@/lib/node-actions";
import { useFlowStore } from "@/stores/FlowStore";
import { useToast } from "../ui/use-toast";
import { Node } from "reactflow";
import { Node as ApiNode } from "@/client";
import { DataTicketNode } from "../Demos/TicketNode";
import EditorControls from "./EditorControls";
import { buildFlowNodesMap, buildReactFlowNodesMap } from "../Flows/FlowMap";
import { updateFlowById } from "@/lib/flow-actions";

interface EditorProps {
  content?: Content;
}

export default function Editor({ content }: EditorProps) {
  const { toast } = useToast();
  const { flowId, flow, setFlow, nodeId, nodeMapId, setNodeId, setNode } =
    useFlowStore();
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
        onClick={async () => {
          // Node doesn't exist, we'll create a new one
          if (!nodeId) {
            //@ts-expect-error
            const newNodeData: ApiNode = {
              flow: flowId!,
              title: "New node",
              description: editor.getHTML(),
            };
            const newNode = await createNode(newNodeData);
            if (newNode) {
              setNode(newNode);
              setNodeId(newNode.node_id);
              toast({
                description: "Description updated successfully!",
                duration: 1000,
              });

              const updatedNodesMap = buildFlowNodesMap(
                buildReactFlowNodesMap(flow?.nodes_map).map((nodeFromMap) => {
                  if (nodeFromMap.id === nodeMapId) {
                    return {
                      ...nodeFromMap,
                      data: { ...nodeFromMap.data, idOnDB: newNode.node_id },
                    };
                  }
                  return nodeFromMap;
                })
              );

              // we'll update the flow
              const updatedFlow = await updateFlowById(flow?.flow_id!, {
                nodes_map: updatedNodesMap,
              });

              if (updatedFlow) {
                console.log("updated flow", updatedFlow);
                setFlow(updatedFlow);
              } else {
                toast({
                  variant: "destructive",
                  description: "Flow data could not be updated",
                });
              }
            } else {
              toast({
                variant: "destructive",
                description:
                  "Error while updating the node, please contact support.",
              });
            }
            return;
          }

          const newData: PatchedNode = {
            description: editor.getHTML(),
          };
          const updatedNode = await updateNodeById(+nodeId, newData);
          if (updatedNode) {
            setNode(updatedNode);
            setNodeId(updatedNode.node_id);
            toast({
              description: "Description updated successfully!",
              duration: 1000,
            });
          }
        }}
      >
        <Save className="w-4 h-4" /> Save
      </Button>
    </>
  );
}
