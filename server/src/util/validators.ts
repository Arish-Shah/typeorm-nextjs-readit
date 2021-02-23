import { isAlphanumeric, isEmail, length } from "class-validator";

import { FieldError } from "../resolvers/types/field-error";
import { RegisterInput } from "../resolvers/types/input";

export const registerValidator = (input: RegisterInput): FieldError | null => {
  const errors: FieldError = {};

  if (!isEmail(input.email)) {
    errors.email = "invalid";
  }

  if (!length(input.username, 4, 20)) {
    errors.username = "between 4-20 characters";
  } else if (!isAlphanumeric(input.username)) {
    errors.username = "only alphabets and numbers";
  }

  if (!length(input.password, 4)) {
    errors.password = "minimum 8 characters";
  }

  return Object.keys(errors).length ? errors : null;
};
