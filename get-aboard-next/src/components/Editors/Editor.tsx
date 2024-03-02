"use client";

import Link from "@tiptap/extension-link";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Italic,
  Link2,
  List,
  ListOrdered,
  Redo,
  Save,
  SquareCode,
  Strikethrough,
  Text,
  Undo,
} from "lucide-react";
import { Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useCallback } from "react";
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

interface EditorProps {
  nodeId: number;
  nodeData?: Node<DataTicketNode>;
  content?: Content;
}

export default function Editor({ nodeId, nodeData, content }: EditorProps) {
  const { toast } = useToast();
  const { flowId, setNodeUpdated, setNode } = useFlowStore();
  const editor = useEditor({
    extensions: [
      Link.configure({
        protocols: ["mailto"],
      }),
      // @ts-expect-error
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

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

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
          const newData: PatchedNode = {
            description: editor.getHTML(),
          };

          if (nodeId === -1 && nodeData) {
            //@ts-expect-error
            const newNodeData: ApiNode = {
              flow: flowId!,
              title: nodeData.data.title,
              description: "",
            };
            const newNode = await createNode(newNodeData);
            if (newNode) {
              setNode(newNode);
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
            return;
          }

          const updatedNode = await updateNodeById(+nodeId, newData);
          if (updatedNode) {
            setNode(updatedNode);
            setNodeUpdated();
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
