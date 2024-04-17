import { authOptions } from "@/auth";
import { type ClassValue, clsx } from "clsx";
import { getServerSession } from "next-auth";
import { OpenAPI } from "@/client";
import { twMerge } from "tailwind-merge";
import { toast as toastSooner } from "sonner";

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
    OpenAPI.BASE = process.env.BASE_PATH_API!;
  }
}

export async function copyTextToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

export function accessCodeHasExpired(timestamp: number) {
  const currentTimestamp = Date.now();
  const givenTimestamp = new Date(timestamp).getTime();
  return givenTimestamp < currentTimestamp;
}

export interface ActionStandardError {
  detail: string;
  code: string;
}
