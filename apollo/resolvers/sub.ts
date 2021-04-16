import { ApolloError } from "apollo-server-micro";

import { Resolvers } from "~/generated/backend";
import { getSession } from "~/lib/auth";
import { getPaginationData } from "~/lib/pagination";
import { Context } from "../context";

export const SubResolvers: Resolvers<Context> = {
  Sub: {
    members: (parent, __, { prisma }) => {
      return prisma.userSub.count({
        where: {
          subName: parent.name,
        },
      });
    },
    posts: async (parent, { input }, { prisma }) => {
      const paginationData = getPaginationData(input);

      const posts = await prisma.post.findMany({
        where: { subName: parent.name },
        orderBy: { createdAt: "desc" },
        ...paginationData,
      });

      return {
        hasMore: posts.length === input.take + 1,
        posts: posts.slice(0, input.take),
      } as any;
    },
  },
  Query: {
    sub: async (_, { name }, { prisma }) => {
      const sub = await prisma.sub.findUnique({
        where: {
          name,
        },
      });
      if (!sub) throw new ApolloError("sub not found");
      return sub as any;
    },
  },
  Mutation: {
    createSub: async (_, { input }, { prisma }) => {
      try {
        const sub = await prisma.sub.create({
          data: { ...input },
        });
        return sub as any;
      } catch (e) {
        throw new ApolloError("sub already exists");
      }
    },
    joinOrLeave: async (_, { subName }, { req, prisma }) => {
      const { userId } = getSession(req, true);
      try {
        await prisma.userSub.create({
          data: {
            userId,
            subName,
          },
        });
        return true;
      } catch (e) {
        throw new ApolloError("sub not found");
      }
    },
  },
};
