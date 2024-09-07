"use client";
import { defaultEditorContent } from "@/lib/content";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "./extensions";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { NodeSelector } from "./selectors/node-selector";
import { MathSelector } from "./selectors/math-selector";
import { Separator } from "@/components/ui/separator";

import { handleImageDrop, handleImagePaste } from "novel/plugins";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";
import { uploadFn } from "./image-upload";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";
import { generateJSON } from "@tiptap/react";
import { useFlowMapStore } from "@/stores/FlowMapStore";
import { useShallow } from "zustand/react/shallow";
import { useFlowStore } from "@/stores/FlowStore";
import { createNode, updateNodeById } from "@/lib/node-actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { toast as toastSooner } from "sonner";
import { PatchedNode } from "@/client";

const hljs = require("highlight.js");

const extensions = [...defaultExtensions, slashCommand];

export default function AdvancedEditor({
  description,
  title,
}: {
  title: string;
  description?: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const { updateNodeMapData } = useFlowMapStore(
    useShallow((state) => ({
      updateNodeMapData: state.updateNodeMapData,
    }))
  );
  const { flowId, nodeId, nodeMapId, setNodeId, setNode } = useFlowStore();
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null
  );
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [charsCount, setCharsCount] = useState();

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  //Apply Codeblock Highlighting on the HTML from editor.getHTML()
  const highlightCodeblocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    doc.querySelectorAll("pre code").forEach((el) => {
      // @ts-ignore
      // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
      hljs.highlightElement(el);
    });
    return new XMLSerializer().serializeToString(doc);
  };

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      setCharsCount(editor.storage.characterCount.words());
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
          setSaveStatus("Saved");
        } else {
          setSaveStatus("Failed");
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
        setSaveStatus("Saved");
      } else {
        toast({
          variant: "destructive",
          description: "Error while updating the node, please contact support.",
        });
        setSaveStatus("Failed");
      }
    },
    1000
  );

  useEffect(() => {
    const content = description;
    // const content = window.localStorage.getItem("novel-content");
    if (content) {
      setInitialContent(generateJSON(content, defaultExtensions));
    } else setInitialContent(defaultEditorContent);
  }, [description]);

  if (!initialContent) return null;

  return (
    <div className="relative w-full max-w-screen-lg">
      <div className="flex absolute right-5 top-5 z-10 mb-5 gap-2">
        <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
          {saveStatus}
        </div>
        <div
          className={
            charsCount
              ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground"
              : "hidden"
          }
        >
          {charsCount} Words
        </div>
      </div>
      <EditorRoot>
        <EditorContent
          initialContent={initialContent}
          extensions={extensions}
          className="px-8 py-2 relative min-h-[500px] w-full max-w-screen-lg border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class:
                "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
            },
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
            setSaveStatus("Unsaved");
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => {
                    //@ts-expect-error
                    item.command(val);
                  }}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <MathSelector />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </GenerativeMenuSwitch>
        </EditorContent>
      </EditorRoot>
    </div>
  );
}
