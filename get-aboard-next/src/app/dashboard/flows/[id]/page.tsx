import FlowPanel from "@/components/Flows/FlowPanel";
import { getFlowById } from "@/lib/flow-actions";
import { getFlowNodes } from "@/lib/node-actions";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const flow = await getFlowById(+id);

  if (!flow) {
    return <div>Flow not found</div>;
  }

  console.log(flow.edges, typeof flow.edges);

  return (
    <div className="my-4">
      <h1 className="scroll-m-20 text-3xl mt-5 font-extrabold tracking-tight lg:text-5xl">
        {flow.title}
      </h1>
      <div className="leading-7 [&:not(:first-child)]:mt-4 mb-4">
        {flow.description}
      </div>
      <div className="w-full h-[500px]">
        <FlowPanel flowId={id} initialEdges={flow.edges as string} />
      </div>
    </div>
  );
}
