import { Field, ID, ObjectType } from "type-graphql";

import { User } from "./User";
import { Sub } from "./Sub";
import { PaginatedComments } from "./Page";

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  body: string | null;

  @Field(() => String, { nullable: true })
  image: string | null;

  @Field(() => User, { nullable: true })
  creator?: User;
  @Field(() => ID)
  creatorId: string;

  @Field(() => Sub, { nullable: true })
  sub?: Sub;
  @Field(() => ID)
  subName: string;

  @Field(() => PaginatedComments)
  comments?: PaginatedComments;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
