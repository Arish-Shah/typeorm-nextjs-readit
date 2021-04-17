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
import { Post as PostType } from "@prisma/client";

import { Post } from "../types/Post";
import { Context } from "../context";
import { PaginatedComments, PaginatedPosts } from "../types/Page";
import { ApolloError, UserInputError } from "apollo-server-errors";
import { PaginationInput, PostInput } from "../types/Input";
import { getSession } from "../lib/auth";
import { getPaginationData } from "../lib/paginate";
import { validatePost } from "../lib/validate";
import { User } from "../types/User";
import { Sub } from "../types/Sub";

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => User, { nullable: true })
  creator(
    @Root() parent: Post,
    @Ctx() { prisma }: Context
  ): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id: parent.creatorId },
    });
  }

  @FieldResolver(() => Sub, { nullable: true })
  sub(@Root() parent: Post, @Ctx() { prisma }: Context): Promise<Sub | null> {
    return prisma.sub.findUnique({ where: { name: parent.subName } });
  }

  @FieldResolver(() => Int)
  async votes(
    @Root() parent: Post,
    @Ctx() { prisma }: Context
  ): Promise<number> {
    const voteArr = await prisma.postVote.findMany({
      where: { postId: parent.id },
      select: { value: true },
    });
    return voteArr.reduce((prev, curr) => prev + curr.value, 0);
  }

  @FieldResolver(() => PaginatedComments)
  async comments(
    @Root() parent: Post,
    @Arg("input") input: PaginationInput,
    @Ctx() { prisma }: Context
  ): Promise<PaginatedComments> {
    const pagination = getPaginationData(input);

    const comments = await prisma.comment.findMany({
      where: { postId: parent.id },
      orderBy: { createdAt: "desc" },
      ...pagination,
    });

    return {
      hasMore: comments.length === input.take + 1,
      comments: comments.slice(0, input.take),
    };
  }

  @FieldResolver(() => Int)
  async voteStatus(
    @Root() parent: Post,
    @Ctx() { req, prisma }: Context
  ): Promise<number> {
    const session = getSession(req);

    if (!session?.userId) return 0;

    const vote = await prisma.postVote.findUnique({
      where: {
        userId_postId: { userId: session.userId, postId: parent.id },
      },
      select: { value: true },
    });

    if (!vote) {
      return 0;
    }

    return vote.value;
  }

  @Query(() => Post)
  async post(
    @Arg("id", () => ID) id: string,
    @Ctx() { prisma }: Context
  ): Promise<Post> {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) throw new ApolloError("post not found");
    return post;
  }

  @Query(() => PaginatedPosts)
  async feed(
    @Arg("input") input: PaginationInput,
    @Ctx() { prisma, req }: Context
  ): Promise<PaginatedPosts> {
    const session = getSession(req);
    const pagination = getPaginationData(input);

    let posts: PostType[];

    if (session?.userId) {
      const subs = await prisma.userSub.findMany({
        where: { userId: session.userId },
        select: { subName: true },
      });
      const subNames = subs.map((s) => s.subName);
      posts = await prisma.post.findMany({
        where: { subName: { in: subNames } },
        orderBy: { createdAt: "desc" },
        ...pagination,
      });
    } else {
      posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        ...pagination,
      });
    }

    return {
      hasMore: posts.length === input.take + 1,
      posts: posts.slice(0, input.take),
    };
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("input") input: PostInput,
    @Arg("subName", () => ID) subName: string,
    @Ctx() { req, prisma }: Context
  ): Promise<Post> {
    const { userId } = getSession(req, true)!;
    const error = validatePost(input);

    if (error) {
      throw new UserInputError(error);
    }

    try {
      const post = await prisma.post.create({
        data: {
          creatorId: userId,
          subName,
          ...input,
        },
      });
      return post as any;
    } catch (e) {
      throw new ApolloError("sub not found");
    }
  }

  @Mutation(() => Post)
  async editPost(
    @Arg("input") input: PostInput,
    @Arg("postId", () => ID) postId: string,
    @Ctx() { req, prisma }: Context
  ): Promise<Post> {
    const { userId } = getSession(req, true)!;

    const postExists = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!postExists) {
      throw new ApolloError("post not found");
    }
    if (postExists.creatorId !== userId) {
      throw new ApolloError("cannot update post");
    }

    const post = await prisma.post.update({
      where: { id: postId },
      data: { ...input, updatedAt: new Date() },
    });

    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("postId", () => ID) postId: string,
    @Ctx() { req, prisma }: Context
  ): Promise<boolean> {
    const { userId } = getSession(req, true)!;

    const postExists = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!postExists) {
      throw new ApolloError("post not found");
    }
    if (postExists.creatorId !== userId) {
      throw new ApolloError("cannot update post");
    }

    await prisma.post.delete({ where: { id: postId } });
    return true;
  }
}
