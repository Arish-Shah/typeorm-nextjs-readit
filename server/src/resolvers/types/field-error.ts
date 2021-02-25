import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class FieldError {
  // For user
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;

  // For post
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  body?: string;
}
