"use client";

import Link from "next/link";
import { Noto_Sans } from "next/font/google";
import { Github, LogOut, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GetAboardIcon from "../Icons/GetAboardIcon";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggler } from "../Theming/ThemeToggler";
import { useSession, signOut } from "next-auth/react";

const notoSans = Noto_Sans({ subsets: ["latin"] });

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { status, data: session } = useSession();

  if (pathname == "/login" || pathname == "/register") {
    return null;
  }

  return (
    <nav className="flex justify-between py-5 px-10">
      <Link
        href="/"
        className={`flex items-center gap-x-2 ${notoSans.className}`}
      >
        <GetAboardIcon className="w-6 h-6 stroke-slate-900 dark:stroke-slate-200" />{" "}
        <span className="text-2xl font-semibold">Get-Aboard</span>
      </Link>
      <div className="flex items-center gap-10">
        <Link href="/demo" className="text-muted-foreground text-base">
          demo
        </Link>
        <Link
          href="https://github.com/webtaken/get-aboard"
          target="_blank"
          className="text-muted-foreground text-base flex items-center gap-2"
        >
          go to project <Github className="w-4 h-4" />
        </Link>
        <ThemeToggler />
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                width={100}
                height={100}
                className="w-10 h-10 rounded-full"
                src={session.user.image as string}
                alt="profile image"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  router.push("/dashboard");
                }}
              >
                <LayoutDashboard className="mr-2 w-4 h-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
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
                <LogOut className="mr-2 w-4 h-4" /> <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
