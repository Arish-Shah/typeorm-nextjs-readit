import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class PostInput {
  @Field()
  title: string;

  @Field()
  body: string;
}
