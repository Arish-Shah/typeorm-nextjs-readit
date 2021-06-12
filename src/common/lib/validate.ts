import { NexusGenInputs } from "@/generated/nexusTypes";

type SubInput = NexusGenInputs["SubInput"];
type PostInput = NexusGenInputs["PostInput"];

const nameRegex = /^[A-Za-z0-9_-]+$/;
const urlRegex = /^(?:https?:\/\/)?(?:[^.]+\.)?imgur\.com(\/.*)?$/;

export const validateSub = (input: SubInput) => {
  if (!nameRegex.test(input.name)) return "invalid name";
  if (input.image && !urlRegex.test(input.image)) return "invalid image url";
  if (input.banner && !urlRegex.test(input.banner)) return "invalid banner url";
};

export const validatePost = (input: PostInput) => {
  if (input.title.trim().length === 0) return "title required";
  if (input.body.trim().length === 0) return "body required";
  if (input.postType === "IMAGE" && !urlRegex.test(input.body))
    return "invalid image url";
};
