import { AuthenticationError } from "apollo-server-express";
import { MiddlewareFn } from "type-graphql";

import { Context } from "../resolvers/types/context";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new AuthenticationError("not authenticated");
  }
  return next();
};
