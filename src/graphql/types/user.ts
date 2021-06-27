import { extendType, objectType } from "nexus";

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.string("token");
    t.field("user", {
      type: "User",
    });
  },
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.string("name");
    t.string("email");
    t.boolean("isVerified");
    t.date("createdAt");
    t.date("updatedAt");
  },
});

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("register", {
      type: "AuthPayload",
      args: {
        input: "RegisterInput",
      },
      resolve: (_, { input }, { prisma }) => {},
    });
  },
});
