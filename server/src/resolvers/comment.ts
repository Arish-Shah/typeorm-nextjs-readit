import { ApolloError } from "apollo-server-express";
import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";

import { Comment } from "../types/Comment";
import { Context } from "../context";
import { getSession } from "../lib/auth";
import { User } from "../types/User";
import { Post } from "../types/Post";

@Resolver(Comment)
export class CommentResolver {
  @FieldResolver(() => User, { nullable: true })
  creator(
    @Root() parent: Comment,
    @Ctx() { prisma }: Context
  ): Promise<User | null> {
    return prisma.user.findUnique({ where: { id: parent.creatorId } });
  }

  @FieldResolver(() => Post, { nullable: true })
  post(
    @Root() parent: Comment,
    @Ctx() { prisma }: Context
  ): Promise<Post | null> {
    return prisma.post.findUnique({ where: { id: parent.postId } });
  }

  @FieldResolver(() => Int)
  async votes(
    @Root() parent: Comment,
    @Ctx() { prisma }: Context
  ): Promise<number> {
    const voteArr = await prisma.commentVote.findMany({
      where: { commentId: parent.id },
      select: { value: true },
    });
    return voteArr.reduce((prev, curr) => prev + curr.value, 0);
  }

  @FieldResolver(() => Int)
  async voteStatus(
    @Root() parent: Comment,
    @Ctx() { req, prisma }: Context
  ): Promise<number> {
    const session = getSession(req);

    if (!session?.userId) return 0;

    const vote = await prisma.commentVote.findUnique({
      where: {
        userId_commentId: { userId: session.userId, commentId: parent.id },
      },
      select: { value: true },
    });

    if (!vote) {
      return 0;
    }

    return vote.value;
  }

  @Mutation(() => Comment)
  async createComment(
    @Arg("postId", () => ID) postId: string,
    @Arg("text") text: string,
    @Ctx() { req, prisma }: Context
  ): Promise<Comment> {
    const { userId } = getSession(req, true)!;
    try {
      const comment = await prisma.comment.create({
        data: { text, creatorId: userId, postId },
      });
      return comment as any;
    } catch (e) {
      throw new ApolloError("post not found");
    }
  }

  @Mutation(() => Comment)
  async editComment(
    @Arg("commentId", () => ID) commentId: string,
    @Arg("text") text: string,
    @Ctx() { req, prisma }: Context
  ): Promise<Comment> {
    const { userId } = getSession(req, true)!;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) throw new ApolloError("comment not found");
    if (comment.creatorId !== userId) throw new ApolloError("cannot update");

    return prisma.comment.update({
      where: { id: commentId },
      data: {
        text,
        updatedAt: new Date(),
      },
    });
  }

  @Mutation(() => Boolean)
  async deleteComment(
    @Arg("commentId", () => ID) commentId: string,
    @Ctx() { req, prisma }: Context
  ): Promise<boolean> {
    const { userId } = getSession(req, true)!;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) throw new ApolloError("comment not found");
    if (comment.creatorId !== userId) throw new ApolloError("cannot update");

    await prisma.comment.delete({ where: { id: commentId } });
    return true;
  }
}
