import { extendType, objectType } from "nexus";
import { ApolloError, UserInputError } from "apollo-server-micro";
import { hash, compare } from "bcryptjs";

import { validateRegister } from "@/common/lib/validate";
import { createToken } from "@/lib/token";

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.string("token");
    t.field("user", {
      type: "User",
    });
  },
});

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.nullable.field("me", {
      type: "User",
      resolve: (_, __, { req, prisma, userId }) => {
        console.log(userId);
        return null;
      },
    });
  },
});

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("login", {
      type: "AuthPayload",
      args: {
        input: "LoginInput",
      },
      resolve: async (_, { input }, { prisma }) => {
        const user = await prisma.user.findUnique({
          where: { email: input.email },
        });
        if (!user) {
          throw new ApolloError("user not found");
        }

        const valid = await compare(input.password, user.password);
        if (!valid) {
          throw new ApolloError("incorrect password");
        }

        const token = createToken({ userId: user.id });
        return {
          user,
          token,
        };
      },
    });

    t.field("register", {
      type: "AuthPayload",

      args: {
        input: "RegisterInput",
      },
      resolve: async (_, { input }, { prisma }) => {
        const error = validateRegister(input);
        if (error) {
          throw new UserInputError(error);
        }

        const password = await hash(input.password, 10);
        try {
          const user = await prisma.user.create({
            data: { ...input, password },
          });
          const token = createToken({ userId: user.id });
          return { user, token };
        } catch (e) {
          throw new ApolloError("email already exists");
        }
      },
    });
  },
});
