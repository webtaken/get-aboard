import PrincipalFlow from "@/components/Demos/PrincipalFlow";
import { Badge } from "@/components/ui/badge";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    nodeId?: string;
  };
}) {
  const nodeId = searchParams?.nodeId;
  return (
    <main className="w-full mx-auto px-5">
      <h1 className="scroll-m-20 text-4xl mt-5 font-extrabold tracking-tight lg:text-5xl">
        Demo
      </h1>
      <div className="leading-7 [&:not(:first-child)]:mt-6 mb-5">
        This is just the first demo try drag and drop edges from the nodes.
        <br />
        If you want to restart the path try clicking <Badge>Start</Badge> button
        😉.
      </div>
      <div className="w-full h-[500px] mb-5">
        <PrincipalFlow nodeId={nodeId} />
      </div>
    </main>
  );
}
