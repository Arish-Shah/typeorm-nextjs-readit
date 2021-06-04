import { extendType, stringArg } from "nexus";
import { ApolloError, UserInputError } from "apollo-server-micro";
import { hash, compare } from "bcryptjs";

import { validateRegister } from "@/common/lib/validate";
import { setSession } from "@/common/lib/session";
import { RegisterInput } from "./input";

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.nullable.field("me", {
      type: "User",
      resolve: () => {
        return null;
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
        username: stringArg(),
        password: stringArg(),
      },
      resolve: async (_, { username, password }, { res, prisma }) => {
        const user = await prisma.user.findUnique({
          where: { username },
        });
        if (!user) throw new ApolloError("user not found");

        const valid = await compare(password, user.password);
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
        input: RegisterInput,
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
  },
});
