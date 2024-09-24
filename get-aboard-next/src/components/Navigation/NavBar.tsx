"use client";

import Link from "next/link";
import { Noto_Sans } from "next/font/google";
import { Github, Menu } from "lucide-react";
import GetAboardIcon from "../Icons/GetAboardIcon";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ProfileActions from "./ProfileActions";
import BillingButton from "./BillingButton";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import clsx from "clsx";
import useGetBillingInfo from "@/hooks/useGetBillingInfo";

const notoSans = Noto_Sans({ subsets: ["latin"] });

function pathnameIsInFlowPage(str: string) {
  const pattern = /^\/dashboard\/flows\/[0-9]+$/;
  return pattern.test(str);
}

function pathnameIsInSharePage(str: string) {
  const pattern = /^\/share\/[0-9]+\/view$/;
  return pattern.test(str);
}

export default function NavBar() {
  const pathname = usePathname();
  const { status, session, oneTimePaymentProduct, order } = useGetBillingInfo();

  if (
    pathname == "/login" ||
    pathname == "/register" ||
    pathnameIsInFlowPage(pathname) ||
    pathnameIsInSharePage(pathname)
  ) {
    return null;
  }

  return (
    <header
      className={
        "px-10 min-w-80 bg-gradient-to-b from-slate-100 to-slate-100/70 dark:from-slate-900 dark:to-slate-900/70 flex justify-between py-5"
      }
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
          order &&
          oneTimePaymentProduct && (
            <BillingButton
              subscription={order}
              subscriptionPlan={oneTimePaymentProduct}
            />
          )}
        {pathname.startsWith("/dashboard") && !order && (
          <Button className="px-3 py-2" asChild>
            <Link href="/#pricing_card">Buy get-aboard</Link>
          </Button>
        )}
        {!pathname.startsWith("/dashboard") && (
          <>
            <Link
              href={`${process.env.NEXT_PUBLIC_LOCALHOST}/share/4/view`}
              className="text-sm font-semibold highlighted-text"
            >
              demo
            </Link>
            <Link
              href="/#pricing_card"
              className="text-sm font-semibold text-muted-foreground flex items-center gap-2"
            >
              pricing
            </Link>
          </>
        )}
        {/* NOTE: This doesn't have a special meaning on the navbar */}
        {/* <ThemeToggler /> */}
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
              order &&
              oneTimePaymentProduct && (
                <BillingButton
                  subscription={order}
                  subscriptionPlan={oneTimePaymentProduct}
                />
              )}
            <Link href="/demo" className="text-sm highlighted-text">
              demo
            </Link>
            <Link
              href="/#pricing_card"
              className="text-sm text-muted-foreground"
            >
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
