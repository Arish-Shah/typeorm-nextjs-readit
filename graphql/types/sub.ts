import { ApolloError } from "apollo-server-micro";
import { extendType, objectType, stringArg } from "nexus";

import { getSession } from "@lib/auth";
import { SubInput } from "./input";

export const Sub = objectType({
  name: "Sub",
  definition(t) {
    t.id("name");
    t.nullable.string("title");
    t.nullable.string("description");
    t.nullable.string("image");
    t.nullable.string("banner");

    t.int("members", {
      resolve: (parent, __, { prisma }) => {
        return prisma.userSub.count({
          where: {
            subName: parent.name,
          },
        });
      },
    });
  },
});

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createSub", {
      type: Sub,
      args: {
        input: SubInput,
      },
      resolve: async (_, { input }, { prisma }) => {
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

    t.boolean("joinOrLeave", {
      args: {
        subName: stringArg(),
      },
      resolve: async (_, { subName }, { req, prisma }) => {
        const { userId } = getSession(req, true);
        try {
          await prisma.userSub.create({
            data: {
              userId,
              subName,
            },
          });
          return true;
        } catch (e) {
          throw new ApolloError("sub not found");
        }
      },
    });
  },
});

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.field("sub", {
      type: Sub,
      args: {
        name: stringArg(),
      },
      resolve: async (_, { name }, { prisma }) => {
        try {
          const sub = await prisma.sub.findUnique({
            where: {
              name,
            },
          });
          return sub;
        } catch (e) {
          throw new ApolloError("sub not found");
        }
      },
    });
  },
});
