import { ApolloError } from "apollo-server-micro";

import { Resolvers } from "~/generated/backend";
import { getSession } from "~/lib/auth";
import { Context } from "../context";

export const CommentResolvers: Resolvers<Context> = {
  Comment: {
    creator: (parent, _, { prisma }) =>
      prisma.user.findUnique({ where: { id: parent.creatorId } }) as any,
    post: (parent, _, { prisma }) =>
      prisma.post.findUnique({ where: { id: parent.postId } }) as any,
    votes: async (parent, _, { prisma }) => {
      const voteArr = await prisma.commentVote.findMany({
        where: { commentId: parent.id },
        select: { value: true },
      });
      return voteArr.reduce((prev, curr) => prev + curr.value, 0);
    },
    voteStatus: async (parent, _, { req, prisma }) => {
      const session = getSession(req);

      if (!session?.userId) return 0;

      const vote = await prisma.commentVote.findUnique({
        where: {
          userId_commentId: { userId: session.userId, commentId: parent.id },
        },
        select: { value: true },
      });

      if (!vote) {
        return 0;
      }

      return vote.value;
    },
  },
  Mutation: {
    createComment: async (_, { postId, text }, { req, prisma }) => {
      const { userId } = getSession(req, true);
      try {
        const comment = await prisma.comment.create({
          data: { text, creatorId: userId, postId },
        });
        return comment as any;
      } catch (e) {
        throw new ApolloError("post not found");
      }
    },
    editComment: async (_, { commentId, text }, { req, prisma }) => {
      const { userId } = getSession(req, true);

      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
      });

      if (!comment) throw new ApolloError("comment not found");
      if (comment.creatorId !== userId) throw new ApolloError("cannot update");

      return prisma.comment.update({
        where: { id: commentId },
        data: {
          text,
          updatedAt: new Date(),
        },
      }) as any;
    },
    deleteComment: async (_, { commentId }, { req, prisma }) => {
      const { userId } = getSession(req, true);

      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
      });

      if (!comment) throw new ApolloError("comment not found");
      if (comment.creatorId !== userId) throw new ApolloError("cannot update");

      await prisma.comment.delete({ where: { id: commentId } });
      return true;
    },
  },
};
