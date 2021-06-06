import { ApolloError, UserInputError } from "apollo-server-micro";
import { compare, hash } from "bcryptjs";

import { validateRegister } from "@/common/lib/validate";
import { Resolvers } from "@/generated/backend";
import { clearSession, getSession, setSession } from "@/common/lib/session";
import { Context } from "../context";

export const AuthResolver: Resolvers<Context> = {
  Query: {
    me: async (_, __, { req, prisma }) => {
      try {
        const { userId: id } = getSession(req);
        const user = await prisma.user.findUnique({
          where: { id },
        });
        return user;
      } catch (e) {
        return null;
      }
    },
  },
  Mutation: {
    login: async (_, { input }, { res, prisma }) => {
      const user = await prisma.user.findUnique({
        where: { username: input.username },
      });
      if (!user) throw new ApolloError("user not found");

      const valid = await compare(input.password, user.password);
      if (!valid) throw new ApolloError("invalid username or password");

      setSession(res, {
        userId: user.id,
      });
      return user;
    },
    register: async (_, { input }, { req, prisma }) => {
      const error = validateRegister(input);
      if (error) throw new UserInputError(error);

      try {
        const password = await hash(input.password, 12);
        const user = await prisma.user.create({
          data: { ...input, password },
        });
        return user;
      } catch (e) {
        throw new ApolloError("user already exists");
      }
    },
    logout: (_, __, { res }) => {
      clearSession(res);
      return true;
    },
  },
};
