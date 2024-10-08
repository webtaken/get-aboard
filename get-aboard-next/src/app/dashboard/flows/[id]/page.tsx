import {
  getFlowById,
  getFlowShareOption,
  getFlowTemplateOption,
} from "@/lib/flow-actions";
import FlowMap from "@/components/Flows/FlowMap";
import { notFound, redirect } from "next/navigation";
import { getUserHasAccess } from "@/lib/billing-actions";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [flow, shareOption, templateOption, access] = await Promise.all([
    getFlowById(+id),
    getFlowShareOption(+id),
    getFlowTemplateOption(+id),
    getUserHasAccess(),
  ]);
  if (!access?.has_access) {
    redirect("/dashboard");
  }
  if (!flow) {
    notFound();
  }

  return (
    <div className="w-full h-screen">
      <FlowMap
        flow={flow}
        shareOption={shareOption}
        templateOption={templateOption}
      />
    </div>
  );
}
