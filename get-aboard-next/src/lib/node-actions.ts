"use server";

import { FlowsService, OpenAPI, PatchedNode } from "@/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Node } from "@/client";
import { revalidatePath } from "next/cache";

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

export async function createNode(node: Node) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return undefined;
    // eslint-disable-next-line
    // @ts-ignore
    OpenAPI.TOKEN = session.django_data.access;
    const newNode = await FlowsService.flowsNodesCreate({
      requestBody: node,
    });
    return newNode;
  } catch (error) {
    throw error;
  }
}

export async function createNodes(flowId: number, nodes: Node[]) {
  try {
    const nodesPromises = nodes.map((node) => createNode(node));
    const results = await Promise.allSettled(nodesPromises);
    const rejected = results.filter((r) => r.status === "rejected");
    if (rejected.length > 0) {
      revalidatePath(`/dashboard/flows/${flowId}/`);
      return undefined;
    }
    revalidatePath(`/dashboard/flows/${flowId}/`);
    // @ts-ignore
    const createdNodes: Node[] = results.map((r) => r.value);
    return createdNodes;
  } catch (error) {
    return undefined;
  }
}

export async function deleteNodeById(path: string, id: number) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return undefined;
    // eslint-disable-next-line
    // @ts-ignore
    OpenAPI.TOKEN = session.django_data.access;
    await FlowsService.flowsNodesDestroy({
      nodeId: id,
    });
    revalidatePath(path);
    return true;
  } catch (error) {
    return undefined;
  }
}
