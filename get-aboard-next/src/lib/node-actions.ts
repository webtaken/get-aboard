"use server";

import { FlowsService, PatchedNode } from "@/client";
import { Node } from "@/client";
import { setCredentialsToAPI } from "./utils";

export async function getFlowNodes(id: number) {
  try {
    await setCredentialsToAPI();
    const nodes = await FlowsService.flowsNodesList({ flowId: id });
    return nodes;
  } catch (error) {
    return undefined;
  }
}

export async function getNodeById(id: number) {
  try {
    await setCredentialsToAPI();
    const node = await FlowsService.flowsNodesRetrieve({ nodeId: id });
    return node;
  } catch (error) {
    return undefined;
  }
}

export async function updateNodeById(id: number, data: PatchedNode) {
  try {
    await setCredentialsToAPI();
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
    await setCredentialsToAPI();
    const newNode = await FlowsService.flowsNodesCreate({
      requestBody: node,
    });
    return newNode;
  } catch (error) {
    throw error;
  }
}

export async function deleteNodeById(id: number) {
  try {
    await setCredentialsToAPI();
    await FlowsService.flowsNodesDestroy({
      nodeId: id,
    });
    return true;
  } catch (error) {
    return undefined;
  }
}
