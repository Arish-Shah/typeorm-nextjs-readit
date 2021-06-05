import { extendType, objectType } from "nexus";
import { ApolloError, UserInputError } from "apollo-server-micro";

import { validateSub } from "@/common/lib/validate";

export const Sub = objectType({
  name: "Sub",
  definition(t) {
    t.id("id");
    t.string("name");
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
    t.field("createSub", {
      type: "Sub",
      args: {
        input: "SubInput",
      },
      resolve: async (_, { input }, { prisma }) => {
        const error = validateSub(input);
        if (error) throw new UserInputError(error);
        try {
          const sub = await prisma.sub.create({
            data: { ...input },
          });
          return sub;
        } catch (e) {
          throw new ApolloError("sub already exists");
        }
      },
    });

    t.field("updateSub", {
      type: "Sub",
      // TODO
    });
  },
});
