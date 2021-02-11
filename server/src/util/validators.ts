import { isEmail, isEmpty, length } from "class-validator";
import { CommentInput } from "../resolvers/types/comment-input";

import { PostInput } from "../resolvers/types/post-input";
import { RegisterInput } from "../resolvers/types/register-input";
import { SubInput } from "../resolvers/types/sub-input";
import { FieldError } from "../resolvers/types/field-error";

export const registerValidator = ({
  email,
  username,
  password,
}: RegisterInput): FieldError | null => {
  if (!isEmail(email)) {
    return {
      field: "email",
      message: "invalid email",
    };
  }

  if (!length(username, 2, 20)) {
    return {
      field: "username",
      message: "username must be between 4 and 20 characters",
    };
  }

  if (!length(password, 2)) {
    return {
      field: "password",
      message: "password should be at least 8 characters",
    };
  }

  return null;
};

export const postValidator = ({
  title,
  body,
  sub,
}: PostInput): FieldError | null => {
  let field;

  if (isEmpty(title.trim())) field = "title";
  if (isEmpty(body.trim())) field = "body";
  if (isEmpty(sub.trim())) field = "sub";

  if (field) {
    return { field, message: "cannot be empty" };
  }

  return null;
};

export const subValidator = ({ name, title }: SubInput): FieldError | null => {
  let field;

  if (isEmpty(name.trim())) field = "name";
  if (isEmpty(title.trim())) field = "title";

  if (field) {
    return {
      field,
      message: "cannot be empty",
    };
  }

  return null;
};

export const commentValidator = ({ body }: CommentInput): FieldError | null => {
  if (isEmpty(body.trim())) {
    return {
      field: "body",
      message: "cannot be empty",
    };
  }
  return null;
};
