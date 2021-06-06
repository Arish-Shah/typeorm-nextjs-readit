import { ApolloError } from "apollo-server-micro";

import { getSession } from "@/common/lib/session";
import { validatePost } from "@/common/lib/validate";
import { Resolvers } from "@/generated/backend";
import { Context } from "../context";

export const PostResolver: Resolvers<Context> = {
  Mutation: {
    createPost: (_, { input, subName }, { req, prisma }) => {
      const { userId: creatorId } = getSession(req);

      const error = validatePost(input);
      console.log(error);
      if (error) throw new ApolloError(error);

      return prisma.post.create({
        data: { ...input, subName, creatorId },
      });
    },
    updatePost: async (_, { id, input }, { req, prisma }) => {
      const { userId: creatorId } = getSession(req);

      const error = validatePost(input);
      if (error) throw new ApolloError(error);

      const post = await prisma.post.findUnique({
        where: { id },
      });
      if (!post) throw new ApolloError("post not found");

      if (post.creatorId !== creatorId)
        throw new ApolloError("cannot update post");

      return prisma.post.update({
        where: { id },
        data: { ...input },
      });
    },
    deletePost: async (_, { id }, { req, prisma }) => {
      const { userId: creatorId } = getSession(req);

      const post = await prisma.post.findUnique({
        where: { id },
      });
      if (!post) throw new ApolloError("post not found");

      if (post.creatorId !== creatorId)
        throw new ApolloError("cannot delete post");

      await prisma.post.delete({
        where: { id },
      });

      return true;
    },
  },
  Post: {
    sub: (parent, _, { prisma }) =>
      prisma.sub.findUnique({
        where: { name: parent.subName },
      }),
    creator: (parent, _, { prisma }) =>
      prisma.user.findUnique({
        where: { id: parent.creatorId },
      }),
  },
};
