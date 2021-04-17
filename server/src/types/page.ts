import { Field, ObjectType } from "type-graphql";

import { Post } from "./Post";
import { Comment } from "./Comment";

@ObjectType()
export class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];

  @Field()
  hasMore: boolean;
}

@ObjectType()
export class PaginatedComments {
  @Field(() => [Comment])
  comments: Comment[];

  @Field()
  hasMore: boolean;
}
