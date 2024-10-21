"use server";

import {
  FlowsNodesCreateValidationError,
  FlowsService,
  PatchedNode,
} from "@/client";
import { Node } from "@/client";
import {
  ActionStandardError,
  setBasePathToAPI,
  setCredentialsToAPI,
} from "./utils";

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

export async function getSharedNodeById(id: number) {
  try {
    setBasePathToAPI();
    const node = await FlowsService.flowsNodesSharedRetrieve({ nodeId: id });
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

export async function createNode(
  node: Node
): Promise<[Node | null, ActionStandardError | null]> {
  try {
    await setCredentialsToAPI();
    const newNode = await FlowsService.flowsNodesCreate({
      requestBody: node,
    });
    return [newNode, null];
  } catch (error: any) {
    const apiError = error.body as FlowsNodesCreateValidationError;
    if (apiError.errors && apiError.errors.length > 0) {
      return [
        null,
        {
          detail: apiError.errors[0].detail,
          code: apiError.errors[0].code,
        },
      ];
    }
    return [
      null,
      {
        detail: "Error while updating the node, please contact support.",
        code: "unknown",
      },
    ];
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
