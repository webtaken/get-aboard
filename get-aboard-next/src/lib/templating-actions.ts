import { Name, TemplatingService } from "@/client";
import { setCredentialsToAPI } from "./utils";

export async function createTag(tag: Name) {
  try {
    await setCredentialsToAPI();
    const newTag = await TemplatingService.templatingTagsCreate({
      requestBody: {
        name: tag.name,
      },
    });
    return newTag;
  } catch (error) {
    return undefined;
  }
}
