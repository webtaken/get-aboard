import { FlowsService, OpenAPI } from "@/client";
import { type ClassValue, clsx } from "clsx";
import { getServerSession } from "next-auth";
import { twMerge } from "tailwind-merge";
import { authOptions } from "@/auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUserFlows() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return undefined;
    // eslint-disable-next-line
    // @ts-ignore
    OpenAPI.TOKEN = session.django_data.access;
    // eslint-disable-next-line
    // @ts-ignore
    const django_user = session.django_data.user;
    const flows = await FlowsService.flowsList({ userId: django_user.pk });
    return flows;
  } catch (error) {
    return undefined;
  }
}

export async function getFlowById(id: number) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return undefined;
    // eslint-disable-next-line
    // @ts-ignore
    OpenAPI.TOKEN = session.django_data.access;
    const flow = await FlowsService.flowsRetrieve({ flowId: id });
    return flow;
  } catch (error) {
    return undefined;
  }
}
