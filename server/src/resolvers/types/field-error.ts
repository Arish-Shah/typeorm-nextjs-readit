import { Field, ObjectType } from "type-graphql";

@ObjectType({ simpleResolvers: true })
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
