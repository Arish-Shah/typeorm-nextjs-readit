import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;
}
