import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";

import { Context } from "./types/context";
import { Post } from "../entities/Post";
import { PostInput } from "./types/post-input";
import { isAuth } from "../middleware/isAuth";

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  async posts(
    @Arg("limit") limit: number,
    @Arg("cursor", { nullable: true }) cursor: string | null
  ): Promise<Post[]> {
    return (
      getConnection()
        .getRepository(Post)
        .createQueryBuilder("p")
        // .where("user.id = :id", { id: 1 })
        .orderBy('"createdAt"')
        .getMany()
    );
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: number): Promise<Post | null> {
    try {
      const post = await Post.findOne(id);
      return post;
    } catch (err) {
      return null;
    }
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: Context
  ): Promise<Post> {
    return Post.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }
}
