"use server";

import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { ActionStandardError, setCredentialsToAPI } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";
import {
  Flow,
  FlowsCreateValidationError,
  FlowsPartialUpdateValidationError,
  FlowsService,
  PatchedFlow,
} from "@/client";

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    general?: string;
    code?: string;
  };
  message?: string | null;
  status: "initial" | "success" | "error";
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
      status: "error",
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
        metadata: {},
      },
    });
    revalidatePath(`/dashboard`);
    return { message: "Flow created", status: "success" };
  } catch (error: any) {
    console.error(error);
    const apiError = error.body as FlowsCreateValidationError;
    const errorData: State = {
      errors: {
        general: undefined,
        code: "unknown",
      },
      message: "An error ocurred while creating the flow, try again later.",
      status: "error",
    };
    if (errorData.errors && apiError.errors.length > 0) {
      errorData.errors.general = apiError.errors[0].detail;
      errorData.errors.code = apiError.errors[0].code;
    }
    return errorData;
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

export async function updateFlowById(
  id: number,
  data: PatchedFlow
): Promise<[Flow | null, ActionStandardError | null]> {
  try {
    await setCredentialsToAPI();
    const updatedFlow = await FlowsService.flowsPartialUpdate({
      id: String(id),
      requestBody: data,
    });
    revalidatePath(`/dashboard/flows/${id}`);
    return [updatedFlow, null];
  } catch (error: any) {
    const apiError = error.body as FlowsPartialUpdateValidationError;
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
        detail:
          "Error while saving the flow, please reload the page or contact support.",
        code: "unknown",
      },
    ];
  }
}

export async function updateFlowByForm(
  id: number,
  prevState: State,
  formData: FormData
) {
  const validatedFields = CreateFlow.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Flow.",
      status: "error",
    };
  }
  const { title, description } = validatedFields.data;

  try {
    await setCredentialsToAPI();
    await FlowsService.flowsPartialUpdate({
      id: String(id),
      requestBody: {
        title: title,
        description: description,
      },
    });
    revalidatePath(`/dashboard/flows/${id}`);
    revalidatePath("/dashboard");
    return { message: "Flow updated", status: "success" };
  } catch (error) {
    return {
      message: "An error ocurred while creating the flow, try again later.",
      status: "error",
    };
  }
}

export async function deleteFlowById(id: number) {
  try {
    await setCredentialsToAPI();
    await FlowsService.flowsDestroy({
      id: String(id),
    });
    revalidatePath("/dashboard");
    return true;
  } catch (error) {
    return undefined;
  }
}

export async function shareFlow(
  id: number,
  option: "view" | "comment" | "edit",
  withPIN: boolean
) {
  try {
    await setCredentialsToAPI();
    const shareOption = await FlowsService.flowsShareFlowPartialUpdate({
      id: String(id),
      option: option,
      withPin: withPIN,
    });
    return shareOption;
  } catch (error) {
    return undefined;
  }
}

export async function unshareFlow(id: number, field: "url" | "pin") {
  try {
    await setCredentialsToAPI();
    await FlowsService.flowsUnshareFlowPartialUpdate({
      id: String(id),
      field: field,
    });
    return true;
  } catch (error) {
    return undefined;
  }
}

export async function getFlowShareOption(id: number) {
  try {
    noStore();
    await setCredentialsToAPI();
    const shareOption = await FlowsService.flowsGetShareOptionsRetrieve({
      id: String(id),
    });
    return shareOption;
  } catch (error) {
    return undefined;
  }
}

export async function validateFlowPin(flowId: number, pin: string) {
  try {
    await setCredentialsToAPI();
    const shareOption = await getFlowShareOption(flowId);
    if (!shareOption || !shareOption.pin) throw Error("No pin required");
    revalidatePath(`/share/${flowId}/view`);
    return shareOption.pin === pin;
  } catch (error) {
    return undefined;
  }
}
