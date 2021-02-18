import { isEmail, length } from "class-validator";
import { FieldError } from "../resolvers/types/field-error";
import { PostInput } from "../resolvers/types/post-input";
import { RegisterInput } from "../resolvers/types/register-input";

export const validateRegister = (input: RegisterInput): FieldError[] | null => {
  const errors: FieldError[] = [];

  if (!isEmail(input.email)) {
    errors.push({
      field: "email",
      message: "already exists",
    });
  }

  if (!length(input.username, 4, 20)) {
    errors.push({
      field: "username",
      message: "4-20 characters",
    });
  }

  if (!length(input.password, 4)) {
    errors.push({
      field: "password",
      message: "8+ characters",
    });
  }

  return errors.length ? errors : null;
};

export const validatePost = (input: PostInput): FieldError[] | null => {
  const errors: FieldError[] = [];

  if (!length(input.title, 1)) {
    errors.push({
      field: "title",
      message: "cannot be empty",
    });
  }

  if (!length(input.body, 1)) {
    errors.push({
      field: "body",
      message: "cannot be empty",
    });
  }

  return errors.length ? errors : null;
};
