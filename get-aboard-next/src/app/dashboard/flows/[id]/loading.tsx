import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-32">
      <LoaderCircle className="animate-spin w-10 h-10" />
    </div>
  );
}
