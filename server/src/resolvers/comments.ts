import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { Comment } from "../entities/Comment";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { Context } from "./types/context";
import { readToken } from "../util/token";
import { commentValidator } from "../util/validators";
import { CommentInput } from "./types/comment-input";
import { FieldError } from "./types/field-error";

@ObjectType()
class CommentResponse {
  @Field(() => Comment, { nullable: true })
  comment?: Comment;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}

@Resolver()
export class CommentResolver {
  @Mutation(() => CommentResponse)
  async commentOnPost(
    @Arg("identifier") identifier: string,
    @Arg("slug") slug: string,
    @Arg("data") data: CommentInput,
    @Ctx() { req }: Context
  ): Promise<CommentResponse> {
    try {
      const error = commentValidator(data);
      if (error) {
        return { error };
      }

      const post = await Post.findOne({
        where: { identifier, slug },
      });
      if (!post) {
        return {
          error: {
            field: "post",
            message: "not found",
          },
        };
      }

      const { username } = readToken(req.cookies.token);
      const creator = await User.findOne({ where: { username } });

      const comment = await Comment.create({
        ...data,
        post,
        creator,
      }).save();

      return { comment };
    } catch (err) {
      console.log(err);
      return {
        error: {
          field: "user",
          message: "unauthenticated",
        },
      };
    }
  }
}
