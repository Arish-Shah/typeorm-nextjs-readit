import { Field, ID, InputType, Int } from "type-graphql";

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
export class SubInput {
  @Field(() => ID)
  name: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  banner?: string;
}

@InputType()
export class PostInput {
  @Field()
  title: string;

  @Field()
  body: string;

  @Field({ nullable: true })
  image?: string;
}

@InputType()
export class PaginationInput {
  @Field(() => Int)
  take: number;

  @Field(() => ID, { nullable: true })
  cursor?: string;
}
