import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";

import { Context } from "./types/context";
import { Post } from "../entities/Post";
import { isAuth } from "../middleware/isAuth";
import { PostInput } from "./types/post-input";
import { FieldError } from "./types/field-error";
import { validatePost } from "../util/validators";
import { Upvote } from "../entities/Upvote";

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];

  @Field()
  hasMore: boolean;
}

@ObjectType()
class PostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  snippet(@Root() parent: Post) {
    return parent.body.substring(0, 50);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("postId") postId: string,
    @Arg("value") value: number,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    const isUpvote = value !== -1;
    const realValue = isUpvote ? 1 : -1;

    // @ts-ignore
    const { userId } = req.session;

    await Upvote.insert({
      userId,
      postId,
      value: realValue,
    });

    await getConnection().query(
      `
      START TRANSACTION;
      
      INSERT INTO upvotes ("userId", "postId", "value")
      VALUES (${userId}, ${postId}, ${realValue});
      
      UPDATE posts
      SET points = points + ${realValue}
      WHERE id = ${postId};

      COMMIT;
    `
    );

    return true;
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", { nullable: true }) cursor?: string
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const parameters: any[] = [realLimitPlusOne];

    if (cursor) {
      parameters.push(new Date(cursor));
    }

    const posts = await getConnection().query(
      `
      SELECT p.*,
      json_build_object(
        'id', u.id,
        'username', u.username,
        'email', u.email
      ) creator
      FROM posts p
      INNER JOIN users u on u.id = p."creatorId"
      ${cursor ? `WHERE p."createdAt" < $2` : ""}
      ORDER BY p."createdAt" DESC
      LIMIT $1;
    `,
      parameters
    );

    return {
      posts: await posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };
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

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: Context
  ): Promise<PostResponse> {
    const errors = validatePost(input);

    if (errors) {
      return {
        errors,
      };
    }

    // @ts-ignore
    const creatorId = req.session.userId;
    const post = await Post.create({ ...input, creatorId }).save();
    return { post };
  }
}
