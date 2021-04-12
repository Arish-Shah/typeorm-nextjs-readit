import { extendType, idArg, intArg } from "nexus";

import { getSession } from "@lib/auth";

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.boolean("votePost", {
      args: {
        postId: idArg(),
        value: intArg(),
      },
      resolve: async (_, { postId, value }, { req, prisma }) => {
        const { userId } = getSession(req, true);
        const voteValue = value > 0 ? 1 : value < 0 ? -1 : 0;

        const where = { userId_postId: { userId, postId } };

        if (voteValue === 0) {
          await prisma.postVote.delete({
            where,
          });
        } else {
          await prisma.postVote.upsert({
            create: { postId, userId, value: voteValue },
            update: { value: voteValue },
            where,
          });
        }

        return true;
      },
    });

    t.boolean("voteComment", {
      args: {
        commentId: idArg(),
        value: intArg(),
      },
      resolve: async (_, { commentId, value }, { req, prisma }) => {
        const { userId } = getSession(req, true);
        const voteValue = value > 0 ? 1 : value < 0 ? -1 : 0;

        const where = { userId_commentId: { userId, commentId } };

        if (voteValue === 0) {
          await prisma.commentVote.delete({ where });
        } else {
          await prisma.commentVote.upsert({
            create: { commentId, userId, value: voteValue },
            update: { value: voteValue },
            where,
          });
        }

        return true;
      },
    });
  },
});
