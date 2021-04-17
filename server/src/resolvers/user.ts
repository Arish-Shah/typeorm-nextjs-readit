import { ApolloError, UserInputError } from "apollo-server-express";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { hash, compare } from "bcryptjs";

import { User } from "../types/User";
import { PaginationInput, RegisterInput } from "../types/Input";
import { Context } from "../context";

import { validateRegister } from "../lib/validate";
import { getSession, setSession } from "../lib/auth";
import { removeTokenCookie } from "../lib/auth-cookies";
import { PaginatedComments, PaginatedPosts } from "../types/Page";
import { getPaginationData } from "../lib/paginate";

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  async me(@Ctx() { req, prisma }: Context): Promise<User> {
    const { userId } = getSession(req, true)!;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new ApolloError("user not found");
    return user;
  }

  @FieldResolver(() => PaginatedPosts)
  async posts(
    @Root() parent: User,
    @Arg("input") input: PaginationInput,
    @Ctx() { prisma }: Context
  ): Promise<PaginatedPosts> {
    const pagination = getPaginationData(input);

    const posts = await prisma.post.findMany({
      where: { creatorId: parent.id },
      orderBy: { createdAt: "desc" },
      ...pagination,
    });

    return {
      hasMore: posts.length === input.take + 1,
      posts: posts.slice(0, input.take),
    };
  }

  @FieldResolver(() => PaginatedComments)
  async comments(
    @Root() parent: User,
    @Arg("input") input: PaginationInput,
    @Ctx() { prisma }: Context
  ): Promise<PaginatedComments> {
    const pagination = getPaginationData(input);

    const comments = await prisma.comment.findMany({
      where: { creatorId: parent.id },
      orderBy: { createdAt: "desc" },
      ...pagination,
    });

    return {
      hasMore: comments.length === input.take + 1,
      comments: comments.slice(0, input.take),
    };
  }

  @Mutation(() => User)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { prisma, res }: Context
  ): Promise<User> {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) throw new ApolloError("incorrect username or password");

    const valid = await compare(password, user.password);
    if (!valid) throw new ApolloError("incorrect username or password");

    setSession({ userId: user.id }, res);

    return user;
  }

  @Mutation(() => User)
  async register(
    @Arg("input") input: RegisterInput,
    @Ctx() { prisma, res }: Context
  ): Promise<User> {
    const error = validateRegister(input);
    if (error) throw new UserInputError(error);

    const password = await hash(input.password, 10);

    try {
      const user = await prisma.user.create({
        data: { ...input, password },
      });

      setSession({ userId: user.id }, res);

      return user;
    } catch (e) {
      throw new ApolloError("user already exists");
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { res }: Context): boolean {
    removeTokenCookie(res);
    return true;
  }
}
