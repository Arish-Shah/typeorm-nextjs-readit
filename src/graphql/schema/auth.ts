import { extendType } from "nexus";
import { ApolloError, UserInputError } from "apollo-server-micro";
import { hash, compare } from "bcryptjs";

import { validateRegister } from "@/common/lib/validate";
import { clearSession, getSession, setSession } from "@/common/lib/session";

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.nullable.field("me", {
      type: "User",
      resolve: async (_, __, { req, prisma }) => {
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
    });
  },
});

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("login", {
      type: "User",
      args: {
        input: "LoginInput",
      },
      resolve: async (_, { input }, { res, prisma }) => {
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
    });

    t.field("register", {
      type: "User",
      args: {
        input: "RegisterInput",
      },
      resolve: async (_, { input }, { prisma }) => {
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
    });

    t.boolean("logout", {
      resolve: (_, __, { res }) => {
        clearSession(res);
        return true;
      },
    });
  },
});
