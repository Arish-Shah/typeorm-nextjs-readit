import { ApolloError } from "apollo-server-micro";
import { extendType, idArg, objectType, stringArg } from "nexus";

import { getSessionOrThrow } from "@/server/lib/session";
import { slugify } from "@/server/lib/slug";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.id("id");
    t.string("slug");
    t.string("title");
    t.string("body");
    t.field("postType", {
      type: "PostType",
    });
    t.date("createdAt");
    t.date("updatedAt");
    t.string("userId");
    t.string("subName");
  },
});

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: "Post",
      args: {
        subName: stringArg(),
        input: "PostInput",
      },
      resolve: async (_, { subName, input }, { req, prisma }) => {
        const session = await getSessionOrThrow({ req });
        try {
          const slug = slugify(input.title);
          const post = await prisma.post.create({
            data: {
              ...input,
              subName,
              userId: session.user.id!,
              slug,
            },
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
        try {
          const session = await getSessionOrThrow({ req });

          const post = await prisma.post.findUnique({ where: { id } });

          if (!post) {
            throw new ApolloError("post not found");
          }
          if (post.userId !== session.user.id) {
            throw new ApolloError("unable to edit post");
          }

          const updatedPost = await prisma.post.update({
            where: { id },
            data: { ...input },
          });
          return updatedPost;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
    });
  },
});
