import { extendType, objectType } from "nexus";
import { UserInputError } from "apollo-server-micro";

export const Sub = objectType({
  name: "Sub",
  definition(t) {
    t.id("name");
    t.string("name");
    t.nullable.string("title");
    t.nullable.string("text");
    t.nullable.string("image");
    t.nullable.string("banner");
    t.date("createdAt");
  },
});

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createSub", {
      type: "Sub",
      args: {
        input: "SubInput",
      },
      async resolve(_, { input }, { prisma }) {
        try {
          const sub = await prisma.sub.create({
            data: { ...input },
          });
          return sub;
        } catch (e) {
          throw new UserInputError("sub already exists");
        }
      },
    });
  },
});
