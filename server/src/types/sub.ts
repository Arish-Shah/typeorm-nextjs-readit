import { Field, ID, ObjectType } from "type-graphql";

import { PaginatedPosts } from "./Page";

@ObjectType()
export class Sub {
  @Field(() => ID)
  name: string;

  @Field(() => String, { nullable: true })
  title: string | null;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  image: string | null;

  @Field(() => String, { nullable: true })
  banner: string | null;

  @Field(() => PaginatedPosts)
  posts?: PaginatedPosts;

  @Field()
  createdAt: Date;
}
