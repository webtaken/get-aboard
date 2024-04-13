"use client";

import Link from "next/link";
import { Noto_Sans } from "next/font/google";
import { Github } from "lucide-react";
import GetAboardIcon from "../Icons/GetAboardIcon";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggler } from "../Theming/ThemeToggler";
import { useSession } from "next-auth/react";
import ProfileActions from "./ProfileActions";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import {
  getSubscriptionPlan,
  getUserSubscription,
} from "@/lib/billing-actions";
import { Subscription, SubscriptionPlan } from "@/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BillingButton from "./BillingButton";

const notoSans = Noto_Sans({ subsets: ["latin"] });

export default function NavBar() {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const [subscription, setSubscription] = useState<Subscription | undefined>(
    undefined
  );
  const [subscriptionPlan, setSubscriptionPlan] = useState<
    SubscriptionPlan | undefined
  >(undefined);

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
        }
      };
      getSubscription();
    }
  }, [session]);

  if (pathname == "/login" || pathname == "/register") {
    return null;
  }

  return (
    <nav className="flex justify-between py-5">
      <div className="flex items-center gap-x-2">
        <Link
          href="/"
          className={`flex items-center gap-x-2 ${notoSans.className}`}
        >
          <GetAboardIcon className="w-6 h-6 stroke-slate-900 dark:stroke-slate-200" />{" "}
          <span className="text-2xl font-semibold">Get-Aboard</span>
        </Link>
        <Badge className="outline">Beta v0.1.0</Badge>
      </div>

      <div className="flex items-center gap-10">
        {pathname.startsWith("/dashboard") &&
          subscription &&
          subscriptionPlan && (
            <BillingButton
              subscription={subscription}
              subscriptionPlan={subscriptionPlan}
            />
          )}
        {!pathname.startsWith("/dashboard") && (
          <>
            <Link href="/demo" className="text-base highlighted-text">
              demo
            </Link>
            <Link
              href="/pricing"
              className="text-muted-foreground text-base flex items-center gap-2"
            >
              pricing
            </Link>
            <Link
              href="https://github.com/webtaken/get-aboard"
              target="_blank"
              className="text-muted-foreground text-base flex items-center gap-2"
            >
              project <Github className="w-4 h-4" />
            </Link>
          </>
        )}
        <ThemeToggler />
        {pathname.startsWith("/share/") ? (
          <Button asChild className="rounded-xl">
            <Link href={session?.user ? "/dashboard" : "/login"}>Log in</Link>
          </Button>
        ) : session?.user ? (
          <ProfileActions session={session} />
        ) : status === "loading" ? (
          <div className="rounded-full w-10 h-10 animate-pulse bg-slate-500" />
        ) : (
          <Button asChild className="rounded-xl">
            <Link href="/login">Log in</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
