"use client";

import { Flow } from "@/client";
import ShareAccessPanel from "./ShareAccessPanel";
import { useLocalStorage } from "@uidotdev/usehooks";
import { accessCodeHasExpired } from "@/lib/utils";
import FlowMapShared from "../Flows/FlowMapShared";

interface SharePanelProps {
  flow: Flow;
  withPin: boolean;
}

export default function SharePanel({ flow, withPin }: SharePanelProps) {
  const [accessCache, _] = useLocalStorage<{
    flowId: number;
    expiration: number;
  } | null>("get-aboard-access-cache", null);

  if (
    withPin &&
    (!accessCache ||
      accessCache.flowId !== flow.flow_id ||
      accessCodeHasExpired(accessCache.expiration))
  ) {
    return <ShareAccessPanel flow={flow} />;
  }

  return (
    <div className="w-full h-screen">
      <FlowMapShared flow={flow} />
    </div>
  );
}
