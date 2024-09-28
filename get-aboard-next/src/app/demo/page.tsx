import { ClientOnly } from "@/components/core/ClientOnly";
import DemoFlow from "@/components/Demos/DemoFlow";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <main className="w-full h-screen">
      <ClientOnly>
        <DemoFlow />
      </ClientOnly>
    </main>
  );
}
