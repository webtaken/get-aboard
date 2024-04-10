import SharePanel from "@/components/Share/SharePanel";
import { getFlowById, getFlowShareOption } from "@/lib/flow-actions";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [shareOption, flow] = await Promise.all([
    getFlowShareOption(+id),
    getFlowById(+id),
  ]);
  if (!shareOption || !flow || (!shareOption.url && !shareOption.pin)) {
    notFound();
  }

  return <SharePanel flow={flow} withPin={shareOption.pin !== null} />;
}
