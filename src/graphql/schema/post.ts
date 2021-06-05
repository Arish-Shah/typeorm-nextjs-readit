import { extendType, objectType } from "nexus";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.id("id");
    t.string("title");
    t.nullable.string("body");
    t.nullable.string("image");
    t.nullable.string("link");
    t.string("subName");
    t.string("creatorId");
    t.date("createdAt");
    t.date("updatedAt");

    t.field("sub", {
      type: "Sub",
      resolve: (parent, _, { prisma }) => {
        return prisma.sub.findUnique({
          where: { name: parent.subName },
        });
      },
    });

    t.field("creator", {
      type: "User",
      resolve: (parent, _, { prisma }) => {
        return prisma.user.findUnique({
          where: { id: parent.creatorId },
        });
      },
    });
  },
});

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    // TODO
    t.field("createPost", {
      type: "Post",
    });

    // TODO
    t.boolean("deletePost");

    // TODO
    t.field("updatePost", {
      type: "Post",
    });
  },
});
