import { Suspense } from "react";
import { getFlowById } from "@/lib/flow-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import FlowMap from "@/components/Flows/FlowMap";
import { AlertCircle } from "lucide-react";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const flow = await getFlowById(+id);

  if (!flow) {
    return (
      <Alert className="w-1/2 mx-auto my-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          We couldn't found the data of this flow.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="my-4">
      <div className="w-full h-[500px]">
        <FlowMap flow={flow} />
      </div>
    </div>
  );
}
