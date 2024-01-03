import PrincipalFlow from "@/components/Demos/PrincipalFlow";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    nodeId?: string;
  };
}) {
  const nodeId = searchParams?.nodeId;
  return (
    <main className="w-[1024px] h-[500px] mx-auto border-2">
      <PrincipalFlow nodeId={nodeId} />
    </main>
  );
}
