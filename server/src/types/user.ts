import { Field, ID, ObjectType } from "type-graphql";

import { PaginatedComments, PaginatedPosts } from "./Page";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field(() => String, { nullable: true })
  bio: string | null;

  @Field(() => String, { nullable: true })
  image: string | null;

  @Field(() => PaginatedPosts)
  posts?: PaginatedPosts;

  @Field(() => PaginatedComments)
  comments?: PaginatedComments[];

  @Field()
  createdAt: Date;
}
