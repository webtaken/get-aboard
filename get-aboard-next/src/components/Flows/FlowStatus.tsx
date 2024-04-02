import { Button } from "../ui/button";
import { CheckCircle2, Loader2, Workflow, XCircle } from "lucide-react";

interface FlowStatusProps {
  status: "initial" | "loading" | "success" | "error";
}

export default function FlowStatus({ status }: FlowStatusProps) {
  return (
    <Button className="flex items-center" size="icon">
      {status === "initial" && <Workflow className="w-5 h-5" />}
      {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
      {status === "success" && (
        <CheckCircle2 className="w-5 h-5 stroke-green-600" />
      )}
      {status === "error" && <XCircle className="w-5 h-5 stroke-red-600" />}
    </Button>
  );
}
