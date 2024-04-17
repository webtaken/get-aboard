"use client";
import { LogOut, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import clsx from "clsx";

export default function ProfileActions({
  session,
  size,
}: {
  session: Session;
  size?: "small" | "medium" | "large";
}) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          width={100}
          height={100}
          className={clsx(
            "rounded-full p-0.5 border-2",
            (!size || size === "medium") && "w-12 h-12",
            size === "small" && "w-7 h-7",
            size === "large" && "w-20 h-20"
          )}
          src={session.user?.image as string}
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
  );
}
