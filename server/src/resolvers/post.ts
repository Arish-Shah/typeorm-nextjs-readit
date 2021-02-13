import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Context } from "./types/context";

import { Post } from "../entities/Post";
import { isAuth } from "../middleware/isAuth";

@InputType()
class PostInput {
  @Field()
  title: string;

  @Field()
  body: string;
}

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return Post.find();
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: string): Promise<Post | null> {
    try {
      const post = await Post.findOne(id);
      return post;
    } catch (err) {
      return null;
    }
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: Context
  ): Promise<Post> {
    // @ts-ignore
    const creatorId = req.session.userId;
    const post = await Post.create({ ...input, creatorId }).save();
    return post;
  }
}
