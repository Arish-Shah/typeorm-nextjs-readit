import { validatePost } from "@/common/lib/validate";
import { ApolloError } from "apollo-server-micro";
import { getSession } from "next-auth/client";
import { extendType, idArg, objectType } from "nexus";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.id("id");
    t.string("title");
    t.string("body");
    t.field("postType", {
      type: "PostType",
    });
    t.string("subName");
    t.string("creatorId");
    t.date("createdAt");
    t.date("updatedAt");
    t.field("sub", {
      type: "Sub",
      resolve: (parent, _, { prisma }) =>
        prisma.sub.findUnique({
          where: { name: parent.subName },
        }),
    });
    t.field("creator", {
      type: "User",
      resolve: (parent, _, { prisma }) =>
        prisma.user.findUnique({
          where: { id: parent.creatorId },
        }),
    });
  },
});

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: "Post",
      args: {
        input: "PostInput",
        subName: idArg(),
      },
      resolve: async (_, { input, subName }, { req, prisma }) => {
        const session = await getSession({ req });
        if (!session?.user) throw new ApolloError("unauthenticated");

        const error = validatePost(input);
        if (error) throw new ApolloError(error);

        try {
          const post = await prisma.post.create({
            data: { ...input, subName, creatorId: session.user.id },
          });
          return post;
        } catch (e) {
          throw new ApolloError("sub not found");
        }
      },
    });

    t.field("editPost", {
      type: "Post",
      args: {
        id: idArg(),
        input: "PostInput",
      },
      resolve: async (_, { id, input }, { req, prisma }) => {
        const session = await getSession({ req });
        if (!session?.user) throw new ApolloError("unauthenticated");

        const post = await prisma.post.findUnique({
          where: { id },
        });
        if (!post) throw new ApolloError("post not found");
        if (post.creatorId !== session.user.id)
          throw new ApolloError("cannot edit post");

        const error = validatePost(input);
        if (error) throw new ApolloError(error);

        return prisma.post.update({
          where: { id },
          data: { ...input },
        });
      },
    });

    t.boolean("deletePost", {
      args: {
        id: idArg(),
      },
      resolve: async (_, { id }, { req, prisma }) => {
        const session = await getSession({ req });
        if (!session?.user) throw new ApolloError("unauthenticated");

        const post = await prisma.post.findUnique({
          where: { id },
        });
        if (!post) throw new ApolloError("post not found");
        if (post.creatorId !== session.user.id)
          throw new ApolloError("cannot delete post");

        await prisma.post.delete({
          where: { id },
        });

        return true;
      },
    });
  },
});
