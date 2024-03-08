"use server";

import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { setCredentialsToAPI } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { FlowsService, PatchedFlow } from "@/client";

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
    await setCredentialsToAPI();
    const session = await getServerSession(authOptions);
    // eslint-disable-next-line
    // @ts-ignore
    const django_user = session.django_data.user;
    await FlowsService.flowsCreate({
      // @ts-expect-error
      requestBody: {
        user: +django_user.pk,
        title: title,
        description: description,
        nodes_map: [],
        edges_map: [],
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
    await setCredentialsToAPI();
    const flows = await FlowsService.flowsList();
    return flows;
  } catch (error) {
    return undefined;
  }
}

export async function getFlowById(id: number) {
  try {
    await setCredentialsToAPI();
    const flow = await FlowsService.flowsRetrieve({ id: String(id) });
    return flow;
  } catch (error) {
    return undefined;
  }
}

export async function updateFlowById(id: number, data: PatchedFlow) {
  try {
    await setCredentialsToAPI();
    const updatedFlow = await FlowsService.flowsPartialUpdate({
      id: String(id),
      requestBody: data,
    });
    return updatedFlow;
  } catch (error) {
    return undefined;
  }
}
