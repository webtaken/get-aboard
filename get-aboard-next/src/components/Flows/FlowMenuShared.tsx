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
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  getSubscriptionPlan,
  getUserSubscription,
} from "@/lib/billing-actions";
import { Subscription, SubscriptionPlan } from "@/client";
import BillingButton from "@/components/Navigation/BillingButton";

interface FlowMenuSharedProps {
  flow: Flow;
}

export default function FlowMenuShared({ flow }: FlowMenuSharedProps) {
  const { setTheme } = useTheme();
  const router = useRouter();
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState<Subscription | undefined>(
    undefined
  );
  const [subscriptionPlan, setSubscriptionPlan] = useState<
    SubscriptionPlan | undefined
  >(undefined);
  const [isFreePlan, setIsFreePlan] = useState(false);

  useEffect(() => {
    if (session) {
      const getSubscription = async () => {
        const sub = await getUserSubscription();
        setSubscription(sub);
        if (sub) {
          const plan = await getSubscriptionPlan(sub.plan!);
          setSubscriptionPlan(plan);
        } else {
          // Free plan
          setIsFreePlan(true);
        }
      };
      getSubscription();
    }
  }, [session]);

  return (
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
          <Button variant="ghost" className="justify-start text-sm">
            <Link href="/dashboard" className="flex items-center gap-x-2">
              <LayoutDashboardIcon className="w-3.5 h-3.5" /> Go to dashboard
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
            {subscription && subscriptionPlan && (
              <BillingButton
                variant="ghost"
                subscription={subscription}
                subscriptionPlan={subscriptionPlan}
              />
            )}
            {isFreePlan && (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/pricing"
                      className="text-sm border-2 rounded-xl px-2 py-1 hover:bg-muted-foreground hover:text-muted"
                    >
                      Free plan
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">Click to upgrade</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <p className="text-xs text-center font-semibold mt-2">
            You&apos;re on only view mode
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
