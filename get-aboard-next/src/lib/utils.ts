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
  const session: any = await getServerSession(authOptions);
  if (!session) throw Error("set credentials failed");
  OpenAPI.TOKEN = session.access_token;
  OpenAPI.BASE = process.env.BASE_PATH_API!;
}

export async function setBasePathToAPI() {
  OpenAPI.BASE = process.env.BASE_PATH_API!;
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
