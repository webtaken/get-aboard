import { Suspense } from "react";
import { FlowsList, FlowsListFallback } from "@/components/Flows/FlowsList";
import FlowEditDialog from "@/components/commons/FlowEditDialog";
import { Button } from "@/components/ui/button";
import { createFlow } from "@/lib/flow-actions";
import { getUserOrder } from "@/lib/billing-actions";
import { Lock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Page() {
  const order = await getUserOrder();
  const isFreePlan = order === undefined;

  return (
    <div className="px-10">
      <div className="flex justify-between items-center my-5 border-y-2 py-10">
        <h2 className="text-left px-2 text-2xl font-semibold tracking-tight">
          My flows
        </h2>
        <FlowEditDialog
          trigger={
            <Button disabled={isFreePlan} className="flex items-center gap-x-2">
              {isFreePlan && <Lock className="w-4 h-4" />}
              Create Roadmap
            </Button>
          }
          title="Create your flow"
          submitText="Create"
          // @ts-expect-error
          action={createFlow.bind(null)}
        />
      </div>
      <Suspense fallback={<FlowsListFallback />}>
        <FlowsList isFreePlan={isFreePlan} />
      </Suspense>
    </div>
  );
}
