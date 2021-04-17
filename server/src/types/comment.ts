import { Field, ID, ObjectType } from "type-graphql";

import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string;

  @Field()
  text: string;

  @Field(() => Post, { nullable: true })
  post?: Post;
  @Field(() => ID)
  postId: string;

  @Field(() => User, { nullable: true })
  creator?: User;
  @Field(() => ID)
  creatorId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
