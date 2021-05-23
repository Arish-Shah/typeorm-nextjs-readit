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
  },
});

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.nullable.field("me", {
      type: User,
      resolve: async (_, __, { req }) => {
        const session = await getSession({ req });
        console.log(session.user);
        return null;
      },
    });
  },
});
