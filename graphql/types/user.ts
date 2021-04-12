import { ApolloError, UserInputError } from "apollo-server-micro";
import { extendType, objectType, stringArg } from "nexus";
import bcrypt from "bcryptjs";

import { removeTokenCookie } from "@lib/auth-cookies";
import { getSession, setSession } from "@lib/auth";
import { validateRegister } from "@lib/validate";
import { getPaginationData } from "@lib/pagination";
import { PaginatedComments, PaginatedPosts } from "./page";
import { PaginationInput, RegisterInput } from "./input";

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.string("email");
    t.string("username");
    t.date("createdAt");

    t.field("posts", {
      type: PaginatedPosts,
      args: {
        input: PaginationInput,
      },
      resolve: async (parent, { input }, { prisma }) => {
        const pagination = getPaginationData(input);

        const posts = await prisma.post.findMany({
          where: { creatorId: parent.id },
          orderBy: { createdAt: "desc" },
          ...pagination,
        });

        return {
          hasMore: posts.length === input.take + 1,
          posts: posts.slice(0, input.take),
        };
      },
    });

    t.field("comments", {
      type: PaginatedComments,
      args: {
        input: PaginationInput,
      },
      resolve: async (parent, { input }, { prisma }) => {
        const pagination = getPaginationData(input);

        const comments = await prisma.comment.findMany({
          where: { creatorId: parent.id },
          orderBy: { createdAt: "desc" },
          ...pagination,
        });

        return {
          hasMore: comments.length === input.take + 1,
          comments: comments.slice(0, input.take),
        };
      },
    });
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
          throw new UserInputError(error);
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
