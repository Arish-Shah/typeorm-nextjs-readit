import { Field, ObjectType } from "type-graphql";

import { User } from "../../entities/User";
import { FieldError } from "./field-error";

@ObjectType()
export class UserResponse {
  @Field({ nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
