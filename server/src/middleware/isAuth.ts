import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from "apollo-server-express";

import { Context } from "../resolvers/types/context";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  // @ts-ignore
  if (!context.req.session.userID) {
    throw new AuthenticationError("Unauthenticated");
  }
  return next();
};
