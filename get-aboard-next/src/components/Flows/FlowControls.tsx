"use client";
import { Copy, Replace, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useFlowStore } from "@/stores/FlowStore";
import { shareFlow, unshareFlow } from "@/lib/flow-actions";
import { toast } from "../ui/use-toast";
import { Switch } from "../ui/switch";
import { useEffect, useState } from "react";
import { copyTextToClipboard } from "@/lib/utils";

interface FlowControlsProps {}

export default function FlowControls({}: FlowControlsProps) {
  const { flow, flowShareOption, setFlowShareOption } = useFlowStore();
  const [shareable, setShareable] = useState<boolean>(false);
  const [withPIN, setWithPIN] = useState(false);

  useEffect(() => {
    setShareable(
      typeof flowShareOption?.url === "string" && flowShareOption.url !== ""
    );
    setWithPIN(
      typeof flowShareOption?.pin === "string" && flowShareOption.pin !== ""
    );
  }, [flowShareOption]);

  return (
    <div className="flex items-center gap-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="flex items-center gap-x-2">
            <Share2 className="w-4 h-4" /> Share
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h4 className="text-base font-semibold">Share flow</h4>
            <Separator />
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">Make flow public</p>
              <Switch
                defaultChecked={shareable}
                onCheckedChange={async (checked) => {
                  console.log("FOO");

                  if (checked) {
                    let shareOption = await shareFlow(
                      flow?.flow_id!,
                      "view",
                      false
                    );
                    if (shareOption) setShareable(true);
                    else
                      toast({
                        variant: "destructive",
                        description: "Share options failed, contact support.",
                      });
                    setFlowShareOption(shareOption ? shareOption : null);
                    return;
                  }
                  setWithPIN(false);
                  let ok = await unshareFlow(flow?.flow_id!, "url");
                  if (ok) setShareable(false);
                  else
                    toast({
                      variant: "destructive",
                      description: "Share options failed, contact support.",
                    });
                  setFlowShareOption(null);
                }}
                checked={shareable}
              />
            </div>
            <p className="text-xs">
              Sharing the flow link will allow anyone able{" "}
              <span className="font-semibold">only to see</span> this data.
            </p>
            {shareable && flowShareOption?.url && (
              <Button
                className="flex items-center w-full gap-x-2 px-2"
                size="icon"
                onClick={async () => {
                  await copyTextToClipboard(flowShareOption.url!);
                  toast({ description: "URL copied!" });
                }}
              >
                <span className="truncate">{flowShareOption.url}</span>
                <Copy className="w-4 h-4" />
              </Button>
            )}
            <Separator />
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">Add access PIN</p>
              <Switch
                disabled={!shareable}
                defaultChecked={withPIN}
                onCheckedChange={async (checked) => {
                  console.log("BUZZ");
                  if (checked) {
                    let shareOption = await shareFlow(
                      flow?.flow_id!,
                      "view",
                      true
                    );
                    if (shareOption) setWithPIN(true);
                    else
                      toast({
                        variant: "destructive",
                        description: "Share options failed, contact support.",
                      });
                    setFlowShareOption(shareOption ? shareOption : null);
                    return;
                  }
                  let ok = await unshareFlow(flow?.flow_id!, "pin");
                  if (ok) setWithPIN(false);
                  else
                    toast({
                      variant: "destructive",
                      description: "Share options failed, contact support.",
                    });
                  setFlowShareOption({
                    url: String(flowShareOption?.url),
                    pin: null,
                  });
                }}
                checked={withPIN}
              />
            </div>
            <p className="text-xs">
              Add a PIN for extra security, only users with the PIN can access
              the content.
            </p>
            {withPIN && flowShareOption?.pin && (
              <Button
                className="flex items-center w-full gap-x-2 px-2"
                size="icon"
                onClick={async () => {
                  await copyTextToClipboard(flowShareOption.pin!);
                  toast({ description: "PIN copied!" });
                }}
              >
                {flowShareOption.pin} <Copy className="w-4 h-4" />
              </Button>
            )}
            <Separator />
            <p className="font-semibold text-sm">Send an invitation</p>
            <Button
              disabled={!shareable && !withPIN}
              className="flex items-center w-full gap-x-2 px-2"
              size="icon"
              onClick={async () => {
                let invitationText = `You were invited to Get Aboard (${process.env.NEXT_PUBLIC_LOCALHOST}), here are your credentials!\n`;
                if (flowShareOption?.url)
                  invitationText += `Shareable URL: ${flowShareOption.url}\n`;
                if (flowShareOption?.pin)
                  invitationText += `Access PIN: ${flowShareOption.pin}\n`;
                await copyTextToClipboard(invitationText);
                toast({ description: "Invitation text copied!" });
              }}
            >
              Copy shareable text <Copy className="w-4 h-4" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onDragStart={(e) => {
                e.dataTransfer.setData("application/reactflow", "ticket");
                e.dataTransfer.effectAllowed = "move";
              }}
              className="flex items-center gap-x-2"
              draggable
            >
              <Replace className="w-5 h-5" /> Node
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Drag and drop to create a new node</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
