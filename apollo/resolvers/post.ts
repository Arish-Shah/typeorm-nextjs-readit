import { ApolloError, UserInputError } from "apollo-server-micro";
import { Post as PostType } from "@prisma/client";

import { Resolvers } from "~/generated/backend";
import { getSession } from "~/lib/auth";
import { getPaginationData } from "~/lib/pagination";
import { validatePost } from "~/lib/validate";
import { Context } from "../context";

export const PostResolvers: Resolvers<Context> = {
  Post: {
    creator: (parent, _, { prisma }) =>
      prisma.user.findUnique({ where: { id: parent.creatorId } }) as any,
    sub: (parent, _, { prisma }) =>
      prisma.sub.findUnique({ where: { name: parent.subName } }) as any,
    votes: async (parent, _, { prisma }) => {
      const voteArr = await prisma.postVote.findMany({
        where: { postId: parent.id },
        select: { value: true },
      });
      return voteArr.reduce((prev, curr) => prev + curr.value, 0);
    },
    comments: async (parent, { input }, { prisma }) => {
      const pagination = getPaginationData(input);

      const comments = await prisma.comment.findMany({
        where: { postId: parent.id },
        orderBy: { createdAt: "desc" },
        ...pagination,
      });

      return {
        hasMore: comments.length === input.take + 1,
        comments: comments.slice(0, input.take),
      } as any;
    },
    voteStatus: async (parent, _, { req, prisma }) => {
      const session = getSession(req);

      if (!session?.userId) return 0;

      const vote = await prisma.postVote.findUnique({
        where: {
          userId_postId: { userId: session.userId, postId: parent.id },
        },
        select: { value: true },
      });

      if (!vote) {
        return 0;
      }

      return vote.value;
    },
  },
  Query: {
    post: (_, { id }, { prisma }) =>
      prisma.post.findUnique({ where: { id } }) as any,
    feed: async (_, { input }, { req, prisma }) => {
      const session = getSession(req);
      const pagination = getPaginationData(input);

      let posts: PostType[];

      if (session?.userId) {
        const subs = await prisma.userSub.findMany({
          where: { userId: session.userId },
          select: { subName: true },
        });
        const subNames = subs.map((s) => s.subName);
        posts = await prisma.post.findMany({
          where: { subName: { in: subNames } },
          orderBy: { createdAt: "desc" },
          ...pagination,
        });
      } else {
        posts = await prisma.post.findMany({
          orderBy: { createdAt: "desc" },
          ...pagination,
        });
      }

      return {
        hasMore: posts.length === input.take + 1,
        posts: posts.slice(0, input.take),
      } as any;
    },
  },
  Mutation: {
    createPost: async (_, { input, subName }, { prisma, req }) => {
      const { userId } = getSession(req, true);
      const error = validatePost(input);

      if (error) {
        throw new UserInputError(error);
      }

      try {
        const post = await prisma.post.create({
          data: {
            creatorId: userId,
            subName,
            ...input,
          },
        });
        return post as any;
      } catch (e) {
        throw new ApolloError("sub not found");
      }
    },
    editPost: async (_, { postId, input }, { prisma, req }) => {
      const { userId } = getSession(req, true);

      const postExists = await prisma.post.findUnique({
        where: { id: postId },
      });
      if (!postExists) {
        throw new ApolloError("post not found");
      }
      if (postExists.creatorId !== userId) {
        throw new ApolloError("cannot update post");
      }

      const post = await prisma.post.update({
        where: { id: postId },
        data: { ...input, updatedAt: new Date() },
      });

      return post as any;
    },
    deletePost: async (_, { postId }, { req, prisma }) => {
      const { userId } = getSession(req, true);

      const postExists = await prisma.post.findUnique({
        where: { id: postId },
      });
      if (!postExists) {
        throw new ApolloError("post not found");
      }
      if (postExists.creatorId !== userId) {
        throw new ApolloError("cannot update post");
      }

      await prisma.post.delete({ where: { id: postId } });
      return true;
    },
  },
};
