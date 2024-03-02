"use server";

import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath } from "next/cache";
import { FlowsService, OpenAPI, PatchedFlow } from "@/client";

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    title?: string[];
    description?: string[];
  };
  message?: string | null;
};

const CreateFlow = z.object({
  title: z.coerce.string().min(1, "The title must not be empty."),
  description: z.coerce.string().min(1, "The description must not be empty."),
});

export async function createFlow(prevState: State, formData: FormData) {
  const validatedFields = CreateFlow.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Flow.",
    };
  }
  const { title, description } = validatedFields.data;

  try {
    const session = await getServerSession(authOptions);
    if (!session) throw Error("no session available");
    // eslint-disable-next-line
    // @ts-ignore
    OpenAPI.TOKEN = session.django_data.access;
    // eslint-disable-next-line
    // @ts-ignore
    const django_user = session.django_data.user;
    await FlowsService.flowsCreate({
      // @ts-ignore
      requestBody: {
        user: +django_user.pk,
        flow_id: 0,
        title: title,
        description: description,
      },
    });
    revalidatePath(`/dashboard`);
    return { message: "Flow created" };
  } catch (error) {
    return {
      message: "An error ocurred while creating the flow, try again later.",
    };
  }
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

export async function updateFlowById(id: number, data: PatchedFlow) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return undefined;
    // eslint-disable-next-line
    // @ts-ignore
    OpenAPI.TOKEN = session.django_data.access;
    const updatedFlow = await FlowsService.flowsPartialUpdate({
      flowId: id,
      requestBody: data,
    });
    return updatedFlow;
  } catch (error) {
    return undefined;
  }
}
