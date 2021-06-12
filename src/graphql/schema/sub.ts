import { extendType, objectType } from "nexus";
import { ApolloError } from "apollo-server-micro";

import { validateSub } from "@/common/lib/validate";

export const Sub = objectType({
  name: "Sub",
  definition(t) {
    t.id("name");
    t.nullable.string("title");
    t.nullable.string("description");
    t.nullable.string("image");
    t.nullable.string("banner");
    t.date("createdAt");
  },
});

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createOrUpdateSub", {
      args: {
        input: "SubInput",
      },
      type: "Sub",
      resolve: async (_, { input }, { prisma }) => {
        const error = validateSub(input);
        if (error) throw new ApolloError(error);
        const sub = await prisma.sub.upsert({
          where: { name: input.name },
          create: { ...input },
          update: { ...input },
        });
        return sub;
      },
    });
  },
});
