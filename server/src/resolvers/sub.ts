import { ApolloError } from "apollo-server-express";
import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";

import { Sub } from "../types/Sub";
import { PaginationInput, SubInput } from "../types/Input";
import { PaginatedPosts } from "../types/Page";
import { Context } from "../context";
import { getSession } from "../lib/auth";
import { getPaginationData } from "../lib/paginate";

@Resolver(Sub)
export class SubResolver {
  @FieldResolver(() => Boolean)
  async isSubbed(
    @Root() parent: Sub,
    @Ctx() { req, prisma }: Context
  ): Promise<boolean> {
    const session = getSession(req);
    if (!session) return false;
    const subbed = await prisma.userSub.findUnique({
      where: {
        userId_subName: {
          subName: parent.name,
          userId: session.userId,
        },
      },
    });
    return Boolean(subbed);
  }

  @FieldResolver(() => Int)
  members(@Root() parent: Sub, @Ctx() { prisma }: Context): Promise<number> {
    return prisma.userSub.count({
      where: {
        subName: parent.name,
      },
    });
  }

  @FieldResolver(() => PaginatedPosts)
  async posts(
    @Root() parent: Sub,
    @Arg("input") input: PaginationInput,
    @Ctx() { prisma }: Context
  ): Promise<PaginatedPosts> {
    const paginationData = getPaginationData(input);

    const posts = await prisma.post.findMany({
      where: { subName: parent.name },
      orderBy: { createdAt: "desc" },
      ...paginationData,
    });

    return {
      hasMore: posts.length === input.take + 1,
      posts: posts.slice(0, input.take),
    };
  }

  @Query(() => [Sub])
  async recommended(@Ctx() { prisma }: Context): Promise<Sub[]> {
    return prisma.sub.findMany({
      take: 5,
    });
  }

  @Query(() => Sub)
  async sub(
    @Arg("name", () => ID) name: string,
    @Ctx() { prisma }: Context
  ): Promise<Sub> {
    const sub = await prisma.sub.findUnique({
      where: {
        name,
      },
    });
    if (!sub) throw new ApolloError("sub not found");
    return sub;
  }

  @Mutation(() => Sub)
  async createSub(
    @Arg("input") input: SubInput,
    @Ctx() { prisma }: Context
  ): Promise<Sub> {
    try {
      const sub = await prisma.sub.create({
        data: { ...input },
      });
      return sub as any;
    } catch (e) {
      throw new ApolloError("sub already exists");
    }
  }

  @Mutation(() => Boolean)
  async joinOrLeave(
    @Arg("subName") subName: string,
    @Ctx() { prisma, req }: Context
  ): Promise<boolean> {
    const { userId } = getSession(req, true)!;
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
  }
}
