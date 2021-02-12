import { isEmail, length } from "class-validator";

import { FieldError } from "../resolvers/types/field-error";
import { RegisterInput } from "../resolvers/types/register-input";

export const registerValidator = (
  input: RegisterInput
): FieldError[] | null => {
  const errors: FieldError[] = [];

  if (!isEmail(input.email)) {
    errors.push({
      field: "email",
      message: "enter a valid email",
    });
  }

  if (!length(input.username, 2, 20)) {
    errors.push({
      field: "username",
      message: "username should be 4 to 20 characters",
    });
  }

  if (!length(input.password, 4)) {
    errors.push({
      field: "password",
      message: "password must be at least 8 characters",
    });
  }

  return errors.length ? errors : null;
};
