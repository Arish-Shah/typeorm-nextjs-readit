import { ApolloError } from "apollo-server-micro";
import { extendType, objectType, stringArg } from "nexus";
import bcrypt from "bcryptjs";

import { removeTokenCookie } from "@lib/auth-cookies";
import { getSession, setSession } from "@lib/auth";
import { validateRegister } from "@lib/validate";
import { RegisterInput } from "./input";

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.string("email");
    t.string("username");
    t.date("createdAt");
  },
});

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.field("me", {
      type: User,
      resolve: (_, __, { req, prisma }) => {
        const { userId } = getSession(req, true);
        return prisma.user.findUnique({
          where: { id: userId },
        });
      },
    });
  },
});

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("register", {
      type: User,
      args: {
        input: RegisterInput,
      },
      resolve: async (_, { input }, { prisma, res }) => {
        const error = validateRegister(input);
        if (error) {
          throw new ApolloError(error);
        }

        const password = await bcrypt.hash(input.password, 10);

        try {
          const user = await prisma.user.create({
            data: { ...input, password },
          });

          setSession({ userId: user.id }, res);

          return user;
        } catch (e) {
          if (e.message.includes("Unique constraint")) {
            throw new ApolloError("username or email already exists");
          }
          throw e;
        }
      },
    });

    t.field("login", {
      type: User,
      args: {
        usernameOrEmail: stringArg(),
        password: stringArg(),
      },
      resolve: async (_, args, { prisma, res }) => {
        const key = args.usernameOrEmail.includes("@") ? "email" : "username";

        const user = await prisma.user.findUnique({
          where: {
            [key]: args.usernameOrEmail,
          },
        });
        if (!user) {
          throw new ApolloError("user not found");
        }

        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) {
          throw new ApolloError("incorrect password");
        }

        setSession({ userId: user.id }, res);

        return user;
      },
    });

    t.boolean("logout", {
      resolve: (_, __, { res }) => {
        removeTokenCookie(res);
        return true;
      },
    });
  },
});
