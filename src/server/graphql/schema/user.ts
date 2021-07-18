import { extendType, objectType } from "nexus";
import { getSession } from "next-auth/client";

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.nullable.string("name");
    t.nullable.string("email");
    t.nullable.string("image");
    t.date("createdAt");
    t.date("updatedAt");
  },
});

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.nullable.field("me", {
      type: "User",
      async resolve(_, __, { req, prisma }) {
        const session = await getSession({ req });
        if (session) {
          return prisma.user.findUnique({
            where: {
              id: session.user.id!,
            },
          });
        }
        return null;
      },
    });
  },
});
