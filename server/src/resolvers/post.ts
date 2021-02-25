import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";

import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { Context } from "./types/context";
import { FieldError } from "./types/field-error";
import { PostInput } from "./types/input";
import { postValidator } from "../utils/validators";

@ObjectType()
class PostResponse {
  @Field({ nullable: true })
  post?: Post;

  @Field({ nullable: true })
  errors?: FieldError;
}

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  posts() {
    return Post.find({ order: { createdAt: "DESC" } });
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("postID", () => ID) postID: string) {
    return Post.findOne(postID);
  }

  @FieldResolver(() => String)
  snippet(@Root() parent: Post): string {
    return parent.body.substring(0, 50);
  }

  @FieldResolver(() => User)
  creator(@Root() parent: Post) {
    return User.findOne(parent.creatorId);
  }

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: Context
  ): Promise<PostResponse> {
    const errors = postValidator(input);
    if (errors) {
      return {
        errors,
      };
    }

    // @ts-ignore
    const { userId } = req.session;
    const post = await Post.create({ ...input, creatorId: userId }).save();
    return {
      post,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("postID", () => ID) postID: string,
    @Ctx() { req }: Context
  ) {
    // @ts-ignore
    const { userId } = req.session;
    const post = await Post.findOne(postID);
    if (post?.creatorId !== userId) {
      return false;
    }
    Post.delete(postID);
    return true;
  }
}
