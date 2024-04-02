"use client";

import { Flow } from "@/client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLocalStorage } from "@uidotdev/usehooks";
import { validateFlowPin } from "@/lib/flow-actions";
import { toast } from "../ui/use-toast";

interface ShareAccessPanelProps {
  flow: Flow;
}

export default function ShareAccessPanel({ flow }: ShareAccessPanelProps) {
  const [pinValue, setPinValue] = useState("");
  const [accessCache, setAccessCache] = useLocalStorage<{
    flowId: number;
    expiration: number;
  } | null>("get-aboard-access-cache", null);

  return (
    <div className="my-20 space-y-2">
      <h2 className="text-center text-xl font-semibold">
        This flow is protected
      </h2>
      <div className="flex mx-auto w-full max-w-xs items-center justify-center space-x-2">
        <Input
          type="text"
          onChange={(e) => {
            setPinValue(e.target.value);
          }}
          placeholder="Access PIN"
        />
        <Button
          onClick={async () => {
            const ok = await validateFlowPin(flow.flow_id, pinValue);
            if (ok) {
              setAccessCache({
                flowId: flow.flow_id,
                expiration: Date.now() + 24 * 60 * 60 * 1000,
              });
            } else {
              toast({
                variant: "destructive",
                description: "Invalid access code.",
              });
            }
          }}
        >
          Access
        </Button>
      </div>
    </div>
  );
}
