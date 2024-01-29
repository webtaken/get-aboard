import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { FlowsList, FlowsListFallback } from "@/components/Flows/FlowsList";
import { getUserFlows } from "@/lib/utils";
import Image from "next/image";
import buildingLight from "@/assets/building-light.svg";

export default async function Page() {
  // const flows = await getUserFlows();

  // console.log(flows);

  return (
    <>
      {/* <div className="flex justify-between items-center my-5 border-y-2 py-10">
        <h2 className="text-left px-2 text-2xl font-semibold tracking-tight">
          My flows
        </h2>
        <Button>Create Flow</Button>
      </div> */}
      <div className="flex justify-center mt-10 mb-5">
        <Image
          priority
          src={buildingLight}
          alt="Creative Work"
          width={300}
          height={500}
          className="mx-auto stroke-green-600 fill-green-600"
        />
      </div>
      <p className="text-center text-lg">
        We are working hard, you&apos;ll receive an email when things get done!
      </p>
      {/* <Suspense fallback={<FlowsListFallback />}>
        <FlowsList />
      </Suspense> */}
    </>
  );
}
