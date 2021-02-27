import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  ID,
  Int,
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
import { Like } from "../entities/Like";
import { getConnection } from "typeorm";

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
  posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("offset", () => Int, { nullable: true }) offset?: number
  ): Promise<Post[]> {
    const parameters = [limit, offset || 0];
    return getConnection().query(
      `
      SELECT *
      FROM posts
      ORDER BY "createdAt" DESC
      LIMIT $1
      OFFSET $2 ROWS
    `,
      parameters
    );
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
  creator(@Root() parent: Post, @Ctx() { userLoader }: Context) {
    return userLoader.load(parent.creatorID);
  }

  @FieldResolver(() => Int)
  likes(@Root() parent: Post) {
    return Like.count({ where: { postID: parent.id } });
  }

  @FieldResolver(() => Boolean, { nullable: true })
  async isLiked(@Root() parent: Post, @Ctx() { req }: Context) {
    // @ts-ignore
    const creatorID = req.session.userID;
    if (!creatorID) {
      return null;
    }
    const isLiked = await Like.findOne({
      where: { postID: parent.id, creatorID },
    });
    return !!isLiked;
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
    const { userID } = req.session;
    const post = await Post.create({ ...input, creatorID: userID }).save();
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
    const { userID } = req.session;
    const post = await Post.findOne(postID);
    if (post?.creatorID !== userID) {
      return false;
    }
    Post.delete(postID);
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async editPost(
    @Arg("postID", () => ID) postID: string,
    @Arg("input") input: PostInput,
    @Ctx() { req }: Context
  ) {
    // @ts-ignore
    const { userID } = req.session;
    const post = await Post.findOne(postID);
    console.log({ userID, postID });
    if (post?.creatorID === userID) {
      Post.update(postID, { title: input.title, body: input.body });
      return true;
    } else {
      return false;
    }
  }
}
