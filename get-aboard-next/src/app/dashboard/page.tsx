import { Suspense } from "react";
import { FlowsList, FlowsListFallback } from "@/components/Flows/FlowsList";
import { getUserFlows } from "@/lib/node-actions";
import FlowsCreator from "@/components/Flows/FlowsCreator";

export default async function Page() {
  const flows = await getUserFlows();

  return (
    <>
      <div className="flex justify-between items-center my-5 border-y-2 py-10">
        <h2 className="text-left px-2 text-2xl font-semibold tracking-tight">
          My flows
        </h2>
        <FlowsCreator />
      </div>
      <Suspense fallback={<FlowsListFallback />}>
        <FlowsList />
      </Suspense>
    </>
  );
}
