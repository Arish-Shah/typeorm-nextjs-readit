import { ApolloError, UserInputError } from "apollo-server-micro";

import { validateSub } from "@/common/lib/validate";
import { Resolvers } from "@/generated/backend";
import { Context } from "../context";

export const SubResolver: Resolvers<Context> = {
  Mutation: {
    createOrUpdateSub: async (_, { input }, { prisma }) => {
      const error = validateSub(input);
      if (error) throw new UserInputError(error);
      try {
        const sub = await prisma.sub.upsert({
          where: { name: input.name },
          create: { ...input },
          update: { ...input },
        });
        return sub;
      } catch (e) {
        throw new ApolloError("sub already exists");
      }
    },
  },
};
