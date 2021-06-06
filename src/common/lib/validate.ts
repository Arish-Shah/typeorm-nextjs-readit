import { PostInput, RegisterInput, SubInput } from "@/generated/backend";

const emailRegex = /^([a-z0-9_\.-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/;
const usernameRegex = /^[A-Za-z0-9_-]+$/;
const imageRegex = /^(?:https?:\/\/)?(?:[^.]+\.)?imgur\.com(\/.*)?$/;

export const validateRegister = (input: RegisterInput) => {
  if (!emailRegex.test(input.email)) return "invalid email";
  if (!usernameRegex.test(input.username)) return "invalid username";
  if (input.password.length < 3) return "password min 8 characters";
};

export const validateSub = (input: SubInput) => {
  if (!usernameRegex.test(input.name)) return "invalid name";
  if (input.image && !imageRegex.test(input.image)) return "invalid image url";
  if (input.banner && !imageRegex.test(input.banner))
    return "invalid banner url";
};

export const validatePost = (input: PostInput) => {
  if (input.title.length <= 0) return "title required";
  if (input.image && !imageRegex.test(input.image)) return "invalid image url";
};
