import { ClientOnly } from "@/components/core/ClientOnly";
import SharePanel from "@/components/Share/SharePanel";
import { getFlowById, getFlowShareOption } from "@/lib/flow-actions";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const shareOption = await getFlowShareOption(+id);
  
  if (!shareOption || (!shareOption.url && !shareOption.pin)) {
    notFound();
  }

  return (
    <ClientOnly>
      <SharePanel flowId={+id} withPin={shareOption.pin !== null} />
    </ClientOnly>
  );
}
