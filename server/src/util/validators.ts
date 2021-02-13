import { isEmail, length } from "class-validator";
import { FieldError } from "../resolvers/types/field-error";
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
