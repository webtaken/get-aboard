"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLocalStorage } from "@uidotdev/usehooks";
import { validateFlowPin } from "@/lib/flow-actions";
import { toast } from "../ui/use-toast";
import { AccessCache } from "@/data/types";

interface ShareAccessPanelProps {
  flowId: number;
}

export default function ShareAccessPanel({ flowId }: ShareAccessPanelProps) {
  const [pinValue, setPinValue] = useState("");
  const [accessCache, setAccessCache] = useLocalStorage<AccessCache[]>(
    "get-aboard-access-cache",
    []
  );

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
            const ok = await validateFlowPin(flowId, pinValue);
            if (ok) {
              setAccessCache((prev) => {
                const cache = prev.find((cache) => cache.flowId === flowId);
                if (cache) {
                  cache.expiration = Date.now() + 24 * 7 * 60 * 60 * 1000;
                  cache.pin = pinValue;
                } else {
                  prev.push({
                    flowId,
                    expiration: Date.now() + 24 * 7 * 60 * 60 * 1000,
                    pin: pinValue,
                  });
                }
                return prev;
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
