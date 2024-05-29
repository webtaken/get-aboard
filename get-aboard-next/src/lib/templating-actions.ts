import { Name, TemplatingService } from "@/client";
import { setCredentialsToAPI } from "./utils";

export async function createTag(tag: Name) {
  try {
    await setCredentialsToAPI();
    const newTag = await TemplatingService.templatingTagsCreate({
      //@ts-expect-error
      requestBody: {
        name: tag.name,
      },
    });
    return newTag;
  } catch (error) {
    return undefined;
  }
}
