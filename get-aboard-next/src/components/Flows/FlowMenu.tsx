"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { updateFlowByForm } from "@/lib/flow-actions";
import { Button } from "../ui/button";
import {
  BookOpenText,
  LayoutDashboardIcon,
  LogOut,
  Menu,
  MoonIcon,
  SquarePen,
  SunIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import FlowEditDialog from "../commons/FlowEditDialog";
import { useTheme } from "next-themes";
import { Flow } from "@/client";
import BillingButton from "@/components/Navigation/BillingButton";
import NewFeatureRadar from "../commons/NewFeatureRadar";
import useGetBillingInfo from "@/hooks/useGetBillingInfo";

interface FlowMenuProps {
  flow: Flow;
}

export default function FlowMenu({ flow }: FlowMenuProps) {
  const { setTheme } = useTheme();
  const { status, session, oneTimePaymentProduct, order } = useGetBillingInfo();

  const router = useRouter();

  return (
    <NewFeatureRadar>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon">
            <Menu className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <h1 className="font-bold">{flow.title}</h1>
          <p className="text-sm text-muted-foreground">{flow.description}</p>
          <Separator className="my-2" />
          <div className="flex flex-col">
            <FlowEditDialog
              trigger={
                <Button
                  variant="ghost"
                  className="flex justify-start items-center text-sm gap-x-2"
                >
                  <SquarePen className="w-3.5 h-3.5" /> Edit roadmap
                </Button>
              }
              title="Update flow information"
              defaultTitleValue={flow?.title}
              defaultDescriptionValue={flow?.description}
              submitText="Save"
              //@ts-expect-error
              action={updateFlowByForm.bind(null, flow.flow_id)}
            />
            <Button variant="ghost" className="justify-start text-sm" asChild>
              <Link href="/dashboard" className="flex items-center gap-x-2">
                <LayoutDashboardIcon className="w-3.5 h-3.5" /> Go to dashboard
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="justify-start text-sm border-2 border-primary"
              asChild
            >
              <Link
                href="https://gray-lettuce-c86.notion.site/Get-Aboard-Guide-c8b49121676e4c4099b09f13a1b1b83e?pvs=4"
                target="_blank"
                className="flex items-center gap-x-2"
              >
                <BookOpenText className="w-3.5 h-3.5" /> Quick tutorial
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center gap-x-2 justify-start text-sm"
              onClick={() => {
                async function logout() {
                  const data = await signOut({
                    redirect: false,
                    callbackUrl: "/",
                  });
                  router.push(data.url);
                }
                logout();
              }}
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </Button>
            <Separator className="my-2" />
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Theme</span>
              <div className="flex items-center border-2 rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setTheme("light");
                  }}
                >
                  <SunIcon className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setTheme("dark");
                  }}
                >
                  <MoonIcon className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Your plan</p>
              {order && oneTimePaymentProduct && (
                <BillingButton
                  variant="ghost"
                  subscription={order}
                  subscriptionPlan={oneTimePaymentProduct}
                />
              )}
              {!order && (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/#pricing_card"
                        className="text-sm border-2 rounded-xl px-2 py-1 hover:bg-muted-foreground hover:text-muted"
                      >
                        Free trial
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Click to upgrade</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </NewFeatureRadar>
  );
}
