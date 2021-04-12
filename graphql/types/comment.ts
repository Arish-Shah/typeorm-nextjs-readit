import { ApolloError } from "apollo-server-micro";
import { extendType, idArg, objectType, stringArg } from "nexus";

import { getSession } from "@lib/auth";
import { Post } from "./post";
import { User } from "./user";

export const Comment = objectType({
  name: "Comment",
  definition(t) {
    t.id("id");
    t.string("text");
    t.string("postId");
    t.string("creatorId");
    t.date("createdAt");
    t.date("updatedAt");

    t.field("creator", {
      type: User,
      resolve: (parent, _, { prisma }) =>
        prisma.user.findUnique({ where: { id: parent.creatorId } }),
    });

    t.field("post", {
      type: Post,
      resolve: (parent, _, { prisma }) =>
        prisma.post.findUnique({ where: { id: parent.postId } }),
    });
  },
});

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createComment", {
      type: Comment,
      args: {
        postId: idArg(),
        text: stringArg(),
      },
      resolve: async (_, { postId, text }, { req, prisma }) => {
        const { userId } = getSession(req, true);
        try {
          const comment = await prisma.comment.create({
            data: { text, creatorId: userId, postId },
          });
          return comment;
        } catch (e) {
          throw new ApolloError("post not found");
        }
      },
    });

    t.field("editComment", {
      type: Comment,
      args: {
        commentId: idArg(),
        text: stringArg(),
      },
      resolve: async (_, { commentId, text }, { req, prisma }) => {
        const { userId } = getSession(req, true);

        const comment = await prisma.comment.findUnique({
          where: { id: commentId },
        });

        if (!comment) throw new ApolloError("comment not found");
        if (comment.creatorId !== userId)
          throw new ApolloError("cannot update");

        return prisma.comment.update({
          where: { id: commentId },
          data: {
            text,
            updatedAt: new Date(),
          },
        });
      },
    });

    t.boolean("deleteComment", {
      args: {
        commentId: idArg(),
      },
      resolve: async (_, { commentId }, { req, prisma }) => {
        const { userId } = getSession(req, true);

        const comment = await prisma.comment.findUnique({
          where: { id: commentId },
        });

        if (!comment) throw new ApolloError("comment not found");
        if (comment.creatorId !== userId)
          throw new ApolloError("cannot update");

        await prisma.comment.delete({ where: { id: commentId } });
        return true;
      },
    });
  },
});
