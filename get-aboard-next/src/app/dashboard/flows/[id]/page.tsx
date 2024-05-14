import { getFlowById, getFlowShareOption } from "@/lib/flow-actions";
import FlowMap from "@/components/Flows/FlowMap";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [flow, shareOption] = await Promise.all([
    getFlowById(+id),
    getFlowShareOption(+id),
  ]);

  if (!flow) {
    notFound();
  }

  return (
    <div className="w-full h-screen">
      <FlowMap flow={flow} shareOption={shareOption} />
    </div>
  );
}
