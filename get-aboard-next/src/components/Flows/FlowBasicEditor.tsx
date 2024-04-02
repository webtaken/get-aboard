"use client";

import { Flow } from "@/client";
import { Button } from "../ui/button";
import { PencilLine } from "lucide-react";
import { updateFlowByForm } from "@/lib/flow-actions";
import FlowEditDialog from "../commons/FlowEditDialog";

interface FlowBasicEditorProps {
  flow: Flow;
  shared?: boolean;
}

export default function FlowBasicEditor({
  flow,
  shared,
}: FlowBasicEditorProps) {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <h1 className="scroll-m-20 text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight">
          {flow.title}
        </h1>
        {!shared && (
          <FlowEditDialog
            trigger={
              <Button size="icon" variant="ghost">
                <PencilLine className="w-5 h-5" />
              </Button>
            }
            title="Update flow information"
            defaultTitleValue={flow.title}
            defaultDescriptionValue={flow.description}
            submitText="Save"
            //@ts-expect-error
            action={updateFlowByForm.bind(null, flow.flow_id)}
          />
        )}
      </div>

      <div className="leading-7 [&:not(:first-child)]:mt-4 mb-4">
        {flow.description}
      </div>
    </>
  );
}
