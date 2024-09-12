import { Suspense } from "react";
import { FlowsList, FlowsListFallback } from "@/components/Flows/FlowsList";
import FlowEditDialog from "@/components/commons/FlowEditDialog";
import { Button } from "@/components/ui/button";
import { createFlow } from "@/lib/flow-actions";
import { getUserHasAccess } from "@/lib/billing-actions";
import { Lock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export const dynamic = "force-dynamic";

export default async function Page() {
  const access = await getUserHasAccess();
  if (!access) {
    toast({
      title: "Error",
      description:
        "You don't have access to this section, please login again or contact us on x.com, user: @node_srojas1",
      variant: "destructive",
    });
    return (
      <div className="px-10">
        <div className="flex justify-between items-center my-5 border-y-2 py-10">
          <h2 className="text-left px-2 text-2xl font-semibold tracking-tight">
            My flows
          </h2>
          <Button disabled className="flex items-center gap-x-2">
            <Lock className="w-4 h-4" />
            Create Roadmap
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-10">
      <div className="flex justify-between items-center my-5 border-y-2 py-10">
        <h2 className="text-left px-2 text-2xl font-semibold tracking-tight">
          My flows
        </h2>
        {access.has_access && (
          <FlowEditDialog
            trigger={
              <Button className="flex items-center gap-x-2">
                Create Roadmap
              </Button>
            }
            title="Create your flow"
            submitText="Create"
            // @ts-expect-error
            action={createFlow.bind(null)}
          />
        )}
      </div>
      <Suspense fallback={<FlowsListFallback />}>
        <FlowsList access={access} />
      </Suspense>
    </div>
  );
}
