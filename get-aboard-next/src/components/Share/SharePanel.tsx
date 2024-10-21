"use client";

import ShareAccessPanel from "./ShareAccessPanel";
import { useLocalStorage } from "@uidotdev/usehooks";
import { accessCodeHasExpired } from "@/lib/utils";
import FlowMapShared from "../Flows/FlowMapShared";
import { AccessCache } from "@/data/types";

interface SharePanelProps {
  flowId: number;
  withPin: boolean;
}

export default function SharePanel({ flowId, withPin }: SharePanelProps) {
  const [accessCache, setAccessCache] = useLocalStorage<AccessCache[]>(
    "get-aboard-access-cache",
    []
  );

  const cacheFlow = accessCache.find((cache) => cache.flowId === flowId);
  if (!withPin && !cacheFlow) {
    setAccessCache((prev) => [
      ...prev,
      {
        flowId,
        expiration: Date.now() + 24 * 7 * 60 * 60 * 1000,
        pin: undefined,
      },
    ]);
  }

  if (
    withPin &&
    (accessCache.length === 0 ||
      !cacheFlow ||
      !cacheFlow.pin ||
      accessCodeHasExpired(cacheFlow.expiration))
  ) {
    return <ShareAccessPanel flowId={flowId} />;
  }

  return (
    <div className="w-full h-screen">
      <FlowMapShared flowId={flowId} option="view" pin={cacheFlow?.pin} />
    </div>
  );
}
