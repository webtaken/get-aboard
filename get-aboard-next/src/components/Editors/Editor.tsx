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
import { updateNodeById } from "@/lib/node-actions";
import { useFlowStore } from "@/stores/FlowStore";
import { useToast } from "../ui/use-toast";

interface EditorProps {
  nodeId: string;
  content?: Content;
}

export default function Editor({ nodeId, content }: EditorProps) {
  const { toast } = useToast();
  const { setNodeUpdated } = useFlowStore();
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
      <div className="flex items-center gap-x-1 mt-4">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          variant={editor.isActive("bold") ? "default" : "outline"}
          size="icon"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          variant={editor.isActive("italic") ? "default" : "outline"}
          size="icon"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
          variant={editor.isActive("strike") ? "default" : "outline"}
          size="icon"
          title="Strike"
        >
          <Strikethrough className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
          variant={editor.isActive("code") ? "default" : "outline"}
          size="icon"
          title="Code"
        >
          <Code className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
          variant={editor.isActive("paragraph") ? "default" : "outline"}
          size="icon"
          title="Paragraph"
        >
          <Text className="w-4 h-4" />
        </Button>
        <Button
          onClick={setLink}
          className={editor.isActive("link") ? "is-active" : ""}
          variant={editor.isActive("link") ? "default" : "outline"}
          size="icon"
          title="Link"
        >
          <Link2 className="w-4 h-4" />
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
          variant={
            editor.isActive("heading", { level: 1 }) ? "default" : "outline"
          }
          size="icon"
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
          variant={
            editor.isActive("heading", { level: 2 }) ? "default" : "outline"
          }
          size="icon"
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          size="icon"
          title="Bullet list"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          size="icon"
          title="Ordered list"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
          variant={editor.isActive("codeBlock") ? "default" : "outline"}
          size="icon"
          title="Code block"
        >
          <SquareCode className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          variant="outline"
          size="icon"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          variant="outline"
          size="icon"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>
      <Button
        className="flex items-center gap-x-2"
        onClick={async () => {
          const newData: PatchedNode = {
            description: editor.getHTML(),
          };
          const updatedNode = await updateNodeById(+nodeId, newData);
          setNodeUpdated();
          toast({
            description: "Your node was updated!",
            duration: 1000,
          });
        }}
      >
        <Save className="w-4 h-4" /> Save
      </Button>
    </>
  );
}
