"use client";

import Link from "@tiptap/extension-link";
import { Save } from "lucide-react";
import { Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { Button } from "../ui/button";
import { PatchedNode } from "@/client";
import { createNode, updateNodeById } from "@/lib/node-actions";
import { useFlowStore } from "@/stores/FlowStore";
import { useToast } from "../ui/use-toast";
import { Node as ApiNode } from "@/client";
import EditorControls from "./EditorControls";
import { useFlowMapStore } from "@/stores/FlowMapStore";
import "./styles.css";

interface EditorSharedProps {
  content?: Content;
}

export default function EditorShared({ content }: EditorSharedProps) {
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

  return <EditorContent editor={editor} />;
}
