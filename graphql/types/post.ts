import { ApolloError, UserInputError } from "apollo-server-micro";
import { extendType, idArg, objectType, stringArg } from "nexus";

import { validatePost } from "@lib/validate";
import { getSession } from "@lib/auth";
import { User } from "./user";
import { Sub } from "./sub";
import { PostInput } from "./input";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.id("id");
    t.string("title");
    t.string("body");
    t.nullable.string("image");
    t.string("creatorId");
    t.string("subName");
    t.date("createdAt");
    t.date("updatedAt");

    t.field("creator", {
      type: User,
      resolve: (parent, _, { prisma }) =>
        prisma.user.findUnique({ where: { id: parent.creatorId } }),
    });

    t.field("sub", {
      type: Sub,
      resolve: (parent, _, { prisma }) =>
        prisma.sub.findUnique({ where: { name: parent.subName } }),
    });
  },
});

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: Post,
      args: {
        subName: stringArg(),
        input: PostInput,
      },
      resolve: async (_, { input, subName }, { req, prisma }) => {
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
          return post;
        } catch (e) {
          throw new ApolloError("sub not found");
        }
      },
    });

    t.field("updatePost", {
      type: Post,
      args: {
        postId: idArg(),
        input: PostInput,
      },
      resolve: async (_, { postId, input }, { req, prisma }) => {
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
          data: { ...input, updatedAt: new Date().toISOString() },
        });

        return post;
      },
    });

    t.boolean("deletePost", {
      args: {
        postId: idArg(),
      },
      resolve: async (_, { postId }, { req, prisma }) => {
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
    });
  },
});
