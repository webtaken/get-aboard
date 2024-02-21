"use server";

import { FlowsService, OpenAPI, PatchedNode } from "@/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function getFlowNodes(id: number) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return undefined;
    // eslint-disable-next-line
    // @ts-ignore
    OpenAPI.TOKEN = session.django_data.access;
    const nodes = await FlowsService.flowsNodesList({ flowId: id });
    return nodes;
  } catch (error) {
    return undefined;
  }
}

export async function getNodeById(id: number) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return undefined;
    // eslint-disable-next-line
    // @ts-ignore
    OpenAPI.TOKEN = session.django_data.access;
    const node = await FlowsService.flowsNodesRetrieve({ nodeId: id });
    return node;
  } catch (error) {
    return undefined;
  }
}

export async function updateNodeById(id: number, data: PatchedNode) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return undefined;
    // eslint-disable-next-line
    // @ts-ignore
    OpenAPI.TOKEN = session.django_data.access;
    const node = await FlowsService.flowsNodesPartialUpdate({
      nodeId: id,
      requestBody: data,
    });
    return node;
  } catch (error) {
    return undefined;
  }
}
