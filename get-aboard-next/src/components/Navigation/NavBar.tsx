"use client";

import Link from "next/link";
import { Noto_Sans } from "next/font/google";
import { Github, Menu } from "lucide-react";
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
import BillingButton from "./BillingButton";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import clsx from "clsx";

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

  if (pathname == "/login" || pathname == "/register") {
    return null;
  }

  return (
    <header
      className={clsx(
        "min-w-80 bg-gradient-to-b from-slate-100 to-slate-100/70 dark:from-slate-900 dark:to-slate-900/70 flex justify-between py-5",
        pathname === "/" && "top-0 sticky"
      )}
    >
      <div className="flex items-center gap-x-2">
        <Link
          href="/"
          className={`flex items-center gap-x-2 ${notoSans.className}`}
        >
          <GetAboardIcon className="w-6 h-6 stroke-slate-900 dark:stroke-slate-200" />{" "}
          <span className="text-2xl font-semibold">Get-Aboard</span>
        </Link>
      </div>

      <div className="hidden flex-col gap-6 md:flex md:flex-row md:items-center md:gap-10 lg:gap-6">
        {pathname.startsWith("/dashboard") &&
          subscription &&
          subscriptionPlan && (
            <BillingButton
              subscription={subscription}
              subscriptionPlan={subscriptionPlan}
            />
          )}
        {pathname.startsWith("/dashboard") && isFreePlan && (
          <Badge className="px-3 py-2">Free plan</Badge>
        )}
        {!pathname.startsWith("/dashboard") && (
          <>
            <Link
              href="/demo"
              className="text-sm font-semibold highlighted-text"
            >
              demo
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-semibold text-muted-foreground flex items-center gap-2"
            >
              pricing
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
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid items-end text-center gap-6 px-4 mt-5">
            {pathname.startsWith("/dashboard") &&
              subscription &&
              subscriptionPlan && (
                <BillingButton
                  subscription={subscription}
                  subscriptionPlan={subscriptionPlan}
                />
              )}
            <Link href="/demo" className="text-sm highlighted-text">
              demo
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground">
              pricing
            </Link>
            <Link
              href="https://github.com/webtaken/get-aboard"
              target="_blank"
              className="text-sm text-muted-foreground flex items-center justify-center gap-2"
            >
              project <Github className="w-4 h-4" />
            </Link>
            <div className="flex justify-center">
              {pathname.startsWith("/share/") ? (
                <Button asChild className="rounded-xl">
                  <Link href={session?.user ? "/dashboard" : "/login"}>
                    Log in
                  </Link>
                </Button>
              ) : session?.user ? (
                <div className="flex items-center gap-x-2">
                  <p className="text-sm text-muted-foreground">Account</p>
                  <ProfileActions size="small" session={session} />
                </div>
              ) : status === "loading" ? (
                <div className="rounded-full w-10 h-10 animate-pulse bg-slate-500" />
              ) : (
                <Button asChild className="rounded-xl">
                  <Link href="/login">Log in</Link>
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
