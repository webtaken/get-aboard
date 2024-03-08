import { authOptions } from "@/auth";
import { type ClassValue, clsx } from "clsx";
import { getServerSession } from "next-auth";
import { OpenAPI } from "@/client";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function setCredentialsToAPI() {
  if (!OpenAPI.TOKEN) {
    const session = await getServerSession(authOptions);
    if (!session) throw Error("set credentials failed");
    // eslint-disable-next-line
    // @ts-ignore
    OpenAPI.TOKEN = session.django_data.access;
  }
}
