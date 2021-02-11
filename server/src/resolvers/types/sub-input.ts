import { Field, InputType } from "type-graphql";

@InputType()
export class SubInput {
  @Field()
  name: string;

  @Field()
  title: string;

  @Field()
  description: string;
}
