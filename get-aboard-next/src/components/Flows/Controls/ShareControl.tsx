"use client";
import { Copy, Share2, Store } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useFlowStore } from "@/stores/FlowStore";
import { shareFlow, unshareFlow } from "@/lib/flow-actions";
import { toast } from "../../ui/use-toast";
import { useShallow } from "zustand/react/shallow";
import { Switch } from "../../ui/switch";
import { useEffect, useState } from "react";
import { copyTextToClipboard } from "@/lib/utils";
import NewFeatureRadar from "@/components/commons/NewFeatureRadar";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import ShareTemplateDialog from "./ShareControls/ShareTemplateDialog";

export default function ShareControl() {
  const { flow, flowShareOption, setFlowShareOption, flowTemplateOption } =
    useFlowStore(
      useShallow((state) => ({
        flow: state.flow,
        flowShareOption: state.flowShareOption,
        setFlowShareOption: state.setFlowShareOption,
        flowTemplateOption: state.flowTemplateOption,
      }))
    );
  const [shareable, setShareable] = useState(false);
  const [withPIN, setWithPIN] = useState(false);
  const [withTemplate, setWithTemplate] = useState(false);

  useEffect(() => {
    setShareable(
      typeof flowShareOption?.url === "string" && flowShareOption.url !== ""
    );
    setWithPIN(
      typeof flowShareOption?.pin === "string" && flowShareOption.pin !== ""
    );
  }, [flowShareOption]);

  useEffect(() => {
    setWithTemplate(flowTemplateOption !== null);
  }, [flowTemplateOption]);

  return (
    // <NewFeatureRadar>
    <Popover>
      <PopoverTrigger asChild>
        <Button className="relative">
          <Share2 className="h-5 w-5" />
          <span className="sr-only">Share</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="text-base font-semibold">Share On-Boarding</h4>
          {/*
            <Separator />
             {shareable && (
              <>
                <div className="flex justify-center">
                  <Badge variant="secondary">New feature!</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">Share to Marketplace</p>
                  <ShareTemplateDialog />
                </div>
                <p className="text-xs">
                  This option will share your On-Boarding{" "}
                  <span className="font-semibold">
                    to marketplace as template allowing anyone to import its
                    data
                  </span>
                  , so be careful to not share sensible data.
                </p>
              </>
            )} */}
          <Separator />
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm">Make On-Boarding public</p>
            <Switch
              defaultChecked={shareable}
              onCheckedChange={async (checked) => {
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
            Sharing the On-Boarding link will allow anyone able{" "}
            <span className="font-semibold">only to see</span> this data.
          </p>
          {shareable && flowShareOption?.url && (
            <Button
              title={flowShareOption.url}
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
          <section
            className={clsx(withTemplate && "cursor-not-allowed opacity-60")}
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">Add access PIN</p>
              <Switch
                disabled={!shareable || withTemplate}
                defaultChecked={withPIN}
                onCheckedChange={async (checked) => {
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
              your On-Boarding.
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
          </section>
          {withTemplate && (
            <p className="text-xs font-semibold">
              Cannot set a secure PIN when sharing your On-Boarding to the
              marketplace. Delete the template from the marketplace.
            </p>
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
            Copy invitation text <Copy className="w-4 h-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
    // </NewFeatureRadar>
  );
}
