import Link from "next/link";
import { ShieldBan } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <nav className="flex justify-between py-5 px-10">
      <Link href="/" className="text-2xl font-semibold">
        GET-ABOARD.
      </Link>
      <div className="flex items-center gap-10">
        <Link href="/demo" className="text-muted-foreground text-base">
          demo
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="rounded-xl cursor-not-allowed gap-2">
                Log in <ShieldBan className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Coming Soon</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
}
