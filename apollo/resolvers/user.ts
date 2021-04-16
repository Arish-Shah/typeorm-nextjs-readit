import { ApolloError, UserInputError } from "apollo-server-micro";
import { hash, compare } from "bcryptjs";

import { Resolvers } from "~/generated/backend";
import { getSession, setSession } from "~/lib/auth";
import { removeTokenCookie } from "~/lib/auth-cookies";
import { getPaginationData } from "~/lib/pagination";
import { validateRegister } from "~/lib/validate";
import { Context } from "../context";

export const UserResolvers: Resolvers<Context> = {
  User: {
    posts: async (parent, { input }, { prisma }) => {
      const pagination = getPaginationData(input);

      const posts = await prisma.post.findMany({
        where: { creatorId: parent.id },
        orderBy: { createdAt: "desc" },
        ...pagination,
      });

      return {
        hasMore: posts.length === input.take + 1,
        posts: posts.slice(0, input.take),
      } as any;
    },
    comments: async (parent, { input }, { prisma }) => {
      const pagination = getPaginationData(input);

      const comments = await prisma.comment.findMany({
        where: { creatorId: parent.id },
        orderBy: { createdAt: "desc" },
        ...pagination,
      });

      return {
        hasMore: comments.length === input.take + 1,
        comments: comments.slice(0, input.take),
      } as any;
    },
  },
  Query: {
    me: (_, __, { prisma, req }) => {
      const { userId } = getSession(req, true);
      return prisma.user.findUnique({
        where: { id: userId },
      }) as any;
    },
  },
  Mutation: {
    register: async (_, { input }, { prisma, res }) => {
      const error = validateRegister(input);
      if (error) throw new UserInputError(error);

      const password = await hash(input.password, 10);

      try {
        const user = await prisma.user.create({
          data: { ...input, password },
        });

        setSession({ userId: user.id }, res);

        return user as any;
      } catch (e) {
        throw new ApolloError("user already exists");
      }
    },
    login: async (_, { username, password }, { prisma, res }) => {
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) throw new ApolloError("incorrect username or password");

      const valid = await compare(password, user.password);
      if (!valid) throw new ApolloError("incorrect username or password");

      setSession({ userId: user.id }, res);

      return user as any;
    },
    logout: (_, __, { res }) => {
      removeTokenCookie(res);
      return true;
    },
  },
};
