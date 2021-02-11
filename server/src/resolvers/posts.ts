import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

import { Post } from "../entities/Post";
import { Sub } from "../entities/Sub";
import { User } from "../entities/User";
import { Context } from "./types/context";
import { readToken } from "../util/token";
import { postValidator } from "../util/validators";
import { PostInput } from "./types/post-input";
import { FieldError } from "./types/field-error";

@ObjectType()
export class PostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post], { nullable: true })
  async posts(): Promise<Post[] | null> {
    const posts = await Post.find({
      relations: ["creator", "sub", "comments"],
      order: { createdAt: "DESC" },
    });
    return posts;
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("identifier") identifier: string,
    @Arg("slug") slug: string
  ): Promise<Post | null> {
    return Post.findOne({
      where: { identifier, slug },
      relations: ["creator", "sub", "comments"],
    });
  }

  @Mutation(() => PostResponse)
  async createPost(
    @Arg("data") data: PostInput,
    @Ctx() { req }: Context
  ): Promise<PostResponse> {
    try {
      const { username } = readToken(req.cookies.token);

      const creator = await User.findOne({ where: { username } });

      const error = postValidator(data);
      if (error) {
        return { error };
      }

      const sub = await Sub.findOne({
        where: { name: data.sub },
      });

      if (!sub) {
        return {
          error: {
            field: "sub",
            message: "does not exist",
          },
        };
      }

      const post = await Post.create({
        ...data,
        sub,
        creator,
      }).save();
      return { post };
    } catch (err) {
      return {
        error: {
          field: "creator",
          message: "unauthenticated",
        },
      };
    }
  }
}
