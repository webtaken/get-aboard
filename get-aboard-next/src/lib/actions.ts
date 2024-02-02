"use server";

import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FlowsService, OpenAPI } from "@/client";

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
  const edges = "{}";

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
      requestBody: {
        user: +django_user.pk,
        flow_id: 0,
        title: title,
        description: description,
        edges: edges,
        created_at: "",
        updated_at: "",
      },
    });
    revalidatePath(`/dashboard`);
    return { message: "Flow created" };
  } catch (error) {
    return {
      message: "An error ocurred while creating the flow, try again later.",
    };
  }

  revalidatePath(`/dashboard`);
  redirect(`/dashboard`);
}
